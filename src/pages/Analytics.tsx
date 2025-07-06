import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Package, 
  Truck, 
  Clock,
  Target,
  Activity,
  PieChart,
  LineChart,
  Download,
  Filter,
  Calendar,
  Users,
  MapPin,
  Zap
} from 'lucide-react';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('30d');
  const [analytics, setAnalytics] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalyticsData();
  }, [timeframe]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Mock analytics data
      const mockAnalytics = {
        overview: {
          totalRevenue: 1250000,
          totalCosts: 950000,
          grossMargin: 300000,
          marginPercentage: 24,
          totalShipments: 1247,
          onTimeDeliveryRate: 94.2,
          averageCostPerShipment: 762,
          customerSatisfaction: 4.6,
        },
        performance: {
          carrierPerformance: [
            { name: 'FastFreight LLC', score: 94.2, shipments: 342, onTime: 96.1 },
            { name: 'RoadRunner Express', score: 91.5, shipments: 287, onTime: 93.2 },
            { name: 'Premier Logistics', score: 96.3, shipments: 198, onTime: 98.1 },
            { name: 'TransCorp Solutions', score: 78.4, shipments: 156, onTime: 82.3 },
          ],
          lanePerformance: [
            { lane: 'TX-CA', volume: 234, avgCost: 2850, onTime: 95.2 },
            { lane: 'TX-FL', volume: 189, avgCost: 1950, onTime: 92.1 },
            { lane: 'TX-NY', volume: 167, avgCost: 3200, onTime: 89.7 },
            { lane: 'TX-IL', volume: 145, avgCost: 2100, onTime: 94.8 },
          ],
        },
        financial: {
          monthlyRevenue: [
            { month: 'Jan', revenue: 980000, costs: 750000, margin: 230000 },
            { month: 'Feb', revenue: 1120000, costs: 860000, margin: 260000 },
            { month: 'Mar', revenue: 1250000, costs: 950000, margin: 300000 },
          ],
          outstandingReceivables: 245000,
          outstandingPayables: 180000,
          averagePaymentDays: 38,
          cashFlow: 65000,
        },
        operational: {
          utilizationRate: 87.3,
          averageTransitTime: 2.4,
          exceptionRate: 6.7,
          automationRate: 78.2,
          aiOptimizationSavings: 125000,
          fuelEfficiency: 6.8,
        },
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load analytics data. Using demo data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = () => {
    toast({
      title: 'Export Started',
      description: 'Analytics report is being generated and will be downloaded shortly.',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading analytics data...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
              <p className="text-gray-600">Comprehensive insights and performance metrics for your transportation network</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <select 
                  value={timeframe} 
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button onClick={handleExportReport}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="operational">Operational</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold">${analytics.overview.totalRevenue.toLocaleString()}</p>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12.5%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Gross Margin</p>
                      <p className="text-2xl font-bold">{analytics.overview.marginPercentage}%</p>
                      <div className="flex items-center text-sm text-blue-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +2.1%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Shipments</p>
                      <p className="text-2xl font-bold">{analytics.overview.totalShipments.toLocaleString()}</p>
                      <div className="flex items-center text-sm text-purple-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8.3%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">On-Time Rate</p>
                      <p className="text-2xl font-bold">{analytics.overview.onTimeDeliveryRate}%</p>
                      <div className="flex items-center text-sm text-orange-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +1.8%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="h-5 w-5 text-blue-600" />
                    <span>Revenue Trend</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Revenue trend chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5 text-green-600" />
                    <span>Cost Breakdown</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Cost breakdown chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>Carrier Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.performance.carrierPerformance.map((carrier: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <h4 className="font-medium">{carrier.name}</h4>
                          <p className="text-sm text-gray-600">{carrier.shipments} shipments</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{carrier.score}%</div>
                          <div className="text-sm text-gray-500">{carrier.onTime}% on-time</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <span>Lane Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.performance.lanePerformance.map((lane: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <h4 className="font-medium">{lane.lane}</h4>
                          <p className="text-sm text-gray-600">{lane.volume} shipments</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">${lane.avgCost.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{lane.onTime}% on-time</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Outstanding Receivables</p>
                      <p className="text-2xl font-bold">${analytics.financial.outstandingReceivables.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-600">Outstanding Payables</p>
                      <p className="text-2xl font-bold">${analytics.financial.outstandingPayables.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Payment Days</p>
                      <p className="text-2xl font-bold">{analytics.financial.averagePaymentDays}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Financial Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.financial.monthlyRevenue.map((month: any, index: number) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm text-gray-600">Month</p>
                        <p className="font-medium">{month.month}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="font-medium text-green-600">${month.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Costs</p>
                        <p className="font-medium text-red-600">${month.costs.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Margin</p>
                        <p className="font-medium text-blue-600">${month.margin.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operational" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Utilization Rate</p>
                      <p className="text-2xl font-bold">{analytics.operational.utilizationRate}%</p>
                      <Progress value={analytics.operational.utilizationRate} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Transit Time</p>
                      <p className="text-2xl font-bold">{analytics.operational.averageTransitTime} days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Automation Rate</p>
                      <p className="text-2xl font-bold">{analytics.operational.automationRate}%</p>
                      <Progress value={analytics.operational.automationRate} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm text-gray-600">AI Savings</p>
                      <p className="text-2xl font-bold">${analytics.operational.aiOptimizationSavings.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Operational Efficiency Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Exception Rate</h4>
                    <div className="flex items-center space-x-2">
                      <Progress value={analytics.operational.exceptionRate} className="flex-1" />
                      <span className="text-sm font-medium">{analytics.operational.exceptionRate}%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Fuel Efficiency</h4>
                    <div className="flex items-center space-x-2">
                      <Progress value={analytics.operational.fuelEfficiency * 10} className="flex-1" />
                      <span className="text-sm font-medium">{analytics.operational.fuelEfficiency} MPG</span>
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

export default Analytics;
