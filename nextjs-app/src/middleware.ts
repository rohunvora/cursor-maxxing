import { type NextRequest, NextResponse } from 'next/server'

// Middleware disabled for now - Next.js 16 deprecated this convention
export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

// Only match a path that won't exist to effectively disable middleware
export const config = {
  matcher: ['/_disabled_middleware_path'],
}
