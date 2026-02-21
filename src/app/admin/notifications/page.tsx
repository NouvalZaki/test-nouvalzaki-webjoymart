'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Clock,  Trash2, Loader2 } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Gagal mengambil log aktivitas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications', { method: 'PATCH' });
      fetchNotifications();
    } catch (error) {
      console.error("Gagal update status:");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 pt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black text-orange-600 mb-2 italic uppercase tracking-tighter">
            Pusat <span className="text-gray-900">Aktivitas</span> ⚡
          </h1>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
            Log sistem dan pemberitahuan real-time Joymart
          </p>
        </div>

        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95"
        >
          Tandai Semua Dibaca
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center opacity-50">
            <Loader2 className="animate-spin text-orange-600 mb-4" size={32} />
            <p className="text-xs font-bold uppercase tracking-widest">Menarik data dari sistem...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 text-center">
            <Bell className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-400 italic font-medium">Belum ada aktivitas yang tercatat hari ini.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`group relative p-6 rounded-[2rem] border transition-all duration-300 ${
                notif.is_read 
                ? 'bg-white border-gray-100 opacity-60' 
                : 'bg-white border-orange-100 shadow-xl shadow-orange-500/5 ring-1 ring-orange-500/10'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-2xl shrink-0 ${notif.is_read ? 'bg-gray-100 text-gray-400' : 'bg-orange-100 text-orange-600'}`}>
                    <Bell size={20} />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight italic">
                        {notif.title}
                      </h3>
                      {!notif.is_read && (
                        <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed mb-3">
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-orange-500" /> 
                        {new Date(notif.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-20 text-center">
        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.5em]">
          End of Activity Log — Joymart IT Support
        </p>
      </div>
    </div>
  );
}