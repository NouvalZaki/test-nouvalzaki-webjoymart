// src/app/api/upload/promo/route.ts
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises'; 
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'potrait');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const file = formData.get('image'); 

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: 'Tidak ada file gambar yang diunggah.' }, { status: 400 });
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());

    await mkdir(UPLOAD_DIR, { recursive: true });

    const extension = path.extname(file.name);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${extension}`; 
    const uploadPath = path.join(UPLOAD_DIR, fileName);

    await writeFile(uploadPath, buffer);

    const dbPath = `/potrait/${fileName}`;
    
    return NextResponse.json({ 
      message: 'File berhasil diunggah', 
      imageUrl: dbPath 
    }, { status: 200 });

  } catch (error) {
    console.error('Gagal mengunggah file:', error);
    return NextResponse.json({ message: 'Gagal memproses unggahan file.' }, { status: 500 });
  }
}