import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const token = req.cookies.get("scalekit_session")?.value
    if (!token) {
        return NextResponse.redirect(`${req.nextUrl.origin}`)
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard/:path*'
}
