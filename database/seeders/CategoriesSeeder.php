<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AdsCategorie;

class CategoriesSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $categories = [
            'Ensino',
            'Eletrônicos',
            'Roupas',
            'Comidas',
            'Bebidas',
            'Serviços',
            'Vagas',
            'Acessórios',
            'Automotivo'
        ];

        foreach ($categories as $category) {
            AdsCategorie::create(['name' => $category]);
        }
    }
}
