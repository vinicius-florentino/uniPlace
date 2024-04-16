<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Models\Ad;
use Illuminate\Support\Facades\Redirect;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $ads = Ad::with('seller')->paginate(config('paginate.dashboard'));
        
        return Inertia::render('Dashboard', [
            'ads' => $ads
         ]);
    }
}
