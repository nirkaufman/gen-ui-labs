'use client';

import {useChat} from '@ai-sdk/react';
import {DefaultChatTransport} from 'ai';

import {useState} from 'react';

export function Tools() {
  const [input, setInput] = useState('');

  const {messages, sendMessage} = useChat({
    transport: new DefaultChatTransport({
      api: '/api/cats',
    }),
  });

  return (
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {messages.map((message, index) => (
            <div key={index} className="whitespace-pre-wrap mb-3">
              {message.role === 'user' ? ' User: ' : 'AI: '}
              {message.parts.map(part => {
                switch (part.type) {
                  case 'text':
                    return <p className='my-3'>{part.text}</p>
                  case 'tool-getCatFact':
                    return (
                        <>
                          <div>Tool: getCatFact</div>
                          <pre>{JSON.stringify(part, null, 2)}</pre>
                        </>
                    )
                }
              })}
            </div>
        ))}

        <form
            onSubmit={e => {
              e.preventDefault();
              sendMessage({text: input});
              setInput('');
            }}
        >
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
