import connectDB from "@/app/lib/db"
import { Settings } from "@/models/settings.model"
import { GoogleGenAI } from "@google/genai"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req:NextRequest) {
    try{
        const {ownerId, message} = await req.json()
        if(!ownerId || !message) {
            return NextResponse.json({error: "ownerId and message are required"}, {status: 400})
        }
        await connectDB()
        const settings = await Settings.findOne({ownerId})
        if(!settings) {
            return NextResponse.json({error: "Settings not found"}, {status: 404})
        }
        
        const promt = `
        You are a helpful AI assistant for ${settings.businessName ||  "not provided"}.
        Use the following information to answer the user's question:
        ${settings.knowledgeBase || "not provided"}
        
        If the answer is not in the knowledge base, say: "I don't have that information. Please contact us at ${settings.supportEmail || "not provided"}
        
        User question: ${message}
        `
        const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY!});
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: promt,
        });
        return NextResponse.json(response.text)
    } catch(error) {
        console.log(error)
        return NextResponse.json({error: "Failed to process chat"}, {status: 500})
    }
}