<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use App\Models\Seller;
use App\Models\Up;
use App\Models\Plan;

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
            $request->merge(['phone' => preg_replace('/\D/', '', $request->phone)]);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => [
                'nullable',
                'string',
                Rule::unique('sellers')->ignore($userId, 'user_id'),
            ]
        ]);

        $seller = Seller::create([
            'user_id' => $userId,
            'name' => $request->name,
            'phone' => $request->phone,
            'plan_id' => Plan::where('name', 'Aluno')->first()->id
        ]);

        Up::create([
            'seller_id' => $seller->id,
            'available_count' => 10
        ]);

        return back();
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        $userId = $user->id;
        
        if ($request->filled('phone')) {
            $request->merge(['phone' => preg_replace('/\D/', '', $request->phone)]);
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

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        $seller = $user->seller;
        $seller->delete();

        return back();
    }
}
