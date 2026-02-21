// src/app/api/promo/route.ts
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);
    const showActiveOnly = searchParams.get('active') === 'true'; 
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    
    if (showActiveOnly) {
      whereClause += ' AND endDate >= CURDATE() AND isActive = 1'; 
    } 

    const query = `
      SELECT id, title, description, startDate, endDate, imageUrl
      FROM Promo 
      ${whereClause} 
      ORDER BY createdAt DESC
      LIMIT ? OFFSET ?
    `;

    const countQuery = `SELECT COUNT(*) as total FROM Promo ${whereClause}`;

    const [rows] = await pool.query(query, [limit, offset]);
    const [countResult] = await pool.query(countQuery);
    
    const total = (countResult as any)[0].total;
    const hasMore = offset + limit < total;

    return NextResponse.json({
      data: rows,
      hasMore,
      total
    }, { status: 200 });
    
  } catch (error) {
    console.error("MySQL ERROR PROMO:", error);
    return NextResponse.json({ message: 'Gagal mengambil data promo.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, startDate, endDate, imageUrl } = body; 

    if (!title || !description || !startDate || !endDate || !imageUrl) {
      return NextResponse.json({ message: 'Data wajib harus diisi.' }, { status: 400 });
    }

    const query = `
        INSERT INTO Promo 
        (title, description, startDate, endDate, imageUrl, isActive, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())
    `;

    const values = [title, description, startDate, endDate, imageUrl];
    
    await pool.query(query, values);

    return NextResponse.json(
      { message: 'Promo berhasil dibuat' }, 
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Gagal menyimpan promo (MySQL Error):", error);
    return NextResponse.json({ message: 'Gagal membuat promo baru.' }, { status: 500 });
  }
}