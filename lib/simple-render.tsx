import ReactDOMServer from 'react-dom/server';
import { TaskResult } from '@/components/TaskResult';
import { ThinkingStep } from '@/components/ThinkingStep';
import { ActionStep } from '@/components/ActionStep';

const renderStreamContent = (content: string) => {
  let html = content;

  html = html.replace(/<thinking>(.*?)<\/thinking>/gs, (_, content) => {
    return ReactDOMServer.renderToString(<ThinkingStep content={content} />);
  });

  html = html.replace(/<action>(.*?)<\/action>/gs, (_, content) => {
    return ReactDOMServer.renderToString(<ActionStep content={content} />);
  });

  html = html.replace(/<task-result>(.*?)<\/task-result>/gs, (_, content) => {
    return ReactDOMServer.renderToString(<TaskResult content={content} />);
  });

  return html;
};
export default renderStreamContent
