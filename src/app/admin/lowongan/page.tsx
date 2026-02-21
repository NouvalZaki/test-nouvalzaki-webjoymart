'use client';
import React, { useState, useEffect } from 'react';
import AdminProtected from '@/components/admin/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import { Briefcase, MapPin, Plus, Trash2, Power, PowerOff } from 'lucide-react';

export default function ManageLowongan() {
    const [lowongan, setLowongan] = useState<any[]>([]);
    const [form, setForm] = useState({ posisi: '', lokasi: '', deskripsi: '' });

    useEffect(() => {
        fetch('/api/lowongan')
            .then(res => res.json())
            .then(data => setLowongan(Array.isArray(data) ? data : []));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/lowongan', {
            method: 'POST',
            body: JSON.stringify(form),
        });
        if (res.ok) {
            alert("✅ Lowongan Berhasil Ditambahkan!");
            window.location.reload();
        }
    };

    const handleToggleStatus = async (id: number, currentStatus: number) => {
        const newStatus = currentStatus === 1 ? 0 : 1;
        const res = await fetch('/api/lowongan', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, is_active: newStatus }),
        });

        if (res.ok) {
            setLowongan(lowongan.map((item: any) => 
                item.id === id ? { ...item, is_active: newStatus } : item
            ));
        } else {
            alert("❌ Gagal memperbarui status.");
        }
    };

    const handleDelete = async (id: number, posisi: string) => {
        if (!confirm(`Hapus lowongan ${posisi}?`)) return;

        const res = await fetch(`/api/lowongan/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setLowongan(lowongan.filter((item) => item.id !== id));
        }
    };

    return (
        <AdminProtected allowedRoles={['admin', 'super_admin']}>
            <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300">
                <AdminHeader  />
                
                <div className="max-w-6xl mx-auto p-8">
                    <h1 className="text-3xl font-black mb-8 text-gray-800 dark:text-white uppercase tracking-tighter italic">
                        Manajemen <span className="text-orange-600">Lowongan</span> Kerja
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 h-fit">
                            <h2 className="font-black text-lg mb-6 flex items-center gap-2 text-gray-900 dark:text-white uppercase tracking-tight">
                                <Plus className="text-orange-600" /> Tambah Lowongan
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input 
                                    placeholder="Posisi (Contoh: Kasir)" required
                                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium"
                                    onChange={(e) => setForm({...form, posisi: e.target.value})}
                                />
                                <input 
                                    placeholder="Lokasi (Contoh: Samarinda)" required
                                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium"
                                    onChange={(e) => setForm({...form, lokasi: e.target.value})}
                                />
                                <textarea 
                                    placeholder="Deskripsi Pekerjaan" required
                                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white h-32 focus:ring-2 focus:ring-orange-600 outline-none transition-all font-medium"
                                    onChange={(e) => setForm({...form, deskripsi: e.target.value})}
                                ></textarea>
                                <button className="w-full bg-orange-600 text-white py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition shadow-lg shadow-orange-600/20 active:scale-95">
                                    Terbitkan Lowongan
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-2 space-y-4">
                            {lowongan.length === 0 ? (
                                <div className="text-center p-12 bg-gray-100 dark:bg-gray-900 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
                                    <p className="text-gray-400 font-bold italic">Belum ada lowongan aktif.</p>
                                </div>
                            ) : (
                                lowongan.map((item: any) => (
                                    <div 
                                        key={item.id} 
                                        className={`p-6 rounded-[2rem] shadow-md border flex justify-between items-center transition-all duration-300 ${
                                            item.is_active 
                                                ? 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 border-l-8 border-l-green-500' 
                                                : 'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-900 border-l-8 border-l-red-500 opacity-80'
                                        }`}
                                    >
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-tighter italic">
                                                <Briefcase size={20} className={item.is_active ? "text-orange-600" : "text-gray-500"}/> 
                                                {item.posisi}
                                                {!item.is_active && (
                                                    <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full font-black uppercase tracking-widest ml-2">
                                                        Ditutup
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                                                <MapPin size={14} className="text-orange-500"/> {item.lokasi}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={() => handleToggleStatus(item.id, item.is_active)}
                                                className={`p-3 rounded-2xl transition-all shadow-sm ${
                                                    item.is_active 
                                                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-600 hover:text-white' 
                                                        : 'bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-600 hover:text-white'
                                                }`}
                                                title={item.is_active ? "Tutup Lowongan" : "Buka Lowongan"}
                                            >
                                                {item.is_active ? <Power size={20} /> : <PowerOff size={20} />}
                                            </button>
                                            
                                            <button 
                                                onClick={() => handleDelete(item.id, item.posisi)}
                                                className="bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-3 rounded-2xl transition-all"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminProtected>
    );
}