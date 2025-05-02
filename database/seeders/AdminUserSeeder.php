<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if the admin role exists, if not create it
        $role = Role::firstOrCreate(['name' => 'admin']);

        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@ekhmer.com', // Choose your email
            'password' => Hash::make('password123'), // Set a password
        ]);

        $admin->assignRole($role);
    }
}
