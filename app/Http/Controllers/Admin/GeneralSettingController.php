<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GeneralSetting;
use Illuminate\Http\Request;

class GeneralSettingController extends Controller
{
    public function edit()
    {
        $settings = GeneralSetting::first();

        return \Inertia\Inertia::render('Admin/Settings/General', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_headline' => 'nullable|string',
            'site_about' => 'nullable|string',
            'site_keywords' => 'nullable|array',
            'location' => 'nullable|string',
            'instagram_url' => 'nullable|url',
            'linkedin_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'fiverr_url' => 'nullable|url',
            'portfolio_url' => 'nullable|url',
            'youtube_handle' => 'nullable|string',
            'youtube_url' => 'nullable|string',
            'profile_image' => 'nullable',
            'banner_image' => 'nullable',
        ]);

        $settings = GeneralSetting::first();
        if (! $settings) {
            $settings = new GeneralSetting;
        }

        $data = $validated;

        if ($request->hasFile('profile_image')) {
            $path = $request->file('profile_image')->store('settings', 'public');
            $data['profile_image'] = '/storage/'.$path;
        }

        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('settings', 'public');
            $data['banner_image'] = '/storage/'.$path;
        }

        $settings->fill($data);
        $settings->save();

        return back()->with('success', 'Settings updated successfully.');
    }
}
