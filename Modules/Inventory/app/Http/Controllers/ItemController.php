<?php

namespace Modules\Inventory\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Inventory\Http\Requests\ItemRequest;
use Modules\Inventory\Models\Category;
use Modules\Inventory\Models\Item;

class ItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('inventory/items', [
            'items' => Item::query()->with('category:id,name')->withCount('units')->latest()->get(),
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'can' => ['manageInventory' => true],
        ]);
    }

    public function store(ItemRequest $request): RedirectResponse
    {
        Item::query()->create($request->validated());

        return back();
    }

    public function update(ItemRequest $request, Item $item): RedirectResponse
    {
        $item->update($request->validated());

        return back();
    }

    public function destroy(Item $item): RedirectResponse
    {
        abort_unless(request()->user()?->can('manage-inventory'), 403);
        $item->delete();

        return back();
    }
}
