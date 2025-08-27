<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Report;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            $totalReports = Report::count();
            $totalWarga = User::where('role', 'warga')->count();
            $totalArticles = Article::count();
            $pendingReports = Report::where('status', 'baru')->count();
            
            // Reports by status
            $reportsByStatus = Report::select('status', DB::raw('count(*) as total'))
                ->groupBy('status')
                ->get()
                ->pluck('total', 'status')
                ->toArray();
                
            // Reports by category
            $reportsByCategory = Report::select('category', DB::raw('count(*) as total'))
                ->groupBy('category')
                ->get()
                ->pluck('total', 'category')
                ->toArray();
                
            // Recent reports
            $recentReports = Report::with('user')
                ->latest()
                ->take(5)
                ->get();
                
            return Inertia::render('dashboard/admin', [
                'stats' => [
                    'totalReports' => $totalReports,
                    'totalWarga' => $totalWarga,
                    'totalArticles' => $totalArticles,
                    'pendingReports' => $pendingReports,
                ],
                'reportsByStatus' => $reportsByStatus,
                'reportsByCategory' => $reportsByCategory,
                'recentReports' => $recentReports,
            ]);
        }
        
        // Warga dashboard
        $totalReports = $user->reports()->count();
        $completedReports = $user->reports()->where('status', 'selesai')->count();
        $pendingReports = $user->reports()->whereIn('status', ['baru', 'ditinjau', 'dalam_proses'])->count();
        
        // User reports by status
        $reportsByStatus = $user->reports()
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get()
            ->pluck('total', 'status')
            ->toArray();
            
        // Recent user reports
        $recentReports = $user->reports()
            ->latest()
            ->take(5)
            ->get();
            
        return Inertia::render('dashboard/warga', [
            'stats' => [
                'totalReports' => $totalReports,
                'completedReports' => $completedReports,
                'pendingReports' => $pendingReports,
            ],
            'reportsByStatus' => $reportsByStatus,
            'recentReports' => $recentReports,
        ]);
    }
}