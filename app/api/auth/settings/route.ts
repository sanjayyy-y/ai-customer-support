import connectDB from "@/app/lib/db";
import { Settings } from "@/models/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { ownerId, businessName, supportEmail, knowledgeBase } = await req.json()
        if(!ownerId) {
            return NextResponse.json({ error: "ownerId is required" }, { status: 400 })
        }
        await connectDB()
        const settings = await Settings.findOneAndUpdate(
            { ownerId },
            { businessName, supportEmail, knowledgeBase },
            { upsert: true, new: true }
        )
        return NextResponse.json({ settings }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to create settings" }, { status: 500 })
    }
}
