import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Sparkles, LayoutDashboard, Home, Menu, X, TrendingUp, Users, DollarSign, Star, Award, MapPin, Clock, Plus, MessageSquare, Trash2 } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { Message, Franchise, Conversation, conversationStarters, franchises, mockConversations } from "../lib/mock-data";
import { Badge } from "./ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./ui/resizable";
import veroLogo from "../assets/veroxlogo-removebg-preview.png";

interface ChatInterfaceProps {
  onViewFranchise: (franchise: Franchise) => void;
  onGoToDashboard?: () => void;
  onGoToHome?: () => void;
}

export function ChatInterface({ onViewFranchise, onGoToDashboard, onGoToHome }: ChatInterfaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [recommendedFranchises, setRecommendedFranchises] = useState<Franchise[]>([]);
  const [selectedFranchise, setSelectedFranchise] = useState<Franchise | null>(null);
  const [showMenu, setShowMenu] = useState(false);
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

      // Update or create conversation
      if (currentConversationId) {
        setConversations(prev => prev.map(conv => 
          conv.id === currentConversationId 
            ? { ...conv, messages: [...messages, userMessage, aiMessage], lastMessage: new Date(), preview: messageText }
            : conv
        ));
      } else {
        // Create new conversation
        const newConv: Conversation = {
          id: Date.now().toString(),
          title: messageText.slice(0, 30) + (messageText.length > 30 ? '...' : ''),
          messages: [userMessage, aiMessage],
          lastMessage: new Date(),
          preview: messageText,
        };
        setConversations(prev => [newConv, ...prev]);
        setCurrentConversationId(newConv.id);
      }
    }, 1500);
  };

  const handleQuickReply = (starter: string) => {
    handleSend(starter);
  };

  const handleFranchiseClick = (franchise: Franchise) => {
    setSelectedFranchise(franchise);
  };

  const handleNewChat = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setRecommendedFranchises([]);
    setSelectedFranchise(null);
  };

  const handleSelectConversation = (conv: Conversation) => {
    setCurrentConversationId(conv.id);
    setMessages(conv.messages);
    setShowMenu(false);
  };

  const handleDeleteConversation = (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversations(prev => prev.filter(c => c.id !== convId));
    if (currentConversationId === convId) {
      handleNewChat();
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Fixed Left Sidebar */}
      <div className={`${showMenu ? 'fixed inset-y-0 left-0 z-50 w-64' : 'hidden'} lg:block lg:relative lg:w-64 flex-shrink-0`}>
        <div className="flex flex-col h-full bg-card border-r border-border">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={onGoToHome}
              >
                <img src={veroLogo} alt="VeroX AI" className="w-8 h-8" />
                <span className="text-foreground">VeroX AI</span>
              </div>
              <button 
                className="lg:hidden"
                onClick={() => setShowMenu(false)}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <Button
              onClick={handleNewChat}
              className="w-full bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 text-gray-100 dark:text-gray-900"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
          
          <ScrollArea className="flex-1">
            {/* Navigation */}
            <div className="p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2 mb-2">
                Navigation
              </div>
              <div className="space-y-1">
                {onGoToHome && (
                  <Button
                    onClick={() => {
                      onGoToHome();
                      setShowMenu(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <Home className="w-4 h-4 mr-3" />
                    Home
                  </Button>
                )}
                {onGoToDashboard && (
                  <Button
                    onClick={() => {
                      onGoToDashboard();
                      setShowMenu(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-3" />
                    Dashboard
                  </Button>
                )}
              </div>
            </div>

            {/* Chat History */}
            <div className="p-2 mt-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2 mb-2">
                Recent Chats
              </div>
              <div className="space-y-1">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className={`group relative px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      currentConversationId === conv.id
                        ? 'bg-accent'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="text-sm text-foreground truncate">
                          {conv.title}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {conv.preview}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {formatTimeAgo(conv.lastMessage)}
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteConversation(conv.id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent rounded flex-shrink-0"
                      >
                        <Trash2 className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Resizable Layout for Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Main Content Area */}
        <ResizablePanel defaultSize={selectedFranchise ? 60 : 100} minSize={40}>
          <div className="flex flex-col h-full">
            {/* Top Bar */}
            <div className="bg-background border-b border-border px-4 py-3">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div className="flex items-center gap-3">
                  <button 
                    className="lg:hidden"
                    onClick={() => setShowMenu(true)}
                  >
                    <Menu className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1" ref={scrollRef}>
              <div className="max-w-4xl mx-auto px-4 py-8">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
                    <div className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center">
                      <img src={veroLogo} alt="VeroX AI" className="w-10 h-10 dark:invert" />
                    </div>
                    <div className="space-y-6 max-w-3xl w-full px-4">
                      <h1 className="text-3xl md:text-4xl text-gray-900 dark:text-gray-100 text-center">
                        How can I help you today?
                      </h1>
                      
                      <div className="space-y-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Try asking questions like:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {conversationStarters.map((starter, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickReply(starter)}
                              className="px-4 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm text-left transition-colors border border-gray-200 dark:border-gray-700"
                            >
                              {starter}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                    
                    {isTyping && (
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-gray-100 dark:text-gray-900" />
                        </div>
                        <div className="flex-1">
                          <div className="flex gap-1 py-3">
                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Franchise Carousel */}
                    {recommendedFranchises.length > 0 && (
                      <div className="py-6">
                        <h3 className="text-gray-900 dark:text-gray-100 mb-4">
                          Recommended Franchises
                        </h3>
                        <Carousel
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                          className="w-full"
                        >
                          <CarouselContent className="-ml-4">
                            {recommendedFranchises.map((franchise) => (
                              <CarouselItem key={franchise.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div 
                                  onClick={() => handleFranchiseClick(franchise)}
                                  className="group cursor-pointer"
                                >
                                  <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
                                    <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                      <img 
                                        src={franchise.banner} 
                                        alt={franchise.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                    <div className="p-4 space-y-3">
                                      <div className="flex items-start justify-between gap-2">
                                        <div>
                                          <h4 className="text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                                            {franchise.name}
                                          </h4>
                                          <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {franchise.tagline}
                                          </p>
                                        </div>
                                        <Badge className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 shrink-0">
                                          {franchise.matchScore}% match
                                        </Badge>
                                      </div>
                                      
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                                          <span>Investment</span>
                                          <span className="text-gray-900 dark:text-gray-100">
                                            {formatCurrency(franchise.investmentMin)} - {formatCurrency(franchise.investmentMax)}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                                          <span>ROI</span>
                                          <span className="text-emerald-600 dark:text-emerald-400">
                                            {franchise.roi}%
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                                          <span>Active Units</span>
                                          <span className="text-gray-900 dark:text-gray-100">
                                            {franchise.activeUnits}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="hidden md:flex -left-4" />
                          <CarouselNext className="hidden md:flex -right-4" />
                        </Carousel>
                      </div>
                    )}

                    {/* Quick Replies */}
                    {messages.length === 1 && (
                      <div className="space-y-3 pt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Try asking:</p>
                        <div className="flex flex-wrap gap-2">
                          {conversationStarters.map((starter, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickReply(starter)}
                              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm transition-colors"
                            >
                              {starter}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border px-4 py-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything..."
                    className="flex-1 pr-12 bg-transparent border-gray-200 dark:border-gray-700 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-600"
                  />
                  <Button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    size="icon"
                    className="absolute right-2 bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 text-gray-100 dark:text-gray-900"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        {/* Franchise Detail Sidebar - Right Column */}
        {selectedFranchise && (
          <>
            <ResizableHandle withHandle className="hidden lg:flex" />
            <ResizablePanel defaultSize={30} minSize={25} maxSize={40} className="hidden lg:block">
              <div className="h-full bg-card border-l border-border">
                <ScrollArea className="h-full">
                  <div className="space-y-6 p-6">
                    {/* Close Button */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl text-gray-900 dark:text-gray-100">Franchise Details</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedFranchise(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Banner Image */}
                    <div className="aspect-video -mx-6 overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={selectedFranchise.banner} 
                        alt={selectedFranchise.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Header */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-4xl">{selectedFranchise.logo}</div>
                            <div>
                              <h3 className="text-2xl text-gray-900 dark:text-gray-100">
                                {selectedFranchise.name}
                              </h3>
                              <p className="text-gray-500 dark:text-gray-400">
                                {selectedFranchise.tagline}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 text-sm">
                          {selectedFranchise.matchScore}% match
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                          {selectedFranchise.industry}
                        </Badge>
                        <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                          Est. {selectedFranchise.established}
                        </Badge>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">ROI</span>
                        </div>
                        <div className="text-2xl text-gray-900 dark:text-gray-100">
                          {selectedFranchise.roi}%
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Active Units</span>
                        </div>
                        <div className="text-2xl text-gray-900 dark:text-gray-100">
                          {selectedFranchise.activeUnits}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Avg Revenue</span>
                        </div>
                        <div className="text-lg text-gray-900 dark:text-gray-100">
                          {formatCurrency(selectedFranchise.avgRevenue)}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                        </div>
                        <div className="text-2xl text-gray-900 dark:text-gray-100">
                          {selectedFranchise.successRate}%
                        </div>
                      </div>
                    </div>

                    {/* Investment Details */}
                    <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h3 className="text-gray-900 dark:text-gray-100">Investment Range</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Minimum</span>
                          <span className="text-gray-900 dark:text-gray-100">
                            {formatCurrency(selectedFranchise.investmentMin)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Maximum</span>
                          <span className="text-gray-900 dark:text-gray-100">
                            {formatCurrency(selectedFranchise.investmentMax)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-3">
                      <h3 className="text-gray-900 dark:text-gray-100">Franchise Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <Award className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Training</div>
                            <div className="text-gray-900 dark:text-gray-100">{selectedFranchise.training}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Available Territories</div>
                            <div className="text-gray-900 dark:text-gray-100">
                              {selectedFranchise.territoryAvailable} locations
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Time to Profitability</div>
                            <div className="text-gray-900 dark:text-gray-100">
                              {selectedFranchise.timeToProfitability} months
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <Star className="w-5 h-5 text-amber-500 mt-0.5" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Score</div>
                            <div className="text-gray-900 dark:text-gray-100">
                              {selectedFranchise.satisfactionScore}/5.0
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-2 pt-4">
                      <Button 
                        className="w-full bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 text-gray-100 dark:text-gray-900"
                        size="lg"
                      >
                        Request Information
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        size="lg"
                      >
                        Schedule Consultation
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {/* Mobile Overlay for Franchise Details */}
      {selectedFranchise && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background">
          <ScrollArea className="h-full">
            <div className="space-y-6 p-6">
              {/* Close Button */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl text-gray-900 dark:text-gray-100">Franchise Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFranchise(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Banner Image */}
              <div className="aspect-video -mx-6 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img 
                  src={selectedFranchise.banner} 
                  alt={selectedFranchise.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-4xl">{selectedFranchise.logo}</div>
                      <div>
                        <h3 className="text-2xl text-gray-900 dark:text-gray-100">
                          {selectedFranchise.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {selectedFranchise.tagline}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 text-sm">
                    {selectedFranchise.matchScore}% match
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                    {selectedFranchise.industry}
                  </Badge>
                  <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                    Est. {selectedFranchise.established}
                  </Badge>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">ROI</span>
                  </div>
                  <div className="text-2xl text-gray-900 dark:text-gray-100">
                    {selectedFranchise.roi}%
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Units</span>
                  </div>
                  <div className="text-2xl text-gray-900 dark:text-gray-100">
                    {selectedFranchise.activeUnits}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg Revenue</span>
                  </div>
                  <div className="text-lg text-gray-900 dark:text-gray-100">
                    {formatCurrency(selectedFranchise.avgRevenue)}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                  </div>
                  <div className="text-2xl text-gray-900 dark:text-gray-100">
                    {selectedFranchise.successRate}%
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-gray-900 dark:text-gray-100">Investment Range</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Minimum</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatCurrency(selectedFranchise.investmentMin)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Maximum</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatCurrency(selectedFranchise.investmentMax)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-3">
                <h3 className="text-gray-900 dark:text-gray-100">Franchise Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Award className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Training</div>
                      <div className="text-gray-900 dark:text-gray-100">{selectedFranchise.training}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Available Territories</div>
                      <div className="text-gray-900 dark:text-gray-100">
                        {selectedFranchise.territoryAvailable} locations
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Time to Profitability</div>
                      <div className="text-gray-900 dark:text-gray-100">
                        {selectedFranchise.timeToProfitability} months
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Star className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Score</div>
                      <div className="text-gray-900 dark:text-gray-100">
                        {selectedFranchise.satisfactionScore}/5.0
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 pt-4 pb-8">
                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 text-gray-100 dark:text-gray-900"
                  size="lg"
                >
                  Request Information
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  size="lg"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
