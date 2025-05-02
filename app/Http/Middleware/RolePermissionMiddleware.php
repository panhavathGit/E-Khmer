<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @param  string  $permission
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role, $permission)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Check if the user has the role
        if (!$user->hasRole($role)) {
            // If the user doesn't have the role, abort with a 403
            abort(403, 'Unauthorized: Insufficient role');
        }

        // Check if the user has the permission
        if (!$user->can($permission)) {
            // If the user doesn't have the permission, abort with a 403
            abort(403, 'Unauthorized: Insufficient permission');
        }

        // Proceed with the request if the user has the required role and permission
        return $next($request);
    }
}
