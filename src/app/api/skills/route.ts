import { NextResponse } from 'next/server';
import { getSkills, updateSkills } from '@/lib/db';

export async function GET() {
  const skills = getSkills();
  return NextResponse.json(skills);
}

export async function PUT(request: Request) {
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
