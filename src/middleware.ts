import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith('/admin');

  if (isProtectedRoute) {
    const session = request.cookies.get('session')?.value;
    
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      const parsed = await decrypt(session);
      if (!parsed) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (path === '/login') {
    const session = request.cookies.get('session')?.value;
    if (session) {
      try {
        const parsed = await decrypt(session);
        if (parsed) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch (e) {}
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
