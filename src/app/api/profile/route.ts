import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getProfile, updateProfile } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET() {
  const profile = getProfile();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedProfile = await request.json();
    const success = updateProfile(updatedProfile);
    if (success) {
      return NextResponse.json({ success: true, profile: updatedProfile });
    }
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
