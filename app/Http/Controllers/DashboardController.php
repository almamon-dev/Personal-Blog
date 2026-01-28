<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'total_blogs' => Blog::count(),
                'total_categories' => Category::count(),
                'total_users' => User::count(),
                'latest_blogs' => Blog::with('category')->latest()->limit(5)->get(),
            ]
        ]);
    }
}
