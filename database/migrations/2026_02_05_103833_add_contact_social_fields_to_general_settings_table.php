<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('general_settings', function (Blueprint $table) {
            $table->string('support_email')->nullable()->after('location');
            $table->string('contact_phone')->nullable()->after('support_email');
            $table->string('facebook_url')->nullable()->after('youtube_url');
            $table->string('twitter_url')->nullable()->after('facebook_url'); // Using twitter instead of x for generic naming
            $table->string('instagram_url')->nullable()->after('twitter_url');
            $table->string('linkedin_url')->nullable()->after('instagram_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('general_settings', function (Blueprint $table) {
            $table->dropColumn([
                'support_email',
                'contact_phone',
                'facebook_url',
                'twitter_url',
                'instagram_url',
                'linkedin_url',
            ]);
        });
    }
};
