<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->unique()->constrained('sellers')->cascadeOnDelete();
            $table->index("seller_id");
            $table->integer('available_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ups');
    }
};
