import React from 'react';
import { AsdesLayout } from '@/components/asdes-layout';
import { Link } from '@inertiajs/react';
import { FileText, Users, AlertCircle, Eye } from 'lucide-react';

interface Props {
    stats: {
        totalReports: number;
        totalWarga: number;
        totalArticles: number;
        pendingReports: number;
    };
    reportsByStatus: Record<string, number>;
    reportsByCategory: Record<string, number>;
    recentReports: Array<{
        id: number;
        title: string;
        status: string;
        category: string;
        created_at: string;
        user: {
            name: string;
        };
    }>;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, reportsByStatus, reportsByCategory, recentReports }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'selesai': return 'text-green-600 bg-green-50';
            case 'dalam_proses': return 'text-blue-600 bg-blue-50';
            case 'ditinjau': return 'text-amber-600 bg-amber-50';
            case 'baru': return 'text-orange-600 bg-orange-50';
            case 'ditolak': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getStatusDisplay = (status: string) => {
        const statuses = {
            'baru': 'Baru',
            'ditinjau': 'Ditinjau',
            'dalam_proses': 'Dalam Proses',
            'selesai': 'Selesai',
            'ditolak': 'Ditolak'
        };
        return statuses[status as keyof typeof statuses] || status;
    };

    const getCategoryDisplay = (category: string) => {
        const categories = {
            'jalan': 'Jalan',
            'jembatan': 'Jembatan',
            'drainase': 'Drainase',
            'listrik': 'Listrik',
            'air_bersih': 'Air Bersih',
            'sanitasi': 'Sanitasi',
            'fasilitas_umum': 'Fasilitas Umum',
            'lainnya': 'Lainnya'
        };
        return categories[category as keyof typeof categories] || category;
    };

    return (
        <AsdesLayout title="Dashboard Admin">
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 font-nunito mb-2">
                        👋 Dashboard Admin
                    </h1>
                    <p className="text-slate-600">
                        Pantau dan kelola laporan warga serta konten berita desa
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Total Laporan</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.totalReports}</p>
                            </div>
                            <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center">
                                <FileText className="h-6 w-6 text-teal-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Total Warga</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.totalWarga}</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Menunggu Review</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.pendingReports}</p>
                            </div>
                            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Total Artikel</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.totalArticles}</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <FileText className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Reports by Status */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">📊 Laporan Berdasarkan Status</h3>
                        <div className="space-y-3">
                            {Object.entries(reportsByStatus).map(([status, count]) => (
                                <div key={status} className="flex items-center justify-between py-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                                        {getStatusDisplay(status)}
                                    </span>
                                    <span className="text-2xl font-bold text-slate-900">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reports by Category */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">📋 Laporan Berdasarkan Kategori</h3>
                        <div className="space-y-3">
                            {Object.entries(reportsByCategory).map(([category, count]) => (
                                <div key={category} className="flex items-center justify-between py-2">
                                    <span className="text-slate-700 font-medium">{getCategoryDisplay(category)}</span>
                                    <span className="text-2xl font-bold text-slate-900">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">📋 Laporan Terbaru</h3>
                            <Link 
                                href="/reports" 
                                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                            >
                                Lihat Semua
                            </Link>
                        </div>
                    </div>
                    
                    <div className="divide-y divide-slate-200">
                        {recentReports.length > 0 ? (
                            recentReports.map((report) => (
                                <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-900 mb-2">
                                                <Link 
                                                    href={`/reports/${report.id}`}
                                                    className="hover:text-teal-600 transition-colors"
                                                >
                                                    {report.title}
                                                </Link>
                                            </h4>
                                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                                                <span className="inline-flex items-center space-x-1">
                                                    <span>📍</span>
                                                    <span>{getCategoryDisplay(report.category)}</span>
                                                </span>
                                                <span className="inline-flex items-center space-x-1">
                                                    <span>👤</span>
                                                    <span>{report.user.name}</span>
                                                </span>
                                                <span>{new Date(report.created_at).toLocaleDateString('id-ID')}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                                                {getStatusDisplay(report.status)}
                                            </span>
                                            <Link 
                                                href={`/reports/${report.id}`}
                                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                                                title="Lihat Detail"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                                <h4 className="text-lg font-medium text-slate-900 mb-2">Belum Ada Laporan</h4>
                                <p className="text-slate-600">Laporan dari warga akan muncul di sini</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Link 
                        href="/reports"
                        className="bg-teal-600 hover:bg-teal-700 text-white p-6 rounded-xl transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">📋 Kelola Laporan</h3>
                                <p className="text-teal-100 text-sm">Review dan respon laporan warga</p>
                            </div>
                            <FileText className="h-8 w-8 text-teal-200" />
                        </div>
                    </Link>

                    <Link 
                        href="/admin/articles/create"
                        className="bg-amber-500 hover:bg-amber-600 text-white p-6 rounded-xl transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">📰 Tulis Artikel</h3>
                                <p className="text-amber-100 text-sm">Buat berita dan pengumuman desa</p>
                            </div>
                            <FileText className="h-8 w-8 text-amber-200" />
                        </div>
                    </Link>

                    <Link 
                        href="/articles"
                        className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">📖 Lihat Artikel</h3>
                                <p className="text-green-100 text-sm">Kelola semua artikel yang dipublikasi</p>
                            </div>
                            <FileText className="h-8 w-8 text-green-200" />
                        </div>
                    </Link>
                </div>
            </div>
        </AsdesLayout>
    );
}