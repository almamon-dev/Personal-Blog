<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{blog}', [BlogController::class, 'show'])->name('blogs.show');

Route::get('/', function (Illuminate\Http\Request $request) {
    $categoryName = $request->query('category');

    $query = \App\Models\Blog::with(['category', 'user'])
        ->withCount('likes');

    if (auth()->check()) {
        $query->withExists(['likes as is_liked' => function ($q) {
            $q->where('user_id', auth()->id());
        }]);
    }

    if ($categoryName) {
        $category = \App\Models\Category::where('name', $categoryName)->first();
        if ($category) {
            $categoryIds = $category->children()->pluck('id')->push($category->id);
            $query->whereIn('category_id', $categoryIds);
        }
    }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'blogs' => $query->latest()->limit(6)->get(),
        'currentCategory' => $categoryName,
    ]);
})->name('welcome');

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/blogs/{blog}/comments', [\App\Http\Controllers\CommentController::class, 'store'])->name('blogs.comments.store');
    Route::post('/blogs/{blog}/like', [BlogController::class, 'toggleLike'])->name('blogs.like');

    // Admin Blogs & Categories
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('categories', AdminCategoryController::class);
        Route::get('sub-categories', [AdminCategoryController::class, 'index'])->name('sub-categories.index');
        Route::resource('blogs', \App\Http\Controllers\Admin\BlogController::class);
        Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->only(['index', 'destroy']);

        Route::get('settings', [\App\Http\Controllers\Admin\GeneralSettingController::class, 'edit'])->name('settings.edit');
        Route::post('settings', [\App\Http\Controllers\Admin\GeneralSettingController::class, 'update'])->name('settings.update');

        Route::resource('subscribers', \App\Http\Controllers\Admin\SubscriberController::class)->only(['index', 'destroy']);
    });

});

Route::prefix('setup')->group(function () {
    Route::get('/', [\App\Http\Controllers\SetupController::class, 'index'])->name('setup.index');
    Route::post('/run', [\App\Http\Controllers\SetupController::class, 'run'])->name('setup.run');
});

require __DIR__.'/auth.php';
