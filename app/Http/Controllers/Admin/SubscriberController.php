<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Subscriber;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    public function index(Request $request)
    {
        $query = Subscriber::query();

        if ($request->filled('search')) {
            $query->where('email', 'like', '%'.$request->search.'%');
        }

        $subscribers = $query->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Admin/Subscribers/Index', [
            'subscribers' => $subscribers,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function destroy(Subscriber $subscriber)
    {
        $subscriber->delete();

        return back()->with('success', 'Subscriber deleted successfully.');
    }
}
