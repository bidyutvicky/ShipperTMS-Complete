import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Truck,
  Brain,
  AlertCircle,
  Route,
  AlertTriangle
} from 'lucide-react';

const Shipments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockShipments = [
    {
      id: 'SH2024001',
      orderNumber: 'ORD-4567',
      customer: 'Acme Manufacturing Corp',
      customerContact: 'john.smith@acme.com',
      origin: 'Chicago, IL 60601',
      destination: 'Atlanta, GA 30309',
      status: 'in-transit',
      carrier: 'FastFreight LLC',
      carrierContact: '+1-555-0123',
      driver: 'Mike Johnson',
      estimatedDelivery: '2024-07-08T14:00:00Z',
      actualPickup: '2024-07-06T08:30:00Z',
      intelligenceOptimizationScore: 94,
      cost: 1850,
      mode: 'FTL',
      weight: 15000,
      volume: 1200,
      temperature: 36,
      alerts: ['Weather delay possible - Thunderstorms in Atlanta area'],
      route: 'Chicago → Indianapolis → Louisville → Atlanta',
      mileage: 465
    },
    {
      id: 'SH2024002',
      orderNumber: 'ORD-4568',
      customer: 'Tech Solutions Inc',
      customerContact: 'sarah.davis@techsol.com',
      origin: 'Los Angeles, CA 90210',
      destination: 'Seattle, WA 98101',
      status: 'planned',
      carrier: null,
      carrierContact: null,
      driver: null,
      estimatedDelivery: '2024-07-09T10:00:00Z',
      actualPickup: null,
      intelligenceOptimizationScore: 87,
      cost: 1280,
      mode: 'LTL',
      weight: 8500,
      volume: 680,
      temperature: null,
      alerts: [],
      route: 'LA → Sacramento → Portland → Seattle',
      mileage: 1135
    },
    {
      id: 'SH2024003',
      orderNumber: 'ORD-4569',
      customer: 'Global Retail Co',
      customerContact: 'orders@globalretail.com',
      origin: 'Dallas, TX 75201',
      destination: 'Miami, FL 33101',
      status: 'delivered',
      carrier: 'RoadRunner Express',
      carrierContact: '+1-555-0456',
      driver: 'Carlos Rodriguez',
      estimatedDelivery: '2024-07-06T16:00:00Z',
      actualPickup: '2024-07-04T09:15:00Z',
      actualDelivery: '2024-07-06T15:30:00Z',
      intelligenceOptimizationScore: 98,
      cost: 1950,
      mode: 'FTL',
      weight: 18000,
      volume: 1500,
      temperature: null,
      alerts: [],
      route: 'Dallas → Houston → New Orleans → Tampa → Miami',
      mileage: 1320
    },
    {
      id: 'SH2024004',
      orderNumber: 'ORD-4570',
      customer: 'Northeast Distributors',
      customerContact: 'logistics@northeast.com',
      origin: 'New York, NY 10001',
      destination: 'Boston, MA 02101',
      status: 'in-transit',
      carrier: 'Northeast Freight',
      carrierContact: '+1-555-0789',
      driver: 'Jennifer Wilson',
      estimatedDelivery: '2024-07-07T18:00:00Z',
      actualPickup: '2024-07-07T06:00:00Z',
      intelligenceOptimizationScore: 91,
      cost: 650,
      mode: 'LTL',
      weight: 5200,
      volume: 420,
      temperature: null,
      alerts: ['Traffic delay - I-95 construction'],
      route: 'NYC → Hartford → Boston',
      mileage: 215
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOptimizationColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipment Management</h1>
          <p className="text-gray-600">Intelligence-powered shipment tracking and optimization</p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6 flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by shipment ID, customer, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        </div>
        
        {/* Shipments List */}
        <div className="space-y-4">
          {mockShipments.map((shipment) => (
            <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{shipment.id}</h3>
                      <p className="text-sm text-gray-600">{shipment.orderNumber} • {shipment.customer}</p>
                      <p className="text-xs text-gray-500">{shipment.customerContact}</p>
                    </div>
                    <Badge className={getStatusColor(shipment.status)}>
                      {shipment.status}
                    </Badge>
                    {shipment.alerts.length > 0 && (
                      <div className="flex items-center space-x-1 text-amber-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{shipment.alerts.length}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className={`font-medium ${getOptimizationColor(shipment.intelligenceOptimizationScore)}`}>
                          Intelligence Score: {shipment.intelligenceOptimizationScore}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">${shipment.cost.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{shipment.mileage} miles</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">{shipment.origin}</div>
                      <div className="text-xs text-gray-500">Origin</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">{shipment.destination}</div>
                      <div className="text-xs text-gray-500">Destination</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">
                        {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">Est. Delivery</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium">
                        {shipment.carrier || 'Unassigned'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {shipment.mode} • {shipment.weight.toLocaleString()} lbs
                        {shipment.driver && ` • ${shipment.driver}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                {shipment.route && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Route className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Route: {shipment.route}</span>
                    </div>
                  </div>
                )}

                {/* Alerts */}
                {shipment.alerts.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {shipment.alerts.map((alert, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm text-amber-800">{alert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shipments;
