<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportStatusRequest;
use App\Models\Report;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            $reports = Report::with('user')
                ->latest()
                ->paginate(10);
        } else {
            $reports = $user->reports()
                ->latest()
                ->paginate(10);
        }
        
        return Inertia::render('reports/index', [
            'reports' => $reports
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('reports/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportRequest $request)
    {
        $report = Report::create([
            'user_id' => auth()->id(),
            ...$request->validated()
        ]);

        return redirect()->route('reports.show', $report)
            ->with('success', 'Laporan berhasil dikirim.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        // Check authorization
        if (auth()->user()->isWarga() && $report->user_id !== auth()->id()) {
            abort(403);
        }

        $report->load('user');
        
        return Inertia::render('reports/show', [
            'report' => $report
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        // Only allow warga to edit their own reports, and only if status is 'baru'
        if (auth()->user()->isWarga()) {
            if ($report->user_id !== auth()->id() || $report->status !== 'baru') {
                abort(403);
            }
        }
        
        return Inertia::render('reports/edit', [
            'report' => $report
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreReportRequest $request, Report $report)
    {
        // Check authorization for warga
        if (auth()->user()->isWarga()) {
            if ($report->user_id !== auth()->id() || $report->status !== 'baru') {
                abort(403);
            }
            // Warga can only update basic fields
            $report->update($request->validated());
        } else {
            // Admin can update status and add response
            $updateData = $request->validated();
            
            // Check if admin is updating status
            if ($request->has(['status', 'admin_response'])) {
                $updateData['status'] = $request->input('status', $report->status);
                $updateData['admin_response'] = $request->input('admin_response');
                $updateData['responded_at'] = now();
            }
            
            $report->update($updateData);
        }

        return redirect()->route('reports.show', $report)
            ->with('success', 'Laporan berhasil diperbarui.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        // Only admin or report owner (if status is 'baru') can delete
        if (auth()->user()->isWarga()) {
            if ($report->user_id !== auth()->id() || $report->status !== 'baru') {
                abort(403);
            }
        }
        
        $report->delete();

        return redirect()->route('reports.index')
            ->with('success', 'Laporan berhasil dihapus.');
    }
}