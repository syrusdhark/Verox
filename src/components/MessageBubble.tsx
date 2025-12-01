import { Message } from "../lib/mock-data";
import { Sparkles, User } from "lucide-react";
import veroLogo from "../assets/veroxlogo-removebg-preview.png";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';

  return (
    <div className="flex gap-4">
      {/* Avatar */}
      <div className="w-8 h-8 flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center">
            <img src={veroLogo} alt="VeroX AI" className="w-5 h-5 dark:invert" />
          </div>
        )}
      </div>
      
      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div className="text-gray-900 dark:text-gray-100">
          <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
