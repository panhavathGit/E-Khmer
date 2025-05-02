<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Contracts\Permission as ContractsPermission;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function index()
    {
        $roles = Role::paginate(10);
        $permissions = Permission::all();

        // return Inertia::render('roles/index', [
        //     'roles' => $roles
        // ]);
        return Inertia::render('roles/Index',["roles" => $roles, 'permissions' => $permissions,]);
    }

    public function create()
    {
        $permissions = Permission::all();

        return Inertia::render('roles/create', [
            'permissions' => $permissions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
           'name' => 'required|min:3|unique:roles,name'
        ]);

        $role = Role::create($validated);

        if($request->permissions) {

            $permissions = Permission::whereIn("id", $request->permissions)->pluck('name');

            $role->syncPermissions($permissions);
        }

        return to_route('roles.index')->with("success", "Role added successfully");
    }

    public function edit($id)
    {
        $role = Role::with(['permissions'])->find($id);

        $permissions = Permission::all();

        return Inertia::render('roles/edit', [
            'role' => $role,
            'permissions' => $permissions
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|unique:roles,name,' . $id
        ]);

        $role = Role::findById($id);

        $role->name = $validated['name'];

        $role->save();

        $permissions = Permission::whereIn("id", $request->permissions)->pluck('name');

        $role->syncPermissions($permissions);

        return to_route('roles.index')->with("success", "Role updated successfully");
    }

    public function destroy($id)
    {
        $role = Role::findById($id);

        $role->delete();

        return to_route('roles.index')->with("success", "Role Deleted successfully");
    }
}