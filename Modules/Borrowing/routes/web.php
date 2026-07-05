<?php

use Illuminate\Support\Facades\Route;
use Modules\Borrowing\Http\Controllers\LoanController;
use Modules\Borrowing\Http\Controllers\LoanReturnController;

Route::middleware(['auth', 'can:manage-borrowing'])->prefix('borrowing')->name('borrowing.')->group(function (): void {
    Route::resource('loans', LoanController::class)->only(['index', 'store']);
    Route::patch('loans/{loan}/items/{loanItem}/return', LoanReturnController::class)->name('loans.items.return');
});
