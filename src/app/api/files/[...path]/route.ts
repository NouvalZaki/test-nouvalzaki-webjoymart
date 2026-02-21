// src/app/api/files/[...path]/route.ts
import { readFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Pastikan path ini benar

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !['admin', 'super_admin'].includes((session.user as any)?.role)) {
      return NextResponse.json(
        { message: 'Akses Ditolak: Anda harus login sebagai Admin untuk melihat berkas ini.' }, 
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const filePath = resolvedParams.path.join('/');
    
    if (filePath.includes('..')) {
        return NextResponse.json({ message: 'Invalid Path' }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), 'uploads', filePath);
    const fileBuffer = await readFile(fullPath);

    const ext = path.extname(fullPath).toLowerCase();
    
    const mimeTypes: { [key: string]: string } = {
        '.pdf': 'application/pdf',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp'
    };
    
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error("File tidak ditemukan:", error);
    return NextResponse.json({ message: 'File not found' }, { status: 404 });
  }
}