<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    use HasFactory;

    protected $fillable = ['seller_id', 'title', 'description', 'price', 'is_able'];

    protected $casts = [
        'is_able' => 'boolean',
    ];

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
