<?php

use Illuminate\Support\Facades\Route;
use Modules\Access\Http\Controllers\AuthController;
use Modules\Access\Http\Controllers\ExternalBorrowerController;
use Modules\Access\Http\Controllers\GroupController;
use Modules\Access\Http\Controllers\UserController;

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware('auth')->group(function (): void {
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    Route::middleware('can:manage-access')->prefix('access')->name('access.')->group(function (): void {
        Route::resource('users', UserController::class)->except(['create', 'show', 'edit']);
        Route::resource('groups', GroupController::class)->except(['create', 'show', 'edit']);
        Route::resource('external-borrowers', ExternalBorrowerController::class)
            ->parameters(['external-borrowers' => 'externalBorrower'])
            ->except(['create', 'show', 'edit']);
    });
});
