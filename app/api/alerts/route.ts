import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { alertSchema } from './schema';

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai('gpt-4.1'),
    schema: alertSchema,
    system: 'Math an emoji for each alert type. example: use ℹ️ for info, 🚨 for error and ‼️ for warning',
    prompt:
        `Generate 3 alerts for a dashboard app in this context:` + context,
  });

  return result.toTextStreamResponse();
}
