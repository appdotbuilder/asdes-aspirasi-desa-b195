<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isWarga();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:jalan,jembatan,drainase,listrik,air_bersih,sanitasi,fasilitas_umum,lainnya',
            'priority' => 'required|in:rendah,sedang,tinggi,darurat',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'location_name' => 'nullable|string|max:255',
        ];

        // Admin can also update status and response
        if (auth()->check() && auth()->user()->isAdmin()) {
            $rules['status'] = 'nullable|in:baru,ditinjau,dalam_proses,selesai,ditolak';
            $rules['admin_response'] = 'nullable|string';
        }

        return $rules;
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul laporan wajib diisi.',
            'description.required' => 'Deskripsi masalah wajib diisi.',
            'category.required' => 'Kategori masalah wajib dipilih.',
            'category.in' => 'Kategori yang dipilih tidak valid.',
            'priority.required' => 'Prioritas wajib dipilih.',
            'priority.in' => 'Prioritas yang dipilih tidak valid.',
            'latitude.numeric' => 'Koordinat latitude harus berupa angka.',
            'longitude.numeric' => 'Koordinat longitude harus berupa angka.',
        ];
    }
}