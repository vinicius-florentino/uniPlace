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
        Schema::table('conversations_events', function (Blueprint $table) {
            $table->dropForeign(['recipient_id']);
            $table->dropColumn('recipient_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('conversations_events', function (Blueprint $table) {
            $table->foreignId('recipient_id')->constrained('users')->cascadeOnDelete();
            $table->index('recipient');
        });
    }
};
