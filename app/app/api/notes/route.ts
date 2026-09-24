import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent(
      `Generate concise, easy-to-understand student revision notes for the topic: "${topic}". Include bullet points and key takeaways.`
    );

    return NextResponse.json({ text: response.response.text() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
