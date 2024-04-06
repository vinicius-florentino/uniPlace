<?php

namespace App\Http\Controllers\SellerDashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Seller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $userId = $user->id;

        $seller = Seller::where('user_id', $userId)->first();

        return Inertia::render('SellerDashboard/Profile', [
            'status' => session('status'), 'seller' => $seller
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();
        $userId = $user->id;

        if ($request->filled('phone')) {
            $request->merge(['phone' => str_replace([' ', '+'], '', $request->phone)]);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => [
                'nullable',
                'string',
                Rule::unique('sellers')->ignore($userId, 'user_id'),
            ]
        ]);

        Seller::create([
            'user_id' => $userId,
            'name' => $request->name,
            'phone' => $request->phone
        ]);

        return back();
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $userId = $user->id;

        if ($request->filled('phone')) {
            $request->merge(['phone' => str_replace([' ', '+'], '', $request->phone)]);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => [
                'nullable',
                'string',
                Rule::unique('sellers')->ignore($userId, 'user_id'),
            ]
        ]);

        $seller = Seller::where('user_id', $userId)->where('id', $id)->first();

        $seller->name = $request->name;
        $seller->phone = $request->phone;
        $seller->save();

        return back();
    }
}
