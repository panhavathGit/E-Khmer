<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Http\RedirectResponse;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        // $users = User::paginate(10);
        // return Inertia::render('Users/Index', [
        //     'users' => $users
        // ]);
        $users = User::with('roles')->paginate(10);
        $roles = Role::pluck('name', 'name')->all();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function create(): Response
    {
        $roles = Role::pluck('name')->toArray();

        return Inertia::render('Users/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $user->assignRole($request->input('roles'));

        return redirect()->route('users.index')
                         ->with('success', 'User created successfully');
    }

    public function show($id): Response
    {
        $user = User::findOrFail($id);
        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }

    public function edit($id): Response
    {
        $user = User::findOrFail($id);
        $roles = Role::pluck('name')->toArray();
        $userRole = $user->roles->pluck('name')->toArray();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'userRole' => $userRole
        ]);
    }

    public function update(Request $request, User $user)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'roles' => 'required|array|min:1',
        'roles.0' => 'required|string|exists:roles,name',
    ]);

    $user->update($request->only('name', 'email'));

    // Spatie role assignment
    $user->syncRoles($request->roles);

    return redirect()->back()->with('success', 'User updated.');
}

    // public function update(Request $request, $id): RedirectResponse
    // {
    //     $input = $request->all();
    //     if (!empty($input['password'])) {
    //         $input['password'] = Hash::make($input['password']);
    //     } else {
    //         $input = Arr::except($input, ['password']);
    //     }

    //     $user = User::findOrFail($id);
    //     $user->update($input);
    //     DB::table('model_has_roles')->where('model_id', $id)->delete();
    //     $user->assignRole($request->input('roles'));

    //     return redirect()->route('users.index')
    //                      ->with('success', 'User updated successfully');
    // }

    public function destroy($id): RedirectResponse
    {
        User::findOrFail($id)->delete();
        return redirect()->route('users.index')
                         ->with('success', 'User deleted successfully');
    }
}
