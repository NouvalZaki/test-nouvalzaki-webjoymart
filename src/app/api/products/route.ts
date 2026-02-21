// src/app/api/products/route.ts
import pool from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";



export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 8;
    const offset = (page - 1) * limit;
    const searchQuery = searchParams.get('q') || '';

    let whereClause = 'WHERE stock > 0';
    const queryParams: any[] = [];

    if (searchQuery) {
      whereClause += ' AND (name LIKE ? OR category LIKE ?)';
      queryParams.push(`%${searchQuery}%`, `%${searchQuery}%`);
    }

    const query = `
      SELECT id, name, description, price, stock, imageUrl, category
      FROM Product 
      ${whereClause} 
      ORDER BY name ASC
      LIMIT ? OFFSET ?
    `;
    
    const countQuery = `SELECT COUNT(*) as total FROM Product ${whereClause}`;

    const [rows] = await pool.query(query, [...queryParams, limit, offset]);
    const [countResult] = await pool.query(countQuery, queryParams);
    
    const totalProducts = (countResult as any)[0].total;
    const hasMore = offset + limit < totalProducts;

    return NextResponse.json({
      data: rows,
      hasMore: hasMore,
      total: totalProducts
    }, { status: 200 });

  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    return NextResponse.json({ message: 'Gagal mengambil katalog produk.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Akses ditolak. Silakan login.' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, stock, imageUrl, category } = body; 

    if (!name || !price || stock === undefined || !imageUrl) {
        return NextResponse.json({ message: 'Data wajib harus diisi.' }, { status: 400 });
    }

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    const query = `
        INSERT INTO Product 
        (name, description, price, stock, imageUrl, category, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const values = [name, description || '', parsedPrice, parsedStock, imageUrl, category || 'Umum'];
    
    await pool.query(query, values);

    return NextResponse.json(
      { message: 'Produk berhasil ditambahkan!' }, 
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Gagal menyimpan produk:", error);
    return NextResponse.json({ message: 'Gagal membuat produk baru.' }, { status: 500 });
  }
}