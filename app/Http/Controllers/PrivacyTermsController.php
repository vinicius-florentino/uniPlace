<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class PrivacyTermsController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('PrivacyTerms', [
        ]);
    }

}
