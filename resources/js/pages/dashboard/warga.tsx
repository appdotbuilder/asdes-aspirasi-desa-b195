import React from 'react';
import { AsdesLayout } from '@/components/asdes-layout';
import { Link } from '@inertiajs/react';
import { FileText, Clock, CheckCircle, AlertCircle, Plus, Eye } from 'lucide-react';

interface Props {
    stats: {
        totalReports: number;
        completedReports: number;
        pendingReports: number;
    };
    reportsByStatus: Record<string, number>;
    recentReports: Array<{
        id: number;
        title: string;
        status: string;
        category: string;
        created_at: string;
    }>;
    [key: string]: unknown;
}

export default function WargaDashboard({ stats, reportsByStatus, recentReports }: Props) {
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
        <AsdesLayout title="Dashboard Warga">
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 font-nunito mb-2">
                        👋 Dashboard Warga
                    </h1>
                    <p className="text-slate-600">
                        Pantau laporan Anda dan baca berita terbaru dari desa
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                                <p className="text-sm text-slate-600 mb-1">Sedang Diproses</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.pendingReports}</p>
                            </div>
                            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600 mb-1">Selesai</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.completedReports}</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Reports by Status */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">📊 Status Laporan Anda</h3>
                        <div className="space-y-3">
                            {Object.entries(reportsByStatus).map(([status, count]) => (
                                <div key={status} className="flex items-center justify-between py-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                                        {getStatusDisplay(status)}
                                    </span>
                                    <span className="text-xl font-bold text-slate-900">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link 
                            href="/reports/create"
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">📝 Buat Laporan</h3>
                                    <p className="text-amber-100 text-sm">Laporkan masalah infrastruktur</p>
                                </div>
                                <Plus className="h-8 w-8 text-amber-200" />
                            </div>
                        </Link>

                        <Link 
                            href="/reports"
                            className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white p-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">📋 Lihat Laporan</h3>
                                    <p className="text-teal-100 text-sm">Cek status laporan Anda</p>
                                </div>
                                <FileText className="h-8 w-8 text-teal-200" />
                            </div>
                        </Link>

                        <Link 
                            href="/articles"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">📰 Berita Desa</h3>
                                    <p className="text-blue-100 text-sm">Baca info terbaru dari desa</p>
                                </div>
                                <FileText className="h-8 w-8 text-blue-200" />
                            </div>
                        </Link>

                        <Link 
                            href="/"
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">🗺️ Peta Desa</h3>
                                    <p className="text-green-100 text-sm">Lihat peta masalah desa</p>
                                </div>
                                <AlertCircle className="h-8 w-8 text-green-200" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">📋 Laporan Terbaru Anda</h3>
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
                                <p className="text-slate-600 mb-4">Anda belum membuat laporan apapun</p>
                                <Link 
                                    href="/reports/create"
                                    className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Buat Laporan Pertama
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">💡 Tips untuk Laporan yang Efektif</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                        <div className="flex items-start space-x-2">
                            <span className="text-teal-600">✓</span>
                            <span>Berikan deskripsi yang jelas dan detail tentang masalah</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="text-teal-600">✓</span>
                            <span>Sertakan lokasi yang akurat dengan GPS</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="text-teal-600">✓</span>
                            <span>Pilih kategori dan prioritas yang sesuai</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="text-teal-600">✓</span>
                            <span>Pantau status laporan Anda secara berkala</span>
                        </div>
                    </div>
                </div>
            </div>
        </AsdesLayout>
    );
}