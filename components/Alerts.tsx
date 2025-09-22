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
