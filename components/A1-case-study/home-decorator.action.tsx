'use server'

import {ReactNode} from "react";
import {getMutableAIState, streamUI} from "@ai-sdk/rsc";
import {openai} from "@ai-sdk/openai";
import {z} from "zod";
import ComplementaryColorPicker from "@/components/A1-case-study/ComplementaryColorPicker";
import {generateId} from "ai";
import SimpleColorPicker from "@/components/A1-case-study/SimpleColorPicker";

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}


export async function HomeDecoratorAction(input: string) {
  const history = getMutableAIState();

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    system: `
    You are a home decorator assistant.
    The user can ask for color recommendation for his entire home, or a specific room. 
    When the user ask for a color recommendation, ask him to describe what is the base color of his house or room in words.
    If the user can't describe it with words, offer to render a color picker. If the user agree, send him a color picker instead. 
    After he select a color, greet him with supportive text and ask him if he would like to get complementary colors recommendation.
    If the user agree, send him the a complementary color picker
    `,

    messages: [...history.get(), { role: 'user', content: input }],

    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: 'assistant', content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      showSimpleColorPicker: {
        description: 'Render a simple color picker to help the user select a bse color with UI',
        inputSchema: z.object({}),
        generate: async () => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: 'assistant',
              content: `Showing a UI to help you pick a color`,
            },
          ]);

          return <SimpleColorPicker />;
        }
      },
      showComplementaryColorPicker: {
        description: 'Render a complementary color picker and let the user choose his favorite ',
        inputSchema: z.object({
          baseColor: z
              .string()
              .describe('The base color in hex as a string'),
        }),
        generate: async ({ baseColor }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: 'assistant',
              content: `Showing complementary colors for ${baseColor}`,
            },
          ]);

          return <ComplementaryColorPicker baseColor={baseColor} />;
        },
      },
    },
  });

  return {
    id: generateId(),
    role: 'assistant',
    display: result.value,
  };
}
