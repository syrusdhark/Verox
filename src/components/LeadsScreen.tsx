import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Search,
  Filter,
  Download,
  Flame,
  Wind,
  Snowflake,
  Mail,
  Phone,
  Calendar
} from "lucide-react";
import { Lead, mockLeads } from "../lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface LeadsScreenProps {
  onViewLead: (lead: Lead) => void;
}

export function LeadsScreen({ onViewLead }: LeadsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuality, setFilterQuality] = useState<string>("all");
  const [filterStage, setFilterStage] = useState<string>("all");

  // Generate more leads for demo
  const allLeads = [
    ...mockLeads,
    {
      id: '5',
      name: 'Jennifer Martinez',
      email: 'j.martinez@email.com',
      phone: '+1 (555) 567-8901',
      quality: 'warm' as const,
      stage: 'qualified' as const,
      budget: '$150k-$300k',
      timeline: '3-6 months',
      lastMessage: 'What kind of support do you provide?',
      timestamp: new Date(Date.now() - 21600000),
      sentiment: 'positive' as const,
      intentScore: 82,
      franchise: 'BrewMaster Coffee',
    },
    {
      id: '6',
      name: 'Robert Taylor',
      email: 'r.taylor@business.com',
      phone: '+1 (555) 678-9012',
      quality: 'hot' as const,
      stage: 'interested' as const,
      budget: '$100k-$250k',
      timeline: 'Immediate',
      lastMessage: 'Ready to move forward. Let\'s talk numbers.',
      timestamp: new Date(Date.now() - 5400000),
      sentiment: 'positive' as const,
      intentScore: 94,
      franchise: 'Pizza Paradise',
    },
    {
      id: '7',
      name: 'Amanda White',
      email: 'a.white@gmail.com',
      phone: '+1 (555) 789-0123',
      quality: 'warm' as const,
      stage: 'new' as const,
      budget: '$200k-$500k',
      timeline: '6-12 months',
      lastMessage: 'Tell me more about the fitness franchise.',
      timestamp: new Date(Date.now() - 10800000),
      sentiment: 'neutral' as const,
      intentScore: 68,
      franchise: 'FitZone 24/7',
    },
    {
      id: '8',
      name: 'James Brown',
      email: 'j.brown@startup.io',
      phone: '+1 (555) 890-1234',
      quality: 'cold' as const,
      stage: 'new' as const,
      budget: 'Not specified',
      timeline: 'Researching',
      lastMessage: 'Just looking around.',
      timestamp: new Date(Date.now() - 32400000),
      sentiment: 'neutral' as const,
      intentScore: 38,
      franchise: 'CleanPro Services',
    },
  ];

  const filteredLeads = allLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.franchise.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesQuality = filterQuality === "all" || lead.quality === filterQuality;
    const matchesStage = filterStage === "all" || lead.stage === filterStage;
    return matchesSearch && matchesQuality && matchesStage;
  });

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

  const qualityStats = {
    hot: allLeads.filter(l => l.quality === 'hot').length,
    warm: allLeads.filter(l => l.quality === 'warm').length,
    cold: allLeads.filter(l => l.quality === 'cold').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-foreground mb-2">Leads</h1>
          <p className="text-muted-foreground">Manage and track all your franchise leads</p>
        </div>
        <Button className="bg-foreground hover:bg-foreground/90 text-background">
          <Download className="w-4 h-4 mr-2" />
          Export Leads
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Leads</p>
              <p className="text-2xl text-foreground">{allLeads.length}</p>
            </div>
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Hot Leads</p>
              <p className="text-2xl text-foreground">{qualityStats.hot}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-950 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Warm Leads</p>
              <p className="text-2xl text-foreground">{qualityStats.warm}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950 rounded-lg flex items-center justify-center">
              <Wind className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cold Leads</p>
              <p className="text-2xl text-foreground">{qualityStats.cold}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
              <Snowflake className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or franchise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterQuality} onValueChange={setFilterQuality}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Qualities</SelectItem>
              <SelectItem value="hot">Hot</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cold">Cold</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStage} onValueChange={setFilterStage}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="negotiating">Negotiating</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Leads Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Franchise</TableHead>
              <TableHead>Quality</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="cursor-pointer hover:bg-accent">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm text-foreground">{lead.name}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {getQualityIcon(lead.quality)}
                        <span className="text-xs text-muted-foreground">
                          {lead.intentScore}% intent
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {lead.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {lead.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-foreground">{lead.franchise}</span>
                </TableCell>
                <TableCell>
                  <Badge className={getQualityBadge(lead.quality)}>
                    {lead.quality.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStageBadge(lead.stage)}>
                    {lead.stage}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-foreground">{lead.budget}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {lead.timeline}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {new Date(lead.timestamp).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewLead(lead)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No leads found matching your filters</p>
        </div>
      )}
    </div>
  );
}
