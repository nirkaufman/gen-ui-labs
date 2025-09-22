# Structured data (Objects)

- under `components` create new file name: `Structured.tsx`

__Alert.tsx__
```tsx
'use client';

import { experimental_useObject as useObject } from '@ai-sdk/react';
import {alertSchema} from "@/app/api/alerts/schema";


export function Alerts() {
  const { object, submit } = useObject({
    api: '/api/alerts',
    schema: alertSchema,
  });

  console.log(object);

  return (
      <div className="fixed top-0 left-0 z-50">
        <button
            onClick={() => submit('Messages during finals week.')}
            className="mb-4 px-3 py-1 border border-white text-sm"
        >
          Generate Alerts
        </button>

        {object?.alerts?.map((alert, index) => (
            <div key={index} className="border border-white p-2 mb-2.5 text-sm">
              <p>{alert?.alertType}</p>
              <p>{alert?.message}</p>
            </div>
        ))}
      </div>
  );
}

```

- under `api/alerts/schema.ts` add:

```typescript
import { z } from 'zod';

// define a schema for the notifications
export const alertSchema = z.object({
  alerts: z.array(
      z.object({
        alertType: z.string().describe('The type of the alert. example: "info", "warning", "error".'),
        message: z.string().describe('Short message to display to the user. example: "You have 5 new messages."'),
      }),
  ),
});

```

- under `api/alerts` create new file name: `route.ts`

___route.ts___
```typescript
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

```

