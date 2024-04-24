<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use App\Models\Seller;

class SellerController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Settings/Settings', [
            // 'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            // 'status' => session('status'),
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

        $seller = $user->seller;
        $seller->name = $request->name;
        $seller->phone = $request->phone;
        $seller->save();

        return back();
    }
}
