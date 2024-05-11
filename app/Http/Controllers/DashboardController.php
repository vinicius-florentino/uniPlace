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
        $recentAds = Ad::with('seller')
            ->latest()
            ->paginate(config('paginate.dashboard'));

        $promotedAds = ["data" => []];

        return Inertia::render('Dashboard', [
            'recentAds' => $recentAds,
            'promotedAds' => $promotedAds
        ]);
    }
}
