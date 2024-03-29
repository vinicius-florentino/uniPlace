<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Ad extends Model
{
    use HasFactory;

    protected $appends = ['image_url'];
    protected $fillable = ['seller_id', 'title', 'description', 'price', 'is_able', 'image_path'];

    protected $casts = [
        'is_able' => 'boolean',
        'price' => 'double'
    ];

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            return Storage::url($this->image_path);
        }

        return null;
    }

    protected static function booted()
    {
        static::deleting(function ($ad) {
            if ($ad->image_path) {
                Storage::disk('public')->delete($ad->image_path);
            }
        });
        static::saving(function ($ad) {
            if ($ad->isDirty('image_path') && $ad->getOriginal('image_path')) {
                Storage::disk('public')->delete($ad->getOriginal('image_path'));
            }
        });        
    }
}
