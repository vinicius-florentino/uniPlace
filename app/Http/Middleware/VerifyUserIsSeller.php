<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class VerifyUserIsSeller
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;
        $authCheck = false;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $authCheck = true;
            }
        }

        if ($authCheck) {
            $user = $request->user();
            $seller = $user->seller;

            if (!$seller){
                abort(404);
            }
        }

        return $next($request);
    }
}
