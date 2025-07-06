import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  Settings,
  Zap,
  TrendingUp,
  Truck,
  Package,
  DollarSign,
  MapPin,
  Users,
  Brain,
  Shield,
  Activity
} from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadAlertsData();
  }, []);

  const loadAlertsData = async () => {
    try {
      setLoading(true);
      
      // Mock alerts data
      const mockAlerts = [
        {
          id: 'alert-001',
          type: 'OPTIMIZATION_ALERT',
          title: 'High Consolidation Opportunity',
          message: '15 orders in TX-CA lane can be consolidated, potential savings: $4,200',
          priority: 'HIGH',
          status: 'ACTIVE',
          createdAt: new Date(Date.now() - 30 * 60 * 1000),
          category: 'Cost Optimization',
          icon: Brain,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          actionable: true,
          data: {
            orders: 15,
            lane: 'TX-CA',
            potentialSavings: 4200,
          },
        },
        {
          id: 'alert-002',
          type: 'EXCEPTION_ALERT',
          title: 'Weather Delay - Shipment SHIP-2024-045',
          message: 'Severe weather in Dallas causing 6-hour delay. Customer notification sent.',
          priority: 'MEDIUM',
          status: 'ACTIVE',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          category: 'Operations',
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          actionable: true,
          data: {
            shipmentId: 'SHIP-2024-045',
            delayHours: 6,
            location: 'Dallas, TX',
          },
        },
        {
          id: 'alert-003',
          type: 'COMPLIANCE_ALERT',
          title: 'Carrier Insurance Expiring',
          message: 'FastFreight LLC insurance expires in 15 days. Renewal required.',
          priority: 'HIGH',
          status: 'ACTIVE',
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          category: 'Compliance',
          icon: Shield,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          actionable: true,
          data: {
            carrierId: 'carr-001',
            carrierName: 'FastFreight LLC',
            expiryDays: 15,
          },
        },
        {
          id: 'alert-004',
          type: 'PERFORMANCE_ALERT',
          title: 'Carrier Performance Drop',
          message: 'RoadRunner Express on-time performance dropped to 85% (below 90% threshold)',
          priority: 'MEDIUM',
          status: 'ACTIVE',
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          category: 'Performance',
          icon: TrendingUp,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          actionable: true,
          data: {
            carrierId: 'carr-002',
            carrierName: 'RoadRunner Express',
            currentPerformance: 85,
            threshold: 90,
          },
        },
        {
          id: 'alert-005',
          type: 'CAPACITY_ALERT',
          title: 'Peak Season Capacity Warning',
          message: 'Capacity utilization at 95% for next week. Consider securing additional carriers.',
          priority: 'HIGH',
          status: 'ACTIVE',
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
          category: 'Capacity',
          icon: Activity,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          actionable: true,
          data: {
            utilizationRate: 95,
            timeframe: 'next week',
            recommendedAction: 'secure additional carriers',
          },
        },
        {
          id: 'alert-006',
          type: 'FINANCIAL_ALERT',
          title: 'Invoice Overdue',
          message: 'Invoice INV-240015 from Acme Corp is 30 days overdue ($5,200)',
          priority: 'HIGH',
          status: 'RESOLVED',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          resolvedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          category: 'Financial',
          icon: DollarSign,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          actionable: false,
          data: {
            invoiceId: 'inv-240015',
            customerId: 'cust-001',
            customerName: 'Acme Corp',
            amount: 5200,
            daysPastDue: 30,
          },
        },
      ];

      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Failed to load alerts data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load alerts data. Using demo data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-orange-100 text-orange-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      case 'DISMISSED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'active' 
      ? alert.status === 'ACTIVE'
      : activeTab === 'resolved'
      ? alert.status === 'RESOLVED'
      : true;
    
    return matchesSearch && matchesTab;
  });

  const handleResolveAlert = async (alertId: string) => {
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'RESOLVED', resolvedAt: new Date() }
          : alert
      ));
      
      toast({
        title: 'Alert Resolved',
        description: 'Alert has been marked as resolved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resolve alert.',
        variant: 'destructive',
      });
    }
  };

  const handleDismissAlert = async (alertId: string) => {
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'DISMISSED' }
          : alert
      ));
      
      toast({
        title: 'Alert Dismissed',
        description: 'Alert has been dismissed.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to dismiss alert.',
        variant: 'destructive',
      });
    }
  };

  const handleTakeAction = (alert: any) => {
    switch (alert.type) {
      case 'OPTIMIZATION_ALERT':
        toast({
          title: 'Optimization Started',
          description: 'AI optimization process initiated for the identified opportunities.',
        });
        break;
      case 'EXCEPTION_ALERT':
        toast({
          title: 'Exception Management',
          description: 'Automated resolution actions initiated for the shipment exception.',
        });
        break;
      case 'COMPLIANCE_ALERT':
        toast({
          title: 'Compliance Action',
          description: 'Carrier notification sent and renewal process initiated.',
        });
        break;
      default:
        toast({
          title: 'Action Initiated',
          description: 'Appropriate action has been taken for this alert.',
        });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading alerts...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const activeAlerts = alerts.filter(alert => alert.status === 'ACTIVE');
  const highPriorityAlerts = activeAlerts.filter(alert => alert.priority === 'HIGH');

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Intelligent Alerts & Notifications</h1>
              <p className="text-gray-600">AI-powered alerts for proactive transportation management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {activeAlerts.length} active alerts
                </span>
              </div>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Alert Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold">{highPriorityAlerts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold">{activeAlerts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Resolved Today</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Auto-Resolved</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-auto grid-cols-3">
              <TabsTrigger value="active">Active Alerts</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="all">All Alerts</TabsTrigger>
            </TabsList>

            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className={`${alert.borderColor} border-l-4`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${alert.bgColor}`}>
                        <alert.icon className={`h-5 w-5 ${alert.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{alert.title}</h3>
                          <Badge className={getPriorityColor(alert.priority)}>
                            {alert.priority}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{alert.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{alert.createdAt.toLocaleString()}</span>
                          </div>
                          <Badge variant="outline">{alert.category}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    {alert.status === 'ACTIVE' && (
                      <div className="flex space-x-2">
                        {alert.actionable && (
                          <Button 
                            size="sm"
                            onClick={() => handleTakeAction(alert)}
                          >
                            <Zap className="h-4 w-4 mr-1" />
                            Take Action
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDismissAlert(alert.id)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {alert.data && (
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <h4 className="text-sm font-medium mb-2">Alert Details:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        {Object.entries(alert.data).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No alerts found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Alerts;
