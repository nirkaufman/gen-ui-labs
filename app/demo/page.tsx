'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import renderStreamContent from '@/lib/simple-render';

export default function RenderDemo() {
  const [input, setInput] = useState('');

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/render',
    }),
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">LLM UI Demo with ReactDOMServer</h1>

      <div className="border rounded-lg">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' && 'bg-blue-500 text-white'}`}
              >
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text':
                      return message.role === 'user' ? (
                        <div key={`${message.id}-${i}`}>{part.text}</div>
                      ) : (
                        <div
                          key={`${message.id}-${i}`}
                          dangerouslySetInnerHTML={{
                            __html: renderStreamContent(part.text)
                          }}
                        />
                      );
                  }
                })}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput('');
          }}
          className="border-t p-4"
        >
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="Ask me to execute a task..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
