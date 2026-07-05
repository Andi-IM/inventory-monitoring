<?php

namespace Modules\Inventory\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Inventory\Http\Requests\ItemUnitRequest;
use Modules\Inventory\Models\Item;
use Modules\Inventory\Models\ItemUnit;

class ItemUnitController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('inventory/units', [
            'units' => ItemUnit::query()->with('item:id,name')->latest()->get(),
            'items' => Item::query()->orderBy('name')->get(['id', 'name']),
            'statuses' => [ItemUnit::StatusAvailable, ItemUnit::StatusBorrowed],
            'can' => ['manageInventory' => true],
        ]);
    }

    public function store(ItemUnitRequest $request): RedirectResponse
    {
        ItemUnit::query()->create($request->validated());

        return back();
    }

    public function update(ItemUnitRequest $request, ItemUnit $itemUnit): RedirectResponse
    {
        $itemUnit->update($request->validated());

        return back();
    }

    public function destroy(ItemUnit $itemUnit): RedirectResponse
    {
        abort_unless(request()->user()?->can('manage-inventory'), 403);
        $itemUnit->delete();

        return back();
    }
}
