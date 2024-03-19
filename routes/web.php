<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdController;
use App\Http\Controllers\AdsController;

use App\Http\Controllers\SellerDashboard\ProfileController as SellerDashboardProfileController;
use App\Http\Controllers\SellerDashboard\AdsController as SellerDashboardAdsController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlansController;

/*
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
*/

Route::get('/', [DashboardController::class, 'index'])->name('index');

Route::get('/invalid-subscription', function () {
    return Inertia::render('Auth/InvalidSubscription');
})->name('invalid.subscription');

Route::get('/plans', [PlansController::class, 'index']);

Route::match(['get', 'post'], '/ads', [AdsController::class, 'index']);
Route::get('/ad/{id}', [AdController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::patch('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);

    Route::resource('/seller-dashboard/profile', SellerDashboardProfileController::class)->only(['index', 'store', 'update']);
    Route::resource('/seller-dashboard/ads', SellerDashboardAdsController::class)->only(['index', 'store', 'update', 'destroy']);
});

require __DIR__ . '/auth.php';
