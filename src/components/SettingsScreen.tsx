import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  CreditCard,
  Palette,
  Save,
  Upload
} from "lucide-react";
import { Separator } from "./ui/separator";

export function SettingsScreen() {
  const [notifications, setNotifications] = useState({
    emailLeads: true,
    emailMessages: true,
    emailWeekly: false,
    pushLeads: true,
    pushMessages: true,
    smsImportant: false,
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-gray-100 mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="franchise">
            <Building2 className="w-4 h-4 mr-2" />
            Franchise Info
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="text-2xl">FO</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@franchiseowner.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us a bit about yourself..."
                  defaultValue="Experienced franchise owner looking to expand my portfolio."
                  rows={4}
                />
              </div>

              <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Franchise Info Tab */}
        <TabsContent value="franchise" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Franchise Information</CardTitle>
              <CardDescription>
                Manage your franchise details and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="franchiseName">Franchise Name</Label>
                <Input id="franchiseName" defaultValue="BrewMaster Coffee" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue="Food & Beverage" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="established">Established Year</Label>
                  <Input id="established" type="number" defaultValue="2015" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="units">Active Units</Label>
                  <Input id="units" type="number" defaultValue="245" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="investmentMin">Min Investment ($)</Label>
                  <Input id="investmentMin" type="number" defaultValue="150000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investmentMax">Max Investment ($)</Label>
                  <Input id="investmentMax" type="number" defaultValue="350000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Franchise Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your franchise opportunity..."
                  rows={4}
                  defaultValue="Premium coffee shop franchise with a proven business model and comprehensive support."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input id="website" type="url" defaultValue="https://brewmastercoffee.com" />
              </div>

              <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900">
                <Save className="w-4 h-4 mr-2" />
                Update Franchise Info
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about leads and messages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-base text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailLeads" className="text-sm text-gray-900">New Leads</Label>
                      <p className="text-xs text-gray-500">Get notified when new leads arrive</p>
                    </div>
                    <Switch 
                      id="emailLeads"
                      checked={notifications.emailLeads}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, emailLeads: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailMessages" className="text-sm text-gray-900">New Messages</Label>
                      <p className="text-xs text-gray-500">Get notified about new messages</p>
                    </div>
                    <Switch 
                      id="emailMessages"
                      checked={notifications.emailMessages}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, emailMessages: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailWeekly" className="text-sm text-gray-900">Weekly Report</Label>
                      <p className="text-xs text-gray-500">Receive weekly performance summary</p>
                    </div>
                    <Switch 
                      id="emailWeekly"
                      checked={notifications.emailWeekly}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, emailWeekly: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-base text-gray-900 mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushLeads" className="text-sm text-gray-900">New Leads</Label>
                      <p className="text-xs text-gray-500">Push notifications for new leads</p>
                    </div>
                    <Switch 
                      id="pushLeads"
                      checked={notifications.pushLeads}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, pushLeads: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushMessages" className="text-sm text-gray-900">New Messages</Label>
                      <p className="text-xs text-gray-500">Push notifications for messages</p>
                    </div>
                    <Switch 
                      id="pushMessages"
                      checked={notifications.pushMessages}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, pushMessages: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-base text-gray-900 mb-4">SMS Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsImportant" className="text-sm text-gray-900">Important Updates</Label>
                      <p className="text-xs text-gray-500">SMS for critical notifications only</p>
                    </div>
                    <Switch 
                      id="smsImportant"
                      checked={notifications.smsImportant}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, smsImportant: checked})
                      }
                    />
                  </div>
                </div>
              </div>

              <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900">
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">Enable 2FA</p>
                  <p className="text-xs text-gray-500">Require verification code on login</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline">
                Configure 2FA
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                Manage your active sessions across devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">MacBook Pro - Chrome</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">San Francisco, CA - Active now</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">Current</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">iPhone - Safari</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">San Francisco, CA - 2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm">
                  Revoke
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-lg text-gray-900 dark:text-gray-100">Professional Plan</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Perfect for growing franchises</p>
                  </div>
                  <Badge className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900">Active</Badge>
                </div>
                <div className="text-2xl text-gray-900">$99<span className="text-base text-gray-600">/month</span></div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm text-gray-900">Plan Features:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Unlimited leads</li>
                  <li>• AI-powered matching</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                  <li>• Custom branding</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                Update your payment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gray-900 dark:bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white dark:text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
              <Button variant="outline">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your past invoices and payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { date: 'Oct 1, 2025', amount: '$99.00', status: 'Paid' },
                  { date: 'Sep 1, 2025', amount: '$99.00', status: 'Paid' },
                  { date: 'Aug 1, 2025', amount: '$99.00', status: 'Paid' },
                ].map((invoice, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">{invoice.date}</p>
                      <p className="text-xs text-gray-500">{invoice.amount}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700">{invoice.status}</Badge>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
