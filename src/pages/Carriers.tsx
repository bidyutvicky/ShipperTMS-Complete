
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import CarrierScorecard from '@/components/carriers/CarrierScorecard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import { Search, Plus, Filter, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Carriers = () => {
  const [carriers, setCarriers] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [compliance, setCompliance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    loadCarrierData();
  }, []);

  const loadCarrierData = async () => {
    try {
      setLoading(true);

      // Load carriers with mock data fallback
      const carriersResponse = await apiService.getMockCarriers();
      setCarriers(carriersResponse.carriers);

      // Load analytics
      try {
        const analyticsResponse = await apiService.getCarrierAnalytics();
        setAnalytics(analyticsResponse);
      } catch (error) {
        // Mock analytics data
        setAnalytics({
          totalCarriers: carriersResponse.carriers.length,
          activeCarriers: carriersResponse.carriers.filter((c: any) => c.isActive).length,
          topPerformers: carriersResponse.carriers.slice(0, 3),
          performanceDistribution: {
            excellent: carriersResponse.carriers.filter((c: any) => c.performanceScore >= 90).length,
            good: carriersResponse.carriers.filter((c: any) => c.performanceScore >= 80 && c.performanceScore < 90).length,
            fair: carriersResponse.carriers.filter((c: any) => c.performanceScore >= 70 && c.performanceScore < 80).length,
            poor: carriersResponse.carriers.filter((c: any) => c.performanceScore < 70).length,
          },
        });
      }

      // Load compliance
      try {
        const complianceResponse = await apiService.getCarrierCompliance();
        setCompliance(complianceResponse);
      } catch (error) {
        // Mock compliance data
        setCompliance({
          complianceIssues: [
            {
              carrierId: '2',
              carrierName: 'RoadRunner Express',
              issue: 'INSURANCE_EXPIRING',
              severity: 'MEDIUM',
              message: 'Insurance policy expires within 30 days',
            },
          ],
          totalIssues: 1,
          criticalIssues: 0,
        });
      }
    } catch (error) {
      console.error('Failed to load carrier data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load carrier data. Using demo data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCarriers = carriers.filter(carrier =>
    carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carrier.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carrier.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading carrier data...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Carrier Management</h1>
          <p className="text-gray-600">Intelligent carrier performance analytics, compliance monitoring, and optimization</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Search and Controls */}
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search carriers by name, location, or performance..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button onClick={() => toast({
                title: 'Carrier Onboarding',
                description: 'AI-powered carrier onboarding wizard launching...',
              })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Carrier
              </Button>
            </div>

            {/* Quick Stats */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Total Carriers</p>
                        <p className="text-2xl font-bold">{analytics.totalCarriers}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Active Carriers</p>
                        <p className="text-2xl font-bold">{analytics.activeCarriers}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="text-sm text-gray-600">Compliance Issues</p>
                        <p className="text-2xl font-bold">{compliance?.totalIssues || 0}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Avg Performance</p>
                        <p className="text-2xl font-bold">
                          {Math.round(carriers.reduce((sum, c) => sum + c.performanceScore, 0) / carriers.length)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Carrier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCarriers.map((carrier) => (
                <CarrierScorecard key={carrier.id} carrier={carrier} />
              ))}
            </div>

            {filteredCarriers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No carriers found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {analytics?.performanceDistribution && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {analytics.performanceDistribution.excellent}
                      </div>
                      <div className="text-sm text-gray-600">Excellent (90%+)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {analytics.performanceDistribution.good}
                      </div>
                      <div className="text-sm text-gray-600">Good (80-89%)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {analytics.performanceDistribution.fair}
                      </div>
                      <div className="text-sm text-gray-600">Fair (70-79%)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {analytics.performanceDistribution.poor}
                      </div>
                      <div className="text-sm text-gray-600">Poor (&lt;70%)</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.topPerformers?.map((carrier: any, index: number) => (
                    <div key={carrier.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                        <div>
                          <h4 className="font-semibold">{carrier.name}</h4>
                          <p className="text-sm text-gray-600">{carrier.city}, {carrier.state}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {carrier.performanceScore}%
                        </div>
                        <div className="text-sm text-gray-500">
                          {carrier.totalShipments} shipments
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <span>Compliance Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {compliance?.complianceIssues?.length > 0 ? (
                  <div className="space-y-4">
                    {compliance.complianceIssues.map((issue: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{issue.carrierName}</h4>
                          <Badge
                            variant={issue.severity === 'HIGH' ? 'destructive' : 'secondary'}
                          >
                            {issue.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{issue.message}</p>
                        <div className="text-xs text-gray-500">
                          Issue Type: {issue.issue.replace('_', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="text-gray-600">All carriers are compliant!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                    <p>Performance trend charts coming soon...</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                    <p>Cost analysis charts coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Carriers;
