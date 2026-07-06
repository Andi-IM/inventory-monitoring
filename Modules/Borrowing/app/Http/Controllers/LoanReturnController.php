<?php

namespace Modules\Borrowing\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Modules\Borrowing\Http\Requests\ReturnLoanItemRequest;
use Modules\Borrowing\Models\Loan;
use Modules\Borrowing\Models\LoanItem;
use Modules\Inventory\Contracts\InventoryClientInterface;

class LoanReturnController extends Controller
{
    public function __invoke(ReturnLoanItemRequest $request, Loan $loan, LoanItem $loanItem, InventoryClientInterface $inventoryClient): RedirectResponse
    {
        abort_unless($loanItem->loan_id === $loan->id, 404);
        abort_if($loanItem->returned_at !== null, 422, 'Unit ini sudah dikembalikan.');

        DB::transaction(function () use ($request, $loan, $loanItem, $inventoryClient): void {
            $data = $request->validated();

            $loanItem->forceFill([
                'returned_at' => now(),
                'return_condition' => $data['return_condition'],
                'return_notes' => $data['return_notes'] ?? null,
            ])->save();

            if ($data['return_condition'] === LoanItem::ConditionNormal) {
                $inventoryClient->updateItemUnitStatus($loanItem->item_unit_id, 'available');
            }

            $loan->refresh();
            $loan->refreshStatus();
        });

        return back();
    }
}
