<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\Salon;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        // نجيب أول salon باش مانكتبوش id ثابت
        $salon = Salon::first();

        if (!$salon) {
            return; // إلا ماكاينش salon مايدير والو
        }

        Service::create([
            'salon_id' => $salon->id,
            'name' => 'Hair Cut',
            'price' => 100,
            'duration' => 30
        ]);

        Service::create([
            'salon_id' => $salon->id,
            'name' => 'Makeup',
            'price' => 200,
            'duration' => 60
        ]);
    }
}