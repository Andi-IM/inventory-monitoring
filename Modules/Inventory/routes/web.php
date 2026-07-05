<?php

use Illuminate\Support\Facades\Route;
use Modules\Inventory\Http\Controllers\CategoryController;
use Modules\Inventory\Http\Controllers\ItemController;
use Modules\Inventory\Http\Controllers\ItemUnitController;

Route::middleware(['auth', 'can:manage-inventory'])->prefix('inventory')->name('inventory.')->group(function (): void {
    Route::resource('categories', CategoryController::class)->except(['create', 'show', 'edit']);
    Route::resource('items', ItemController::class)->except(['create', 'show', 'edit']);
    Route::resource('item-units', ItemUnitController::class)
        ->parameters(['item-units' => 'itemUnit'])
        ->except(['create', 'show', 'edit']);
});
