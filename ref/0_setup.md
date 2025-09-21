# Development environment setup

- install dependencies

```bash
  npm install ai @ai-sdk/react @ai-sdk/openai zod
```

- Create `.env` file and add your OpenAI API
- If you dont have an API key, you can get one [here](https://platform.openai.com/account/api-keys)

```bash
  OPENAI_API_KEY=xxxxxxxxx
```

- Create an `API route` in your app named: `chat`
- Add the following code  

__app/api/chat/route.ts__
```typescript
import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

- create a directory named: `components`
- create a component for the chat named `Chat`
- add the following code`

__components/Chat.tsx__
```typescript
'use client'
import {useChat} from '@ai-sdk/react';
import {useState} from 'react';

export function Chat() {
  const [input, setInput] = useState('');
  const {messages, sendMessage} = useChat();

  return (
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
          {messages.map(message => {
              return (
                  <div key={message.id} className="whitespace-pre-wrap mb-3">
                  {message.role === 'user' ? ' User: ' : 'AI: '}
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return <div key={`${message.id}-${i}`}>{part.text}</div>;
                  }
                })}
              </div>
            )
          })}
          
          <form onSubmit={e => {
                e.preventDefault();
                sendMessage({text: input});
                setInput('');
          }}>
  
  <input
      className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
  value={input}
  placeholder="Say something..."
  onChange={e => setInput(e.currentTarget.value)}/>
  </form>
  </div>
);
}

```

- import and render the `Chat` component in `app/page.tsx`

__app/page.tsx__
```typescript
import {Chat} from "@/components/Chat";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col row-start-2 items-start">
        <h1 className="text-center text-4xl font-bold sm:text-left">
          <span className="text-orange-400">Generative UI</span> Workshop Labs
        </h1>
        <small className="text-center text-sm text-stone-400">Nir Kaufman | 2025</small>
        <Chat />
      </main>
    </div>
  );
}
```

- chat with the model to make sure it works as expect
