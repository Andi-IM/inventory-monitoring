<?php

namespace Modules\Borrowing\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Access\Contracts\AccessClientInterface;
use Modules\Borrowing\Http\Requests\StoreLoanRequest;
use Modules\Borrowing\Models\Loan;
use Modules\Inventory\Contracts\InventoryClientInterface;

class LoanController extends Controller
{
    public function index(AccessClientInterface $accessClient, InventoryClientInterface $inventoryClient): Response
    {
        $this->markOverdueLoans();

        // 1. Fetch loans
        $loans = Loan::query()
            ->with(['borrowerUser:id,name', 'recordedBy:id,name', 'loanItems'])
            ->latest()
            ->get();

        // 2. Hydrate external borrowers
        $externalBorrowerIds = $loans->pluck('external_borrower_id')->filter()->unique()->toArray();
        $externalBorrowers = $accessClient->getExternalBorrowersByIds($externalBorrowerIds);

        // 3. Hydrate item units for loan items
        $itemUnitIds = $loans->pluck('loanItems')->flatten()->pluck('item_unit_id')->filter()->unique()->toArray();
        $itemUnits = $inventoryClient->getItemUnitsByIds($itemUnitIds);

        // 4. Map them together
        $loansData = $loans->map(function ($loan) use ($externalBorrowers, $itemUnits) {
            $loanArray = $loan->toArray();
            $loanArray['external_borrower'] = $loan->external_borrower_id ? $externalBorrowers->get($loan->external_borrower_id) : null;

            $loanArray['loan_items'] = $loan->loanItems->map(function ($loanItem) use ($itemUnits) {
                $itemArray = $loanItem->toArray();
                $itemArray['item_unit'] = $itemUnits->get($loanItem->item_unit_id);

                return $itemArray;
            });

            return $loanArray;
        });

        return Inertia::render('borrowing/loans', [
            'loans' => $loansData,
            'internalBorrowers' => User::query()->orderBy('name')->get(['id', 'name']),
            'externalBorrowers' => $accessClient->getAllExternalBorrowers(),
            'availableUnits' => $inventoryClient->getAvailableItemUnits(),
            'can' => ['manageBorrowing' => true],
        ]);
    }

    public function store(StoreLoanRequest $request, InventoryClientInterface $inventoryClient): RedirectResponse
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $request, $inventoryClient): void {
            $unitIds = collect($request->itemUnitIds())->unique()->values()->toArray();
            $units = $inventoryClient->getAvailableItemUnitsByIds($unitIds);

            abort_if($units->count() !== count($unitIds), 422, 'Sebagian unit sudah tidak tersedia.');

            $loan = Loan::query()->create([
                'code' => 'LOAN-'.now()->format('Ymd').'-'.Str::upper(Str::random(6)),
                'borrower_user_id' => $data['borrower_type'] === 'internal' ? $data['borrower_user_id'] : null,
                'external_borrower_id' => $data['borrower_type'] === 'external' ? $data['external_borrower_id'] : null,
                'recorded_by_user_id' => $request->user()->id,
                'borrowed_at' => now(),
                'due_at' => $data['due_at'],
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($units as $unit) {
                $loan->loanItems()->create(['item_unit_id' => $unit->id]);
                $inventoryClient->updateItemUnitStatus($unit->id, 'borrowed');
            }
        });

        return back();
    }

    private function markOverdueLoans(): void
    {
        Loan::query()
            ->whereIn('status', [Loan::StatusActive, Loan::StatusPartiallyReturned])
            ->where('due_at', '<', now())
            ->update(['status' => Loan::StatusOverdue]);
    }
}
