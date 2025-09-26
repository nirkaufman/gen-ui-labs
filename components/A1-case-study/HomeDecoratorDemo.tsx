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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: generateId(), role: 'user', display: input },
    ]);

    const message = await HomeDecoratorAction(input);

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);

    setInput('');
  };

  return (
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {conversation.map((message: ClientMessage) => (
            <div key={message.id} className="whitespace-pre-wrap mb-3">
              {message.role === 'user' ? 'User: ' : 'AI: '}
              {message.display}
            </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
              className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
              value={input}
              placeholder="Say something..."
              onChange={e => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
  );
}
