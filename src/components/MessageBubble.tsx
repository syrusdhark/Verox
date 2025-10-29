import { Message } from "../lib/mock-data";
import { Sparkles } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-background" />
        </div>
      )}
      
      <div className="flex flex-col gap-1 max-w-[70%]">
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-foreground text-background'
              : 'bg-muted text-foreground'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <span className={`text-xs text-muted-foreground ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
