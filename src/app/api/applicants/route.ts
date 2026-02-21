import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Paksa agar tidak di-cache, supaya data pelamar selalu update
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // 1. Ambil sesi user yang sedang login
    const session = await getServerSession(authOptions);

    // 2. PROTEKSI: Jika user belum login atau cuma karyawan, jangan kasih error HTML.
    // Kita kasih array kosong [] saja supaya Dashboard tidak crash.
    if (!session || (session.user as any).role === 'karyawan') {
      return NextResponse.json([]); 
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit');
    
    let query = 'SELECT * FROM pelamar ORDER BY dikirim DESC';
    let params: any[] = [];

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);

  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: 'Gagal mengambil data', error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'super_admin'].includes((session.user as any).role)) {
      return NextResponse.json({ message: 'Akses ditolak' }, { status: 403 });
    }

    const { id, status } = await req.json();
    
    if (!id || !status) {
      return NextResponse.json({ message: 'ID dan Status wajib diisi' }, { status: 400 });
    }

    const query = 'UPDATE pelamar SET status = ? WHERE id = ?';
    await pool.query(query, [status, id]);

    return NextResponse.json({ message: 'Status pelamar berhasil diperbarui!' });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal memperbarui status.' }, { status: 500 });
  }
}