'use client';
import React, { useState, useEffect } from 'react';
import AdminProtected from '@/components/admin/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import { FileText, Mail, Phone, Trash2, Clock, DownloadCloud, Loader2, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ApplicantsPage() {
    const [applicants, setApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState(''); // State Pencarian
    const [limit, setLimit] = useState(5); 

    useEffect(() => {
        fetch('/api/applicants')
            .then(res => res.json())
            .then(data => {
                setApplicants(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const updateStatus = async (id: number, newStatus: string) => {
        const res = await fetch('/api/applicants', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus }),
        });

        if (res.ok) {
            setApplicants(applicants.map(app => 
                app.id === id ? { ...app, status: newStatus } : app
            ));
        }
    };

    const handleDelete = async (id: number, name: string) => {
        if (!confirm(`Hapus data lamaran dari ${name}?`)) return;
        const res = await fetch(`/api/applicants/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setApplicants(applicants.filter(app => app.id !== id));
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'interview': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'accepted': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'rejected': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
            default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700';
        }
    };

    const exportToExcel = () => {
        if (filteredApplicants.length === 0) {
            alert("Tidak ada data untuk di-export!");
            return;
        }

        const dataToExport = filteredApplicants.map((app, index) => ({
            'No': index + 1,
            'Nama Lengkap': app.fullName,
            'Posisi': app.position,
            'Status': app.status.toUpperCase(),
            'Email': app.email,
            'WhatsApp': app.phoneNumber,
            'Tanggal Melamar': new Date(app.dikirim).toLocaleDateString('id-ID'),
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pelamar");
        XLSX.writeFile(workbook, `Rekap_Pelamar_Joymart.xlsx`);
    };

    const filteredApplicants = applicants.filter(app => {
        const matchesStatus = filterStatus === 'all' ? true : app.status === filterStatus;
        const matchesSearch = app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            app.position.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const displayedApplicants = filteredApplicants.slice(0, limit);

    return (
        <AdminProtected allowedRoles={['admin', 'super_admin']}>
            <AdminHeader />
            <div className="max-w-7xl mx-auto p-8 min-h-screen">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-800 dark:text-white uppercase italic tracking-tighter">
                            Manajemen <span className="text-orange-600">Pelamar</span>
                        </h1>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Review & Seleksi SDM Joymart</p>
                    </div>
                    <button 
                        onClick={exportToExcel}
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-500/20 active:scale-95"
                    >
                        <DownloadCloud size={16} /> Export Excel
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Cari nama atau posisi pelamar..."
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold text-xs transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setLimit(5); }}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
                        {['all', 'pending', 'interview', 'accepted', 'rejected'].map((s) => (
                            <button 
                                key={s}
                                onClick={() => { setFilterStatus(s); setLimit(5); }}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    filterStatus === s 
                                    ? 'bg-white dark:bg-orange-600 text-orange-600 dark:text-white shadow-md' 
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 border-b dark:border-gray-800 text-[10px] font-black uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="p-6">Data Pelamar</th>
                                    <th className="p-6">Posisi & Progress</th>
                                    <th className="p-6 text-center">Kontak</th>
                                    <th className="p-6 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="p-32 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Loader2 className="animate-spin text-orange-600" size={32} />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Menghubungkan Database...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : displayedApplicants.length > 0 ? (
                                    displayedApplicants.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50/50 dark:hover:bg-orange-500/5 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-orange-100 dark:border-gray-700 shadow-sm relative group">
                                                        <img 
                                                            src={app.photoUrl} 
                                                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                            onError={(e) => { (e.target as any).src = `https://ui-avatars.com/api/?name=${app.fullName}&background=random` }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 dark:text-white text-base leading-tight">{app.fullName}</p>
                                                        <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 font-bold">
                                                            <Clock size={10} /> {new Date(app.dikirim).toLocaleDateString('id-ID')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col gap-3">
                                                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-lg w-fit italic border border-orange-100 dark:border-orange-500/20">
                                                        {app.position}
                                                    </span>
                                                    <select 
                                                        value={app.status} 
                                                        onChange={(e) => updateStatus(app.id, e.target.value)}
                                                        className={`text-[9px] font-black px-3 py-2 rounded-xl border cursor-pointer outline-none transition-all shadow-sm ${getStatusStyle(app.status)}`}
                                                    >
                                                        <option value="pending">PENDING</option>
                                                        <option value="interview">INTERVIEW</option>
                                                        <option value="accepted">ACCEPTED</option>
                                                        <option value="rejected">REJECTED</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="p-6 text-center">
                                                <div className="flex justify-center gap-3">
                                                    <a href={`mailto:${app.email}`} title="Kirim Email" className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 hover:text-orange-600 transition border border-gray-100 dark:border-gray-700"><Mail size={16}/></a>
                                                    <a href={`https://wa.me/${app.phoneNumber}`} target="_blank" title="Chat WhatsApp" className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 hover:text-green-600 transition border border-gray-100 dark:border-gray-700"><Phone size={16}/></a>
                                                    <a href={app.cvUrl} target="_blank" title="Lihat Berkas" className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition border border-blue-100 dark:border-blue-900/30"><FileText size={16}/></a>
                                                </div>
                                            </td>
                                            <td className="p-6 text-center">
                                                <button 
                                                    onClick={() => handleDelete(app.id, app.fullName)}
                                                    className="p-3 text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-2xl transition"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-32 text-center text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] italic">
                                            Data Pelamar Tidak Ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredApplicants.length > limit && (
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <button 
                            onClick={() => setLimit(limit + 5)}
                            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 hover:bg-orange-600 hover:text-white hover:border-orange-600 shadow-xl transition-all active:scale-95"
                        >
                            Muat Lebih Banyak
                        </button>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                            Menampilkan {displayedApplicants.length} dari {filteredApplicants.length} Pelamar yang cocok
                        </p>
                    </div>
                )}
            </div>
        </AdminProtected>
    );
}