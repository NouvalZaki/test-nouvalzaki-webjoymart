'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const initialFormState = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  image: null as File | null,
};

export default function ProductForm() {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!form.image) {
      setMessage('⚠️ Harap pilih gambar produk.');
      setLoading(false);
      return;
    }

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', form.image);

      const uploadResponse = await fetch('/api/upload/product', { 
        method: 'POST',
        body: uploadFormData,
      });

      const uploadData = await uploadResponse.json();
      
      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || 'Gagal mengunggah gambar.');
      }

      const imageUrl = uploadData.imageUrl; 

      const productData = {
        name: form.name,
        description: form.description,
        price: form.price,
        stock: form.stock,
        category: form.category,
        imageUrl: imageUrl, 
      };

      const saveResponse = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json();
        throw new Error(errorData.message || 'Gagal menyimpan data produk.');
      }

      setMessage('✅ Produk baru berhasil ditambahkan!');
      setForm(initialFormState);
      router.push('/admin/toko/edit_mode/'); 
      
    } catch (error: any) {
      console.error(error);
      setMessage(`❌ Error: ${error.message || 'Terjadi kesalahan.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-2xl rounded-[2rem] p-8 space-y-6 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">Tambah <span className="text-orange-600">Produk</span> Baru</h2>
      
      {/* Pesan Status */}
      {message && (
        <div className={`p-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest border ${
          message.startsWith('✅') 
          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
          : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Nama Produk */}
      <div>
        <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 italic">Nama Produk</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Contoh: Indomie Goreng"
          value={form.name} 
          onChange={handleChange} 
          required 
          className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium" 
        />
      </div>

      {/* Kategori */}
      <div>
        <label htmlFor="category" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 italic">Kategori</label>
        <select 
          name="category" 
          id="category" 
          value={form.category} 
          onChange={handleChange} 
          required 
          className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium appearance-none"
        >
            <option value="">Pilih Kategori</option>
            <option value="Makanan Instan">Makanan Instan</option>
            <option value="Minuman">Minuman</option>
            <option value="Perawatan Diri">Perawatan Diri</option>
            <option value="Sembako">Sembako</option>
        </select>
      </div>
      
      {/* Harga dan Stok */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 italic">Harga (IDR)</label>
          <input 
            type="number" 
            name="price" 
            id="price" 
            value={form.price} 
            onChange={handleChange} 
            required 
            step="100" 
            placeholder="0"
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium" 
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 italic">Jumlah Stok</label>
          <input 
            type="number" 
            name="stock" 
            id="stock" 
            value={form.stock} 
            onChange={handleChange} 
            required 
            min="0" 
            placeholder="0"
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium" 
          />
        </div>
      </div>
      
      {/* Deskripsi Produk */}
      <div>
        <label htmlFor="description" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 italic">Deskripsi</label>
        <textarea 
          name="description" 
          id="description" 
          rows={3} 
          value={form.description} 
          onChange={handleChange} 
          placeholder="Tuliskan detail produk..."
          className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium" 
        />
      </div>

      {/* Input File Gambar */}
      <div>
        <label htmlFor="image" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 italic">Foto Produk</label>
        <input 
          type="file" 
          name="image" 
          id="image" 
          accept="image/*" 
          onChange={handleFileChange} 
          required={!form.image} 
          className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-orange-100 dark:file:bg-orange-900/30 file:text-orange-600 dark:file:text-orange-400 hover:file:bg-orange-200 transition-all cursor-pointer" 
        />
        {form.image && <p className="mt-2 text-[10px] font-bold text-orange-600 uppercase italic">File: {form.image.name}</p>}
      </div>

      {/* Tombol Submit */}
      <button 
        type="submit" 
        disabled={loading} 
        className="w-full px-4 py-4 bg-orange-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-orange-600/20 hover:bg-orange-700 transition duration-150 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:text-gray-500 active:scale-95"
      >
        {loading ? 'Sedang Memproses...' : 'Simpan Produk Ke Toko'}
      </button>
    </form>
  );
}