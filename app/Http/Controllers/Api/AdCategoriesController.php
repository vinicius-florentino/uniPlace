<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\AdsCategorie;

class AdCategoriesController extends Controller
{
    public function search(Request $request)
    {
        $search = $request->search;

        $categories = AdsCategorie::where('name', 'like', "%$search%")
            ->orderBy('name')
            ->get();


        return response()->json($categories);
    }
}
