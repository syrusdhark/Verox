import { Franchise, revenueData } from "../lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  GraduationCap,
  Star,
  MapPin,
  Clock,
  Award,
  Phone
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface FranchiseDetailModalProps {
  franchise: Franchise | null;
  open: boolean;
  onClose: () => void;
}

export function FranchiseDetailModal({ franchise, open, onClose }: FranchiseDetailModalProps) {
  if (!franchise) return null;

  const investmentBreakdown = [
    { name: 'Franchise Fee', value: franchise.investmentMin * 0.25, color: '#4F46E5' },
    { name: 'Equipment', value: franchise.investmentMin * 0.35, color: '#10B981' },
    { name: 'Real Estate', value: franchise.investmentMin * 0.25, color: '#F59E0B' },
    { name: 'Working Capital', value: franchise.investmentMin * 0.15, color: '#EF4444' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{franchise.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed information about {franchise.name} franchise opportunity
          </DialogDescription>
        </DialogHeader>

        {/* Hero Section */}
        <div className="relative h-48 -mt-6 -mx-6 mb-6">
          <ImageWithFallback
            src={franchise.banner}
            alt={franchise.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-6 flex items-center gap-4">
            <div className="text-5xl bg-white rounded-xl p-3">{franchise.logo}</div>
            <div>
              <h2 className="text-2xl text-white">{franchise.name}</h2>
              <p className="text-white/90">{franchise.tagline}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <DollarSign className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600 mb-1">Investment</div>
            <div className="text-gray-900">${(franchise.investmentMin / 1000).toFixed(0)}k-${(franchise.investmentMax / 1000).toFixed(0)}k</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Users className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600 mb-1">Active Units</div>
            <div className="text-gray-900">{franchise.activeUnits}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-amber-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600 mb-1">Avg Revenue</div>
            <div className="text-gray-900">${(franchise.avgRevenue / 1000).toFixed(0)}k</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <GraduationCap className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600 mb-1">Training</div>
            <div className="text-xs text-gray-900">{franchise.training}</div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-4">About This Franchise</h3>
              <p className="text-gray-600 leading-relaxed">
                {franchise.name} has been a leader in the {franchise.industry.toLowerCase()} industry since {franchise.established}. 
                With {franchise.activeUnits} successful locations and a proven business model, we offer comprehensive support 
                to help you succeed. Our franchisees benefit from ongoing training, marketing support, and a collaborative 
                network of experienced operators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-900">Franchisee Satisfaction</span>
                </div>
                <div className="text-2xl text-gray-900">{franchise.satisfactionScore}/5.0</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-900">Time to Profitability</span>
                </div>
                <div className="text-2xl text-gray-900">{franchise.timeToProfitability} months</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-4">Revenue Growth Projection</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#1F2937" 
                    fill="#1F2937" 
                    fillOpacity={0.2}
                    name="Actual Revenue"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="projected" 
                    stroke="#6B7280" 
                    fill="#6B7280" 
                    fillOpacity={0.1}
                    strokeDasharray="5 5"
                    name="Projected"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg text-gray-900 mb-4">Investment Breakdown</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={investmentBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {investmentBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-lg text-gray-900 mb-4">Success Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">ROI</span>
                    <span className="text-emerald-600">{franchise.roi}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="text-gray-900">{franchise.successRate}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Support Rating</span>
                    <span className="text-gray-900">{franchise.supportRating}/5.0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Territories Available</span>
                    <span className="text-gray-900">{franchise.territoryAvailable}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-4">Investment Requirements</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div>
                    <div className="text-gray-900">Total Investment</div>
                    <div className="text-sm text-gray-600">
                      ${(franchise.investmentMin / 1000).toFixed(0)}k - ${(franchise.investmentMax / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <div className="text-gray-900">Liquid Capital Required</div>
                    <div className="text-sm text-gray-600">
                      ${(franchise.investmentMin * 0.3 / 1000).toFixed(0)}k minimum
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <div className="text-gray-900">Territory Availability</div>
                    <div className="text-sm text-gray-600">
                      {franchise.territoryAvailable} territories currently available
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 mb-4">Qualifications</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                  Business experience preferred but not required
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                  Strong management and leadership skills
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                  Commitment to brand standards and values
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                  Financial stability and creditworthiness
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg text-gray-900 mb-4">Training Program</h3>
              <p className="text-gray-600 mb-4">{franchise.training}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-gray-900 mb-2">Initial Training</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Comprehensive operations training</li>
                    <li>• Marketing and sales fundamentals</li>
                    <li>• Systems and technology setup</li>
                    <li>• Financial management basics</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-gray-900 mb-2">Ongoing Support</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 24/7 helpdesk support</li>
                    <li>• Regular training updates</li>
                    <li>• Field representative visits</li>
                    <li>• Annual conferences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg text-gray-900 mb-4">Marketing Support</h3>
              <p className="text-gray-600">
                National marketing campaigns, local store marketing materials, social media support, 
                and dedicated marketing coordinators to help drive customer acquisition and retention.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">John D. - Florida</span>
                </div>
                <p className="text-gray-700">
                  "Best decision I've ever made! The support from the corporate team is outstanding, 
                  and the business model really works. Hit profitability in just 14 months."
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Maria S. - California</span>
                </div>
                <p className="text-gray-700">
                  "The training program was comprehensive and the ongoing support is excellent. 
                  I feel confident running my location and the revenue has exceeded expectations."
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-600">Robert K. - Texas</span>
                </div>
                <p className="text-gray-700">
                  "Solid franchise with good systems in place. The initial investment was higher than 
                  expected, but the returns are worth it."
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button className="flex-1 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900">
            <Phone className="w-4 h-4 mr-2" />
            Connect with Representative
          </Button>
          <Button variant="outline" className="flex-1">
            Download Franchise Disclosure
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
