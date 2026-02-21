'use client';
import React, { useState, useEffect } from 'react';
import { Send, Upload, FileText, Camera, ChevronDown, CheckCircle2, XCircle } from 'lucide-react';

export default function FormPelamar() {
  const [positions, setPositions] = useState<{ id: number; posisi: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [hasApplied, setHasApplied] = useState(false); // State untuk cek redundansi

  useEffect(() => {
    const applied = localStorage.getItem('joymart_job_applied');
    if (applied) {
      setHasApplied(true);
    }

    const fetchPositions = async () => {
      try {
        const res = await fetch('/api/lowongan?active=true');
        const data = await res.json();
        if (Array.isArray(data)) setPositions(data);
      } catch (error) {
        console.error("Gagal mengambil lowongan:", error);
      }
    };
    fetchPositions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('joymart_job_applied', 'true');
        setStatus({ type: 'success', msg: '✅ Berhasil! Lamaran Anda telah terkirim.' });
        
        setTimeout(() => setHasApplied(true), 1500);
        
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({ type: 'error', msg: `❌ ${data.message}` });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: '❌ Terjadi kesalahan jaringan.' });
    } finally {
      setLoading(false);
    }
  };

  if (hasApplied) {
    return (
      <div className="bg-background/80 backdrop-blur-2xl p-12 rounded-[3rem] shadow-2xl border border-green-500/20 text-center max-w-2xl mx-auto mb-10 animate-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 shadow-inner">
            <CheckCircle2 size={48} />
          </div>
        </div>
        <h2 className="text-3xl font-black mb-4 text-foreground italic uppercase tracking-tighter">
          Lamaran <span className="text-green-500">Terkirim!</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-bold leading-relaxed uppercase tracking-widest px-4">
          Kamu sudah berhasil mengirimkan lamaran ke Joymart. <br/> 
          Tim kami akan meninjau berkasmu. Mohon tunggu kabar selanjutnya!
        </p>
        <button 
          onClick={() => setHasApplied(false)}
          className="mt-8 text-[10px] font-black text-gray-400 hover:text-orange-500 transition-colors uppercase tracking-[0.3em] underline"
        >
          Isi Ulang Form? (Hanya jika ada kesalahan)
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-foreground/10 text-left max-w-2xl mx-auto mb-10 transition-all duration-300">
      <h2 className="text-2xl font-black mb-6 text-foreground flex items-center gap-2 italic uppercase tracking-tighter">
        <Send className="text-orange-500" size={24} /> Formulir Lamaran
      </h2>

      {status.msg && (
        <div className={`mb-6 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest animate-in fade-in zoom-in duration-300 ${
          status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* INPUT NAMA & EMAIL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            name="fullName" type="text" placeholder="Nama Lengkap" required 
            className="p-4 bg-foreground/5 border border-foreground/10 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all text-foreground placeholder:text-foreground/30 font-bold" 
          />
          <input 
            name="email" type="email" placeholder="Email Aktif" required 
            className="p-4 bg-foreground/5 border border-foreground/10 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all text-foreground placeholder:text-foreground/30 font-bold" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            name="phoneNumber" type="text" placeholder="No. WhatsApp" required 
            className="p-4 bg-foreground/5 border border-foreground/10 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all text-foreground placeholder:text-foreground/30 font-bold" 
          />
          
          <div className="relative font-bold">
            <select 
              name="position" required 
              className="w-full p-4 bg-foreground/5 border border-foreground/10 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all text-foreground appearance-none cursor-pointer"
            >
              <option value="" className="bg-background text-foreground">-- Pilih Posisi --</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.posisi} className="bg-background text-foreground uppercase tracking-tighter font-black italic">
                  {pos.posisi}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-orange-500">
               <ChevronDown size={18} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 flex items-center gap-2 px-1 italic">
              <Camera size={14} className="text-orange-500" /> Pas Foto (JPG/PNG)
            </label>
            <input 
              name="photo" type="file" accept="image/*" required 
              className="w-full text-[10px] font-bold text-foreground/40 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-orange-500/10 file:text-orange-500 file:font-black file:uppercase file:tracking-widest hover:file:bg-orange-500 hover:file:text-white transition-all cursor-pointer" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/50 flex items-center gap-2 px-1 italic">
              <FileText size={14} className="text-blue-500" /> CV (Wajib PDF)
            </label>
            <input 
              name="cv" type="file" accept="application/pdf" required 
              className="w-full text-[10px] font-bold text-foreground/40 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-500/10 file:text-blue-500 file:font-black file:uppercase file:tracking-widest hover:file:bg-blue-500 hover:file:text-white transition-all cursor-pointer" 
            />
          </div>
        </div>

        <button 
          disabled={loading || positions.length === 0} 
          className="w-full bg-orange-600 text-white py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20 disabled:bg-gray-500/20 disabled:text-gray-500 disabled:shadow-none mt-4 active:scale-95"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <><Upload size={18}/> Kirim Lamaran</>
          )}
        </button>
      </form>
    </div>
  );
}