<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use App\Models\Article;
use App\Models\Report;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    $latestArticles = Article::published()
        ->with('user')
        ->latest('published_at')
        ->take(3)
        ->get();
        
    $recentReports = auth()->check() ? 
        Report::with('user')
            ->latest()
            ->take(5)
            ->get() : null;
    
    return Inertia::render('welcome', [
        'latestArticles' => $latestArticles,
        'recentReports' => $recentReports,
        'stats' => [
            'totalReports' => Report::count(),
            'completedReports' => Report::where('status', 'selesai')->count(),
            'totalArticles' => Article::published()->count(),
        ]
    ]);
})->name('home');

// Public routes
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/{article:slug}', [ArticleController::class, 'show'])->name('articles.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Report routes
    Route::resource('reports', ReportController::class);
    
    // Article management (Admin only)
    Route::get('/admin/articles/create', [ArticleController::class, 'create'])->name('articles.create');
    Route::post('/admin/articles', [ArticleController::class, 'store'])->name('articles.store');
    Route::get('/admin/articles/{article}/edit', [ArticleController::class, 'edit'])->name('articles.edit');
    Route::put('/admin/articles/{article}', [ArticleController::class, 'update'])->name('articles.update');
    Route::delete('/admin/articles/{article}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    
    // Comment routes
    Route::post('/articles/{article}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
