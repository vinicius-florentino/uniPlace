<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerDashboard\ProfileController as SellerDashboardProfileController;
use App\Http\Controllers\SellerDashboard\AdsController as SellerDashboardAdsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/seller-dashboard/profile', SellerDashboardProfileController::class)->only(['index', 'store', 'update']);
    Route::resource('/seller-dashboard/ads', SellerDashboardAdsController::class)->only(['index', 'store']);
    
    Route::get('/seller-dashboard/ad/{id}', [SellerDashboardAdsController::class, 'edit'])->name('seller.dashboard.ad.edit');
});

require __DIR__ . '/auth.php';
