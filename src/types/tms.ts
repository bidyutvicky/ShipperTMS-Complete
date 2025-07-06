
// Core data models for the TMS system
export interface Shipment {
  id: string;
  orderNumber: string;
  customer: Customer;
  origin: Location;
  destination: Location;
  status: ShipmentStatus;
  mode: TransportMode;
  carrier?: Carrier;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  cost: number;
  weight: number;
  volume: number;
  priority: Priority;
  aiOptimizationScore: number;
  trackingData: TrackingPoint[];
  alerts: Alert[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Carrier {
  id: string;
  name: string;
  contactInfo: ContactInfo;
  performanceScore: number;
  onTimePerformance: number;
  acceptanceRate: number;
  costRating: number;
  qualityRating: number;
  serviceLanes: string[];
  certifications: string[];
  insuranceInfo: InsuranceInfo;
  aiReliabilityScore: number;
  totalShipments: number;
}

export interface Customer {
  id: string;
  name: string;
  contactInfo: ContactInfo;
  shipmentVolume: number;
  preferredCarriers: string[];
  specialRequirements: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: LocationType;
}

export interface TrackingPoint {
  id: string;
  shipmentId: string;
  location: Location;
  timestamp: Date;
  status: string;
  temperature?: number;
  humidity?: number;
  aiPredictedDelay?: number;
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  recommendation: string;
  shipmentId?: string;
  createdAt: Date;
  resolved: boolean;
  aiGenerated: boolean;
}

export interface Route {
  id: string;
  shipmentId: string;
  waypoints: Location[];
  estimatedDuration: number;
  estimatedDistance: number;
  optimizationScore: number;
  fuelEfficiency: number;
  aiOptimized: boolean;
  realTimeUpdates: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  coverage: number;
  expiryDate: Date;
}

export type ShipmentStatus = 'planned' | 'booked' | 'in-transit' | 'delivered' | 'delayed' | 'exception';
export type TransportMode = 'LTL' | 'FTL' | 'Rail' | 'Ocean' | 'Air' | 'Intermodal';
export type Priority = 'low' | 'normal' | 'high' | 'urgent';
export type LocationType = 'origin' | 'destination' | 'hub' | 'warehouse';
export type AlertType = 'delay' | 'weather' | 'traffic' | 'mechanical' | 'customs' | 'temperature';
export type AlertSeverity = 'info' | 'warning' | 'critical';

// AI/ML related interfaces
export interface AIPrediction {
  id: string;
  type: 'eta' | 'disruption' | 'cost' | 'route';
  confidence: number;
  prediction: any;
  model: string;
  timestamp: Date;
}

export interface MarketData {
  lane: string;
  averageRate: number;
  capacity: number;
  demand: number;
  trend: 'up' | 'down' | 'stable';
}
