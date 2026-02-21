// src/app/api/promo/[id]/route.ts
import pool from '@/lib/db'; 
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id: promoId } = await params;

  try {
    const query = `
      SELECT id, title, description, startDate, endDate, imageUrl, createdAt, updatedAt
      FROM Promo 
      WHERE id = ? AND isActive = 1
    `;
    
    const [rows] = await pool.query(query, [promoId]);
    
    const promo = (rows as any[])[0];

    if (!promo) {
      return NextResponse.json({ message: 'Promo tidak ditemukan atau tidak aktif.' }, { status: 404 });
    }

    return NextResponse.json(promo, { status: 200 });

  } catch (error) {
    console.error(`Gagal mengambil promo ID ${promoId} (MySQL Error):`, error);
    return NextResponse.json({ message: 'Terjadi kesalahan server saat mengambil data.' }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id: promoId } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Harap login terlebih dahulu.' }, { status: 401 });
    }

    try {
        const query = 'DELETE FROM Promo WHERE id = ?';
        const [result] = await pool.query(query, [promoId]);

        if ((result as any).affectedRows === 0) {
             return NextResponse.json({ message: 'Promo tidak ditemukan.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Promo berhasil dihapus' }, { status: 200 });

    } catch (error) {
        console.error("DELETE Promo Error:", error);
        return NextResponse.json({ message: 'Terjadi kesalahan server saat menghapus promo.' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id: promoId } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Akses ditolak.' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, description, startDate, endDate, isActive, imageUrl } = body;

        if (!title || !description || !startDate || !endDate) {
            return NextResponse.json({ message: 'Data promo tidak lengkap.' }, { status: 400 });
        }

        const query = `
            UPDATE Promo 
            SET title = ?, description = ?, startDate = ?, endDate = ?, isActive = ?, imageUrl = ?, updatedAt = NOW()
            WHERE id = ?
        `;
      const values = [title, description, startDate, endDate, isActive ? 1 : 0, imageUrl, promoId];        
        const [result] = await pool.query(query, values);

        if ((result as any).affectedRows === 0) {
             return NextResponse.json({ message: 'Promo tidak ditemukan atau tidak ada perubahan.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Promo berhasil diperbarui' }, { status: 200 });

    } catch (error) {
        console.error("PUT Promo Error:", error);
        return NextResponse.json({ message: 'Terjadi kesalahan server saat memperbarui promo.' }, { status: 500 });
    }
}
