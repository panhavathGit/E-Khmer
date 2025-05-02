<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    // public function share(Request $request): array
    // {
    //     return [
    //         ...parent::share($request),
    //         'auth' => [
    //             'user' => $request->user(),

    //             // 'can' => usePage (inside it have permission)
    //         ],
    //     ];
    // }



    // public function share(Request $request): array
    // {
    //     return array_merge(parent::share($request), [
    //         'auth' => [
    //             'user' => $request->user(),
    //             'can' => $request->user()?->loadMissing('roles.permissions')
    //                 ->roles->flatMap(function ($role) {
    //                     return $role->permissions;
    //                 })->mapWithKeys(function ($permission) {
    //                     return [$permission['name'] => auth()->user()->can($permission['name'])];
    //                 })->all(),
    //         ],
    //         'flash' => [
    //             'success' => fn () => $request->session()->get('success'),
    //         ],
    //     ]);
    // }

    public function share(Request $request): array
{
    $user = $request->user();

    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $user,
            'can' => $user
                ? $user->loadMissing('roles.permissions')
                    ->roles
                    ->flatMap(fn($role) => $role->permissions)
                    ->mapWithKeys(fn($permission) => [
                        $permission->name => $user->can($permission->name),
                    ])->all()
                : [],
        ],
        'flash' => [
            'success' => fn () => $request->session()->get('success'),
        ],
    ]);
}

}
