<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'phone'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ads()
    {
        return $this->hasMany(Ad::class);
    }

    // protected static function boot()
    // {
    //     parent::boot();

    //     static::saving(function ($seller) {
    //         $seller->phone = str_replace(['+', ' '], '', $seller->phone);
    //     });
    // }
}
