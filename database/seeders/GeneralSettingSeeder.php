<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class GeneralSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\GeneralSetting::updateOrCreate(
            ['id' => 1],
            [
                'site_name' => 'Savanihd Skills Platform',
                'site_headline' => 'Full Stack Developer & Technical Educator | Specialized in Laravel, PHP & Node.js',
                'site_about' => 'Welcome to my technical hub where I share deep dives into modern web technologies. Focus areas include PHP, Laravel, CodeIgniter, MySQL, Bootstrap, and more. I am committed to providing high-quality tutorials that help developers bridge the gap between theory and real-world production.',
                'site_keywords' => ['Web Development', 'PHP Ecosystem', 'API Integration', 'Full Stack', 'Technical Mentorship'],
                'location' => 'Dhanmondi, Dhaka, Bangladesh',
                'support_email' => 'support@cwskills.com',
                'contact_phone' => '+880 1931 084 242',
                'facebook_url' => 'https://facebook.com',
                'linkedin_url' => 'https://linkedin.com',
                'instagram_url' => 'https://instagram.com',
                'twitter_url' => 'https://twitter.com',
                'github_url' => 'https://github.com/savanihd',
                'fiverr_url' => 'https://www.fiverr.com/',
                'portfolio_url' => 'https://savanihd.com',
                'monthly_visitors' => '100,000+',
                'successful_students' => '5,000+',
                'youtube_handle' => '@savanihd',
                'youtube_url' => 'https://youtube.com/@savanihd',
                'profile_image' => 'https://avatars.githubusercontent.com/u/12028608?v=4',
                'banner_image' => null,
            ]
        );
    }
}
