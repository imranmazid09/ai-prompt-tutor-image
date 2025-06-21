import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Export the middleware function as default
export default function middleware(request: NextRequest) {
  return NextResponse.next()
}

// Configure which paths middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}
