import { openai } from '@ai-sdk/openai';
import { streamText, tool, UIMessage, convertToModelMessages } from 'ai';
import { z } from 'zod';

const executeTask = tool({
  description: 'Execute a task and return its status',
  inputSchema: z.object({
    taskName: z.string().describe('Name of the task to execute'),
    complexity: z.enum(['simple', 'medium', 'complex']).describe('Task complexity level'),
  }),
  execute: async ({ taskName, complexity }) => {
    // Simulate task execution
    const duration = complexity === 'simple' ? '2s' : complexity === 'medium' ? '5s' : '12s';
    const status = Math.random() > 0.1 ? 'completed' : 'failed';

    return {
      taskName,
      status,
      duration,
      message: `Task "${taskName}" ${status === 'completed' ? 'completed successfully' : 'failed'} in ${duration}`
    };
  },
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4'),
    messages: convertToModelMessages(messages),
    tools: { executeTask },
    system: `You are a helpful assistant that can execute tasks. When using the executeTask tool, follow this format:

1. First, explain your thinking: <thinking>I need to execute this task...</thinking>
2. Then describe the action: <action>Executing the task using the executeTask tool...</action>
3. After getting the result, show it as: <result>The task completed successfully</result>
4. Finally, format the tool result as: <task-result>{"title": "Task Name", "status": "completed", "description": "Task description", "duration": "5s"}</task-result>

Always use these XML tags to show your internal process, and use the task-result component to display the final result beautifully.`
  });

  return result.toUIMessageStreamResponse();
}
