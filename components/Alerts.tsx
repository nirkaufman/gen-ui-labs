'use client';

import { useState } from 'react';

export default function Alerts() {
  const [generation, setGeneration] = useState();
  const [isLoading, setIsLoading] = useState(false);


  return (
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {generation && (
            <pre className="whitespace-pre-wrap mb-3">
              {JSON.stringify(generation, null, 2)}
            </pre>
        )}

        {isLoading && (
            <div className="whitespace-pre-wrap mb-3">
              Loading...
            </div>
        )}

        <button
            className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
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
          Generate Alerts
        </button>
      </div>
  );
}
