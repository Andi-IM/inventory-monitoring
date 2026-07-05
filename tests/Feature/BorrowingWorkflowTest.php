<?php

use App\Models\User;
use Modules\Borrowing\Models\Loan;
use Modules\Borrowing\Models\LoanItem;
use Modules\Inventory\Models\Category;
use Modules\Inventory\Models\Item;
use Modules\Inventory\Models\ItemUnit;

function makeUnit(string $assetCode): ItemUnit
{
    $category = Category::query()->firstOrCreate(['name' => 'Lab']);
    $item = Item::query()->firstOrCreate([
        'category_id' => $category->id,
        'name' => 'Mikroskop',
    ]);

    return ItemUnit::query()->create([
        'item_id' => $item->id,
        'asset_code' => $assetCode,
        'status' => ItemUnit::StatusAvailable,
    ]);
}

test('petugas can borrow multiple units and return them partially', function (): void {
    $petugas = User::factory()->petugas()->create();
    $borrower = User::factory()->create();
    $firstUnit = makeUnit('LAB-001');
    $secondUnit = makeUnit('LAB-002');

    $this->actingAs($petugas)
        ->post(route('borrowing.loans.store'), [
            'borrower_type' => 'internal',
            'borrower_user_id' => $borrower->id,
            'due_at' => now()->addDay()->format('Y-m-d H:i:s'),
            'item_unit_ids' => [$firstUnit->id, $secondUnit->id],
        ])
        ->assertRedirect();

    $loan = Loan::query()->with('loanItems')->firstOrFail();

    expect($loan->loanItems)->toHaveCount(2)
        ->and($firstUnit->fresh()->status)->toBe(ItemUnit::StatusBorrowed)
        ->and($secondUnit->fresh()->status)->toBe(ItemUnit::StatusBorrowed);

    $loanItem = $loan->loanItems->first();

    $this->patch(route('borrowing.loans.items.return', [$loan, $loanItem]), [
        'return_condition' => LoanItem::ConditionNormal,
    ])->assertRedirect();

    expect($loan->fresh()->status)->toBe(Loan::StatusPartiallyReturned)
        ->and($loanItem->itemUnit->fresh()->status)->toBe(ItemUnit::StatusAvailable);
});

test('borrowed units cannot be borrowed again', function (): void {
    $petugas = User::factory()->petugas()->create();
    $borrower = User::factory()->create();
    $unit = makeUnit('LAB-003');
    $unit->forceFill(['status' => ItemUnit::StatusBorrowed])->save();

    $this->actingAs($petugas)
        ->post(route('borrowing.loans.store'), [
            'borrower_type' => 'internal',
            'borrower_user_id' => $borrower->id,
            'due_at' => now()->addDay()->format('Y-m-d H:i:s'),
            'item_unit_ids' => [$unit->id],
        ])
        ->assertSessionHasErrors('item_unit_ids.0');
});
