import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { saveProject, deleteProject } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const project = await request.json();
    project.id = id; // Ensure the ID matches the route parameter

    const success = saveProject(project);
    if (success) {
      return NextResponse.json({ success: true, project });
    }
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const success = deleteProject(id);
  if (success) {
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  }
  return NextResponse.json({ error: 'Project not found' }, { status: 404 });
}
