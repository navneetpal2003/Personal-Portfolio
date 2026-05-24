import { NextResponse } from 'next/server';
import { saveProject, deleteProject } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

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

  const success = deleteProject(id);
  if (success) {
    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  }
  return NextResponse.json({ error: 'Project not found' }, { status: 404 });
}
