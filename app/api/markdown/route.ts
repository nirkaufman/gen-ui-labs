import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    system:`
      You are a helpful assistant. Respond to the user in Markdown format.
      Use the following format:
      # Title
      ## Subtitle
      Paragraph 1.      
      Include bullet points  
    `,
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
