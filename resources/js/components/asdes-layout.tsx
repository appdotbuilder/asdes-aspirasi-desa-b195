import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { MapPin, Settings, LogOut, Menu, X } from 'lucide-react';
import { type SharedData } from '@/types';
import { useState } from 'react';

interface Props {
    children: React.ReactNode;
    title?: string;
    showSidebar?: boolean;
}

export function AsdesLayout({ children, title, showSidebar = true }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {title && <Head title={title} />}
            
            <div className="min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                {showSidebar && (
                                    <button
                                        onClick={() => setSidebarOpen(!sidebarOpen)}
                                        className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                    >
                                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                    </button>
                                )}
                                
                                <Link href="/" className="flex items-center space-x-3">
                                    <div className="h-10 w-10 bg-teal-800 rounded-lg flex items-center justify-center">
                                        <MapPin className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-slate-900 font-nunito">Asdes</h1>
                                        <p className="text-xs text-slate-600">Aspirasi Desa</p>
                                    </div>
                                </Link>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                <Link href="/articles" className="text-slate-700 hover:text-teal-800 px-3 py-2 rounded-md text-sm font-medium">
                                    Berita
                                </Link>
                                
                                {auth.user ? (
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm text-slate-600">
                                            Halo, {auth.user.name}
                                            {auth.user.role === 'admin' && (
                                                <span className="ml-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">Admin</span>
                                            )}
                                        </span>
                                        
                                        <div className="flex items-center space-x-2">
                                            <Link 
                                                href="/settings/profile" 
                                                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md"
                                                title="Pengaturan"
                                            >
                                                <Settings className="h-5 w-5" />
                                            </Link>
                                            
                                            <Link 
                                                href="/logout" 
                                                method="post"
                                                as="button"
                                                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md"
                                                title="Keluar"
                                            >
                                                <LogOut className="h-5 w-5" />
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Link href="/login" className="text-slate-700 hover:text-teal-800 px-3 py-2 rounded-md text-sm font-medium">
                                            Masuk
                                        </Link>
                                        <Link href="/register" className="bg-teal-800 hover:bg-teal-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                <div className="flex">
                    {/* Sidebar */}
                    {showSidebar && auth.user && (
                        <>
                            {/* Mobile sidebar backdrop */}
                            {sidebarOpen && (
                                <div 
                                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                                    onClick={() => setSidebarOpen(false)}
                                />
                            )}
                            
                            {/* Sidebar */}
                            <aside className={`
                                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                                lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out
                                lg:block
                            `}>
                                <div className="h-full px-4 py-6 overflow-y-auto">
                                    <nav className="space-y-2">
                                        <Link 
                                            href="/dashboard"
                                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                                        >
                                            <span>📊</span>
                                            <span>Dashboard</span>
                                        </Link>
                                        
                                        <Link 
                                            href="/reports"
                                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                                        >
                                            <span>📋</span>
                                            <span>Laporan</span>
                                        </Link>
                                        
                                        {auth.user.role === 'warga' && (
                                            <Link 
                                                href="/reports/create"
                                                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                                            >
                                                <span>📝</span>
                                                <span>Buat Laporan</span>
                                            </Link>
                                        )}
                                        
                                        {auth.user.role === 'admin' && (
                                            <>
                                                <div className="pt-4 pb-2">
                                                    <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Admin</h3>
                                                </div>
                                                <Link 
                                                    href="/admin/articles/create"
                                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                                                >
                                                    <span>📰</span>
                                                    <span>Buat Artikel</span>
                                                </Link>
                                            </>
                                        )}
                                        
                                        <Link 
                                            href="/articles"
                                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                                        >
                                            <span>📰</span>
                                            <span>Berita Desa</span>
                                        </Link>
                                    </nav>
                                </div>
                            </aside>
                        </>
                    )}

                    {/* Main Content */}
                    <main className={`flex-1 ${showSidebar && auth.user ? 'lg:ml-0' : ''}`}>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}