import { openai } from '@ai-sdk/openai';
import { streamText, tool, UIMessage, convertToModelMessages } from 'ai';
import { z } from 'zod';

const executeTask = tool({
  description: 'Execute a task and return its status',
  inputSchema: z.object({
    taskName: z.string().describe('Name of the task to execute'),
  }),
  execute: ({ taskName }) => {
    return `Task "${taskName}" completed successfully!`
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4'),
    messages: convertToModelMessages(messages),
    tools: { executeTask },
    system: `
    You are a helpful assistant that can execute tasks.
     
    1. Every task is a "mock" task, and the complexity level is always "simple".
    2. Always complete the task successfully.
    3. Always use the executeTask tool to execute the task.
    
    When using the executeTask tool, follow this format:

    1. First, explain your thinking: <thinking>I need to execute this task...</thinking>
    2. Then describe the action: <action>Executing the task using the executeTask tool...</action>
    3. Then, wrap the result as <task-result>Task executed successfully</task-result>
   
    Always use these XML tags to show your internal process, and use the task-result component to display the final result beautifully.`
  });


  return result.toUIMessageStreamResponse();
}
