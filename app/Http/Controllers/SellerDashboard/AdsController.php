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
            ->with(['category', 'upUsage'])
            ->withoutGlobalScope('enabled')
            ->orderBy('enabled', 'desc')
            ->get();

        return Inertia::render('SellerDashboard/Ads/Ads', [
            'ads' => $ads
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $seller = $user->seller;
        $sellerId = $seller->id;
        $sellerPlan = $seller->plan;

        $adsCount = Ad::where('seller_id', $sellerId)->count();

        if ($sellerPlan->max_ads === $adsCount){
            return back()->withErrors(['message' => 'Máximo de anúncios atingido.']);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|max:999999.99',
            'category_id' => 'nullable|int',
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
            'category_id' => 'nullable|int',
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

        $ad->enabled = false;
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
            ->withoutGlobalScope('enabled')
            ->first();

        $ad->enabled = true;
        $ad->save();

        return back();
    }

    public function up(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $seller = $user?->seller;
        $sellerId = $seller?->id;
        $sellerUp = $seller?->up;

        $request->validate([
            'ups' => 'required|int|min:1',
        ]);

        $ad = Ad::where('id', $id)->where('seller_id', $sellerId)->exists();

        if ($ad && $sellerUp?->available_count > 0 && $sellerUp?->available_count > $request->ups) {
            $sellerUp?->useUp($id, $request->ups);
            return back();
        } else {
            return back()->withErrors(['message' => 'Quantidade de UPs inválida.']);
        }
    }
}
