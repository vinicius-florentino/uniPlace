<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\InvalidSubscription;

class InvalidSubscriptionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('InvalidSubscription');
    }
}

