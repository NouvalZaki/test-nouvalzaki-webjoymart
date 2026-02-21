'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const initialFormState = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  image: null as File | null,
};

export default function PromoForm() {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({
        ...form,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!form.image) {
      setMessage('⚠️ Harap pilih gambar untuk promo.');
      setLoading(false);
      return;
    }

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', form.image);

      const uploadResponse = await fetch('/api/upload/promo', {
        method: 'POST',
        body: uploadFormData,
      });

      const uploadData = await uploadResponse.json();
      
      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Gagal mengunggah gambar.');
      }

      const imageUrl = uploadData.imageUrl; 
      const promoData = {
        title: form.title,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        imageUrl: imageUrl, 
      };

      const saveResponse = await fetch('/api/promo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promoData),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(errorData.message || 'Gagal menyimpan data promo.');
      }

      setMessage('✅ Promo baru berhasil ditambahkan!');
      setForm(initialFormState); 
      router.refresh(); // Gunakan refresh agar data terbaru muncul
    } catch (error: any) {
      console.error(error);
      setMessage(`❌ Error: ${error.message || 'Terjadi kesalahan jaringan.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-xl rounded-[2rem] p-8 space-y-6 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      {message && (
        <div className={`p-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest ${
          message.startsWith('✅') 
          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
          : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {message}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">Judul Promo</label>
        <input
          type="text"
          name="title"
          id="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Contoh: Promo Gajian Joymart"
          className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 ">Item / Deskripsi</label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          required
          placeholder="Tulis detail promo di sini..."
          className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">Tanggal Mulai</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">Tanggal Berakhir</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 ">Upload Banner Promo</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          required={!form.image}
          className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-orange-100 dark:file:bg-orange-900/30 file:text-orange-600 dark:file:text-orange-400 hover:file:bg-orange-200"
        />
        {form.image && <p className="mt-2 text-[10px] font-bold text-orange-600 uppercase italic">File: {form.image.name}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-4 bg-orange-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition duration-150 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 active:scale-95"
      >
        {loading ? 'Sedang Memproses...' : 'Terbitkan Promo Baru'}
      </button>
    </form>
  );
}