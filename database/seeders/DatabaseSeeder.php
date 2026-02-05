<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        $user = User::factory()->create([
            'name' => 'AL Mamon',
            'email' => 'mamon193p@gmail.com',
            'password' => bcrypt('1410858998@aM'),
        ]);

        // Create Categories
        $categories = [
            'Laravel' => ['Laravel 11', 'Laravel 12', 'Architecture'],
            'React' => ['Next.js', 'State Management', 'UI/UX'],
            'PHP' => ['Design Patterns', 'Performance', 'Security'],
        ];

        foreach ($categories as $parentName => $subs) {
            $parent = Category::create([
                'name' => $parentName,
                'slug' => Str::slug($parentName),
            ]);

            foreach ($subs as $subName) {
                $sub = Category::create([
                    'name' => $subName,
                    'slug' => Str::slug($subName),
                    'parent_id' => $parent->id,
                ]);

                // Create a sample blog for each subcategory
                Blog::create([
                    'user_id' => $user->id,
                    'category_id' => $sub->id,
                    'title' => "Mastering $subName: A Professional Guide",
                    'slug' => Str::slug("Mastering $subName ".Str::random(5)),
                    'content' => "This is a comprehensive guide to $subName. In this tutorial, we will explore the professional best practices, advanced architectures, and real-world implementation strategies used by senior developers.\n\n$subName is a critical skill for any modern software engineer looking to build scalable and maintainable applications.",
                    'image' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
                    'created_at' => now()->subDays(rand(1, 30)),
                ]);
            }
        }
    }
}
