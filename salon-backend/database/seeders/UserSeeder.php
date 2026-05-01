<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => Hash::make('1234'),
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'Owner',
            'email' => 'owner@test.com',
            'password' => Hash::make('1234'),
            'role' => 'owner'
        ]);

        User::create([
            'name' => 'Client',
            'email' => 'client@test.com',
            'password' => Hash::make('1234'),
            'role' => 'client'
        ]);
    }
}