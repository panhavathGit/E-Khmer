<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $permission
     * @return mixed
     */
    // public function handle(Request $request, Closure $next, $permission)
    // {
    //     $user = $request->user();
    //     // Check if the user is authenticated and has the required permission
    //     if (!$user::check() || !$user::user()->hasPermissionTo($permission)) {
    //         // Optionally, you can redirect the user or return a 403 response
    //         return response()->json(['message' => 'Forbidden'], 403);
    //     }

    //     return $next($request);
    // }
    public function handle(Request $request, Closure $next, $permission)
    {
        $user = $request->user();

        if (!$user || !$user->hasPermissionTo($permission)) {
            return response()->json(['message' => 'Forbidden!'], 403);
        }

        return $next($request);
    }
}

