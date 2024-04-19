<?php

namespace App\Http\Controllers\SellerDashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Ad;
// use Illuminate\Support\Facades\Redirect;

class AdsController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $seller = $user->seller;
        $sellerId = $seller->id;

        $ads = Ad::where('seller_id', $sellerId)
            ->with('category')
            ->orderBy('is_able', 'desc')
            ->paginate();

        return Inertia::render('SellerDashboard/Ads', [
            'status' => session('status'),
            'ads' => $ads
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $seller = $user->seller;
        $sellerId = $seller->id;

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|max:999999.99',
            'category_id' => 'required|int',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('imgs/ads', 'public');
        }

        Ad::create([
            'seller_id' => $sellerId,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'image_path' => $imagePath ?? null,
        ]);

        return back();
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $seller = $user->seller;
        $sellerId = $seller->id;

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|max:999999.99',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('imgs/ads', 'public');
        }

        $ad = Ad::where('seller_id', $sellerId)->where('id', $id)->first();

        if ($ad) {
            $ad->title = $request->title;
            $ad->description = $request->description;
            $ad->price = $request->price;
            $ad->category_id = $request->category_id;
            $ad->image_path = $imagePath ?? $ad->getOriginal('image_path');
            $ad->save();
        }

        return back();
    }

    public function destroy(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $seller = $user->seller;
        $sellerId = $seller->id;

        Ad::where('seller_id', $sellerId)
            ->where('id', $id)
            ->first()
            ->delete();

        return back();
    }

    public function deleteImage(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $seller = $user->seller;
        $sellerId = $seller->id;

        $ad = Ad::where('seller_id', $sellerId)
            ->where('id', $id)
            ->first();

        $ad->image_path = null;
        $ad->save();

        return back();
    }

    public function disable(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $seller = $user->seller;
        $sellerId = $seller->id;

        $ad = Ad::where('seller_id', $sellerId)
            ->where('id', $id)
            ->first();

        $ad->is_able = false;
        $ad->save();

        return back();
    }

    public function reenable(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $seller = $user->seller;
        $sellerId = $seller->id;

        $ad = Ad::where('seller_id', $sellerId)
            ->where('id', $id)
            ->first();

        $ad->is_able = true;
        $ad->save();

        return back();
    }
}
