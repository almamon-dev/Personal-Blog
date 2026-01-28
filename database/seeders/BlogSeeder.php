<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'Getting Started with Laravel 12: What\'s New?',
                'category' => 'Laravel 12',
                'content' => 'Laravel 12 continues the trend of making developer lives easier. In this guide, we explore the new features...',
                'image' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
            ],
            [
                'title' => 'Mastering Laravel 12 Eloquent Relationships',
                'category' => 'Laravel 12',
                'content' => 'Deep dive into Eloquent relationships in the latest version of Laravel. Learn about hasOne, hasMany, and more...',
                'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=1200&auto=format&fit=crop&q=80',
            ],
            [
                'title' => 'Laravel 11 Features You Should Be Using',
                'category' => 'Laravel 11',
                'content' => 'Laravel 11 introduced many improvements. Are you taking full advantage of the streamlined configuration?',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
            ],
            [
                'title' => 'Building Fast APIs with Laravel 12',
                'category' => 'Laravel 12',
                'content' => 'API development is core to modern web apps. See how Laravel 12 simplifies the process of building high-performance APIs.',
                'image' => 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=1200&auto=format&fit=crop&q=80',
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::create([
                'title' => $blog['title'],
                'slug' => Str::slug($blog['title']),
                'category' => $blog['category'],
                'content' => $blog['content'],
                'image' => $blog['image'],
            ]);
        }
    }
}
