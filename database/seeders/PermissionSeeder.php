<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define permissions
        $permissions = [
            'user-list',
            'user-update',
            'product-list',
            'product-create',
            'product-update',
            'product-delete',
            'role-list',
            'role-create',
            'permission-list',
            'order-delete',
            'see-product',
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create role and assign permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions($permissions); // assign all permissions to admin
    
    }
}
