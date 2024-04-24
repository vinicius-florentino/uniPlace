<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdController;
use App\Http\Controllers\AdsController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\ConversationsController;

use App\Http\Controllers\SellerDashboard\AdsController as SellerDashboardAdsController;
use App\Http\Controllers\Settings\UserController as SettingsUserController;
use App\Http\Controllers\Settings\SellerController as SettingsSellerController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
*/

Route::get('/', [DashboardController::class, 'index']);

Route::get('/invalid-subscription', function () {
    return Inertia::render('Auth/InvalidSubscription');
})->name('invalid.subscription');

Route::get('/plans', [PlansController::class, 'index']);

Route::get('/ads', [AdsController::class, 'index']);
Route::get('/ad/{id}', [AdController::class, 'show']);

Route::get('/seller/{id}', [SellerController::class, 'show']);
Route::get('/user/{id}', [UserController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {

    Route::resource('/seller-dashboard/ads', SellerDashboardAdsController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::put('/seller-dashboard/ads/{id}/delete-image', [SellerDashboardAdsController::class, 'deleteImage']);
    Route::put('/seller-dashboard/ads/{id}/disable', [SellerDashboardAdsController::class, 'disable']);
    Route::put('/seller-dashboard/ads/{id}/reenable', [SellerDashboardAdsController::class, 'reenable']);

    Route::get('/settings', function () {
        return redirect('/settings/user');
    });
    Route::get('/settings/user', [SettingsUserController::class, 'index']);
    Route::patch('/settings/user', [SettingsUserController::class, 'update']);
    Route::delete('/settings/user', [SettingsUserController::class, 'destroy']);

    Route::resource('/settings/seller', SettingsSellerController::class)->only(['index', 'store', 'update']);

    Route::resource('/conversations', ConversationsController::class);
    Route::get('/conversations/start', [ConversationsController::class, 'startConversation']);
    
});

require __DIR__ . '/auth.php';
