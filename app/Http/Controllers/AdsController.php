<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

use App\Models\Ad;
use App\Models\AdsCategorie;
use Illuminate\Support\Facades\Redirect;

class AdsController extends Controller
{
    public function index(Request $request): Response
    {
        $request->validate([
            'search' => 'nullable|string|max:255',
            'filters' => 'nullable|array',
            'filters.ads_categories' => 'nullable|array',
            'filters.ads_categories.*' => 'int'
        ]);

        $search = $request->search;
        $filters = $request->filters ?? [];

        $ads = Ad::when($search, function ($query) use ($search) {
            return $query->where('title', 'like', '%' . $search . '%');
        })
        ->when(!empty($filters['ads_categories']), function ($query) use ($filters) {
            return $query->whereIn('category_id', $filters['ads_categories']);
        })
        ->with(['seller', 'upUsage' => function ($query) {
            $query->orderBy('expires_at', 'asc');
        }])
        ->leftJoin('ups_usages', 'ads.id', '=', 'ups_usages.ad_id')
        ->orderByRaw('ISNULL(ups_usages.id) ASC, ups_usages.expires_at ASC')
        ->select('ads.*')
        ->paginate();
    
        $adsCategories = AdsCategorie::all();

        return Inertia::render('Ads', [
            'ads' => $ads,
            'adsCategories' => $adsCategories
        ]);
    }
}
