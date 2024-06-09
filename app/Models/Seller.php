<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'phone', 'plan_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ads()
    {
        return $this->hasMany(Ad::class);
    }

    public function up()
    {
        return $this->hasOne(Up::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
