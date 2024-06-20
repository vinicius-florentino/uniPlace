<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpsUsage extends Model
{
    use HasFactory;

    protected $fillable = ['up_id', 'ad_id', 'expires_at'];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function up()
    {
        return $this->belongsTo(Up::class);
    }

    public function ad()
    {
        return $this->belongsTo(Ad::class);
    }
}
