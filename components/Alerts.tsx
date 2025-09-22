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
