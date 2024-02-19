<?php

namespace App\Http\Controllers\SellerDashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Models\Seller;
use App\Models\Ad;
use Illuminate\Support\Facades\Redirect;

class AdsController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $userId = $user->id;

        $seller = Seller::where('user_id', $userId)->first();
        $sellerId = $seller->id;

        $ads = Ad::where('seller_id', $sellerId)->paginate();

        return Inertia::render('SellerDashboard/Ads', [
            'status' => session('status'), 'ads' => $ads
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $userId = $user->id;

        $seller = Seller::where('user_id', $userId)->first();
        $sellerId = $seller->id;

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric|max:999999.99'
        ]);

        Ad::create([
            'seller_id' => $sellerId,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price
        ]);

        return back();
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $userId = $user->id;

        $seller = Seller::where('user_id', $userId)->first();
        $sellerId = $seller->id;

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'price' => 'required|numeric|max:999999.99'
        ]);

        Ad::where('seller_id', $sellerId)->where('id', $id)
            ->update([
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price
            ]);

        return back();
    }

    public function destroy(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $userId = $user->id;

        $seller = Seller::where('user_id', $userId)->first();
        $sellerId = $seller->id;

        Ad::where('seller_id', $sellerId)
            ->where('id', $id)
            ->first()
            ->delete();

        return back();
    }
}
