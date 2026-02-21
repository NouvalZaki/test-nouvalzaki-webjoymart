'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// Import Link dari Next.js untuk navigasi
import Link from 'next/link'; 
// Import icon yang benar (Link dari lucide diganti ArrowRight agar tidak bentrok nama)
import { Users, Briefcase, UserCheck, Clock, TrendingUp, ArrowRight } from 'lucide-react';

export default function HRDDashboardContent() {
    const [stats, setStats] = useState({ total: 0, interview: 0, pending: 0, loker: 0 });
    
    const chartData = [
        { name: 'Pending', value: stats.pending, color: '#EAB308' },
        { name: 'Interview', value: stats.interview, color: '#F97316' },
        { name: 'Total', value: stats.total, color: '#3B82F6' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resApp = await fetch('/api/applicants');
                const resLoker = await fetch('/api/lowongan');

                if (!resApp.ok || !resLoker.ok) return;

                const apps = await resApp.json();
                const lokers = await resLoker.json();

                setStats({
                    total: apps.length || 0,
                    interview: apps.filter((a: any) => a.status === 'interview').length,
                    pending: apps.filter((a: any) => a.status === 'pending').length,
                    loker: lokers.length || 0
                });
            } catch (error) {
                console.error("Gagal Fetch:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Pelamar', val: stats.total, Icon: Users, color: 'bg-blue-500' },
                    { label: 'Tahap Interview', val: stats.interview, Icon: UserCheck, color: 'bg-orange-500' },
                    { label: 'Pending', val: stats.pending, Icon: Clock, color: 'bg-yellow-500' },
                    { label: 'Loker Aktif', val: stats.loker, Icon: Briefcase, color: 'bg-green-500' },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5">
                        <div className={`${item.color} p-4 rounded-2xl text-white shadow-lg`}><item.Icon size={24} /></div>
                        <div>
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                            <p className="text-2xl font-black text-gray-800">{item.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bagian Grafik & Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-black text-gray-800 uppercase tracking-tighter text-lg">Statistik Pelamar</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Perbandingan Status Lamaran</p>
                        </div>
                        <TrendingUp className="text-orange-500" size={24} />
                    </div>
                    
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                <YAxis hide />
                                <Tooltip cursor={{fill: '#f8f8f8'}} contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                                <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={40}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Banner Aksi (Sekarang sudah nge-link ke Admin) */}
                <div className="bg-orange-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-orange-100 flex flex-col justify-between">
                    <div>
                        <h3 className="font-black uppercase tracking-tighter text-xl leading-tight">Siap Memperluas <br/> Tim Joymart?</h3>
                        <p className="text-orange-100 text-xs mt-4 leading-relaxed">Jangan biarkan pelamar menunggu terlalu lama. Cek para pelamar sekarang!</p>
                    </div>
                    
                    {/* Menggunakan Link Next.js untuk navigasi cepat */}
                    <Link href="/admin/applicants">
                        <button className="bg-white text-orange-600 w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-3">
                            Kelola Pelamar <ArrowRight size={16} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}