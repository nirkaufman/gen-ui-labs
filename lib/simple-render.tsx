import ReactDOMServer from 'react-dom/server';
import { TaskResult } from '../components/TaskResult';

export const renderStreamContent = (content: string) => {
  let html = content;

  // Handle process tags (internal LLM process visualization)
  html = html
    .replace(/<thinking>(.*?)<\/thinking>/gs, '<div class="my-3 bg-blue-50 p-4 rounded-lg text-blue-700"><strong>Thinking:</strong> $1</div>')
    .replace(/<action>(.*?)<\/action>/gs, '<div class="my-3 bg-green-50 p-4 rounded-lg text-green-700"><strong>Action:</strong> $1</div>')
    .replace(/<result>(.*?)<\/result>/gs, '<div class="my-3 bg-purple-50 p-4 rounded-lg text-purple-700"><strong>Result:</strong> $1</div>');

  // Handle React component tags - KEY PATTERN
  const taskMatch = html.match(/<task-result>(.*?)<\/task-result>/s);
  if (taskMatch) {
    try {
      const taskData = JSON.parse(taskMatch[1]);
      // This is where ReactDOMServer.renderToString converts React to HTML
      html = html.replace(
        /<task-result>.*?<\/task-result>/s,
        `<div class="my-4">${ReactDOMServer.renderToString(<TaskResult {...taskData} />)}</div>`
      );
    } catch (e) {
      console.error('Failed to parse task result:', e);
    }
  }

  return html;
};