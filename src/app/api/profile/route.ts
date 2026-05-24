import { NextResponse } from 'next/server';
import { getProfile, updateProfile } from '@/lib/db';

export async function GET() {
  const profile = getProfile();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
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
