import scalekit from "@/app/lib/scalekit";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const url = new URL(req.url)
    const code = url.searchParams.get("code")
    const state = url.searchParams.get("state")
    const redirectUri = `${req.nextUrl.origin}/api/auth/callback`

    if(!code) {
        return NextResponse.json({error: "Missing code"}, {status: 400})
    }

    const session = await scalekit.authenticateWithCode(code,redirectUri)
    console.log(session)
    const response = NextResponse.redirect(`${req.nextUrl.origin}`)
    response.cookies.set("scalekit_session", session.accessToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    })
    return response
}