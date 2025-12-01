import { Lead } from "../lib/mock-data";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { 
  ArrowLeft,
  Mail, 
  Phone, 
  DollarSign,
  Calendar,
  TrendingUp,
  MessageSquare,
  Clock,
  Smile,
  Meh,
  Frown,
  Sparkles,
  CalendarCheck,
  FileText,
  CheckCircle
} from "lucide-react";

interface LeadDetailViewProps {
  lead: Lead;
  onBack: () => void;
}

export function LeadDetailView({ lead, onBack }: LeadDetailViewProps) {
  const getSentimentIcon = (sentiment: Lead['sentiment']) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-5 h-5 text-emerald-600" />;
      case 'neutral': return <Meh className="w-5 h-5 text-gray-600" />;
      case 'negative': return <Frown className="w-5 h-5 text-red-600" />;
    }
  };

  const getSentimentColor = (sentiment: Lead['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'text-emerald-600';
      case 'neutral': return 'text-gray-600';
      case 'negative': return 'text-red-600';
    }
  };

  const getQualityBadge = (quality: Lead['quality']) => {
    const variants = {
      hot: 'bg-red-100 text-red-700',
      warm: 'bg-amber-100 text-amber-700',
      cold: 'bg-blue-100 text-blue-700',
    };
    return variants[quality];
  };

  const getStageBadge = (stage: Lead['stage']) => {
    const variants = {
      new: 'bg-gray-100 text-gray-700',
      qualified: 'bg-blue-100 text-blue-700',
      interested: 'bg-indigo-100 text-indigo-700',
      negotiating: 'bg-amber-100 text-amber-700',
      closed: 'bg-emerald-100 text-emerald-700',
    };
    return variants[stage];
  };

  // Mock conversation history
  const conversationHistory = [
    {
      id: '1',
      type: 'ai' as const,
      content: "Hello! I'm your VeroX AI advisor. How can I help you today?",
      timestamp: new Date(lead.timestamp.getTime() - 3600000),
    },
    {
      id: '2',
      type: 'user' as const,
      content: lead.lastMessage,
      timestamp: new Date(lead.timestamp.getTime() - 1800000),
    },
    {
      id: '3',
      type: 'ai' as const,
      content: `Great! I'd be happy to help you with ${lead.franchise}. Let me pull up the information for you.`,
      timestamp: new Date(lead.timestamp.getTime() - 900000),
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="w-12 h-12">
              <AvatarFallback className="text-lg">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl text-foreground">{lead.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getQualityBadge(lead.quality)}>
                  {lead.quality.toUpperCase()}
                </Badge>
                <Badge className={getStageBadge(lead.stage)}>
                  {lead.stage}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <CalendarCheck className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Send Proposal
            </Button>
            <Button className="bg-foreground hover:bg-foreground/90 text-background">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Qualified
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content - Conversation */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {conversationHistory.map((message) => (
                <div key={message.id} className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-1 max-w-[70%]">
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-foreground text-background'
                          : 'bg-card text-foreground border border-border'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <span className={`text-xs text-muted-foreground ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Reply Section */}
          <div className="border-t border-border p-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <textarea
                placeholder="Type your message..."
                className="w-full px-4 py-3 border border-border bg-background text-foreground rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <Button className="bg-foreground hover:bg-foreground/90 text-background">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Lead Info & AI Analysis */}
        <div className="w-96 bg-card border-l border-border overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{lead.budget}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{lead.timeline}</span>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Sentiment */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Sentiment</span>
                    <div className="flex items-center gap-2">
                      {getSentimentIcon(lead.sentiment)}
                      <span className={`text-sm ${getSentimentColor(lead.sentiment)}`}>
                        {lead.sentiment.charAt(0).toUpperCase() + lead.sentiment.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Intent Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Intent Score</span>
                    <span className="text-sm text-foreground">{lead.intentScore}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        lead.intentScore >= 80 ? 'bg-emerald-600 dark:bg-emerald-500' : 
                        lead.intentScore >= 60 ? 'bg-amber-600 dark:bg-amber-500' : 'bg-muted-foreground'
                      }`}
                      style={{ width: `${lead.intentScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Budget Range Detected */}
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm text-foreground">Budget Range Detected</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.budget}</p>
                </div>

                {/* Timeline Urgency */}
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm text-foreground">Timeline Urgency</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.timeline}</p>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recommended Next Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">Schedule Discovery Call</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      High intent score suggests they're ready for deeper conversation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">Send Franchise Disclosure</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      They've shown interest in {lead.franchise}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                  <CalendarCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">Set Follow-up Reminder</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Follow up within 24 hours to maintain engagement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Lead Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Interested Franchise</span>
                  <p className="text-sm text-foreground mt-1">{lead.franchise}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">First Contact</span>
                  <p className="text-sm text-foreground mt-1">
                    {lead.timestamp.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Source</span>
                  <p className="text-sm text-foreground mt-1">Organic Search</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
