import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import TurvoIntegration from '@/components/integrations/TurvoIntegration';
import {
  Search,
  Play,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Truck,
  Package,
  Navigation,
  Zap,
  Eye,
  Activity,
  TrendingUp,
  Calendar,
  Users,
  ExternalLink
} from 'lucide-react';

const Execution = () => {
  const [shipments, setShipments] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [showTurvoIntegration, setShowTurvoIntegration] = useState(false);
  const [turvoShipment, setTurvoShipment] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadExecutionData();
  }, []);

  const loadExecutionData = async () => {
    try {
      setLoading(true);
      
      // Mock shipments data
      const mockShipments = [
        {
          id: 'ship-001',
          shipmentNumber: 'SHIP-2024-001',
          status: 'IN_TRANSIT',
          carrier: { name: 'FastFreight LLC', performanceScore: 94 },
          orders: [
            { 
              id: 'order-001', 
              orderNumber: 'ORD-001',
              customer: { name: 'Acme Corp' }
            }
          ],
          estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000),
          progress: 65,
          currentLocation: 'Dallas, TX',
          nextMilestone: 'Houston, TX',
          exceptions: [],
          cost: 2500,
          weight: 15000,
        },
        {
          id: 'ship-002',
          shipmentNumber: 'SHIP-2024-002',
          status: 'DELIVERED',
          carrier: { name: 'RoadRunner Express', performanceScore: 91 },
          orders: [
            { 
              id: 'order-002', 
              orderNumber: 'ORD-002',
              customer: { name: 'TechStart Inc' }
            }
          ],
          estimatedDelivery: new Date(Date.now() - 2 * 60 * 60 * 1000),
          actualDelivery: new Date(Date.now() - 1 * 60 * 60 * 1000),
          progress: 100,
          currentLocation: 'Austin, TX',
          nextMilestone: 'Delivered',
          exceptions: [],
          cost: 1800,
          weight: 8000,
        },
        {
          id: 'ship-003',
          shipmentNumber: 'SHIP-2024-003',
          status: 'EXCEPTION',
          carrier: { name: 'Premier Logistics', performanceScore: 96 },
          orders: [
            { 
              id: 'order-003', 
              orderNumber: 'ORD-003',
              customer: { name: 'Global Manufacturing' }
            }
          ],
          estimatedDelivery: new Date(Date.now() + 48 * 60 * 60 * 1000),
          progress: 45,
          currentLocation: 'Phoenix, AZ',
          nextMilestone: 'Los Angeles, CA',
          exceptions: [
            {
              type: 'WEATHER_DELAY',
              severity: 'MEDIUM',
              description: 'Severe weather causing 4-hour delay',
              impact: { deliveryDelay: 4 }
            }
          ],
          cost: 3200,
          weight: 22000,
        },
      ];

      setShipments(mockShipments);

      // Mock analytics data
      setAnalytics({
        totalExecutions: 45,
        successfulExecutions: 42,
        successRate: 93.3,
        averageExecutionTime: 2.3,
        onTimeDeliveryRate: 94.2,
        exceptionRate: 6.7,
        activeShipments: mockShipments.filter(s => s.status === 'IN_TRANSIT' || s.status === 'EXCEPTION').length,
        deliveredToday: mockShipments.filter(s => s.status === 'DELIVERED').length,
      });
    } catch (error) {
      console.error('Failed to load execution data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load execution data. Using demo data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'IN_TRANSIT': return 'bg-blue-100 text-blue-800';
      case 'EXCEPTION': return 'bg-red-100 text-red-800';
      case 'DISPATCHED': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle className="h-4 w-4" />;
      case 'IN_TRANSIT': return <Truck className="h-4 w-4" />;
      case 'EXCEPTION': return <AlertTriangle className="h-4 w-4" />;
      case 'DISPATCHED': return <Play className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'active' 
      ? shipment.status === 'IN_TRANSIT' || shipment.status === 'EXCEPTION'
      : activeTab === 'delivered'
      ? shipment.status === 'DELIVERED'
      : true;
    
    return matchesSearch && matchesTab;
  });

  const handleTrackShipment = (shipment: any) => {
    setSelectedShipment(shipment);
    toast({
      title: 'Tracking Details',
      description: `Viewing detailed tracking for ${shipment.shipmentNumber}`,
    });
  };

  const handleResolveException = async (shipmentId: string) => {
    try {
      toast({
        title: 'Resolving Exception',
        description: 'Automated resolution actions initiated...',
      });

      // Simulate resolution
      setTimeout(() => {
        toast({
          title: 'Exception Resolved',
          description: 'Exception has been automatically resolved and customer notified.',
        });
        loadExecutionData();
      }, 2000);
    } catch (error) {
      toast({
        title: 'Resolution Failed',
        description: 'Failed to resolve exception. Manual intervention required.',
        variant: 'destructive',
      });
    }
  };

  const handleSendToTurvo = (shipment: any) => {
    setTurvoShipment(shipment);
    setShowTurvoIntegration(true);
  };

  const handleTurvoSuccess = (turvoShipmentId: string) => {
    toast({
      title: 'Turvo Integration Success',
      description: `Shipment successfully sent to Turvo with ID: ${turvoShipmentId}`,
    });
    setShowTurvoIntegration(false);
    setTurvoShipment(null);
    loadExecutionData(); // Refresh data to show updated status
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading execution data...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Execution & Visibility</h1>
          <p className="text-gray-600">Real-time shipment tracking, automated execution, and exception management</p>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Active Shipments</p>
                    <p className="text-2xl font-bold">{analytics.activeShipments}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Delivered Today</p>
                    <p className="text-2xl font-bold">{analytics.deliveredToday}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">On-Time Rate</p>
                    <p className="text-2xl font-bold">{analytics.onTimeDeliveryRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Exception Rate</p>
                    <p className="text-2xl font-bold">{analytics.exceptionRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-auto grid-cols-3">
              <TabsTrigger value="active">Active Shipments</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="all">All Shipments</TabsTrigger>
            </TabsList>

            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search shipments..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Zap className="h-4 w-4 mr-2" />
                Execute Plan
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredShipments.map((shipment) => (
                <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{shipment.shipmentNumber}</CardTitle>
                      <Badge className={getStatusColor(shipment.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(shipment.status)}
                          <span>{shipment.status.replace('_', ' ')}</span>
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{shipment.progress}%</span>
                      </div>
                      <Progress value={shipment.progress} className="h-2" />
                    </div>

                    {/* Shipment Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-gray-500" />
                        <span>{shipment.carrier.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {shipment.carrier.performanceScore}%
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{shipment.currentLocation}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Navigation className="h-4 w-4 text-gray-500" />
                        <span>Next: {shipment.nextMilestone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {shipment.status === 'DELIVERED' 
                            ? `Delivered ${shipment.actualDelivery?.toLocaleDateString()}`
                            : `ETA: ${shipment.estimatedDelivery.toLocaleDateString()}`
                          }
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{shipment.orders[0].customer.name}</span>
                      </div>
                    </div>

                    {/* Exceptions */}
                    {shipment.exceptions.length > 0 && (
                      <div className="border-t pt-3">
                        <div className="text-sm font-medium text-red-600 mb-2">Active Exceptions:</div>
                        {shipment.exceptions.map((exception: any, index: number) => (
                          <div key={index} className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-red-800">{exception.type.replace('_', ' ')}</div>
                                <div className="text-xs text-red-600">{exception.description}</div>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResolveException(shipment.id)}
                              >
                                Resolve
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2 pt-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleTrackShipment(shipment)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Track
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleSendToTurvo(shipment)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Send to Turvo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredShipments.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No shipments found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Detailed Tracking Modal */}
        {selectedShipment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detailed Tracking: {selectedShipment.shipmentNumber}</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedShipment(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <Badge className={getStatusColor(selectedShipment.status)}>
                      {selectedShipment.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={selectedShipment.progress} className="flex-1" />
                      <span className="text-sm">{selectedShipment.progress}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Tracking Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Package Picked Up</div>
                        <div className="text-sm text-gray-600">Origin facility - 2 days ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <Truck className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">In Transit</div>
                        <div className="text-sm text-gray-600">{selectedShipment.currentLocation} - 4 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium">Expected Delivery</div>
                        <div className="text-sm text-gray-600">{selectedShipment.nextMilestone} - {selectedShipment.estimatedDelivery.toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Carrier</p>
                    <p className="font-medium">{selectedShipment.carrier.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">{selectedShipment.orders[0].customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-medium">{selectedShipment.weight.toLocaleString()} lbs</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cost</p>
                    <p className="font-medium">${selectedShipment.cost.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Turvo Integration Modal */}
        {showTurvoIntegration && turvoShipment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Send Shipment to Turvo</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowTurvoIntegration(false);
                      setTurvoShipment(null);
                    }}
                  >
                    Close
                  </Button>
                </div>
                <TurvoIntegration
                  shipment={turvoShipment}
                  onSuccess={handleTurvoSuccess}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Execution;
