// src/app/api/users/[id]/route.ts
import pool from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id: userId } = await params;
    const body = await request.json();
    
    const { newPassword, newRole } = body;

    let query = 'UPDATE users_editor SET ';
    const values: any[] = [];
    const updates: string[] = [];

    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json({ message: 'Password minimal 6 karakter.' }, { status: 400 });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.push('passwordUser = ?');
      values.push(hashedPassword);
    }

    if (newRole) {
      updates.push('role = ?');
      values.push(newRole);
    }

    if (updates.length === 0) {
      return NextResponse.json({ message: 'Tidak ada data untuk diperbarui.' }, { status: 400 });
    }

    query += updates.join(', ') + ' WHERE userId = ?';
    values.push(userId);

    const [result] = await pool.query(query, values);

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Data user berhasil diperbarui!' });

  } catch (error: any) {
    console.error("PATCH User Error:", error);
    return NextResponse.json({ message: 'Gagal memperbarui data user.' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id: userId } = await params;

    const query = 'DELETE FROM users_editor WHERE userId = ?';
    const [result] = await pool.query(query, [userId]);

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User berhasil dihapus.' });
  } catch (error: any) {
    console.error("DELETE User Error:", error);
    return NextResponse.json({ message: 'Gagal menghapus user.' }, { status: 500 });
  }
}