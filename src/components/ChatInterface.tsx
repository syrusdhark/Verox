import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Sparkles, LayoutDashboard, Home } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { FranchiseCard } from "./FranchiseCard";
import { Message, Franchise, conversationStarters, mockMessages, franchises } from "../lib/mock-data";

interface ChatInterfaceProps {
  onViewFranchise: (franchise: Franchise) => void;
  onGoToDashboard?: () => void;
  onGoToHome?: () => void;
}

export function ChatInterface({ onViewFranchise, onGoToDashboard, onGoToHome }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [recommendedFranchises, setRecommendedFranchises] = useState<Franchise[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      
      let aiResponse = "";
      let recommended: Franchise[] = [];

      if (messageText.toLowerCase().includes('food') || messageText.toLowerCase().includes('restaurant')) {
        aiResponse = "Great! I've found some excellent food franchise opportunities for you. Based on your interest, I'm showing you top-rated food and beverage franchises with strong ROI and proven success rates.";
        recommended = franchises.filter(f => f.industry === 'Food & Beverage');
      } else if (messageText.toLowerCase().includes('healthcare') || messageText.toLowerCase().includes('health')) {
        aiResponse = "Healthcare franchises are experiencing rapid growth! I've identified opportunities in the healthcare sector with excellent long-term potential and strong market demand.";
        recommended = franchises.filter(f => f.industry === 'Healthcare' || f.industry === 'Health & Fitness');
      } else if (messageText.toLowerCase().includes('100k') || messageText.toLowerCase().includes('low') || messageText.toLowerCase().includes('passive')) {
        aiResponse = "I understand you're looking for opportunities with lower investment requirements and passive income potential. I've found franchises that match your budget and offer excellent semi-passive models.";
        recommended = franchises.filter(f => f.investmentMin <= 200000).sort((a, b) => b.matchScore - a.matchScore);
      } else {
        aiResponse = "I'd be happy to help you find the perfect franchise! Based on typical investor profiles, here are some of our top-performing franchises across various industries. Each has been carefully analyzed by our AI to ensure quality and profitability.";
        recommended = franchises.slice(0, 4);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setRecommendedFranchises(recommended);
    }, 1500);
  };

  const handleQuickReply = (starter: string) => {
    handleSend(starter);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Chat Panel */}
      <div className="w-full lg:w-3/5 flex flex-col bg-card border-r border-border">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-background" />
              </div>
              <div>
                <h2 className="text-foreground">VeroX AI Advisor</h2>
                <p className="text-sm text-muted-foreground">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onGoToHome && (
                <Button
                  onClick={onGoToHome}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              )}
              {onGoToDashboard && (
                <Button
                  onClick={onGoToDashboard}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-4" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-background" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="space-y-3 pt-2">
                <p className="text-sm text-muted-foreground">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {conversationStarters.map((starter, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickReply(starter)}
                      className="px-4 py-2 bg-muted hover:bg-accent text-foreground rounded-full text-sm transition-colors"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="px-6 py-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about franchises..."
              className="flex-1"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="bg-foreground hover:bg-foreground/90 text-background"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Franchise Results Panel */}
      <div className="hidden lg:block lg:w-2/5 bg-background overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg text-foreground mb-2">Recommended Franchises</h3>
            <p className="text-sm text-muted-foreground">
              {recommendedFranchises.length > 0 
                ? `${recommendedFranchises.length} matches found based on your criteria`
                : 'Start a conversation to see personalized recommendations'}
            </p>
          </div>

          {recommendedFranchises.length > 0 ? (
            <div className="space-y-4">
              {recommendedFranchises.map((franchise) => (
                <FranchiseCard
                  key={franchise.id}
                  franchise={franchise}
                  onClick={() => onViewFranchise(franchise)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Your personalized franchise recommendations will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
