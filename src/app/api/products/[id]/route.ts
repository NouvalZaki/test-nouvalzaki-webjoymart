import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

type RouteParams = {
    params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id: productId } = await params;

    try {
        const query = 'SELECT id, name, description, price, stock, imageUrl, category FROM Product WHERE id = ?';
        const [rows] = await pool.query(query, [productId]);
        const product = (rows as any[])[0];

        if (!product) {
            return NextResponse.json({ message: 'Produk tidak ditemukan.' }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("GET Product Error:", error);
        return NextResponse.json({ message: 'Server error saat mengambil produk.' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id: productId } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Akses ditolak.' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, description, price, stock, category } = body;

        const parsedPrice = parseFloat(price);
        const parsedStock = parseInt(stock, 10);

        if (!name || isNaN(parsedPrice) || isNaN(parsedStock)) {
            return NextResponse.json({ message: 'Data wajib tidak lengkap atau tidak valid.' }, { status: 400 });
        }

        const query = `
            UPDATE Product 
            SET name = ?, description = ?, price = ?, stock = ?, category = ?, updatedAt = NOW()
            WHERE id = ?
        `;
        const values = [name, description, parsedPrice, parsedStock, category, productId];
        
        const [result] = await pool.query(query, values);

        if ((result as any).affectedRows === 0) {
             return NextResponse.json({ message: 'Produk tidak ditemukan atau tidak ada perubahan.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Produk berhasil diperbarui' }, { status: 200 });

    } catch (error) {
        console.error("PUT Product Error:", error);
        return NextResponse.json({ message: 'Terjadi kesalahan server saat memperbarui produk.' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id: productId } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Harap login terlebih dahulu.' }, { status: 401 });
    }

    try {
        const query = 'DELETE FROM Product WHERE id = ?';
        const [result] = await pool.query(query, [productId]);

        if ((result as any).affectedRows === 0) {
             return NextResponse.json({ message: 'Produk tidak ditemukan.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Produk berhasil dihapus' }, { status: 200 });

    } catch (error) {
        console.error("DELETE Product Error:", error);
        return NextResponse.json({ message: 'Terjadi kesalahan server saat menghapus produk.' }, { status: 500 });
    }
}