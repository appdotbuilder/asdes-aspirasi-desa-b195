import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { MapPin, FileText, Users, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { type SharedData } from '@/types';

interface Props {
    latestArticles: Array<{
        id: number;
        title: string;
        slug: string;
        excerpt: string;
        published_at: string;
        user: {
            name: string;
        };
    }>;
    recentReports?: Array<{
        id: number;
        title: string;
        status: string;
        category: string;
        created_at: string;
        user: {
            name: string;
        };
    }>;
    stats: {
        totalReports: number;
        completedReports: number;
        totalArticles: number;
    };
    [key: string]: unknown;
}

export default function Welcome({ latestArticles, recentReports, stats }: Props) {
    const { auth } = usePage<SharedData>().props;

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

    return (
        <>
            <Head title="Asdes - Aspirasi Desa">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700|nunito:400,600,700" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-teal-800 rounded-lg flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-slate-900 font-nunito">Asdes</h1>
                                    <p className="text-xs text-slate-600">Aspirasi Desa</p>
                                </div>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                <Link href="/articles" className="text-slate-700 hover:text-teal-800 px-3 py-2 rounded-md text-sm font-medium">
                                    Berita
                                </Link>
                                {auth.user ? (
                                    <>
                                        <Link 
                                            href="/dashboard" 
                                            className="bg-teal-800 hover:bg-teal-900 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center space-x-1"
                                        >
                                            <span>Dashboard</span>
                                        </Link>
                                        <Link 
                                            href="/reports/create" 
                                            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center space-x-1"
                                        >
                                            <span>📝 Buat Laporan</span>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link 
                                            href="/login" 
                                            className="text-slate-700 hover:text-teal-800 px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Masuk
                                        </Link>
                                        <Link 
                                            href="/register" 
                                            className="bg-teal-800 hover:bg-teal-900 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 font-nunito">
                                🏘️ Asdes
                                <span className="block text-teal-800">Aspirasi Desa</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-700 mb-12 max-w-4xl mx-auto leading-relaxed">
                                Platform pengaduan infrastruktur desa yang menghubungkan warga dengan pemerintah desa. 
                                Laporkan masalah, pantau perkembangan, dan wujudkan desa yang lebih baik bersama-sama.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <Link 
                                        href="/register" 
                                        className="bg-teal-800 hover:bg-teal-900 text-white px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        <span>🚀 Mulai Sekarang</span>
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                    <Link 
                                        href="/login" 
                                        className="border-2 border-teal-800 text-teal-800 hover:bg-teal-800 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
                                    >
                                        Sudah Punya Akun?
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-8 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl">
                                <div className="h-16 w-16 bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-teal-800 mb-2">{stats.totalReports}</h3>
                                <p className="text-slate-600 font-medium">Total Laporan</p>
                            </div>
                            
                            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                                <div className="h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-green-600 mb-2">{stats.completedReports}</h3>
                                <p className="text-slate-600 font-medium">Masalah Teratasi</p>
                            </div>
                            
                            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl">
                                <div className="h-16 w-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-amber-500 mb-2">{stats.totalArticles}</h3>
                                <p className="text-slate-600 font-medium">Artikel Berita</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-nunito">
                                ✨ Fitur Unggulan
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Platform lengkap untuk mengelola aspirasi dan meningkatkan kualitas hidup di desa
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200">
                                <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                                    <MapPin className="h-6 w-6 text-teal-800" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-nunito">🗺️ Peta Interaktif</h3>
                                <p className="text-slate-600 leading-relaxed">Laporan dengan lokasi presisi menggunakan GPS dan peta digital untuk memudahkan identifikasi masalah.</p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200">
                                <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                                    <AlertCircle className="h-6 w-6 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-nunito">📊 Tracking Status</h3>
                                <p className="text-slate-600 leading-relaxed">Pantau perkembangan laporan Anda secara real-time dari pengajuan hingga penyelesaian masalah.</p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200">
                                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                    <FileText className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-nunito">📰 Berita Desa</h3>
                                <p className="text-slate-600 leading-relaxed">Dapatkan informasi terkini tentang pembangunan desa dan program-program pemerintah desa.</p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200">
                                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-3 font-nunito">🤝 Kolaborasi</h3>
                                <p className="text-slate-600 leading-relaxed">Berpartisipasi dalam diskusi dan memberikan masukan untuk pembangunan desa yang lebih baik.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Articles Section */}
                {latestArticles.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-bold text-slate-900 font-nunito">📰 Berita Terbaru</h2>
                                <Link 
                                    href="/articles" 
                                    className="text-teal-800 hover:text-teal-900 font-medium inline-flex items-center space-x-1"
                                >
                                    <span>Lihat Semua</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {latestArticles.map((article) => (
                                    <article key={article.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-tight">
                                                <Link href={`/articles/${article.slug}`} className="hover:text-teal-800 transition-colors">
                                                    {article.title}
                                                </Link>
                                            </h3>
                                            <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>
                                            <div className="flex items-center justify-between text-sm text-slate-500">
                                                <span>By {article.user.name}</span>
                                                <span>{new Date(article.published_at).toLocaleDateString('id-ID')}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Recent Reports Section (for authenticated users) */}
                {recentReports && recentReports.length > 0 && (
                    <section className="py-20 bg-slate-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-bold text-slate-900 font-nunito">📋 Laporan Terbaru</h2>
                                <Link 
                                    href="/reports" 
                                    className="text-teal-800 hover:text-teal-900 font-medium inline-flex items-center space-x-1"
                                >
                                    <span>Lihat Semua</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            
                            <div className="space-y-4">
                                {recentReports.slice(0, 5).map((report) => (
                                    <div key={report.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                    <Link href={`/reports/${report.id}`} className="hover:text-teal-800 transition-colors">
                                                        {report.title}
                                                    </Link>
                                                </h3>
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
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                                                {getStatusDisplay(report.status)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-teal-800 to-teal-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-nunito">
                            🏡 Siap Membangun Desa Bersama?
                        </h2>
                        <p className="text-xl text-teal-100 mb-12 max-w-3xl mx-auto">
                            Bergabunglah dengan ribuan warga lainnya yang telah mempercayakan aspirasi mereka 
                            untuk membangun desa yang lebih baik dan sejahtera.
                        </p>
                        
                        {!auth.user ? (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link 
                                    href="/register" 
                                    className="bg-white hover:bg-gray-50 text-teal-800 px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center space-x-2 transition-all duration-200 shadow-lg"
                                >
                                    <span>📝 Daftar Sekarang</span>
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <Link 
                                    href="/articles" 
                                    className="border-2 border-white text-white hover:bg-white hover:text-teal-800 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
                                >
                                    Baca Berita Desa
                                </Link>
                            </div>
                        ) : (
                            <Link 
                                href="/reports/create" 
                                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl text-lg font-semibold inline-flex items-center space-x-2 transition-all duration-200 shadow-lg"
                            >
                                <span>📝 Buat Laporan Baru</span>
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="h-10 w-10 bg-teal-600 rounded-lg flex items-center justify-center">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold font-nunito">Asdes</h3>
                                        <p className="text-sm text-slate-400">Aspirasi Desa</p>
                                    </div>
                                </div>
                                <p className="text-slate-300 mb-6 max-w-md">
                                    Platform digital yang menghubungkan warga dengan pemerintah desa 
                                    untuk mewujudkan transparansi dan partisipasi dalam pembangunan.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li><Link href="/" className="hover:text-white">Beranda</Link></li>
                                    <li><Link href="/articles" className="hover:text-white">Berita</Link></li>
                                    {auth.user && (
                                        <>
                                            <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                                            <li><Link href="/reports" className="hover:text-white">Laporan</Link></li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                                <ul className="space-y-2 text-slate-300">
                                    <li>📧 admin@asdes.com</li>
                                    <li>📱 (021) 1234-5678</li>
                                    <li>📍 Kantor Desa Jakarta</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-slate-400 text-sm">
                                © 2024 Asdes. Semua hak dilindungi undang-undang.
                            </p>
                            <p className="text-slate-400 text-sm mt-4 md:mt-0">
                                Dibuat dengan ❤️ untuk desa yang lebih baik
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}