
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import {
  Route,
  MapPin,
  Package,
  Truck,
  Target,
  Calendar,
  Weight,
  DollarSign,
  Search,
  Plus,
  Brain,
  Zap,
  Clock,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const Planning = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [loadPlans, setLoadPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [optimizing, setOptimizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const { toast } = useToast();

  useEffect(() => {
    loadPlanningData();
  }, []);

  const loadPlanningData = async () => {
    try {
      setLoading(true);

      // Load load plans with mock data fallback
      const loadPlansResponse = await apiService.getMockLoadPlans();
      setLoadPlans(loadPlansResponse.loadPlans);
    } catch (error) {
      console.error('Failed to load planning data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load planning data. Using demo data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOptimizeSelected = async () => {
    if (selectedOrders.length === 0) {
      toast({
        title: 'No Orders Selected',
        description: 'Please select at least one order to optimize.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setOptimizing(true);

      const optimizationRequest = {
        orders: selectedOrders,
        constraints: {
          maxWeight: 45000,
          maxVolume: 2500,
          timeWindows: true,
          costOptimization: true,
          serviceLevel: 'STANDARD',
        },
        objectives: {
          minimizeCost: 0.4,
          minimizeTransitTime: 0.3,
          maximizeUtilization: 0.2,
          minimizeCarriers: 0.1,
        },
      };

      // Simulate optimization process
      await new Promise(resolve => setTimeout(resolve, 3000));

      toast({
        title: 'Optimization Complete',
        description: `Successfully optimized ${selectedOrders.length} orders into 2 shipments with $1,200 savings.`,
      });

      // Reload data
      await loadPlanningData();
      setSelectedOrders([]);
    } catch (error) {
      console.error('Optimization failed:', error);
      toast({
        title: 'Optimization Failed',
        description: 'Failed to optimize orders. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setOptimizing(false);
    }
  };

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };
  
  const pendingOrders = [
    {
      id: 'ORD-2024-001',
      customer: 'Acme Manufacturing Corp',
      origin: 'Chicago, IL 60601',
      destination: 'Atlanta, GA 30309',
      weight: 12500,
      volume: 850,
      pickupDate: '2024-07-08',
      deliveryDate: '2024-07-10',
      value: 45000,
      specialRequirements: ['Temperature Controlled', 'Fragile'],
      priority: 'high'
    },
    {
      id: 'ORD-2024-002',
      customer: 'Global Tech Solutions',
      origin: 'Los Angeles, CA 90210',
      destination: 'Seattle, WA 98101',
      weight: 8200,
      volume: 620,
      pickupDate: '2024-07-09',
      deliveryDate: '2024-07-11',
      value: 28000,
      specialRequirements: ['Hazmat Class 3'],
      priority: 'medium'
    },
    {
      id: 'ORD-2024-003',
      customer: 'Northeast Distributors',
      origin: 'New York, NY 10001',
      destination: 'Boston, MA 02101',
      weight: 15800,
      volume: 1200,
      pickupDate: '2024-07-08',
      deliveryDate: '2024-07-09',
      value: 62000,
      specialRequirements: [],
      priority: 'high'
    }
  ];

  const optimizedPlans = [
    {
      id: 'PLAN-001',
      name: 'Midwest Consolidation Route',
      orders: ['ORD-2024-001', 'ORD-2024-004'],
      mode: 'FTL',
      estimatedCost: 2850,
      savingsVsIndividual: 780,
      transitTime: '2.5 days',
      carrier: 'FastFreight LLC',
      route: 'Chicago → Indianapolis → Atlanta',
      confidence: 94
    },
    {
      id: 'PLAN-002',
      name: 'West Coast LTL Bundle',
      orders: ['ORD-2024-002', 'ORD-2024-005'],
      mode: 'LTL',
      estimatedCost: 1650,
      savingsVsIndividual: 320,
      transitTime: '3 days',
      carrier: 'Western Express',
      route: 'LA → Portland → Seattle',
      confidence: 89
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading planning data...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Planning & Optimization</h1>
          <p className="text-gray-600">Intelligent load building, route optimization, and capacity planning</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Pending Orders</TabsTrigger>
            <TabsTrigger value="plans">Load Plans</TabsTrigger>
            <TabsTrigger value="routes">Route Optimization</TabsTrigger>
            <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Planning Controls */}
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders by customer, destination, or order number..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                onClick={handleOptimizeSelected}
                disabled={selectedOrders.length === 0 || optimizing}
              >
                {optimizing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Auto-Optimize Selected ({selectedOrders.length})
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => toast({
                  title: 'Manual Planning',
                  description: 'Manual load plan builder coming soon...',
                })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Manual Plan
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pending Orders */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    <span>Pending Orders ({pendingOrders.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedOrders.includes(order.id) ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => toggleOrderSelection(order.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => toggleOrderSelection(order.id)}
                          />
                          <h4 className="font-medium text-gray-900">{order.id}</h4>
                        </div>
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{order.customer}</p>

                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{order.origin} → {order.destination}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Weight className="h-3 w-3" />
                            <span>{order.weight.toLocaleString()} lbs</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{order.pickupDate}</span>
                          </div>
                        </div>
                        {order.specialRequirements.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {order.specialRequirements.map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

          {/* Optimization Results */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Intelligence-Optimized Plans</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {optimizedPlans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                      <p className="text-sm text-gray-600">{plan.route}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        ${plan.savingsVsIndividual} saved
                      </div>
                      <div className="text-sm text-gray-500">vs individual shipping</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Truck className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm font-medium">{plan.mode}</span>
                      </div>
                      <div className="text-xs text-gray-500">Mode</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium">${plan.estimatedCost}</span>
                      </div>
                      <div className="text-xs text-gray-500">Est. Cost</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Calendar className="h-4 w-4 text-purple-500 mr-1" />
                        <span className="text-sm font-medium">{plan.transitTime}</span>
                      </div>
                      <div className="text-xs text-gray-500">Transit Time</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Brain className="h-4 w-4 text-orange-500 mr-1" />
                        <span className="text-sm font-medium">{plan.confidence}%</span>
                      </div>
                      <div className="text-xs text-gray-500">Confidence</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Carrier: <span className="font-medium">{plan.carrier}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Orders: {plan.orders.join(', ')}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Execute Plan</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="plans" className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Load Plans</h3>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Plan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loadPlans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <Badge
                    variant={plan.status === 'OPTIMIZED' ? 'default' : 'secondary'}
                  >
                    {plan.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Cost</p>
                      <p className="text-lg font-semibold">${plan.totalCost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Savings</p>
                      <p className="text-lg font-semibold text-green-600">
                        ${plan.totalSavings.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Optimization Score</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${plan.optimizationScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{plan.optimizationScore}%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Orders ({plan.orders.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {plan.orders.map((orderId: string) => (
                        <Badge key={orderId} variant="outline" className="text-xs">
                          {orderId}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-500">
                      Created by {plan.creator.firstName} {plan.creator.lastName}
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Execute</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="routes" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Route className="h-5 w-5 text-purple-600" />
              <span>Route Optimization</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Zap className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Route Optimization</h3>
              <p className="text-gray-600 mb-6">
                Use genetic algorithms to optimize delivery routes for maximum efficiency
              </p>
              <Button>
                <Brain className="h-4 w-4 mr-2" />
                Start Route Optimization
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="capacity" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Demand Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">30-day demand forecast</p>
                <p className="text-2xl font-bold mt-2">+15% growth expected</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span>Capacity Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Utilization</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Peak Season Readiness</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
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

export default Planning;
