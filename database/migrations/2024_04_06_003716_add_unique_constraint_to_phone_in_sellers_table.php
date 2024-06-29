<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('sellers', function (Blueprint $table) {
            $table->string('phone')->unique()->change();
        });
    }
    
    public function down()
    {
        Schema::table('sellers', function (Blueprint $table) {
            $table->dropUnique(['phone']);
        });
    }
};
