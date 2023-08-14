import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Check if the host header matches the old URL
  if (req.headers.get('host') === 'img-gen-kelvinthh.vercel.app') {
    // Redirect to the new URL
    return NextResponse.redirect(process.env.IMG_GEN_URL + req.nextUrl.pathname, 301)
  }

  // Continue processing the request as normal
  return NextResponse.next()
}
