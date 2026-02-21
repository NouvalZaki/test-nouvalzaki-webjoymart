import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ipCache = new Map<string, number>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();
  const lastRequest = ipCache.get(ip);

  if (lastRequest && now - lastRequest < 60000) { // 60.000ms = 1 menit
    return NextResponse.json(
      { message: 'Mohon tunggu 1 menit sebelum mengirim lamaran lagi.' }, 
      { status: 429 }
    );
  }

  try {
    const formData = await req.formData();
    
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const position = formData.get('position') as string;
    
    const cvFile = formData.get('cv') as File;
    const photoFile = formData.get('photo') as File;

    if (!cvFile || !photoFile) {
      return NextResponse.json({ message: 'CV dan Pas Foto wajib diunggah.' }, { status: 400 });
    }

    if (photoFile.size > 1 * 1024 * 1024) {
      return NextResponse.json({ message: 'Foto terlalu besar! Maksimal 1MB.' }, { status: 400 });
    }
    if (cvFile.size > 2 * 1024 * 1024) {
      return NextResponse.json({ message: 'CV terlalu besar! Maksimal 2MB.' }, { status: 400 });
    }
    if (cvFile.type !== 'application/pdf') {
      return NextResponse.json({ message: 'CV harus berformat PDF!' }, { status: 400 });
    }

    const uploadDirCV = path.join(process.cwd(), 'uploads', 'cv');
    const uploadDirPhoto = path.join(process.cwd(), 'uploads', 'photos');

    await mkdir(uploadDirCV, { recursive: true });
    await mkdir(uploadDirPhoto, { recursive: true });

    const cvFileName = `${Date.now()}_cv_${fullName.replace(/\s+/g, '_')}.pdf`;
    await writeFile(path.join(uploadDirCV, cvFileName), Buffer.from(await cvFile.arrayBuffer()));
    const cvUrl = `/api/files/cv/${cvFileName}`;

    const photoExt = path.extname(photoFile.name) || '.jpg';
    const photoFileName = `${Date.now()}_photo_${fullName.replace(/\s+/g, '_')}${photoExt}`;
    await writeFile(path.join(uploadDirPhoto, photoFileName), Buffer.from(await photoFile.arrayBuffer()));
    const photoUrl = `/api/files/photos/${photoFileName}`;

    const query = `
      INSERT INTO pelamar (fullName, email, phoneNumber, position, photoUrl, cvUrl) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.query(query, [fullName, email, phoneNumber, position, photoUrl, cvUrl]);

    const notifQuery = `
      INSERT INTO notifications (title, message) 
      VALUES (?, ?)
    `;
    const notifMessage = `Ada pelamar baru: ${fullName} untuk posisi ${position}`;
    await pool.query(notifQuery, ['Lamaran Baru', notifMessage]);

    ipCache.set(ip, now);

    return NextResponse.json({ message: 'Lamaran berhasil dikirim!' }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: 'Gagal memproses lamaran.' }, { status: 500 });
  }

  
}