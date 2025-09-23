'use client'

import {marked} from 'marked';
import {memo, useMemo, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Chat, useChat} from "@ai-sdk/react";
import {DefaultChatTransport} from "ai";

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map(token => token.raw);
}

const MemoizedMarkdownBlock = memo(
    ({ content }: { content: string }) => {
      return <ReactMarkdown>{content}</ReactMarkdown>;
    },
    (prevProps, nextProps) => {
      return prevProps.content === nextProps.content;
    },
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

const MarkdownRender = memo(
    ({ content, id }: { content: string; id: string }) => {
      const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

      return blocks.map((block, index) => (
          <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
      ));
    },
);

MarkdownRender.displayName = 'MemoizedMarkdown';



const chat = new Chat({
  transport: new DefaultChatTransport({
    api: "/api/markdown",
  }),
});

export default function RenderMarkdown() {
  const { messages } = useChat({ chat, experimental_throttle: 50 });

  return (
      <div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch">
        <div className="space-y-8 mb-4">
          {messages.map((message) => (
              <div key={message.id}>
                <div className="font-bold mb-2">
                  {message.role === "user" ? "You" : "Assistant"}
                </div>
                <div className="prose space-y-2">
                  {message.parts.map((part) => {
                    if (part.type === "text") {
                      return (
                          <MarkdownRender
                              key={`${message.id}-text`}
                              id={message.id}
                              content={part.text}
                          />
                      );
                    }
                  })}
                </div>
              </div>
          ))}
        </div>

        <MessageInput />
      </div>
  );
}

const MessageInput = () => {
  const [input, setInput] = useState("");
  const { sendMessage } = useChat({ chat });

  return (
      <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage({
              text: input,
            });
            setInput("");
          }}
      >
        <input
            className="fixed bottom-0 w-full max-w-xl p-2 mb-8 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
            placeholder="Say something..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
        />
      </form>
  );
};
