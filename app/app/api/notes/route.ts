import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate concise, easy-to-understand student revision notes for the topic: "${topic}". Include bullet points and key takeaways.`,
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
