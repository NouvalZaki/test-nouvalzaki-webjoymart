'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Promo {
    id: number;
    title: string;
    description: string | null;
    startDate: string;
    endDate: string;
    imageUrl: string | null;
    isActive: boolean; 
}

interface PromoEditFormProps {
    promoId: string;
}

export default function PromoEditForm({ promoId }: PromoEditFormProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [promo, setPromo] = useState<Promo | null>(null);
    const [loading, setLoading] = useState(true);
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [newImagePreviewUrl, setNewImagePreviewUrl] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function fetchPromo() {
            setLoading(true);
            try {
               const response = await fetch(`/api/promo/${promoId}`);
                if (response.status === 404) {
                    setPromo(null);
                    return;
                }
                if (!response.ok) throw new Error('Gagal mengambil data promo.');
                
                const data: Promo = await response.json();
                setPromo(data);
            } catch (error) {
                console.error(error);
                setMessage('❌ Gagal memuat data: Error koneksi.');
            } finally {
                setLoading(false);
            }
        }
        fetchPromo();
    }, [promoId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (promo) {
            const { name, value } = e.target;
            setPromo({ ...promo, [name]: value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files[0]){
            const file = e.target.files[0];
            setNewImageFile(file); 
            setNewImagePreviewUrl(URL.createObjectURL(file)); 
        } else {
            setNewImagePreviewUrl(null);
        }
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!promo) return;
        setLoading(true);
        setMessage('');
        let finalImageUrl = promo.imageUrl;
        
        try {
            if(newImageFile){
                setMessage('Mengunggah gambar baru...');
                const uploadFormData = new FormData();
                uploadFormData.append('image', newImageFile);
            
                const uploadResponse = await fetch('/api/upload/promo', {
                    method: 'POST',
                    body: uploadFormData,
                });
                const uploadData = await uploadResponse.json();

                if (!uploadResponse.ok) throw new Error(uploadData.message || 'gagal menggunggah gambar baru.');
                finalImageUrl = uploadData.imageUrl;
            }

            const response = await fetch(`/api/promo/${promoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: promo.title,
                    description: promo.description,
                    startDate: promo.startDate,
                    endDate: promo.endDate,
                    imageUrl: finalImageUrl,
                    isActive: true,
                }),
            }); 
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal memperbarui promo');
            }
            
            setMessage('✅ Promo berhasil diperbarui!');
            router.push('/admin/promo/edit_mode');
            router.refresh();
        } catch (error: any) {
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center p-6 text-gray-500">Memuat data promo...</div>;
    if (!promo) return <div className="text-center p-6 text-red-500">Promo tidak ditemukan.</div>;
    
    const formatDbDate = (dateString: string) => {
        return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 shadow-2xl rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">Edit <span className="text-red-600">Promo</span></h2>
            
            {message && (
                <div className={`p-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest border ${
                    message.startsWith('✅') 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                    : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
                }`}>
                    {message}
                </div>
            )}
            
            <div>
                <label htmlFor="title" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">Judul Promo</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={promo.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 outline-none transition-all font-medium"
                />
            </div>
            
            <div>
                <label htmlFor="description" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 ">Deskripsi (Item Promo)</label>
                <textarea
                    id="description"
                    name="description"
                    rows={6}
                    value={promo.description ?? ''}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 outline-none transition-all font-medium"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="startDate" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">Tanggal Mulai</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formatDbDate(promo.startDate)} 
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="endDate" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 ">Tanggal Berakhir</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formatDbDate(promo.endDate)}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 outline-none"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="image" className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 ">Ganti Gambar (Opsional)</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-red-100 dark:file:bg-red-900/30 file:text-red-600 dark:file:text-red-400 hover:file:bg-red-200"
                />

                {(promo.imageUrl || newImagePreviewUrl) && (
                    <div className="mt-6 flex flex-wrap gap-6 justify-start items-start"> 
                        {promo.imageUrl && ( 
                            <div className="flex flex-col">
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 ">Gambar Saat Ini:</p>
                                <div className="relative w-40 h-52 overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                    <Image src={promo.imageUrl} alt="Current" fill className="object-cover" sizes="160px" />
                                </div>
                            </div>
                        )}
                        
                        {newImagePreviewUrl && (
                            <div className="flex flex-col">
                                <p className="text-[9px] font-black uppercase tracking-widest text-green-600 mb-2 ">Pratinjau Baru:</p>
                                <div className="relative w-40 h-52 overflow-hidden rounded-2xl shadow-2xl border-2 border-green-500">
                                    <Image src={newImagePreviewUrl} alt="Preview" fill className="object-cover" sizes="160px" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-4 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-red-600/20 hover:bg-red-700 transition duration-150 disabled:bg-gray-300 dark:disabled:bg-gray-800 active:scale-95"
            >
                {loading ? 'Sedang Menyimpan...' : 'Simpan Perubahan Promo'}
            </button>
        </form>
    );
}