<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Blog $blog)
    {
        $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $blog->comments()->create([
            'body' => $request->body,
            'user_id' => Auth::id(),
        ]);

        return back()->with('success', 'Comment added successfully.');
    }
}
