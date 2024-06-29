<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlansSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\Plan::create([
            'name' => 'Aluno',
            'description' => 'acesso gratuito à plataforma com perfil de fatecano, plano feito para os alunos e contribuintes da Fatec-GTA, para acesso a plataforma é necessário possuir um e-mail @fatec.sp.gov.br. O acesso a plataforma se torna permitido caso o aluno/contribuinte possua um e-mail ativo na instituição Fatec-GTA. ',
            'benefits' => ['10 anúncios'],
            'max_ads' => 10,
            'buy_link' => 'www.teste.com.br',
            'price' => 0,
            'duration' => null
        ]);

        \App\Models\Plan::create([
            'name' => 'Mensal',
            'description' => 'acesso a plataforma com perfil de vendedor, permite acesso a plataforma durante 1 mês (30 dias corridos), com limite de 15 anúncios por usuário.',
            'benefits' => ['15 anúncios', '4 UPs'],
            'max_ads' => 15,
            'buy_link' => 'www.teste.com.br',
            'price' => 39.90,
            'duration' => 30
        ]);

        \App\Models\Plan::create([
            'name' => 'Anual',
            'description' => 'acesso a plataforma com perfil de vendedor, permite acesso a plataforma durante 6 meses (180 dias corridos), com limite de 25 anúncios por usuário.',
            'benefits' => ['25 anúncios', '20 UPs'],
            'max_ads' => 25,
            'buy_link' => 'www.teste.com.br',
            'price' => 203.49,
            'duration' => 180
        ]);
    }
}
