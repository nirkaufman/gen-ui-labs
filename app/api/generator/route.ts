import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const result = await generateText({
      model: openai('gpt-4'),
      system: `You are an HTML generator. You MUST respond with valid HTML only. 
          Rules:
          1. Always wrap content in a single container div.
          2. Use semantic HTML elements.
          3. use inline styles. 
          4. No script tags or dangerous attributes.
          5. Return ONLY the HTML, no explanations or markdown,
          6. Make sure it responsive,
          7. Hard code dummy data if needed
          8. If there is an image, include a remote mock,
          9. Use dark theme. white text on dark background.`,
      prompt: `Generate HTML for: ${prompt}`
    });

    // Simple validation to ensure we got HTML
    const html = result.text.trim();

    if (!html.startsWith('<') || !html.endsWith('>')) {
      console.log('Response is not valid HTML');

    }

    return Response.json({ html });
  } catch (error) {
    console.error('HTML generation error:', error);

    return Response.json(
        { error: 'Failed to generate HTML' },
        { status: 500 }
    );
  }
}
