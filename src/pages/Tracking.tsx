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
  MapPin,
  Search,
  Navigation,
  Truck,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Route,
  Activity,
  Zap,
  RefreshCw,
  Filter,
  Calendar,
  Users,
  BarChart3
} from 'lucide-react';

const Tracking = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('live');
  const [searchTerm, setSearchTerm] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTrackingData();

    // Set up real-time updates
    const interval = setInterval(() => {
      if (!isRefreshing) {
        loadTrackingData();
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadTrackingData = async () => {
    try {
      setLoading(true);

      // Mock tracking data
      const mockData = {
        summary: {
          totalShipments: 1247,
          inTransit: 342,
          delivered: 856,
          exceptions: 23,
          onTimeRate: 94.2,
          averageTransitTime: 2.4,
        },
        liveShipments: [
          {
            id: 'ship-001',
            shipmentNumber: 'SHIP-2024-001',
            status: 'IN_TRANSIT',
            carrier: 'FastFreight LLC',
            customer: 'Acme Corp',
            origin: 'Dallas, TX',
            destination: 'Los Angeles, CA',
            currentLocation: {
              city: 'Phoenix',
              state: 'AZ',
              latitude: 33.4484,
              longitude: -112.0740,
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            },
            progress: 65,
            estimatedDelivery: new Date(Date.now() + 18 * 60 * 60 * 1000),
            nextMilestone: 'Los Angeles Hub',
            milestones: [
              { name: 'Pickup', status: 'COMPLETED', time: new Date(Date.now() - 36 * 60 * 60 * 1000) },
              { name: 'Dallas Hub', status: 'COMPLETED', time: new Date(Date.now() - 30 * 60 * 60 * 1000) },
              { name: 'Phoenix Hub', status: 'CURRENT', time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
              { name: 'Los Angeles Hub', status: 'PENDING', time: new Date(Date.now() + 12 * 60 * 60 * 1000) },
              { name: 'Delivery', status: 'PENDING', time: new Date(Date.now() + 18 * 60 * 60 * 1000) },
            ],
            trackingEvents: [
              {
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                event: 'Departed Phoenix Hub',
                location: 'Phoenix, AZ',
                description: 'Package departed Phoenix sorting facility',
              },
              {
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
                event: 'Arrived at Phoenix Hub',
                location: 'Phoenix, AZ',
                description: 'Package arrived at Phoenix sorting facility',
              },
            ],
          },
          {
            id: 'ship-002',
            shipmentNumber: 'SHIP-2024-002',
            status: 'EXCEPTION',
            carrier: 'RoadRunner Express',
            customer: 'TechStart Inc',
            origin: 'Houston, TX',
            destination: 'Miami, FL',
            currentLocation: {
              city: 'New Orleans',
              state: 'LA',
              latitude: 29.9511,
              longitude: -90.0715,
              timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            },
            progress: 45,
            estimatedDelivery: new Date(Date.now() + 30 * 60 * 60 * 1000),
            nextMilestone: 'Miami Hub',
            exception: {
              type: 'WEATHER_DELAY',
              description: 'Severe weather causing 6-hour delay',
              severity: 'MEDIUM',
              estimatedDelay: 6,
            },
            milestones: [
              { name: 'Pickup', status: 'COMPLETED', time: new Date(Date.now() - 48 * 60 * 60 * 1000) },
              { name: 'Houston Hub', status: 'COMPLETED', time: new Date(Date.now() - 42 * 60 * 60 * 1000) },
              { name: 'New Orleans Hub', status: 'CURRENT', time: new Date(Date.now() - 4 * 60 * 60 * 1000) },
              { name: 'Miami Hub', status: 'PENDING', time: new Date(Date.now() + 24 * 60 * 60 * 1000) },
              { name: 'Delivery', status: 'PENDING', time: new Date(Date.now() + 30 * 60 * 60 * 1000) },
            ],
          },
          {
            id: 'ship-003',
            shipmentNumber: 'SHIP-2024-003',
            status: 'DELIVERED',
            carrier: 'Premier Logistics',
            customer: 'Global Manufacturing',
            origin: 'Austin, TX',
            destination: 'Atlanta, GA',
            currentLocation: {
              city: 'Atlanta',
              state: 'GA',
              latitude: 33.7490,
              longitude: -84.3880,
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            },
            progress: 100,
            estimatedDelivery: new Date(Date.now() - 1 * 60 * 60 * 1000),
            actualDelivery: new Date(Date.now() - 1 * 60 * 60 * 1000),
            nextMilestone: 'Delivered',
            milestones: [
              { name: 'Pickup', status: 'COMPLETED', time: new Date(Date.now() - 72 * 60 * 60 * 1000) },
              { name: 'Austin Hub', status: 'COMPLETED', time: new Date(Date.now() - 66 * 60 * 60 * 1000) },
              { name: 'Atlanta Hub', status: 'COMPLETED', time: new Date(Date.now() - 6 * 60 * 60 * 1000) },
              { name: 'Delivery', status: 'COMPLETED', time: new Date(Date.now() - 1 * 60 * 60 * 1000) },
            ],
          },
        ],
        analytics: {
          topLanes: [
            { lane: 'TX-CA', shipments: 234, onTime: 95.2, avgTransit: 2.1 },
            { lane: 'TX-FL', shipments: 189, onTime: 92.1, avgTransit: 1.8 },
            { lane: 'TX-NY', shipments: 167, onTime: 89.7, avgTransit: 3.2 },
          ],
          carrierPerformance: [
            { name: 'Premier Logistics', onTime: 96.3, shipments: 198 },
            { name: 'FastFreight LLC', onTime: 94.2, shipments: 342 },
            { name: 'RoadRunner Express', onTime: 91.5, shipments: 287 },
          ],
        },
      };

      setTrackingData(mockData);
    } catch (error) {
      console.error('Failed to load tracking data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load tracking data. Using demo data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTrackingData();
    setIsRefreshing(false);
    toast({
      title: 'Data Refreshed',
      description: 'Tracking data has been updated with the latest information.',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'IN_TRANSIT': return 'bg-blue-100 text-blue-800';
      case 'EXCEPTION': return 'bg-red-100 text-red-800';
      case 'PICKED_UP': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle className="h-4 w-4" />;
      case 'IN_TRANSIT': return <Truck className="h-4 w-4" />;
      case 'EXCEPTION': return <AlertTriangle className="h-4 w-4" />;
      case 'PICKED_UP': return <Package className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getMilestoneStatus = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600';
      case 'CURRENT': return 'text-blue-600';
      case 'PENDING': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const filteredShipments = trackingData?.liveShipments.filter((shipment: any) => {
    const matchesSearch = shipment.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab = activeTab === 'live'
      ? shipment.status === 'IN_TRANSIT' || shipment.status === 'EXCEPTION'
      : activeTab === 'delivered'
      ? shipment.status === 'DELIVERED'
      : true;

    return matchesSearch && matchesTab;
  }) || [];

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading tracking data...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-Time Tracking</h1>
              <p className="text-gray-600">Live shipment visibility and intelligent tracking analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">In Transit</p>
                  <p className="text-2xl font-bold">{trackingData.summary.inTransit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold">{trackingData.summary.delivered}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Exceptions</p>
                  <p className="text-2xl font-bold">{trackingData.summary.exceptions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">On-Time Rate</p>
                  <p className="text-2xl font-bold">{trackingData.summary.onTimeRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-auto grid-cols-3">
              <TabsTrigger value="live">Live Tracking</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-6">
            {activeTab !== 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredShipments.map((shipment: any) => (
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
                          <span>{shipment.carrier}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{shipment.customer}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Route className="h-4 w-4 text-gray-500" />
                          <span>{shipment.origin} → {shipment.destination}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>Current: {shipment.currentLocation.city}, {shipment.currentLocation.state}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Navigation className="h-4 w-4 text-gray-500" />
                          <span>Next: {shipment.nextMilestone}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>
                            {shipment.status === 'DELIVERED'
                              ? `Delivered: ${shipment.actualDelivery?.toLocaleString()}`
                              : `ETA: ${shipment.estimatedDelivery.toLocaleString()}`
                            }
                          </span>
                        </div>
                      </div>

                      {/* Exception Alert */}
                      {shipment.exception && (
                        <div className="border-t pt-3">
                          <div className="bg-red-50 border border-red-200 rounded p-2">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <div>
                                <div className="font-medium text-red-800">{shipment.exception.type.replace('_', ' ')}</div>
                                <div className="text-xs text-red-600">{shipment.exception.description}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2 pt-3 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedShipment(shipment)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <span>Top Performing Lanes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackingData.analytics.topLanes.map((lane: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <h4 className="font-medium">{lane.lane}</h4>
                            <p className="text-sm text-gray-600">{lane.shipments} shipments</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{lane.onTime}%</div>
                            <div className="text-sm text-gray-500">{lane.avgTransit} days avg</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-purple-600" />
                      <span>Carrier Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackingData.analytics.carrierPerformance.map((carrier: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <h4 className="font-medium">{carrier.name}</h4>
                            <p className="text-sm text-gray-600">{carrier.shipments} shipments</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">{carrier.onTime}%</div>
                            <div className="text-sm text-gray-500">on-time</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {filteredShipments.length === 0 && activeTab !== 'analytics' && (
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
            <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
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
                  <h4 className="font-semibold mb-3">Milestone Timeline</h4>
                  <div className="space-y-3">
                    {selectedShipment.milestones.map((milestone: any, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          milestone.status === 'COMPLETED' ? 'bg-green-600' :
                          milestone.status === 'CURRENT' ? 'bg-blue-600' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className={`font-medium ${getMilestoneStatus(milestone.status)}`}>
                            {milestone.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {milestone.time.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedShipment.trackingEvents && (
                  <div>
                    <h4 className="font-semibold mb-3">Recent Events</h4>
                    <div className="space-y-3">
                      {selectedShipment.trackingEvents.map((event: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{event.event}</div>
                              <div className="text-sm text-gray-600">{event.description}</div>
                              <div className="text-sm text-gray-500">{event.location}</div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {event.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Carrier</p>
                    <p className="font-medium">{selectedShipment.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer</p>
                    <p className="font-medium">{selectedShipment.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Origin</p>
                    <p className="font-medium">{selectedShipment.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="font-medium">{selectedShipment.destination}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tracking;