import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const query = 'DELETE FROM lowongan WHERE id = ?';
    await pool.query(query, [id]);

    return NextResponse.json({ message: 'Lowongan berhasil dihapus selamanya.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Gagal menghapus data.' }, { status: 500 });
  }
}