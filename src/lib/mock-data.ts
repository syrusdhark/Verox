// Mock data for the franchise platform

export interface Franchise {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  banner: string;
  industry: string;
  investmentMin: number;
  investmentMax: number;
  roi: number;
  successRate: number;
  matchScore: number;
  activeUnits: number;
  avgRevenue: number;
  training: string;
  established: number;
  territoryAvailable: number;
  satisfactionScore: number;
  timeToProfitability: number;
  supportRating: number;
}

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: Date;
  preview: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  quality: 'hot' | 'warm' | 'cold';
  stage: 'new' | 'qualified' | 'interested' | 'negotiating' | 'closed';
  budget: string;
  timeline: string;
  lastMessage: string;
  timestamp: Date;
  sentiment: 'positive' | 'neutral' | 'negative';
  intentScore: number;
  franchise: string;
}

export const franchises: Franchise[] = [
  {
    id: '1',
    name: 'BrewMaster Coffee',
    tagline: 'Premium Coffee Experience',
    logo: '☕',
    banner: 'https://images.unsplash.com/photo-1646681828239-843f5ed340de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxNzE5NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    industry: 'Food & Beverage',
    investmentMin: 150000,
    investmentMax: 350000,
    roi: 35,
    successRate: 89,
    matchScore: 92,
    activeUnits: 245,
    avgRevenue: 520000,
    training: 'Comprehensive 6-week program',
    established: 2015,
    territoryAvailable: 38,
    satisfactionScore: 4.7,
    timeToProfitability: 18,
    supportRating: 4.8,
  },
  {
    id: '2',
    name: 'FitZone 24/7',
    tagline: 'Round-the-Clock Fitness',
    logo: '💪',
    banner: 'https://images.unsplash.com/photo-1632077804406-188472f1a810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2MTY0NTUyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    industry: 'Health & Fitness',
    investmentMin: 200000,
    investmentMax: 500000,
    roi: 42,
    successRate: 91,
    matchScore: 88,
    activeUnits: 412,
    avgRevenue: 680000,
    training: '8-week intensive training',
    established: 2012,
    territoryAvailable: 52,
    satisfactionScore: 4.6,
    timeToProfitability: 20,
    supportRating: 4.7,
  },
  {
    id: '3',
    name: 'Pizza Paradise',
    tagline: 'Authentic Italian Pizza',
    logo: '🍕',
    banner: 'https://images.unsplash.com/photo-1697376354276-18942b15de7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnQlMjBraXRjaGVufGVufDF8fHx8MTc2MTcwMTkxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    industry: 'Food & Beverage',
    investmentMin: 180000,
    investmentMax: 400000,
    roi: 38,
    successRate: 85,
    matchScore: 79,
    activeUnits: 328,
    avgRevenue: 590000,
    training: '5-week culinary program',
    established: 2010,
    territoryAvailable: 45,
    satisfactionScore: 4.5,
    timeToProfitability: 22,
    supportRating: 4.6,
  },
  {
    id: '4',
    name: 'CleanPro Services',
    tagline: 'Professional Cleaning Solutions',
    logo: '🧹',
    banner: 'https://images.unsplash.com/photo-1760827797819-4361cd5cd353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxNjE1NDQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    industry: 'Services',
    investmentMin: 50000,
    investmentMax: 120000,
    roi: 55,
    successRate: 93,
    matchScore: 95,
    activeUnits: 567,
    avgRevenue: 280000,
    training: '3-week operational training',
    established: 2008,
    territoryAvailable: 89,
    satisfactionScore: 4.8,
    timeToProfitability: 12,
    supportRating: 4.9,
  },
  {
    id: '5',
    name: 'HealthFirst Clinics',
    tagline: 'Preventive Healthcare Solutions',
    logo: '⚕️',
    banner: 'https://images.unsplash.com/photo-1666886573590-5815157da865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMG9mZmljZXxlbnwxfHx8fDE3NjE3MTk0NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    industry: 'Healthcare',
    investmentMin: 300000,
    investmentMax: 600000,
    roi: 48,
    successRate: 87,
    matchScore: 84,
    activeUnits: 156,
    avgRevenue: 850000,
    training: '12-week healthcare program',
    established: 2018,
    territoryAvailable: 67,
    satisfactionScore: 4.9,
    timeToProfitability: 24,
    supportRating: 4.8,
  },
];

export const conversationStarters = [
  "I have $100k to invest. Show me food franchises",
  "What are the fastest-growing franchises in healthcare?",
  "I want passive income. Which franchises work best?",
  "Show me low-cost franchise opportunities under $150k",
];

export const mockMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: "Hello! I'm your VeroX AI advisor. I'll help you find the perfect franchise opportunity that matches your goals, budget, and interests. What type of franchise are you interested in?",
    timestamp: new Date(Date.now() - 300000),
  },
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    quality: 'hot',
    stage: 'negotiating',
    budget: '$200k-$400k',
    timeline: '3-6 months',
    lastMessage: "I'd like to schedule a call to discuss the contract terms.",
    timestamp: new Date(Date.now() - 3600000),
    sentiment: 'positive',
    intentScore: 92,
    franchise: 'FitZone 24/7',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@business.com',
    phone: '+1 (555) 234-5678',
    quality: 'warm',
    stage: 'interested',
    budget: '$100k-$200k',
    timeline: '6-12 months',
    lastMessage: 'Can you send me more information about the training program?',
    timestamp: new Date(Date.now() - 7200000),
    sentiment: 'neutral',
    intentScore: 78,
    franchise: 'BrewMaster Coffee',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@gmail.com',
    phone: '+1 (555) 345-6789',
    quality: 'hot',
    stage: 'qualified',
    budget: '$50k-$150k',
    timeline: 'Immediate',
    lastMessage: 'I have the funding ready. What are the next steps?',
    timestamp: new Date(Date.now() - 1800000),
    sentiment: 'positive',
    intentScore: 95,
    franchise: 'CleanPro Services',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@startup.io',
    phone: '+1 (555) 456-7890',
    quality: 'cold',
    stage: 'new',
    budget: 'Not specified',
    timeline: 'Researching',
    lastMessage: 'Just browsing, thanks.',
    timestamp: new Date(Date.now() - 14400000),
    sentiment: 'neutral',
    intentScore: 45,
    franchise: 'Pizza Paradise',
  },
];

export const revenueData = [
  { month: 'Jan', revenue: 45000, projected: 48000 },
  { month: 'Feb', revenue: 52000, projected: 54000 },
  { month: 'Mar', revenue: 48000, projected: 56000 },
  { month: 'Apr', revenue: 61000, projected: 62000 },
  { month: 'May', revenue: 55000, projected: 65000 },
  { month: 'Jun', revenue: 67000, projected: 68000 },
  { month: 'Jul', revenue: 72000, projected: 72000 },
  { month: 'Aug', revenue: 68000, projected: 75000 },
  { month: 'Sep', revenue: 78000, projected: 78000 },
  { month: 'Oct', revenue: 82000, projected: 82000 },
  { month: 'Nov', revenue: 85000, projected: 85000 },
  { month: 'Dec', revenue: 90000, projected: 90000 },
];

export const leadSourceData = [
  { name: 'Organic Search', value: 35, color: '#4F46E5' },
  { name: 'Social Media', value: 25, color: '#10B981' },
  { name: 'Referrals', value: 20, color: '#F59E0B' },
  { name: 'Direct', value: 15, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#6B7280' },
];

export const conversionTrendData = [
  { week: 'Week 1', leads: 45, conversions: 12 },
  { week: 'Week 2', leads: 52, conversions: 15 },
  { week: 'Week 3', leads: 49, conversions: 14 },
  { week: 'Week 4', leads: 63, conversions: 19 },
  { week: 'Week 5', leads: 58, conversions: 17 },
  { week: 'Week 6', leads: 71, conversions: 22 },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Food Franchise Opportunities',
    messages: [],
    lastMessage: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    preview: 'Looking for food franchise options with good ROI...',
  },
  {
    id: '2',
    title: 'Healthcare Investment',
    messages: [],
    lastMessage: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    preview: 'Interested in healthcare franchises with low investment...',
  },
  {
    id: '3',
    title: 'Fitness Franchise Research',
    messages: [],
    lastMessage: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    preview: 'What are the best fitness franchises in 2025?',
  },
  {
    id: '4',
    title: 'Quick Service Restaurants',
    messages: [],
    lastMessage: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    preview: 'Tell me about QSR franchise opportunities...',
  },
];
