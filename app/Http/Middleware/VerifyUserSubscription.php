<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Subscription;

class VerifyUserSubscription
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
            $userId = $user->id;
            $userIsStudent = $user->is_student;

            $userSubscription = Subscription::where('user_id', $userId)->first();

            if (!$userIsStudent && (!$userSubscription || $userSubscription->expires_at <= now())) {
                return redirect('/invalid-subscription');
            }
        }

        return $next($request);
    }
}
