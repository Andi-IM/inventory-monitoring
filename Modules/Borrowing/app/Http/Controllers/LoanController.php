<?php

namespace Modules\Borrowing\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Access\Models\ExternalBorrower;
use Modules\Borrowing\Http\Requests\StoreLoanRequest;
use Modules\Borrowing\Models\Loan;
use Modules\Inventory\Models\ItemUnit;

class LoanController extends Controller
{
    public function index(): Response
    {
        $this->markOverdueLoans();

        return Inertia::render('borrowing/loans', [
            'loans' => Loan::query()
                ->with(['borrowerUser:id,name', 'externalBorrower:id,name', 'recordedBy:id,name', 'loanItems.itemUnit.item:id,name'])
                ->latest()
                ->get(),
            'internalBorrowers' => User::query()->orderBy('name')->get(['id', 'name']),
            'externalBorrowers' => ExternalBorrower::query()->orderBy('name')->get(['id', 'name']),
            'availableUnits' => ItemUnit::query()
                ->with('item:id,name')
                ->where('status', ItemUnit::StatusAvailable)
                ->orderBy('asset_code')
                ->get(['id', 'item_id', 'asset_code', 'location', 'status']),
            'can' => ['manageBorrowing' => true],
        ]);
    }

    public function store(StoreLoanRequest $request): RedirectResponse
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $request): void {
            $unitIds = collect($request->itemUnitIds())->unique()->values();
            $units = ItemUnit::query()
                ->whereIn('id', $unitIds)
                ->where('status', ItemUnit::StatusAvailable)
                ->lockForUpdate()
                ->get();

            abort_if($units->count() !== $unitIds->count(), 422, 'Sebagian unit sudah tidak tersedia.');

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
                $unit->forceFill(['status' => ItemUnit::StatusBorrowed])->save();
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
