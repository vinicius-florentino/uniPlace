<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Models\Ad;
use Illuminate\Support\Facades\Redirect;

class AdController extends Controller
{
    public function show($id): Response
    {
        $ad = Ad::where('id', $id)->with(['seller', 'category', 'upUsage'])->withoutGlobalScope('enabled')->first();
                
        return Inertia::render('Ad', [
            'ad' => $ad
        ]);
    }
}
