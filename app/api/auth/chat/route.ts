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
        let response;
        let retries = 3;
        while (retries > 0) {
            try {
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: promt,
                });
                break; // If successful, exit the retry loop
            } catch (err: any) {
                retries--;
                if (retries === 0) throw err; // If out of retries, throw the error to be caught by the outer catch
                console.log(`Gemini API error, retrying... (${retries} retries left)`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
            }
        }
        const res = NextResponse.json({text: response?.text})
        res.headers.set("Access-Control-Allow-Origin", "*")
        res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
        res.headers.set("Access-Control-Allow-Headers", "Content-Type")
        return res

    } catch(error) {
        console.log(error)
        const res = NextResponse.json({error: "Failed to process chat"}, {status: 500})
        res.headers.set("Access-Control-Allow-Origin", "*")
        res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
        res.headers.set("Access-Control-Allow-Headers", "Content-Type")
        return res
    }
}

export const OPTIONS = async() => {
    return  NextResponse.json(null, {status: 201, headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }})
}