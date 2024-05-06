<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\User;
use App\Models\University;

class RegisteredUserController extends Controller
{
    public function index(): Response
    {
        $universities = University::all();

        return Inertia::render('Auth/Register', ['universities' => $universities]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults(), 'min:8'],
            'is_student' => 'required|boolean',
            'university_id' => 'required|int'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_student' => $request->is_student,
            'university_id' => $request->university_id,
        ]);

        event(new Registered($user));
        
        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
