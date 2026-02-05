<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneralSetting extends Model
{
    protected $fillable = [
        'site_name',
        'site_headline',
        'site_about',
        'site_keywords',
        'location',
        'support_email',
        'contact_phone',
        'monthly_visitors',
        'successful_students',
        'facebook_url',
        'twitter_url',
        'instagram_url',
        'linkedin_url',
        'github_url',
        'fiverr_url',
        'portfolio_url',
        'youtube_handle',
        'youtube_url',
        'profile_image',
        'banner_image',
    ];

    protected $casts = [
        'site_keywords' => 'array',
    ];
}
