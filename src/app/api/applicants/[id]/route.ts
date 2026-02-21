import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'super_admin'].includes((session.user as any)?.role)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = params.id;

    const [result]: any = await pool.query('DELETE FROM pelamar WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Data pelamar tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Pelamar berhasil dihapus!' }, { status: 200 });

  } catch (error) {
    console.error("Gagal menghapus pelamar:", error);
    return NextResponse.json({ message: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}