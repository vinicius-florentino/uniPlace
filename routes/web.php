<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InvalidSubscriptionController;
use App\Http\Controllers\PlansController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/invalid-subscription', function () {
    return Inertia::render('Auth/InvalidSubscription');
})->name('invalid.subscription');

Route::get('/plans', [PlansController::class, 'index'])->name('plans');
Route::get('/invalidsubscription ', [InvalidSubscriptionController::class, 'index'])->name('InvalidSubscription');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/seller-dashboard', [SellerDashboardController::class, 'index'])->name('seller.dashboard');
});

require __DIR__ . '/auth.php';
