<?php

use App\Http\Controllers\DashboardController;
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

Route::get('/', [DashboardController::class, 'index'])->name('index');

Route::get('/invalid-subscription', function () {
    return Inertia::render('Auth/InvalidSubscription');
})->name('invalid.subscription');

Route::get('/plans', [PlansController::class, 'index']);

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit']);
    Route::patch('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile', [ProfileController::class, 'destroy']);

    Route::prefix('/seller-dashboard')->group(function () {
        Route::resource('/profile', SellerDashboardProfileController::class)->only(['index', 'store', 'update']);
        Route::resource('/ads', SellerDashboardAdsController::class)->only(['index', 'store', 'update', 'destroy']);
    });
});

require __DIR__ . '/auth.php';
