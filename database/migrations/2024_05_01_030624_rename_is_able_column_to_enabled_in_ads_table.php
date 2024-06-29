<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ads', function (Blueprint $table) {
            DB::statement("ALTER TABLE ads CHANGE COLUMN is_able enabled BOOLEAN NOT NULL DEFAULT true");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ads', function (Blueprint $table) {
            DB::statement("ALTER TABLE ads CHANGE COLUMN enabled is_able BOOLEAN NOT NULL DEFAULT true");
        });
    }
};
