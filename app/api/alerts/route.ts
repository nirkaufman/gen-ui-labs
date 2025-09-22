import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import {alertSchema} from "@/app/api/alerts/schema";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateObject({
    model: openai('gpt-4o'),
    system: 'You are an home security system.',
    prompt: `create alerts in the context of the following prompt: ${prompt}`,
    schema: alertSchema
  });

  return result.toJsonResponse();
}
