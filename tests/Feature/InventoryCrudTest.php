<?php

use App\Models\User;
use Modules\Inventory\Models\Category;
use Modules\Inventory\Models\Item;
use Modules\Inventory\Models\ItemUnit;

test('petugas can create inventory category item and unit', function (): void {
    $petugas = User::factory()->petugas()->create();

    $this->actingAs($petugas)
        ->post(route('inventory.categories.store'), [
            'name' => 'Elektronik',
            'code' => 'ELK',
        ])
        ->assertRedirect();

    $category = Category::query()->where('code', 'ELK')->firstOrFail();

    $this->post(route('inventory.items.store'), [
        'category_id' => $category->id,
        'name' => 'Mikroskop',
        'description' => 'Mikroskop lab',
    ])->assertRedirect();

    $item = Item::query()->where('name', 'Mikroskop')->firstOrFail();

    $this->post(route('inventory.item-units.store'), [
        'item_id' => $item->id,
        'asset_code' => 'LAB-MIK-001',
        'location' => 'Lab A',
        'status' => ItemUnit::StatusAvailable,
    ])->assertRedirect();

    expect(ItemUnit::query()->where('asset_code', 'LAB-MIK-001')->value('status'))
        ->toBe(ItemUnit::StatusAvailable);
});
