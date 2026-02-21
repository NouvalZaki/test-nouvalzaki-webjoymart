// components/admin/users/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import AdminProtected from '@/components/admin/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import { UserPlus, Key, Trash2, X, ShieldCheck } from 'lucide-react';

export default function UserManagementPage() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ username: '', password: '', role: 'karyawan' });
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{id: number, name: string} | null>(null);
    const [newPassword, setNewPassword] = useState('');

    const fetchUsers = () => {
        fetch('/api/users').then(res => res.json()).then(data => setUsers(data));
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(form),
        });
        if (res.ok) {
            alert("✅ User Berhasil Dibuat!");
            fetchUsers();
        }
    };

    const handleUpdateRole = async (userId: number, roleBaru: string) => {
        const confirmChange = confirm(`Ubah role user ini menjadi ${roleBaru}?`);
        if (!confirmChange) return;
        const res = await fetch(`/api/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newRole: roleBaru }),
        });
        if (res.ok) fetchUsers();
    };

    const handleUpdatePassword = async () => {
        if (!selectedUser || !newPassword) return;
        setLoading(true);
        const res = await fetch(`/api/users/${selectedUser.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword }),
        });
        if (res.ok) {
            alert(`✅ Password ${selectedUser.name} diperbarui!`);
            setIsModalOpen(false);
            setNewPassword('');
        }
        setLoading(false);
    };

    const confirmDeleteUser = async () => {
        if (!selectedUser) return;
        setLoading(true);
        const res = await fetch(`/api/users/${selectedUser.id}`, { method: 'DELETE' });
        if (res.ok) {
            setUsers(users.filter((u: any) => u.userId !== selectedUser.id));
            setIsDeleteModalOpen(false);
        }
        setLoading(false);
    };

    return (
        <AdminProtected allowedRoles={['super_admin']}>
            <AdminHeader />
            <div className="max-w-6xl mx-auto p-8 min-h-screen">
                <h1 className="text-3xl font-black mb-8 text-gray-800 dark:text-white italic uppercase tracking-tighter">
                    Manajemen Akun <span className="text-orange-600">Joymart</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 h-fit">
                        <div className="flex items-center gap-2 mb-6 text-orange-600">
                            <UserPlus size={20} />
                            <h2 className="font-bold text-lg dark:text-white">Tambah Staff</h2>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <input 
                                type="text" placeholder="Username" required
                                className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black dark:text-white placeholder-gray-400"
                                onChange={(e) => setForm({...form, username: e.target.value})}
                            />
                            <input 
                                type="password" placeholder="Password" required
                                className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black dark:text-white placeholder-gray-400"
                                onChange={(e) => setForm({...form, password: e.target.value})}
                            />
                            <select 
                                className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black dark:text-white cursor-pointer"
                                onChange={(e) => setForm({...form, role: e.target.value})}
                                value={form.role}
                            >
                                <option value="karyawan">Karyawan</option>
                                <option value="admin">Admin HRD</option>
                                <option value="super_admin">Super Admin</option>
                            </select>
                            <button className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-orange-700 transition shadow-lg shadow-orange-500/20">
                                Buat Akun
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 text-xs font-black uppercase tracking-widest">
                                    <tr>
                                        <th className="p-6">Staff</th>
                                        <th className="p-6">Akses Role</th>
                                        <th className="p-6 text-center">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: any) => (
                                        <tr key={user.userId} className="border-b border-gray-50 dark:border-gray-800 hover:bg-orange-50/30 dark:hover:bg-orange-500/5 transition-colors">
                                            <td className="p-6">
                                                <p className="font-bold text-gray-800 dark:text-white">{user.user_name}</p>
                                                <p className="text-[10px] text-gray-400 font-mono italic">ID: #{user.userId}</p>
                                            </td>
                                            <td className="p-6">
                                                <select 
                                                    value={user.role}
                                                    onChange={(e) => handleUpdateRole(user.userId, e.target.value)}
                                                    className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border-none cursor-pointer focus:ring-0 ${
                                                        user.role === 'super_admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                                                        user.role === 'admin' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 
                                                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                    }`}
                                                >
                                                    <option value="karyawan" className="dark:bg-gray-900 text-black dark:text-white">Karyawan</option>
                                                    <option value="admin" className="dark:bg-gray-900 text-black dark:text-white">Admin</option>
                                                    <option value="super_admin" className="dark:bg-gray-900 text-black dark:text-white">Super Admin</option>
                                                </select>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center gap-4">
                                                    <button 
                                                        onClick={() => { setSelectedUser({ id: user.userId, name: user.user_name }); setIsModalOpen(true); }}
                                                        className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all"
                                                    >
                                                        <Key size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => { setSelectedUser({ id: user.userId, name: user.user_name }); setIsDeleteModalOpen(true); }}
                                                        className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-600 hover:text-white dark:hover:bg-red-500 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-gray-800 dark:text-white uppercase tracking-tighter">Reset Password</h3>
                            <X className="cursor-pointer text-gray-400 hover:text-red-500" onClick={() => setIsModalOpen(false)} />
                        </div>
                        <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest italic">Target: {selectedUser?.name}</p>
                        <input 
                            type="password" placeholder="Password Baru"
                            className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-6 outline-none focus:ring-2 focus:ring-orange-600 text-black dark:text-white border-none"
                            value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={handleUpdatePassword} disabled={loading} className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-orange-700 shadow-lg shadow-orange-500/20 transition">
                            {loading ? 'MEMPROSES...' : 'SINKRONKAN PASSWORD'}
                        </button>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl border border-gray-100 dark:border-gray-800 border-b-8 border-red-600">
                        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Trash2 className="text-red-600" size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tighter mb-2">Hapus Akun?</h2>
                        <p className="text-gray-400 text-sm mb-8 font-medium italic">Data akun <span className="text-red-600 font-bold">{selectedUser?.name}</span> akan hilang permanen.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition">Batal</button>
                            <button onClick={confirmDeleteUser} disabled={loading} className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-500/20 hover:bg-red-700 transition">
                                {loading ? '...' : 'YA, HAPUS'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminProtected>
    );
}