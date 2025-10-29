import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  Search,
  Send,
  Sparkles,
  MoreVertical,
  Archive,
  Star,
  Trash2,
  ArrowLeft,
  Phone,
  Video
} from "lucide-react";
import { mockLeads, Lead } from "../lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface MessagesScreenProps {
  onViewLead: (lead: Lead) => void;
}

export function MessagesScreen({ onViewLead }: MessagesScreenProps) {
  const [selectedConversation, setSelectedConversation] = useState<Lead | null>(mockLeads[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileConversation, setShowMobileConversation] = useState(false);

  const conversations = mockLeads;

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock conversation messages
  const getConversationMessages = (lead: Lead) => [
    {
      id: '1',
      type: 'ai' as const,
      content: "Hello! I'm your VeroX AI advisor. How can I help you today?",
      timestamp: new Date(lead.timestamp.getTime() - 7200000),
    },
    {
      id: '2',
      type: 'user' as const,
      content: `I'm interested in learning more about ${lead.franchise}.`,
      timestamp: new Date(lead.timestamp.getTime() - 5400000),
    },
    {
      id: '3',
      type: 'ai' as const,
      content: `Great choice! ${lead.franchise} is one of our top-performing franchises. Let me share some key details with you.`,
      timestamp: new Date(lead.timestamp.getTime() - 3600000),
    },
    {
      id: '4',
      type: 'user' as const,
      content: lead.lastMessage,
      timestamp: lead.timestamp,
    },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // In a real app, this would send the message
    setMessageInput("");
  };

  const handleSelectConversation = (conv: Lead) => {
    setSelectedConversation(conv);
    setShowMobileConversation(true);
  };

  const handleBackToList = () => {
    setShowMobileConversation(false);
  };

  const getQualityBadge = (quality: Lead['quality']) => {
    const variants = {
      hot: 'bg-red-100 text-red-700',
      warm: 'bg-amber-100 text-amber-700',
      cold: 'bg-blue-100 text-blue-700',
    };
    return variants[quality];
  };

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden">
      {/* Conversations List */}
      <div className={`
        w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800
        ${showMobileConversation ? 'hidden md:flex' : 'flex'}
      `}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <h2 className="text-gray-900 dark:text-gray-100 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className={`w-full p-3 rounded-lg cursor-pointer transition-colors text-left ${
                  selectedConversation?.id === conv.id
                    ? 'bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="shrink-0">
                    <AvatarFallback>
                      {conv.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
                        {conv.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                        {new Date(conv.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate mb-2">
                      {conv.lastMessage}
                    </p>
                    <Badge className={`${getQualityBadge(conv.quality)} text-xs`}>
                      {conv.quality}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conversation View */}
      {selectedConversation ? (
        <div className={`
          flex-1 flex flex-col bg-gray-50 dark:bg-gray-900
          ${showMobileConversation ? 'flex' : 'hidden md:flex'}
        `}>
          {/* Conversation Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 shrink-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden shrink-0"
                  onClick={handleBackToList}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarFallback>
                    {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="text-gray-900 dark:text-gray-100 truncate">{selectedConversation.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {selectedConversation.franchise}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hidden sm:flex"
                >
                  <Phone className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hidden sm:flex"
                >
                  <Video className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewLead(selectedConversation)}>
                      View Lead Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="w-4 h-4 mr-2" />
                      Star Conversation
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {getConversationMessages(selectedConversation).map((message) => (
                <div 
                  key={message.id} 
                  className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-white dark:text-gray-900" />
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[70%]">
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <span className={`text-xs text-gray-500 dark:text-gray-400 px-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 md:p-6 shrink-0">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 shrink-0"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">Select a conversation to view messages</p>
          </div>
        </div>
      )}
    </div>
  );
}
