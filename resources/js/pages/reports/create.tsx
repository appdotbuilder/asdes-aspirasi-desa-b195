import React, { useState } from 'react';
import { AsdesLayout } from '@/components/asdes-layout';
import { useForm } from '@inertiajs/react';
import { MapPin, Save, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ReportFormData {
    title: string;
    description: string;
    category: string;
    priority: string;
    latitude: string;
    longitude: string;
    location_name: string;
    [key: string]: string;
}

export default function CreateReport() {
    const [gettingLocation, setGettingLocation] = useState(false);

    const { data, setData, post, processing, errors } = useForm<ReportFormData>({
        title: '',
        description: '',
        category: '',
        priority: 'sedang',
        latitude: '',
        longitude: '',
        location_name: '',
    });

    const categories = [
        { value: 'jalan', label: 'Jalan' },
        { value: 'jembatan', label: 'Jembatan' },
        { value: 'drainase', label: 'Drainase' },
        { value: 'listrik', label: 'Listrik' },
        { value: 'air_bersih', label: 'Air Bersih' },
        { value: 'sanitasi', label: 'Sanitasi' },
        { value: 'fasilitas_umum', label: 'Fasilitas Umum' },
        { value: 'lainnya', label: 'Lainnya' },
    ];

    const priorities = [
        { value: 'rendah', label: 'Rendah', color: 'text-green-700 bg-green-50' },
        { value: 'sedang', label: 'Sedang', color: 'text-amber-700 bg-amber-50' },
        { value: 'tinggi', label: 'Tinggi', color: 'text-orange-700 bg-orange-50' },
        { value: 'darurat', label: 'Darurat', color: 'text-red-700 bg-red-50' },
    ];

    const getCurrentLocation = () => {
        setGettingLocation(true);
        
        if (!navigator.geolocation) {
            alert('Geolocation tidak didukung oleh browser ini');
            setGettingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setData({
                    ...data,
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString(),
                });
                setGettingLocation(false);
            },
            (error) => {
                alert('Gagal mendapatkan lokasi: ' + error.message);
                setGettingLocation(false);
            }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reports');
    };

    return (
        <AsdesLayout title="Buat Laporan Baru">
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <Link 
                            href="/dashboard"
                            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 font-nunito">
                                📝 Buat Laporan Baru
                            </h1>
                            <p className="text-slate-600">
                                Laporkan masalah infrastruktur di desa Anda
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-semibold text-slate-900 mb-6">Informasi Laporan</h2>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="lg:col-span-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                                        Judul Laporan *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                            errors.title ? 'border-red-300' : 'border-slate-300'
                                        }`}
                                        placeholder="Contoh: Jalan Berlubang di Depan Sekolah"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                                        Kategori Masalah *
                                    </label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                            errors.category ? 'border-red-300' : 'border-slate-300'
                                        }`}
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                    )}
                                </div>

                                {/* Priority */}
                                <div>
                                    <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-2">
                                        Prioritas *
                                    </label>
                                    <select
                                        id="priority"
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                            errors.priority ? 'border-red-300' : 'border-slate-300'
                                        }`}
                                    >
                                        {priorities.map((priority) => (
                                            <option key={priority.value} value={priority.value}>
                                                {priority.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.priority && (
                                        <p className="mt-1 text-sm text-red-600">{errors.priority}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="lg:col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                                        Deskripsi Masalah *
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={5}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                                            errors.description ? 'border-red-300' : 'border-slate-300'
                                        }`}
                                        placeholder="Jelaskan masalah secara detail, kapan terjadi, seberapa parah, dan dampaknya..."
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h2 className="text-xl font-semibold text-slate-900 mb-6">Lokasi Masalah</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="location_name" className="block text-sm font-medium text-slate-700 mb-2">
                                        Nama/Alamat Lokasi
                                    </label>
                                    <input
                                        type="text"
                                        id="location_name"
                                        value={data.location_name}
                                        onChange={(e) => setData('location_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="Contoh: Jl. Merdeka No. 123, RT 01/RW 05"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="latitude" className="block text-sm font-medium text-slate-700 mb-2">
                                            Latitude
                                        </label>
                                        <input
                                            type="text"
                                            id="latitude"
                                            value={data.latitude}
                                            onChange={(e) => setData('latitude', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            placeholder="-6.200000"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="longitude" className="block text-sm font-medium text-slate-700 mb-2">
                                            Longitude
                                        </label>
                                        <input
                                            type="text"
                                            id="longitude"
                                            value={data.longitude}
                                            onChange={(e) => setData('longitude', e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            placeholder="106.800000"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={getCurrentLocation}
                                    disabled={gettingLocation}
                                    className="inline-flex items-center px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {gettingLocation ? 'Mendapatkan Lokasi...' : 'Gunakan Lokasi Saat Ini'}
                                </button>

                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        💡 <strong>Tips:</strong> Klik "Gunakan Lokasi Saat Ini" untuk mendapatkan koordinat GPS otomatis, 
                                        atau masukkan koordinat manual jika Anda tahu lokasi persis masalahnya.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                <div className="text-sm text-slate-600">
                                    <p>* Wajib diisi</p>
                                    <p>Pastikan informasi yang Anda berikan akurat dan lengkap</p>
                                </div>
                                
                                <div className="flex space-x-4">
                                    <Link 
                                        href="/dashboard"
                                        className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        {processing ? 'Menyimpan...' : 'Kirim Laporan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AsdesLayout>
    );
}