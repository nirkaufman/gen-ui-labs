'use client';

import { useState } from 'react';
import { useActions, useUIState } from '@ai-sdk/rsc';
import { generateId } from 'ai';
import {ClientMessage, HomeDecoratorAction} from "@/components/A1-case-study/home-decorator.action";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function HomeDecoratorDemo() {
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState();
  const { HomeDecoratorAction } = useActions();

  return (
      <div>
        <div>
          {conversation.map((message: ClientMessage) => (
              <div key={message.id}>
                {message.role}: {message.display}
              </div>
          ))}
        </div>

        <div>
          <input
              type="text"
              value={input}
              onChange={event => {
                setInput(event.target.value);
              }}
          />
          <button
              onClick={async () => {
                setConversation((currentConversation: ClientMessage[]) => [
                  ...currentConversation,
                  { id: generateId(), role: 'user', display: input },
                ]);

                const message = await HomeDecoratorAction(input);

                setConversation((currentConversation: ClientMessage[]) => [
                  ...currentConversation,
                  message,
                ]);
              }}
          >
            Send Message
          </button>
        </div>
      </div>
  );
}
