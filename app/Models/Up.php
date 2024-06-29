<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Up extends Model
{
    use HasFactory;

    protected $fillable = ['seller_id', 'available_count'];

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    public function useUp(int $adId, int $ups)
    {
        if ($this->available_count > 0 && $this->available_count > $ups) {
            try {
                DB::beginTransaction();
            
                $this->decrement('available_count', $ups);
            
                $existingUpsUsage = UpsUsage::where([
                    'ad_id' => $adId,
                    'up_id' => $this->id,
                ])->first();
            
                $expiresAt = $existingUpsUsage ? $existingUpsUsage->expires_at->addDays(7 * $ups) : now()->addDays(7 * $ups);
            
                UpsUsage::updateOrCreate(
                    [
                        'ad_id' => $adId,
                        'up_id' => $this->id,
                    ],
                    [
                        'expires_at' => $expiresAt,
                    ]
                );
            
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

        }
        return false;
    }
}
