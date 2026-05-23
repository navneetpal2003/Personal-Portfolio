import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getProjects, saveProject } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const project = await request.json();
    if (!project.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Generate unique ID from title if not explicitly provided
    if (!project.id) {
      project.id = project.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const success = saveProject(project);
    if (success) {
      return NextResponse.json({ success: true, project });
    }
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
