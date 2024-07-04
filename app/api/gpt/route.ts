import { NextResponse } from "next/server";
import OpenAI from "openai";
import { StreamingTextResponse } from "ai";

const openai = new OpenAI({
   apiKey: process.env.NEXT_PUBLIC_CHATGPT_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
   try {
      const { messages } = await req.json();
      console.log(messages);

      const response = await openai.chat.completions.create({
         model: "gpt-3.5-turbo-0125",
         messages: [
            {
               role: "system",
               content: "You are a helpful assistant.",
            },
            ...messages,
         ],
         stream: true,
         temperature: 1,
      });

      const stream = new ReadableStream({
         async start(controller) {
            const encoder = new TextEncoder();
            for await (const chunk of response) {
               // Assuming chunk contains the streamed response data
               const data = JSON.parse(chunk.toString());
               if (data.choices && data.choices.length > 0) {
                  const choice = data.choices[0];
                  if (choice.delta && choice.delta.content) {
                     controller.enqueue(encoder.encode(choice.delta.content));
                  }
               }
            }
            controller.close();
         },
      });

      return new StreamingTextResponse(stream);
   } catch (error) {
      console.error("Error in POST handler:", error);
      return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
      );
   }
}
