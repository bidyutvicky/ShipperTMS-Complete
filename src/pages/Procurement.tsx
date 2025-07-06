import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp,
  Search, 
  Plus, 
  Filter,
  ShoppingCart,
  Target,
  BarChart3,
  Users,
  Calendar,
  Award,
  Zap,
  Brain,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const Procurement = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [procurementData, setProcurementData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadProcurementData();
  }, []);

  const loadProcurementData = async () => {
    try {
      setLoading(true);
      
      // Mock procurement data
      const mockData = {
        overview: {
          totalSpend: 2450000,
          costSavings: 185000,
          savingsPercentage: 7.5,
          activeContracts: 24,
          pendingRFQs: 8,
          carrierNetwork: 156,
          averageRateReduction: 12.3,
        },
        contracts: [
          {
            id: 'contract-001',
            carrierName: 'FastFreight LLC',
            contractType: 'Dedicated',
            lanes: ['TX-CA', 'TX-FL', 'TX-NY'],
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
            totalValue: 850000,
            status: 'ACTIVE',
            performanceScore: 94.2,
            utilizationRate: 87,
            costPerMile: 2.85,
          },
          {
            id: 'contract-002',
            carrierName: 'RoadRunner Express',
            contractType: 'Spot Market',
            lanes: ['TX-AZ', 'TX-NV'],
            startDate: new Date('2024-03-15'),
            endDate: new Date('2024-09-15'),
            totalValue: 420000,
            status: 'ACTIVE',
            performanceScore: 91.5,
            utilizationRate: 92,
            costPerMile: 2.65,
          },
          {
            id: 'contract-003',
            carrierName: 'Premier Logistics',
            contractType: 'Volume Commitment',
            lanes: ['TX-GA', 'TX-SC', 'TX-NC'],
            startDate: new Date('2024-02-01'),
            endDate: new Date('2025-01-31'),
            totalValue: 1200000,
            status: 'ACTIVE',
            performanceScore: 96.3,
            utilizationRate: 89,
            costPerMile: 3.15,
          },
        ],
        rfqs: [
          {
            id: 'rfq-001',
            title: 'West Coast Expansion - LTL Services',
            lanes: ['TX-CA', 'TX-OR', 'TX-WA'],
            estimatedVolume: 500,
            estimatedValue: 650000,
            status: 'OPEN',
            submissionDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            responses: 12,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          },
          {
            id: 'rfq-002',
            title: 'Temperature Controlled Services',
            lanes: ['TX-FL', 'TX-GA'],
            estimatedVolume: 200,
            estimatedValue: 380000,
            status: 'EVALUATION',
            submissionDeadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            responses: 8,
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          },
          {
            id: 'rfq-003',
            title: 'Peak Season Capacity',
            lanes: ['TX-NY', 'TX-NJ', 'TX-PA'],
            estimatedVolume: 800,
            estimatedValue: 920000,
            status: 'AWARDED',
            submissionDeadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            responses: 15,
            awardedTo: 'Premier Logistics',
            createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
          },
        ],
        analytics: {
          monthlySpend: [
            { month: 'Jan', spend: 195000, savings: 12000 },
            { month: 'Feb', spend: 210000, savings: 15000 },
            { month: 'Mar', spend: 245000, savings: 18500 },
          ],
          topCarriers: [
            { name: 'Premier Logistics', spend: 125000, savings: 8500 },
            { name: 'FastFreight LLC', spend: 98000, savings: 6200 },
            { name: 'RoadRunner Express', spend: 87000, savings: 5800 },
          ],
          savingsOpportunities: [
            {
              type: 'Rate Optimization',
              potential: 45000,
              description: 'Renegotiate rates on high-volume lanes',
              priority: 'HIGH',
            },
            {
              type: 'Carrier Consolidation',
              potential: 32000,
              description: 'Consolidate volume with top-performing carriers',
              priority: 'MEDIUM',
            },
            {
              type: 'Contract Optimization',
              potential: 28000,
              description: 'Optimize contract terms and commitments',
              priority: 'MEDIUM',
            },
          ],
        },
      };

      setProcurementData(mockData);
    } catch (error) {
      console.error('Failed to load procurement data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load procurement data. Using demo data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'OPEN': return 'bg-blue-100 text-blue-800';
      case 'EVALUATION': return 'bg-yellow-100 text-yellow-800';
      case 'AWARDED': return 'bg-purple-100 text-purple-800';
      case 'EXPIRED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const handleCreateRFQ = () => {
    toast({
      title: 'RFQ Creation',
      description: 'AI-powered RFQ builder launching...',
    });
  };

  const handleOptimizeRates = () => {
    toast({
      title: 'Rate Optimization',
      description: 'AI rate optimization analysis initiated...',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading procurement data...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Strategic Procurement</h1>
              <p className="text-gray-600">AI-driven carrier procurement and contract optimization</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleOptimizeRates}>
                <Brain className="h-4 w-4 mr-2" />
                AI Rate Optimization
              </Button>
              <Button onClick={handleCreateRFQ}>
                <Plus className="h-4 w-4 mr-2" />
                Create RFQ
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Spend</p>
                  <p className="text-2xl font-bold">${procurementData.overview.totalSpend.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -5.2% vs last month
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
                  <p className="text-sm text-gray-600">Cost Savings</p>
                  <p className="text-2xl font-bold">${procurementData.overview.costSavings.toLocaleString()}</p>
                  <div className="flex items-center text-sm text-blue-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {procurementData.overview.savingsPercentage}% savings rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Active Contracts</p>
                  <p className="text-2xl font-bold">{procurementData.overview.activeContracts}</p>
                  <div className="flex items-center text-sm text-purple-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {procurementData.overview.pendingRFQs} pending RFQs
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Carrier Network</p>
                  <p className="text-2xl font-bold">{procurementData.overview.carrierNetwork}</p>
                  <div className="flex items-center text-sm text-orange-600">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    {procurementData.overview.averageRateReduction}% avg rate reduction
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="rfqs">RFQs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-gold-600" />
                    <span>Top Performing Carriers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {procurementData.analytics.topCarriers.map((carrier: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <h4 className="font-medium">{carrier.name}</h4>
                          <p className="text-sm text-gray-600">Spend: ${carrier.spend.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">${carrier.savings.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">savings</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <span>Savings Opportunities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {procurementData.analytics.savingsOpportunities.map((opportunity: any, index: number) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{opportunity.type}</h4>
                          <Badge className={getPriorityColor(opportunity.priority)}>
                            {opportunity.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{opportunity.description}</p>
                        <div className="text-lg font-bold text-green-600">
                          ${opportunity.potential.toLocaleString()} potential savings
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Active Contracts</h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search contracts..."
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

            <div className="grid grid-cols-1 gap-4">
              {procurementData.contracts.map((contract: any) => (
                <Card key={contract.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{contract.carrierName}</h3>
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status}
                          </Badge>
                          <Badge variant="outline">{contract.contractType}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Contract Value</p>
                            <p className="font-medium">${contract.totalValue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Performance Score</p>
                            <p className="font-medium">{contract.performanceScore}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Utilization</p>
                            <p className="font-medium">{contract.utilizationRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Cost per Mile</p>
                            <p className="font-medium">${contract.costPerMile}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{contract.startDate.toLocaleDateString()} - {contract.endDate.toLocaleDateString()}</span>
                          </div>
                          <div>
                            Lanes: {contract.lanes.join(', ')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          Renew
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rfqs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Request for Quotes</h3>
              <Button onClick={handleCreateRFQ}>
                <Plus className="h-4 w-4 mr-2" />
                Create RFQ
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {procurementData.rfqs.map((rfq: any) => (
                <Card key={rfq.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{rfq.title}</h3>
                          <Badge className={getStatusColor(rfq.status)}>
                            {rfq.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Estimated Value</p>
                            <p className="font-medium">${rfq.estimatedValue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Volume</p>
                            <p className="font-medium">{rfq.estimatedVolume} shipments</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Responses</p>
                            <p className="font-medium">{rfq.responses}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Deadline</p>
                            <p className="font-medium">{rfq.submissionDeadline.toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Created: {rfq.createdAt.toLocaleDateString()}</span>
                          </div>
                          <div>
                            Lanes: {rfq.lanes.join(', ')}
                          </div>
                          {rfq.awardedTo && (
                            <div className="text-green-600">
                              Awarded to: {rfq.awardedTo}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Responses
                        </Button>
                        {rfq.status === 'OPEN' && (
                          <Button size="sm">
                            Evaluate
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spend & Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {procurementData.analytics.monthlySpend.map((month: any, index: number) => (
                      <div key={index} className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm text-gray-600">Month</p>
                          <p className="font-medium">{month.month}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Spend</p>
                          <p className="font-medium">${month.spend.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Savings</p>
                          <p className="font-medium text-green-600">${month.savings.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Procurement KPIs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cost Reduction Target</span>
                        <span>7.5% / 10%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Contract Compliance</span>
                        <span>94% / 95%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Supplier Performance</span>
                        <span>92% / 90%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>RFQ Response Rate</span>
                        <span>85% / 80%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
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

export default Procurement;
