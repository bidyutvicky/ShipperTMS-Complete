import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Zap,
  Brain,
  Database,
  Key,
  Globe,
  Palette,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Users,
  Building,
  CreditCard,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState<any>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettingsData();
  }, []);

  const loadSettingsData = async () => {
    try {
      setLoading(true);

      // Mock settings data
      const mockSettings = {
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@company.com',
          phone: '+1-555-0123',
          title: 'Transportation Manager',
          department: 'Logistics',
          location: 'Dallas, TX',
          timezone: 'America/Chicago',
          language: 'English',
        },
        company: {
          name: 'Acme Logistics Corp',
          address: '123 Business Ave',
          city: 'Dallas',
          state: 'TX',
          zipCode: '75201',
          country: 'United States',
          phone: '+1-555-0100',
          website: 'www.acmelogistics.com',
          taxId: '12-3456789',
        },
        notifications: {
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          weeklyReports: true,
          exceptionAlerts: true,
          performanceAlerts: true,
          costAlerts: true,
          complianceAlerts: true,
          aiInsights: true,
          marketingEmails: false,
        },
        ai: {
          autoOptimization: true,
          predictiveAnalytics: true,
          smartRecommendations: true,
          anomalyDetection: true,
          autoRouting: false,
          autoCarrierSelection: true,
          learningMode: true,
          confidenceThreshold: 85,
        },
        security: {
          twoFactorAuth: true,
          sessionTimeout: 30,
          passwordExpiry: 90,
          ipWhitelist: false,
          auditLogging: true,
          dataEncryption: true,
          ssoEnabled: false,
        },
        integrations: {
          carrierAPIs: true,
          erpIntegration: true,
          weatherAPI: true,
          trafficAPI: true,
          gpsTracking: true,
          customsAPI: false,
          bankingAPI: true,
        },
        preferences: {
          theme: 'light',
          currency: 'USD',
          units: 'imperial',
          dateFormat: 'MM/DD/YYYY',
          timeFormat: '12h',
          defaultView: 'dashboard',
          autoRefresh: true,
          refreshInterval: 30,
        },
      };

      setSettings(mockSettings);
    } catch (error) {
      console.error('Failed to load settings data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load settings data. Using demo data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setHasChanges(false);
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleResetToDefaults = () => {
    toast({
      title: 'Reset to Defaults',
      description: 'Settings have been reset to default values.',
    });
    setHasChanges(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading settings...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
              <p className="text-gray-600">Configure your TMS preferences and system settings</p>
            </div>
            <div className="flex items-center space-x-4">
              {hasChanges && (
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" onClick={handleResetToDefaults}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings} disabled={!hasChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="ai">AI Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                      value={settings.profile.firstName}
                      onChange={(e) => handleSettingChange('profile', 'firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                      value={settings.profile.lastName}
                      onChange={(e) => handleSettingChange('profile', 'lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={settings.profile.phone}
                      onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Job Title</label>
                    <Input
                      value={settings.profile.title}
                      onChange={(e) => handleSettingChange('profile', 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <Input
                      value={settings.profile.department}
                      onChange={(e) => handleSettingChange('profile', 'department', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={settings.profile.location}
                      onChange={(e) => handleSettingChange('profile', 'location', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Timezone</label>
                    <select
                      className="w-full border rounded px-3 py-2"
                      value={settings.profile.timezone}
                      onChange={(e) => handleSettingChange('profile', 'timezone', e.target.value)}
                    >
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="America/Denver">Mountain Time</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  <span>Company Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input
                      value={settings.company.name}
                      onChange={(e) => handleSettingChange('company', 'name', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      value={settings.company.address}
                      onChange={(e) => handleSettingChange('company', 'address', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <Input
                      value={settings.company.city}
                      onChange={(e) => handleSettingChange('company', 'city', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">State</label>
                    <Input
                      value={settings.company.state}
                      onChange={(e) => handleSettingChange('company', 'state', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">ZIP Code</label>
                    <Input
                      value={settings.company.zipCode}
                      onChange={(e) => handleSettingChange('company', 'zipCode', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={settings.company.phone}
                      onChange={(e) => handleSettingChange('company', 'phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Website</label>
                    <Input
                      value={settings.company.website}
                      onChange={(e) => handleSettingChange('company', 'website', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tax ID</label>
                    <Input
                      value={settings.company.taxId}
                      onChange={(e) => handleSettingChange('company', 'taxId', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Delivery Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>Email Notifications</span>
                      </div>
                      <Switch
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>SMS Notifications</span>
                      </div>
                      <Switch
                        checked={settings.notifications.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'smsNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-gray-500" />
                        <span>Push Notifications</span>
                      </div>
                      <Switch
                        checked={settings.notifications.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'pushNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Alert Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Exception Alerts</span>
                      <Switch
                        checked={settings.notifications.exceptionAlerts}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'exceptionAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Performance Alerts</span>
                      <Switch
                        checked={settings.notifications.performanceAlerts}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'performanceAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cost Alerts</span>
                      <Switch
                        checked={settings.notifications.costAlerts}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'costAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Compliance Alerts</span>
                      <Switch
                        checked={settings.notifications.complianceAlerts}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'complianceAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>AI Insights</span>
                      <Switch
                        checked={settings.notifications.aiInsights}
                        onCheckedChange={(checked) => handleSettingChange('notifications', 'aiInsights', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>AI & Automation Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">AI Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span>Auto Optimization</span>
                        <p className="text-sm text-gray-600">Automatically optimize load plans</p>
                      </div>
                      <Switch
                        checked={settings.ai.autoOptimization}
                        onCheckedChange={(checked) => handleSettingChange('ai', 'autoOptimization', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span>Predictive Analytics</span>
                        <p className="text-sm text-gray-600">Predict delays and issues</p>
                      </div>
                      <Switch
                        checked={settings.ai.predictiveAnalytics}
                        onCheckedChange={(checked) => handleSettingChange('ai', 'predictiveAnalytics', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span>Smart Recommendations</span>
                        <p className="text-sm text-gray-600">AI-powered suggestions</p>
                      </div>
                      <Switch
                        checked={settings.ai.smartRecommendations}
                        onCheckedChange={(checked) => handleSettingChange('ai', 'smartRecommendations', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span>Auto Carrier Selection</span>
                        <p className="text-sm text-gray-600">Automatically select best carriers</p>
                      </div>
                      <Switch
                        checked={settings.ai.autoCarrierSelection}
                        onCheckedChange={(checked) => handleSettingChange('ai', 'autoCarrierSelection', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">AI Configuration</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Confidence Threshold</label>
                      <div className="flex items-center space-x-4 mt-2">
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={settings.ai.confidenceThreshold}
                          onChange={(e) => handleSettingChange('ai', 'confidenceThreshold', parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-12">{settings.ai.confidenceThreshold}%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Minimum confidence level for AI recommendations</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Authentication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span>Two-Factor Authentication</span>
                        <p className="text-sm text-gray-600">Add extra security to your account</p>
                      </div>
                      <Switch
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) => handleSettingChange('security', 'twoFactorAuth', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span>Single Sign-On (SSO)</span>
                        <p className="text-sm text-gray-600">Enable SSO integration</p>
                      </div>
                      <Switch
                        checked={settings.security.ssoEnabled}
                        onCheckedChange={(checked) => handleSettingChange('security', 'ssoEnabled', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Session Management</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Session Timeout (minutes)</label>
                      <Input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Password Expiry (days)</label>
                      <Input
                        type="number"
                        value={settings.security.passwordExpiry}
                        onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Data Protection</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Audit Logging</span>
                      <Switch
                        checked={settings.security.auditLogging}
                        onCheckedChange={(checked) => handleSettingChange('security', 'auditLogging', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Data Encryption</span>
                      <Switch
                        checked={settings.security.dataEncryption}
                        onCheckedChange={(checked) => handleSettingChange('security', 'dataEncryption', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  <span>System Integrations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">External APIs</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span>Carrier APIs</span>
                        <p className="text-sm text-gray-600">Direct carrier integrations</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600">Connected</Badge>
                        <Switch
                          checked={settings.integrations.carrierAPIs}
                          onCheckedChange={(checked) => handleSettingChange('integrations', 'carrierAPIs', checked)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span>ERP Integration</span>
                        <p className="text-sm text-gray-600">Enterprise resource planning</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600">Connected</Badge>
                        <Switch
                          checked={settings.integrations.erpIntegration}
                          onCheckedChange={(checked) => handleSettingChange('integrations', 'erpIntegration', checked)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span>Weather API</span>
                        <p className="text-sm text-gray-600">Real-time weather data</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600">Connected</Badge>
                        <Switch
                          checked={settings.integrations.weatherAPI}
                          onCheckedChange={(checked) => handleSettingChange('integrations', 'weatherAPI', checked)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span>GPS Tracking</span>
                        <p className="text-sm text-gray-600">Real-time location tracking</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600">Connected</Badge>
                        <Switch
                          checked={settings.integrations.gpsTracking}
                          onCheckedChange={(checked) => handleSettingChange('integrations', 'gpsTracking', checked)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span>Banking API</span>
                        <p className="text-sm text-gray-600">Payment processing</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-600">Connected</Badge>
                        <Switch
                          checked={settings.integrations.bankingAPI}
                          onCheckedChange={(checked) => handleSettingChange('integrations', 'bankingAPI', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;