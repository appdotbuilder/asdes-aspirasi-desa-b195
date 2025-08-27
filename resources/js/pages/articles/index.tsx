import React from 'react';
import { AsdesLayout } from '@/components/asdes-layout';
import { Link, usePage } from '@inertiajs/react';
import { Plus, Eye, Edit, Calendar, User, Search } from 'lucide-react';
import { type SharedData } from '@/types';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    status: string;
    published_at: string | null;
    created_at: string;
    user: {
        name: string;
    };
}

interface Props {
    articles: {
        data: Article[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function ArticlesIndex({ articles }: Props) {
    const { auth } = usePage<SharedData>().props;
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'text-green-600 bg-green-50 border-green-200';
            case 'draft': return 'text-amber-600 bg-amber-50 border-amber-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusDisplay = (status: string) => {
        return status === 'published' ? 'Dipublikasi' : 'Draft';
    };

    return (
        <AsdesLayout title="Berita Desa" showSidebar={!!auth.user}>
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 font-nunito">
                                📰 Berita Desa
                            </h1>
                            <p className="text-slate-600 mt-1">
                                Informasi terkini tentang pembangunan dan kegiatan desa
                            </p>
                        </div>
                        
                        {auth.user?.role === 'admin' && (
                            <Link 
                                href="/admin/articles/create"
                                className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Tulis Artikel Baru
                            </Link>
                        )}
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Cari artikel..."
                                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        {auth.user?.role === 'admin' && (
                            <div className="flex items-center space-x-4">
                                <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    <option value="">Semua Status</option>
                                    <option value="published">Dipublikasi</option>
                                    <option value="draft">Draft</option>
                                </select>
                                <button className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                                    Cari
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {articles.data.length > 0 ? (
                        articles.data.map((article) => (
                            <article key={article.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 group">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(article.status)}`}>
                                            {getStatusDisplay(article.status)}
                                        </span>
                                        
                                        {auth.user?.role === 'admin' && (
                                            <div className="flex items-center space-x-2">
                                                <Link 
                                                    href={`/admin/articles/${article.id}/edit`}
                                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Edit Artikel"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <Link 
                                                    href={`/articles/${article.slug}`}
                                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Lihat Artikel"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-tight line-clamp-2">
                                        <Link 
                                            href={`/articles/${article.slug}`} 
                                            className="hover:text-teal-600 transition-colors"
                                        >
                                            {article.title}
                                        </Link>
                                    </h3>
                                    
                                    <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">
                                        {article.excerpt || 'Tidak ada ringkasan artikel.'}
                                    </p>
                                    
                                    <div className="flex items-center justify-between text-sm text-slate-500">
                                        <div className="flex items-center space-x-2">
                                            <User className="h-4 w-4" />
                                            <span>{article.user.name}</span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                {article.published_at 
                                                    ? new Date(article.published_at).toLocaleDateString('id-ID')
                                                    : new Date(article.created_at).toLocaleDateString('id-ID')
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                        <Link 
                                            href={`/articles/${article.slug}`}
                                            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors"
                                        >
                                            Baca Selengkapnya
                                            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <div className="bg-white rounded-2xl p-12 text-center">
                                <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📰</span>
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">Belum Ada Artikel</h3>
                                <p className="text-slate-600 mb-6">
                                    {auth.user?.role === 'admin' 
                                        ? 'Mulai menulis artikel pertama untuk desa Anda'
                                        : 'Belum ada berita yang dipublikasi'
                                    }
                                </p>
                                {auth.user?.role === 'admin' && (
                                    <Link 
                                        href="/admin/articles/create"
                                        className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold transition-colors"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Tulis Artikel Pertama
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {articles.last_page > 1 && articles.data.length > 0 && (
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Menampilkan {((articles.current_page - 1) * articles.per_page) + 1} - {Math.min(articles.current_page * articles.per_page, articles.total)} dari {articles.total} artikel
                            </p>
                            
                            <div className="flex items-center space-x-2">
                                {articles.current_page > 1 && (
                                    <Link 
                                        href={`?page=${articles.current_page - 1}`}
                                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        Sebelumnya
                                    </Link>
                                )}
                                
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: Math.min(5, articles.last_page) }, (_, i) => {
                                        const pageNum = articles.current_page - 2 + i;
                                        if (pageNum < 1 || pageNum > articles.last_page) return null;
                                        
                                        return (
                                            <Link 
                                                key={pageNum}
                                                href={`?page=${pageNum}`}
                                                className={`px-3 py-2 rounded-lg transition-colors ${
                                                    pageNum === articles.current_page
                                                        ? 'bg-teal-600 text-white'
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                {pageNum}
                                            </Link>
                                        );
                                    })}
                                </div>
                                
                                {articles.current_page < articles.last_page && (
                                    <Link 
                                        href={`?page=${articles.current_page + 1}`}
                                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        Selanjutnya
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AsdesLayout>
    );
}