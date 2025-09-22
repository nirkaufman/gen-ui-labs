import { openai } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
} from 'ai';
import {getCatFact} from "@/tools/cats.tool";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are a helpful assistant.',
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: { getCatFact }
  });

  return result.toUIMessageStreamResponse();
}
