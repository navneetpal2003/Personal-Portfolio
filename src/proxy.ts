import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if trying to access the admin dashboard
  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // If token is missing, redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export { proxy };

// Only match the admin dashboard path
export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
