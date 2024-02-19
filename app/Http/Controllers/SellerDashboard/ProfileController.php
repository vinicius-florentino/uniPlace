<?php

namespace App\Http\Controllers\SellerDashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Seller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

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

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Seller::create([
            'user_id' => $userId,
            'name' => $request->name,
        ]);

        return back();
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $user = $request->user();
        $userId = $user->id;

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Seller::where('user_id', $userId)->where('id', $id)
            ->update([
                'name' => $request->name
            ]);

        return back();
    }
}
