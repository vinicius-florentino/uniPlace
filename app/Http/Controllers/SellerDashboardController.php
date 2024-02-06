<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Seller;
use Illuminate\Http\Request;

class SellerDashboardController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function profile(Request $request): Response
    {
        $user = $request->user();
        $seller = $user->seller;

        return Inertia::render('SellerDashboard/Profile', [
            'status' => session('status'), 'seller' => $seller
        ]);
    }

    public function ads(Request $request): Response
    {
        $user = $request->user();
        $userId = $user->id;

        $ads = Seller::where("user_id", $userId)->first();

        return Inertia::render('SellerDashboard/Ads', [
            'status' => session('status'), 'ads' => $ads
        ]);
    }

    public function store(Request $request): Response
    {
        $user = $request->user();
        $userId = $user->id;

        $seller = Seller::where("user_id", $userId)->first();

        return Inertia::render('SellerDashboard', [
            'status' => session('status'), 'seller' => $seller
        ]);
    }

    public function update(Request $request): Response
    {
        $user = $request->user();
        $userId = $user->id;

        $seller = Seller::where("user_id", $userId)->first();

        return Inertia::render('SellerDashboard', [
            'status' => session('status'), 'seller' => $seller
        ]);
    }
}
