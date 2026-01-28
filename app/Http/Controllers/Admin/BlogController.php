<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with(['category', 'user'])->latest()->get();
        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Blogs/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'video_url' => 'nullable|string|url',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
            $imagePath = '/storage/' . $imagePath;
        }

        Blog::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . Str::random(5),
            'content' => $validated['content'],
            'category_id' => $validated['category_id'],
            'image' => $imagePath,
            'video_url' => $validated['video_url'],
            'user_id' => \Illuminate\Support\Facades\Auth::id(),
        ]);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog created successfully.');
    }

    public function edit(Blog $blog)
    {
        $categories = Category::all();
        return Inertia::render('Admin/Blogs/Edit', [
            'blog' => $blog,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'video_url' => 'nullable|string|url',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($blog->image && str_starts_with($blog->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $blog->image));
            }
            $imagePath = $request->file('image')->store('blogs', 'public');
            $blog->image = '/storage/' . $imagePath;
            $blog->save();
        }

        $blog->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category_id' => $validated['category_id'],
            'video_url' => $validated['video_url'],
        ]);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog updated successfully.');
    }

    public function destroy(Blog $blog)
    {
        if ($blog->image && str_starts_with($blog->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $blog->image));
        }
        $blog->delete();

        return back()->with('success', 'Blog deleted successfully.');
    }
}
