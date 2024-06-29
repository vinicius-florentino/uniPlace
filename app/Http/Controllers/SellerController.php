<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Seller;

// use Illuminate\Http\Request;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Support\Facades\Redirect;

class SellerController extends Controller
{
    public function show($id): Response
    {
        $seller = Seller::with(['ads', 'ads.upUsage' => function ($query) {
            $query->orderByDesc('expires_at');
        }])->where('id', $id)->first();

        return Inertia::render('Seller', [
            'seller' => $seller
        ]);
    }
}
