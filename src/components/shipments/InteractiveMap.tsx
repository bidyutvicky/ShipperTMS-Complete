
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Truck, Package, Navigation, AlertTriangle } from 'lucide-react';

const InteractiveMap = () => {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  
  const activeShipments = [
    {
      id: 'SH2024001',
      customer: 'Acme Manufacturing',
      origin: { city: 'Chicago, IL', lat: 41.8781, lng: -87.6298 },
      destination: { city: 'Atlanta, GA', lat: 33.7490, lng: -84.3880 },
      currentLocation: { city: 'Indianapolis, IN', lat: 39.7684, lng: -86.1581 },
      status: 'in-transit',
      progress: 65,
      eta: '2024-07-08T14:00:00Z',
      carrier: 'FastFreight LLC',
      driver: 'Mike Johnson',
      temperature: 36,
      alerts: ['Weather delay possible']
    },
    {
      id: 'SH2024002',
      customer: 'Tech Solutions Inc',
      origin: { city: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437 },
      destination: { city: 'Seattle, WA', lat: 47.6062, lng: -122.3321 },
      currentLocation: { city: 'Sacramento, CA', lat: 38.5816, lng: -121.4944 },
      status: 'in-transit',
      progress: 35,
      eta: '2024-07-09T10:00:00Z',
      carrier: 'Western Express',
      driver: 'Sarah Davis',
      temperature: null,
      alerts: []
    },
    {
      id: 'SH2024003',
      customer: 'Global Retail Co',
      origin: { city: 'Dallas, TX', lat: 32.7767, lng: -96.7970 },
      destination: { city: 'Miami, FL', lat: 25.7617, lng: -80.1918 },
      currentLocation: { city: 'Miami, FL', lat: 25.7617, lng: -80.1918 },
      status: 'delivered',
      progress: 100,
      eta: '2024-07-06T16:00:00Z',
      carrier: 'RoadRunner Express',
      driver: 'Carlos Rodriguez',
      temperature: null,
      alerts: []
    },
    {
      id: 'SH2024004',
      customer: 'Northeast Distributors',
      origin: { city: 'New York, NY', lat: 40.7128, lng: -74.0060 },
      destination: { city: 'Boston, MA', lat: 42.3601, lng: -71.0589 },
      currentLocation: { city: 'Hartford, CT', lat: 41.7658, lng: -72.6734 },
      status: 'in-transit',
      progress: 70,
      eta: '2024-07-07T18:00:00Z',
      carrier: 'Northeast Freight',
      driver: 'Jennifer Wilson',
      temperature: null,
      alerts: ['Traffic delay - I-95']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'in-transit': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getMarkerPosition = (shipment: any) => {
    // Simplified positioning for demo - in real app would use actual map coordinates
    const positions = [
      { top: '25%', left: '15%' }, // Chicago area
      { top: '45%', left: '25%' }, // Indianapolis area
      { top: '65%', left: '85%' }, // Miami area
      { top: '35%', left: '75%' }, // Hartford area
    ];
    return positions[activeShipments.indexOf(shipment)] || { top: '50%', left: '50%' };
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Navigation className="h-5 w-5 text-blue-600" />
          <span>Live Shipment Tracking</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 rounded-lg overflow-hidden border">
          {/* Simplified US Map Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-green-100 opacity-50">
            <svg viewBox="0 0 1000 600" className="w-full h-full">
              {/* Simplified US outline */}
              <path
                d="M200,150 L800,150 L850,200 L800,450 L200,450 L150,200 Z"
                fill="rgba(34, 197, 94, 0.1)"
                stroke="rgba(34, 197, 94, 0.3)"
                strokeWidth="2"
              />
              {/* Major cities */}
              <circle cx="300" cy="200" r="3" fill="#6B7280" />
              <text x="310" y="205" fontSize="12" fill="#374151">Chicago</text>
              <circle cx="750" cy="350" r="3" fill="#6B7280" />
              <text x="760" y="355" fontSize="12" fill="#374151">Miami</text>
              <circle cx="150" cy="250" r="3" fill="#6B7280" />
              <text x="90" y="255" fontSize="12" fill="#374151">LA</text>
              <circle cx="200" cy="150" r="3" fill="#6B7280" />
              <text x="160" y="145" fontSize="12" fill="#374151">Seattle</text>
            </svg>
          </div>

          {/* Shipment Markers */}
          {activeShipments.map((shipment) => {
            const position = getMarkerPosition(shipment);
            return (
              <div
                key={shipment.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={{ top: position.top, left: position.left }}
                onClick={() => setSelectedShipment(selectedShipment === shipment.id ? null : shipment.id)}
              >
                <div className="relative">
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(shipment.status)} animate-pulse`} />
                  <Truck className="absolute -top-1 -left-1 h-6 w-6 text-white drop-shadow-lg" />
                  {shipment.alerts.length > 0 && (
                    <AlertTriangle className="absolute -top-2 -right-2 h-4 w-4 text-amber-500" />
                  )}
                </div>
                
                {/* Shipment Info Popup */}
                {selectedShipment === shipment.id && (
                  <div className="absolute top-6 left-0 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-20">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{shipment.id}</h4>
                      <Badge className={`${shipment.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {shipment.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Customer:</span>
                        <span className="ml-2 font-medium">{shipment.customer}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Driver:</span>
                        <span className="ml-2 font-medium">{shipment.driver}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Carrier:</span>
                        <span className="ml-2 font-medium">{shipment.carrier}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Current:</span>
                        <span className="ml-2 font-medium">{shipment.currentLocation.city}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Destination:</span>
                        <span className="ml-2 font-medium">{shipment.destination.city}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">ETA:</span>
                        <span className="ml-2 font-medium">
                          {new Date(shipment.eta).toLocaleDateString()} {new Date(shipment.eta).toLocaleTimeString()}
                        </span>
                      </div>
                      {shipment.temperature && (
                        <div>
                          <span className="text-gray-600">Temperature:</span>
                          <span className="ml-2 font-medium">{shipment.temperature}°F</span>
                        </div>
                      )}
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{shipment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getStatusColor(shipment.status)}`}
                            style={{ width: `${shipment.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      {shipment.alerts.length > 0 && (
                        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded">
                          <div className="flex items-center space-x-1">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <span className="text-xs font-medium text-amber-800">Active Alerts</span>
                          </div>
                          {shipment.alerts.map((alert, idx) => (
                            <div key={idx} className="text-xs text-amber-700 mt-1">{alert}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{activeShipments.filter(s => s.status === 'in-transit').length}</div>
            <div className="text-sm text-gray-600">In Transit</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">98.2%</div>
            <div className="text-sm text-gray-600">Intelligence ETA Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{activeShipments.filter(s => s.alerts.length > 0).length}</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <div className="text-sm text-gray-600">Intelligence Optimized</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
