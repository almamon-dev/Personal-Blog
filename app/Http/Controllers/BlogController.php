<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $categoryName = $request->query('category');
        $sort = $request->query('sort', 'recent');
        
        $query = Blog::with(['category', 'user']);
        
        if ($categoryName) {
            $category = Category::where('name', $categoryName)->first();
            if ($category) {
                // Also include subcategories of this category if it's a parent
                $categoryIds = $category->children()->pluck('id')->push($category->id);
                $query->whereIn('category_id', $categoryIds);
            }
        }

        if ($sort === 'top') {
            $query->orderBy('id', 'desc');
        } else {
            $query->latest();
        }
        
        $blogs = $query->get();

        // Fetch "Other Tutorials" for the sidebar
        $otherTutorials = Blog::with('category')
            ->when($categoryName, function($q) use ($categoryName) {
                $q->whereHas('category', function($subQ) use ($categoryName) {
                    $subQ->where('name', '!=', $categoryName);
                });
            })
            ->latest()
            ->limit(3)
            ->get();
        
        return Inertia::render('Blogs/Index', [
            'blogs' => $blogs,
            'currentCategory' => $categoryName,
            'otherTutorials' => $otherTutorials,
            'currentSort' => $sort,
        ]);
    }

    public function show(Blog $blog)
    {
        $blog->load(['category', 'user', 'comments.user']);

        $relatedBlogs = Blog::with('category')->where('category_id', $blog->category_id)
            ->where('id', '!=', $blog->id)
            ->latest()
            ->limit(3)
            ->get();

        return Inertia::render('Blogs/Show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs
        ]);
    }
}
