import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Do nothing if dev preview
  if (req.headers.get("host") === process.env.DEV_PREVIEW_URL)
    return NextResponse.next();

  // Check if the host header matches the old URL
  if (req.headers.get("host") === "img-gen-kelvinthh.vercel.app") {
    // Redirect to the new URL
    return NextResponse.redirect(
      process.env.IMG_GEN_URL + req.nextUrl.pathname,
      301
    );
  }

  // Continue processing the request as normal
  return NextResponse.next();
}
