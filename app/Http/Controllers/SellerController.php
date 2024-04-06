<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Models\Seller;
use Illuminate\Support\Facades\Redirect;

class SellerController extends Controller
{
    public function show($id): Response
    {
        $seller = Seller::with('ads')->where('id', $id)->first();

        return Inertia::render('Seller', [
            'seller' => $seller
        ]);
    }
}
