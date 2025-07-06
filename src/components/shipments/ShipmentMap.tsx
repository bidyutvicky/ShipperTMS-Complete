
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Truck, Package } from 'lucide-react';

const ShipmentMap = () => {
  // Mock data for active shipments
  const activeShipments = [
    { id: 'SH001', location: 'Chicago, IL', status: 'in-transit', progress: 65 },
    { id: 'SH002', location: 'Denver, CO', status: 'in-transit', progress: 30 },
    { id: 'SH003', location: 'Atlanta, GA', status: 'delivered', progress: 100 },
    { id: 'SH004', location: 'Phoenix, AZ', status: 'in-transit', progress: 80 },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span>Real-Time Shipment Visibility</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for interactive map */}
        <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Interactive Map View</h3>
              <p className="text-gray-500">Real-time GPS tracking • IoT sensors • AI predictions</p>
            </div>
          </div>
          
          {/* Mock shipment markers */}
          <div className="absolute top-4 left-4 space-y-2">
            {activeShipments.map((shipment, index) => (
              <div key={shipment.id} className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-lg">
                <Truck className={`h-4 w-4 ${shipment.status === 'delivered' ? 'text-green-600' : 'text-blue-600'}`} />
                <div>
                  <div className="text-xs font-medium">{shipment.id}</div>
                  <div className="text-xs text-gray-500">{shipment.location}</div>
                </div>
                <div className="w-12 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${shipment.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${shipment.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-gray-600">Active Shipments</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">96.2%</div>
            <div className="text-sm text-gray-600">AI ETA Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">AI Optimized Routes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentMap;
