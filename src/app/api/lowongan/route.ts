// src/app/api/lowongan/route.ts
import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('active');

    const query = activeOnly 
      ? 'SELECT * FROM lowongan WHERE is_active = 1 ORDER BY createdAt DESC'
      : 'SELECT * FROM lowongan ORDER BY createdAt DESC';

    const [rows] = await pool.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { posisi, lokasi, deskripsi } = await req.json();
    await pool.query(
      'INSERT INTO lowongan (posisi, lokasi, deskripsi, is_active) VALUES (?, ?, ?, 1)',
      [posisi, lokasi, deskripsi]
    );
    return NextResponse.json({ message: 'Lowongan berhasil diterbitkan!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal menyimpan data' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, is_active } = await req.json();
    await pool.query('UPDATE lowongan SET is_active = ? WHERE id = ?', [is_active, id]);
    return NextResponse.json({ message: 'Status diperbarui' });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal update status' }, { status: 500 });
  }
}