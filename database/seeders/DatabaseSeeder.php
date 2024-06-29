<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => 'password',
            'email_verified_at' => '2024-02-03 21:11:34'
        ]);

        \App\Models\User::create([
            'name' => 'admin dois',
            'email' => 'admin@admin2.com',
            'password' => 'password',
            'email_verified_at' => '2024-02-03 21:11:34'
        ]);

        \App\Models\University::create([
            'name' => 'Fatec Guaratinguetá - Prof. João Mod',
            'cnpj' => '62.823.257/0001-09',
        ]);


    }
}
