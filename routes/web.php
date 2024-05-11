<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdController;
use App\Http\Controllers\AdsController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlansController;
use App\Http\Controllers\ConversationsController;

use App\Http\Controllers\SellerDashboard\AdsController as SellerDashboardAdsController;

use App\Http\Controllers\Settings\SettingsController;
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
Route::get('/plans', [PlansController::class, 'index']);
Route::get('/ads', [AdsController::class, 'index']);

Route::get('/ad/{id}', [AdController::class, 'show']);
Route::get('/seller/{id}', [SellerController::class, 'show']);
Route::get('/user/{id}', [UserController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {

    Route::middleware('seller')->group(function () {
        Route::get('/seller-dashboard/ads', [SellerDashboardAdsController::class, 'index']);
        Route::post('/seller-dashboard/ads', [SellerDashboardAdsController::class, 'store']);
        Route::put('/seller-dashboard/ads/{id}', [SellerDashboardAdsController::class, 'update']);
        Route::delete('/seller-dashboard/ads/{id}', [SellerDashboardAdsController::class, 'destroy']);
        Route::put('/seller-dashboard/ads/{id}/delete-image', [SellerDashboardAdsController::class, 'deleteImage']);
        Route::put('/seller-dashboard/ads/{id}/disable', [SellerDashboardAdsController::class, 'disable']);
        Route::put('/seller-dashboard/ads/{id}/reenable', [SellerDashboardAdsController::class, 'reenable']);
    });

    Route::get('/conversations/start', [ConversationsController::class, 'startConversation']);
    Route::get('/conversations', [ConversationsController::class, 'index']);
    Route::get('/conversations/{id}', [ConversationsController::class, 'show']);
    Route::post('/conversations', [ConversationsController::class, 'store']);

    Route::get('/settings', [SettingsController::class, 'index']);
    Route::get('/settings/user', [SettingsUserController::class, 'index']);
    Route::patch('/settings/user', [SettingsUserController::class, 'update']);
    Route::delete('/settings/user', [SettingsUserController::class, 'destroy']);
    Route::get('/settings/seller', [SettingsSellerController::class, 'index']);
    Route::post('/settings/seller', [SettingsSellerController::class, 'store']);
    Route::put('/settings/seller', [SettingsSellerController::class, 'update']);
    Route::delete('/settings/seller', [SettingsSellerController::class, 'destroy']);
});

Route::get('/invalid-subscription', function () {
    return Inertia::render('Auth/InvalidSubscription');
});

require __DIR__ . '/auth.php';
