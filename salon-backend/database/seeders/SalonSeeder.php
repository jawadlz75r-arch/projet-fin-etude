<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Salon;

class SalonSeeder extends Seeder
{
    public function run(): void
    {
        Salon::create([
            'name' => 'Salon Fes Beauty',
            'description' => 'Best beauty salon in Fes',
            'address' => 'Fes Medina',
            'city' => 'Fes',
            'phone' => '0612345678',
            'image' => 'https://via.placeholder.com/300',
            'is_active' => true,
            'user_id' => 2
        ]);

        Salon::create([
            'name' => 'Rabat Barber',
            'description' => 'Top barber in Rabat',
            'address' => 'Rabat Center',
            'city' => 'Rabat',
            'phone' => '0623456789',
            'image' => 'https://via.placeholder.com/300',
            'is_active' => true,
            'user_id' => 2
        ]);
    }
}