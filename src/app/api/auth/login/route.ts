import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === ADMIN_PASSWORD) {
      const token = generateToken({ username: 'admin', role: 'admin' });

      // In Next.js App Router, cookies can be set via cookies()
      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      });

      return NextResponse.json({ success: true, message: 'Logged in successfully' });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login API error', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
}
