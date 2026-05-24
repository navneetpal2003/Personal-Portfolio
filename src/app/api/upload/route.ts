import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getProfile, updateProfile } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob | null;
    const uploadType = formData.get('type') as string | null; // 'resume' or 'image'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileBlob = formData.get('file') as File;
    const originalName = fileBlob.name || 'upload';

    if (uploadType === 'resume') {
      // Ensure the public directory exists
      const publicDir = path.join(process.cwd(), 'public');
      await fs.mkdir(publicDir, { recursive: true });

      // Save PDF to public folder
      const filename = originalName.toLowerCase().endsWith('.pdf') ? originalName : `${originalName}.pdf`;
      const filePath = path.join(publicDir, filename);
      await fs.writeFile(filePath, buffer);

      // Update resumeUrl in the profile database
      const profile = getProfile();
      profile.resumeUrl = `/${filename}`;
      updateProfile(profile);

      return NextResponse.json({
        success: true,
        url: `/${filename}`,
        message: 'Resume uploaded and profile updated successfully',
      });
    } else {
      // Save images to public/uploads
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadsDir, { recursive: true });

      const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${Date.now()}-${safeName}`;
      const filePath = path.join(uploadsDir, filename);

      await fs.writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
        message: 'Image uploaded successfully',
      });
    }
  } catch (error) {
    console.error('File upload API error', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
export const runtime = 'nodejs'; // Specify Node.js runtime since we use filesystem operations
