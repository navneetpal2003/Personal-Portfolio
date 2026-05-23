import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSkills, updateSkills } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET() {
  const skills = getSkills();
  return NextResponse.json(skills);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedSkills = await request.json();
    const success = updateSkills(updatedSkills);
    if (success) {
      return NextResponse.json({ success: true, skills: updatedSkills });
    }
    return NextResponse.json({ error: 'Failed to update skills' }, { status: 500 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
