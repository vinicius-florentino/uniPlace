<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Models\User;
use Illuminate\Support\Facades\Redirect;

class SettingsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Settings/Settings', [

        ]);
    }
}
