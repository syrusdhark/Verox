import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  TrendingUp, 
  Users, 
  DollarSign,
  Target,
  Calendar
} from "lucide-react";
import { 
  leadSourceData, 
  conversionTrendData, 
  revenueData 
} from "../lib/mock-data";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";

export function AnalyticsScreen() {
  const monthlyPerformance = [
    { month: 'Jan', leads: 45, qualified: 32, closed: 12, revenue: 145000 },
    { month: 'Feb', leads: 52, qualified: 38, closed: 15, revenue: 182000 },
    { month: 'Mar', leads: 48, qualified: 35, closed: 14, revenue: 168000 },
    { month: 'Apr', leads: 63, qualified: 45, closed: 19, revenue: 235000 },
    { month: 'May', leads: 58, qualified: 42, closed: 17, revenue: 210000 },
    { month: 'Jun', leads: 71, qualified: 52, closed: 22, revenue: 285000 },
  ];

  const geographicData = [
    { region: 'West Coast', leads: 145, color: '#1F2937' },
    { region: 'East Coast', leads: 123, color: '#4B5563' },
    { region: 'Midwest', leads: 98, color: '#6B7280' },
    { region: 'South', leads: 87, color: '#9CA3AF' },
    { region: 'Other', leads: 34, color: '#D1D5DB' },
  ];

  const hourlyActivity = [
    { hour: '9am', activity: 12 },
    { hour: '10am', activity: 25 },
    { hour: '11am', activity: 38 },
    { hour: '12pm', activity: 42 },
    { hour: '1pm', activity: 35 },
    { hour: '2pm', activity: 48 },
    { hour: '3pm', activity: 52 },
    { hour: '4pm', activity: 45 },
    { hour: '5pm', activity: 28 },
    { hour: '6pm', activity: 15 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive insights into your franchise lead performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Leads (6M)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-gray-900 dark:text-gray-100 mb-1">337</div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-3 h-3" />
              <span>+18.2% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-gray-900 dark:text-gray-100 mb-1">23.5%</div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-3 h-3" />
              <span>+5.3% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Revenue Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-gray-900 dark:text-gray-100 mb-1">$1.2M</div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-3 h-3" />
              <span>+24.1% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Avg. Time to Close
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-gray-900 dark:text-gray-100 mb-1">18 days</div>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-3 h-3 rotate-180" />
              <span>-2 days vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Lead Sources</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E5E7EB' }} />
                    <Area 
                      type="monotone" 
                      dataKey="leads" 
                      stroke="#1F2937" 
                      fill="#1F2937" 
                      fillOpacity={0.2}
                      name="Total Leads"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="qualified" 
                      stroke="#4B5563" 
                      fill="#4B5563" 
                      fillOpacity={0.2}
                      name="Qualified"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="closed" 
                      stroke="#6B7280" 
                      fill="#6B7280" 
                      fillOpacity={0.2}
                      name="Closed"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E5E7EB' }}
                    />
                    <Bar dataKey="revenue" fill="#6B7280" radius={[8, 8, 0, 0]} name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Leads</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">337 (100%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gray-900 dark:bg-gray-100 h-3 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Qualified</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">244 (72%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gray-900 dark:bg-gray-100 h-3 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Interested</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">142 (42%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gray-900 dark:bg-gray-100 h-3 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Negotiating</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">99 (29%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gray-900 dark:bg-gray-100 h-3 rounded-full" style={{ width: '29%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Closed</span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">79 (23.5%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gray-900 dark:bg-gray-100 h-3 rounded-full" style={{ width: '23.5%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Lead Source Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Source Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadSourceData.map((source) => (
                    <div key={source.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{source.name}</span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">{source.value}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ width: `${source.value}%`, backgroundColor: source.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Leads by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={geographicData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
                    <XAxis type="number" stroke="#6B7280" />
                    <YAxis dataKey="region" type="category" stroke="#6B7280" width={100} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E5E7EB' }} />
                    <Bar dataKey="leads" radius={[0, 8, 8, 0]}>
                      {geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Regional Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {geographicData.map((region) => (
                    <div key={region.region} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: region.color }}
                        ></div>
                        <span className="text-sm text-gray-900 dark:text-gray-100">{region.region}</span>
                      </div>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{region.leads} leads</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Hourly Activity Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-700" />
                  <XAxis dataKey="hour" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E5E7EB' }} />
                  <Line 
                    type="monotone" 
                    dataKey="activity" 
                    stroke="#1F2937" 
                    strokeWidth={3}
                    dot={{ fill: '#1F2937', r: 4 }}
                    name="Lead Activity"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-base">Peak Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900 dark:text-gray-100 mb-2">2-4 PM</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Highest lead activity period</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-base">Best Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900 dark:text-gray-100 mb-2">Tuesday</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Most qualified leads generated</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-base">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-gray-900 dark:text-gray-100 mb-2">12 min</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average first response time</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
