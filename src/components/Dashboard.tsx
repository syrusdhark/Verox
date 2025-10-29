import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Search,
  Bell,
  Settings,
  Home,
  BarChart3,
  LogOut,
  Flame,
  Wind,
  Snowflake,
  MessageCircle
} from "lucide-react";
import { mockLeads, Lead, leadSourceData, conversionTrendData } from "../lib/mock-data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AnalyticsScreen } from "./AnalyticsScreen";
import { LeadsScreen } from "./LeadsScreen";
import { MessagesScreen } from "./MessagesScreen";
import { SettingsScreen } from "./SettingsScreen";
import veroLogo from "figma:asset/1a29221577cf591b7faa7cb6c6c272ef9611797d.png";

interface DashboardProps {
  onViewLead: (lead: Lead) => void;
  onGoToConversation?: () => void;
  onGoToHome?: () => void;
}

type DashboardView = 'home' | 'leads' | 'analytics' | 'messages' | 'settings';

export function Dashboard({ onViewLead, onGoToConversation, onGoToHome }: DashboardProps) {
  const [currentView, setCurrentView] = useState<DashboardView>('home');

  const getQualityIcon = (quality: Lead['quality']) => {
    switch (quality) {
      case 'hot': return <Flame className="w-4 h-4 text-red-500" />;
      case 'warm': return <Wind className="w-4 h-4 text-amber-500" />;
      case 'cold': return <Snowflake className="w-4 h-4 text-blue-500" />;
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
      new: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
      qualified: 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100',
      interested: 'bg-gray-300 text-gray-900 dark:bg-gray-500 dark:text-gray-50',
      negotiating: 'bg-gray-400 text-gray-900 dark:bg-gray-400 dark:text-gray-900',
      closed: 'bg-gray-900 text-gray-50 dark:bg-gray-100 dark:text-gray-900',
    };
    return variants[stage];
  };

  const totalLeads = mockLeads.length;
  const activeConversations = mockLeads.filter(l => ['interested', 'negotiating'].includes(l.stage)).length;
  const conversionRate = 23.5;
  const avgResponseTime = "12 min";

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6">
          <div 
            className="flex items-center gap-3 mb-2 cursor-pointer group"
            onClick={onGoToHome}
          >
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600 group-hover:border-gray-400 dark:group-hover:border-gray-400 transition-colors">
              <img src={veroLogo} alt="VeroX AI" className="w-6 h-6" />
            </div>
            <h1 className="text-xl text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">VeroX AI</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Owner Dashboard</p>
        </div>

        <nav className="flex-1 px-4">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${currentView === 'home' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              onClick={() => setCurrentView('home')}
            >
              <Home className="w-4 h-4 mr-3" />
              Home
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${currentView === 'leads' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              onClick={() => setCurrentView('leads')}
            >
              <Users className="w-4 h-4 mr-3" />
              Leads
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${currentView === 'analytics' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              onClick={() => setCurrentView('analytics')}
            >
              <BarChart3 className="w-4 h-4 mr-3" />
              Analytics
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${currentView === 'messages' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              onClick={() => setCurrentView('messages')}
            >
              <MessageSquare className="w-4 h-4 mr-3" />
              Messages
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${currentView === 'settings' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              onClick={() => setCurrentView('settings')}
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Button>
            {onGoToConversation && (
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={onGoToConversation}
              >
                <MessageCircle className="w-4 h-4 mr-3" />
                Conversation
              </Button>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-400">
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search leads, messages, analytics..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarFallback>FO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          {currentView === 'home' && (
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Total Leads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-gray-900 dark:text-gray-100">{totalLeads}</div>
                    <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>12%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">+8 from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Active Conversations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-gray-900 dark:text-gray-100">{activeConversations}</div>
                    <MessageSquare className="w-8 h-8 text-indigo-200 dark:text-indigo-700" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">In progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-gray-900 dark:text-gray-100">{conversionRate}%</div>
                    <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>5%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Above industry avg</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-gray-900 dark:text-gray-100">{avgResponseTime}</div>
                    <Clock className="w-8 h-8 text-emerald-200 dark:text-emerald-700" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Excellent performance</p>
                </CardContent>
              </Card>
            </div>

            {/* Lead Pipeline & Analytics */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Lead Pipeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Lead Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="kanban">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="kanban">Kanban</TabsTrigger>
                      <TabsTrigger value="list">List</TabsTrigger>
                    </TabsList>
                    <TabsContent value="kanban" className="mt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Stage Distribution</span>
                        </div>
                        {Object.entries(mockLeads.reduce((acc, lead) => {
                          acc[lead.stage] = (acc[lead.stage] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)).map(([stage, count]) => (
                          <div key={stage} className="flex items-center gap-3">
                            <Badge className={getStageBadge(stage as Lead['stage'])}>
                              {stage}
                            </Badge>
                            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gray-900 dark:bg-gray-100 h-2 rounded-full" 
                                style={{ width: `${(count / totalLeads) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{count}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="list" className="mt-4">
                      <div className="space-y-2">
                        {mockLeads.slice(0, 3).map(lead => (
                          <div 
                            key={lead.id} 
                            className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                            onClick={() => onViewLead(lead)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-900 dark:text-gray-100">{lead.name}</span>
                              {getQualityIcon(lead.quality)}
                            </div>
                            <Badge className={`${getStageBadge(lead.stage)} text-xs`}>
                              {lead.stage}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Lead Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                      >
                        {leadSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E5E7EB' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Conversion Trends & Recent Conversations */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Conversion Trends */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Conversion Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={conversionTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="week" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E5E7EB' }} />
                      <Line 
                        type="monotone" 
                        dataKey="leads" 
                        stroke="#1F2937" 
                        strokeWidth={2}
                        name="Total Leads"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="conversions" 
                        stroke="#6B7280" 
                        strokeWidth={2}
                        name="Conversions"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Conversations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Conversations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockLeads.slice(0, 4).map(lead => (
                      <div 
                        key={lead.id}
                        className="flex gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg -mx-2"
                        onClick={() => onViewLead(lead)}
                      >
                        <Avatar>
                          <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-900 dark:text-gray-100 truncate">{lead.name}</span>
                            {getQualityIcon(lead.quality)}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{lead.lastMessage}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {new Date(lead.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          )}

          {currentView === 'leads' && <LeadsScreen onViewLead={onViewLead} />}
          {currentView === 'analytics' && <AnalyticsScreen />}
          {currentView === 'messages' && <MessagesScreen onViewLead={onViewLead} />}
          {currentView === 'settings' && <SettingsScreen />}
        </div>
      </div>
    </div>
  );
}
