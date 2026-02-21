import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC LIMIT 10');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    await pool.query('UPDATE notifications SET is_read = TRUE WHERE is_read = FALSE');
    return NextResponse.json({ message: 'Updated' });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}