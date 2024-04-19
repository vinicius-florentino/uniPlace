<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Models\User;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public function show($id): Response
    {
        $user = User::where('id', $id)->first();
        return Inertia::render('User', [
            'user' => $user
        ]);
    }
}
