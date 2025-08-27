import React from 'react';
import { AsdesLayout } from '@/components/asdes-layout';
import { Link, usePage } from '@inertiajs/react';
import { Plus, Eye, Edit, Filter, Search } from 'lucide-react';
import { type SharedData } from '@/types';

interface Report {
    id: number;
    title: string;
    status: string;
    category: string;
    priority: string;
    created_at: string;
    user: {
        name: string;
    };
}

interface Props {
    reports: {
        data: Report[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function ReportsIndex({ reports }: Props) {
    const { auth } = usePage<SharedData>().props;
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'selesai': return 'text-green-600 bg-green-50 border-green-200';
            case 'dalam_proses': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'ditinjau': return 'text-amber-600 bg-amber-50 border-amber-200';
            case 'baru': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'ditolak': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'darurat': return 'text-red-700 bg-red-100';
            case 'tinggi': return 'text-orange-700 bg-orange-100';
            case 'sedang': return 'text-amber-700 bg-amber-100';
            case 'rendah': return 'text-green-700 bg-green-100';
            default: return 'text-gray-700 bg-gray-100';
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

    const getPriorityDisplay = (priority: string) => {
        const priorities = {
            'rendah': 'Rendah',
            'sedang': 'Sedang',
            'tinggi': 'Tinggi',
            'darurat': 'Darurat'
        };
        return priorities[priority as keyof typeof priorities] || priority;
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
        <AsdesLayout title="Daftar Laporan">
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 font-nunito">
                                📋 Daftar Laporan
                            </h1>
                            <p className="text-slate-600 mt-1">
                                {auth.user?.role === 'admin' 
                                    ? 'Kelola dan pantau semua laporan warga'
                                    : 'Pantau status laporan yang telah Anda ajukan'
                                }
                            </p>
                        </div>
                        
                        {auth.user?.role === 'warga' && (
                            <Link 
                                href="/reports/create"
                                className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Buat Laporan Baru
                            </Link>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Cari laporan..."
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <option value="">Semua Status</option>
                                <option value="baru">Baru</option>
                                <option value="ditinjau">Ditinjau</option>
                                <option value="dalam_proses">Dalam Proses</option>
                                <option value="selesai">Selesai</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <option value="">Semua Kategori</option>
                                <option value="jalan">Jalan</option>
                                <option value="jembatan">Jembatan</option>
                                <option value="drainase">Drainase</option>
                                <option value="listrik">Listrik</option>
                                <option value="air_bersih">Air Bersih</option>
                                <option value="sanitasi">Sanitasi</option>
                                <option value="fasilitas_umum">Fasilitas Umum</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                            <button className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reports List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    {reports.data.length > 0 ? (
                        <>
                            <div className="divide-y divide-slate-200">
                                {reports.data.map((report) => (
                                    <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                        <Link 
                                                            href={`/reports/${report.id}`}
                                                            className="hover:text-teal-600 transition-colors"
                                                        >
                                                            {report.title}
                                                        </Link>
                                                    </h3>
                                                    <div className="flex items-center space-x-2 ml-4">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(report.priority)}`}>
                                                            {getPriorityDisplay(report.priority)}
                                                        </span>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(report.status)}`}>
                                                            {getStatusDisplay(report.status)}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                                                    <span className="inline-flex items-center space-x-1">
                                                        <span>📍</span>
                                                        <span>{getCategoryDisplay(report.category)}</span>
                                                    </span>
                                                    
                                                    {auth.user?.role === 'admin' && (
                                                        <span className="inline-flex items-center space-x-1">
                                                            <span>👤</span>
                                                            <span>{report.user.name}</span>
                                                        </span>
                                                    )}
                                                    
                                                    <span className="inline-flex items-center space-x-1">
                                                        <span>📅</span>
                                                        <span>{new Date(report.created_at).toLocaleDateString('id-ID')}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2 ml-4">
                                                <Link 
                                                    href={`/reports/${report.id}`}
                                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                
                                                {((auth.user?.role === 'warga' && report.status === 'baru') || auth.user?.role === 'admin') && (
                                                    <Link 
                                                        href={`/reports/${report.id}/edit`}
                                                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Pagination */}
                            {reports.last_page > 1 && (
                                <div className="p-6 border-t border-slate-200">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-slate-600">
                                            Menampilkan {((reports.current_page - 1) * reports.per_page) + 1} - {Math.min(reports.current_page * reports.per_page, reports.total)} dari {reports.total} laporan
                                        </p>
                                        
                                        <div className="flex items-center space-x-2">
                                            {reports.current_page > 1 && (
                                                <Link 
                                                    href={`?page=${reports.current_page - 1}`}
                                                    className="px-3 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
                                                >
                                                    Sebelumnya
                                                </Link>
                                            )}
                                            
                                            <span className="px-3 py-2 bg-teal-600 text-white rounded-md">
                                                {reports.current_page}
                                            </span>
                                            
                                            {reports.current_page < reports.last_page && (
                                                <Link 
                                                    href={`?page=${reports.current_page + 1}`}
                                                    className="px-3 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
                                                >
                                                    Selanjutnya
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📋</span>
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-2">Belum Ada Laporan</h3>
                            <p className="text-slate-600 mb-6">
                                {auth.user?.role === 'admin' 
                                    ? 'Belum ada laporan dari warga'
                                    : 'Anda belum membuat laporan apapun'
                                }
                            </p>
                            {auth.user?.role === 'warga' && (
                                <Link 
                                    href="/reports/create"
                                    className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors"
                                >
                                    <Plus className="h-5 w-5 mr-2" />
                                    Buat Laporan Pertama
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AsdesLayout>
    );
}