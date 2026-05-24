import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const messagesPath = path.join(process.cwd(), 'src/data/messages.json');

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Ensure the folder exists
    const dir = path.dirname(messagesPath);
    await fs.mkdir(dir, { recursive: true });

    let messages = [];
    try {
      const fileData = await fs.readFile(messagesPath, 'utf-8');
      messages = JSON.parse(fileData);
    } catch {
      // File doesn't exist or is empty
    }

    const newMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);
    await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Message recorded successfully' });
  } catch (error) {
    console.error('Contact POST error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    let messages = [];
    try {
      const fileData = await fs.readFile(messagesPath, 'utf-8');
      messages = JSON.parse(fileData);
    } catch {
      // File doesn't exist
    }

    // Sort by date, newest first
    messages.sort(
      (a: { createdAt: string }, b: { createdAt: string }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Contact GET error', error);
    return NextResponse.json({ error: 'Failed to retrieve messages' }, { status: 500 });
  }
}
export const runtime = 'nodejs';
