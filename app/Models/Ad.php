<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Ad extends Model
{
    use HasFactory;

    protected $appends = ['image_url'];
    protected $fillable = ['seller_id', 'title', 'description', 'price', 'enabled', 'image_path', 'category_id'];

    protected $casts = [
        'enabled' => 'boolean',
        'price' => 'double',
        'category_id' => 'int'
    ];

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    public function category()
    {
        return $this->belongsTo(AdsCategorie::class);
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
        static::addGlobalScope('enabled', function ($query) {
            $query->where('enabled', true);
        });

        static::deleting(function ($ad) {
            if ($ad->image_path) {
                Storage::disk('public')->delete($ad->image_path);
            }
        });
        static::saving(function ($ad) {
            if ($ad->image_path !== $ad->getOriginal('image_path') && $ad->getOriginal('image_path') !== null) {
                Storage::disk('public')->delete($ad->getOriginal('image_path'));
            }
        });
    }
}
