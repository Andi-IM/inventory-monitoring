<?php

namespace Modules\Inventory\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Inventory\Http\Requests\CategoryRequest;
use Modules\Inventory\Models\Category;

class CategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('inventory/categories', [
            'categories' => Category::query()->withCount('items')->latest()->get(),
            'can' => ['manageInventory' => true],
        ]);
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        Category::query()->create($request->validated());

        return back();
    }

    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $category->update($request->validated());

        return back();
    }

    public function destroy(Category $category): RedirectResponse
    {
        abort_unless(request()->user()?->can('manage-inventory'), 403);
        $category->delete();

        return back();
    }
}
