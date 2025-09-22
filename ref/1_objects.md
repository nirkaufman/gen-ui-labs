# Structured data (Objects)

- under `components` create new file name: `Alerts.tsx`

__Alerts.tsx__
```tsx
'use client';

import { useState } from 'react';

export default function Alerts() {
  const [generation, setGeneration] = useState();
  const [isLoading, setIsLoading] = useState(false);


  return (
      <div>
        <div
            onClick={async () => {
              setIsLoading(true);

              await fetch('/api/alerts', {
                method: 'POST',
                body: JSON.stringify({
                  prompt: 'Alerts from home security system.',
                }),
              }).then(response => {
                response.json().then(json => {
                  setGeneration(json.alerts);
                  setIsLoading(false);
                });
              });
            }}
        >
          Generate
        </div>

        {isLoading ? (
            'Loading...'
        ) : (
            <pre>{JSON.stringify(generation, null, 2)}</pre>
        )}
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
        message: z.string().describe('Short message to display to the user.'),
      }),
  ),
});
```

- under `api/alerts` create new file name: `route.ts`

___route.ts___
```typescript
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import {alertSchema} from "@/app/api/alerts/schema";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateObject({
    model: openai('gpt-4o'),
    system: 'You are an home security system.',
    prompt: `create alerts in the context of the following prompt: ${prompt}`,
    schema: alertSchema
  });

  return result.toJsonResponse();
}

```

