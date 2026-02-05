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
        Schema::create('general_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('AL Mamon Skills Platform');
            $table->text('site_headline')->nullable();
            $table->text('site_about')->nullable();
            $table->json('site_keywords')->nullable();
            $table->string('location')->nullable();
            $table->string('monthly_visitors')->nullable();
            $table->string('successful_students')->nullable();
            $table->string('youtube_handle')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('banner_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('general_settings');
    }
};
