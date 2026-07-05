<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard')->name('home');

Route::middleware('auth')->get('/dashboard', DashboardController::class)->name('dashboard');
