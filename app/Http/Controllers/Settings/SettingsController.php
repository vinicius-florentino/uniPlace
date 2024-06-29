<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use App\Models\Seller;

class SettingsController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Settings/Settings', [
            // 'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            // 'status' => session('status'),
        ]);
    }
}
