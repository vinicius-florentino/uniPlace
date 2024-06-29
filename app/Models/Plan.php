<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'buy_link', 'price', 'duration', 'max_ads'];

    protected $casts = [
        'benefits' => 'json',
        'price' => 'double',
    ];
}
