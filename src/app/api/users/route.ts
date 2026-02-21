import pool from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT userId, user_name, role FROM users_editor');
    return NextResponse.json(rows || []); 
  } catch (error) {
    console.error("GET Users Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: 'Akses ditolak' }, { status: 401 });

        const { username, password, role } = await request.json();

        if (!username || !password || !role) {
            return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users_editor (user_name, passwordUser, role) VALUES (?, ?, ?)';
        
        await pool.query(query, [username, hashedPassword, role]);
        return NextResponse.json({ message: 'User berhasil dibuat' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Gagal membuat user' }, { status: 500 });
    }
}