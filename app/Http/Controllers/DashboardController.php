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
        $recentAds = Ad::with(['seller', 'upUsage'])
            ->latest()
            ->paginate(config('paginate.dashboard'));

        $promotedAds = Ad::with(['seller', 'upUsage' => function ($query) {
            $query->orderByDesc('expires_at');
        }])
            ->whereHas('upUsage', function ($query) {
                $query->where('expires_at', '>', now());
            })
            ->paginate(config('paginate.dashboard'));

        return Inertia::render('Dashboard', [
            'recentAds' => $recentAds,
            'promotedAds' => $promotedAds
        ]);
    }
}
