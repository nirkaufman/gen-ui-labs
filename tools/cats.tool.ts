import {tool} from "ai";
import {z} from "zod";

export const getCatFact = tool({
  description: 'Get a random fact about cats',
  inputSchema:z.object({}),
  execute: async () => {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();

      return `🐱 Cat Fact: ${data.fact}`;
  },
});
