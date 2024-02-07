<?php

namespace App\Http\Controllers\SellerDashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Seller;
use Illuminate\Http\Request;

class AdsController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    // public function index(Request $request): Response
    // {
    //     $user = $request->user();
    //     $seller = $user->seller;

    //     return Inertia::render('SellerDashboard/Profile', [
    //         'status' => session('status'), 'seller' => $seller
    //     ]);
    // }

    // public function store(Request $request): Response
    // {
    //     $user = $request->user();
    //     $userId = $user->id;

    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //     ]);

    //     $seller = Seller::create([
    //         'user_id' => $userId,
    //         'name' => $request->name,
    //     ]);

    //     return Inertia::render('SellerDashboard', [
    //         'status' => session('status'), 'seller' => $seller
    //     ]);
    // }

    // public function update(Request $request): Response
    // {
    //     $user = $request->user();
    //     $userId = $user->id;

    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //     ]);

    //     $seller = Seller::where('user_id', $userId)
    //     ->update([
    //         'name' => $request->name
    //     ]);

    //     return Inertia::render('SellerDashboard', [
    //         'status' => session('status'), 'seller' => $seller
    //     ]);
    // }
}
