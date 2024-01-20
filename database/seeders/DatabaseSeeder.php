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
            'password' => 'password'
        ]);

        \App\Models\University::create([
            'name' => 'Fatec Guaratinguetá - Prof. João Mod',
            'cnpj' => '62.823.257/0001-09',
        ]);

        \App\Models\Plan::create([
            'name' => 'Mensal',
            'description' => 'Lorem ipsum anet dolor',
            'benefits' => ['Benefício 1', 'Benefício 2', 'Benefício 3'],
            'buy_link' => 'www.teste.com.br',
            'price' => 0,
            'duration' => null
        ]);        

        \App\Models\Plan::create([
            'name' => 'Semestral',
            'description' => 'Lorem ipsum anet dolor',
            'benefits' => ['Benefício 1', 'Benefício 2', 'Benefício 3'],
            'buy_link' => 'www.teste.com.br',
            'price' => 0,
            'duration' => null
        ]);

        \App\Models\Plan::create([
            'name' => 'Anual',
            'description' => 'Lorem ipsum anet dolor',
            'benefits' => ['Benefício 1', 'Benefício 2', 'Benefício 3'],
            'buy_link' => 'www.teste.com.br',
            'price' => 0,
            'duration' => null
        ]);
    }
}
