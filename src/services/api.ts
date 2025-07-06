const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Mock auth token for demo purposes
const DEMO_TOKEN = 'demo-token-for-testing';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = DEMO_TOKEN; // In real app, this would come from auth
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Carrier Management APIs
  async getCarriers(params?: {
    page?: number;
    limit?: number;
    isActive?: boolean;
    minPerformanceScore?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());
    if (params?.minPerformanceScore) searchParams.append('minPerformanceScore', params.minPerformanceScore.toString());
    
    return this.request(`/carriers?${searchParams.toString()}`);
  }

  async getCarrier(id: string) {
    return this.request(`/carriers/${id}`);
  }

  async createCarrier(carrierData: any) {
    return this.request('/carriers', {
      method: 'POST',
      body: JSON.stringify(carrierData),
    });
  }

  async updateCarrier(id: string, carrierData: any) {
    return this.request(`/carriers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(carrierData),
    });
  }

  async getCarrierRecommendations(shipmentRequirements: any) {
    return this.request('/carriers/recommendations', {
      method: 'POST',
      body: JSON.stringify(shipmentRequirements),
    });
  }

  async getCarrierAnalytics(params?: {
    carrierId?: string;
    timeframe?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.carrierId) searchParams.append('carrierId', params.carrierId);
    if (params?.timeframe) searchParams.append('timeframe', params.timeframe);
    
    return this.request(`/carriers/analytics?${searchParams.toString()}`);
  }

  async getCarrierCompliance() {
    return this.request('/carriers/compliance');
  }

  async getCarrierPerformance(id: string) {
    return this.request(`/carriers/${id}/performance`);
  }

  async onboardCarrier(carrierData: any) {
    return this.request('/carriers/onboard', {
      method: 'POST',
      body: JSON.stringify(carrierData),
    });
  }

  // Planning & Optimization APIs
  async optimizeLoadPlan(optimizationRequest: any) {
    return this.request('/planning/optimize', {
      method: 'POST',
      body: JSON.stringify(optimizationRequest),
    });
  }

  async getLoadPlans(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    return this.request(`/planning/load-plans?${searchParams.toString()}`);
  }

  async getLoadPlan(id: string) {
    return this.request(`/planning/load-plans/${id}`);
  }

  async optimizeRoutes(routeRequest: any) {
    return this.request('/planning/routes/optimize', {
      method: 'POST',
      body: JSON.stringify(routeRequest),
    });
  }

  async getCapacityPlan(params?: {
    timeHorizon?: number;
    includeSeasonality?: boolean;
    confidenceLevel?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.timeHorizon) searchParams.append('timeHorizon', params.timeHorizon.toString());
    if (params?.includeSeasonality !== undefined) searchParams.append('includeSeasonality', params.includeSeasonality.toString());
    if (params?.confidenceLevel) searchParams.append('confidenceLevel', params.confidenceLevel.toString());
    
    return this.request(`/planning/capacity?${searchParams.toString()}`);
  }

  async realTimeOptimize(request: any) {
    return this.request('/planning/real-time/optimize', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async multiModalOptimize(request: any) {
    return this.request('/planning/multi-modal', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Order Management APIs
  async getOrders(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    return this.request(`/orders?${searchParams.toString()}`);
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`);
  }

  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrder(id: string, orderData: any) {
    return this.request(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  // Shipment Management APIs
  async getShipments(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    return this.request(`/shipments?${searchParams.toString()}`);
  }

  async getShipment(id: string) {
    return this.request(`/shipments/${id}`);
  }

  async createShipment(shipmentData: any) {
    return this.request('/shipments', {
      method: 'POST',
      body: JSON.stringify(shipmentData),
    });
  }

  async updateShipment(id: string, shipmentData: any) {
    return this.request(`/shipments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(shipmentData),
    });
  }

  async trackShipment(id: string) {
    return this.request(`/shipments/${id}/track`);
  }

  // Analytics APIs
  async getDashboardMetrics() {
    return this.request('/analytics/dashboard');
  }

  async getPerformanceMetrics(params?: {
    timeframe?: string;
    metric?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.timeframe) searchParams.append('timeframe', params.timeframe);
    if (params?.metric) searchParams.append('metric', params.metric);
    
    return this.request(`/analytics/performance?${searchParams.toString()}`);
  }

  // Mock data fallback for demo purposes
  getMockCarriers() {
    return Promise.resolve({
      carriers: [
        {
          id: '1',
          name: 'FastFreight LLC',
          email: 'dispatch@fastfreight.com',
          phone: '+1-555-0123',
          city: 'Dallas',
          state: 'TX',
          performanceScore: 94.2,
          onTimePerformance: 96.1,
          acceptanceRate: 89.3,
          costRating: 4.2,
          qualityRating: 4.5,
          aiReliabilityScore: 92.8,
          totalShipments: 1247,
          serviceLanes: ['TX-CA', 'TX-FL', 'TX-NY'],
          certifications: ['ISO 9001', 'SmartWay', 'HAZMAT'],
          isActive: true,
          createdAt: '2024-01-15T10:30:00Z',
        },
        {
          id: '2',
          name: 'RoadRunner Express',
          email: 'ops@roadrunner.com',
          phone: '+1-555-0456',
          city: 'Phoenix',
          state: 'AZ',
          performanceScore: 91.5,
          onTimePerformance: 93.2,
          acceptanceRate: 95.1,
          costRating: 3.8,
          qualityRating: 4.3,
          aiReliabilityScore: 90.7,
          totalShipments: 892,
          serviceLanes: ['AZ-CA', 'AZ-NV', 'AZ-TX'],
          certifications: ['SmartWay', 'Temperature Controlled'],
          isActive: true,
          createdAt: '2024-02-01T14:20:00Z',
        },
        {
          id: '3',
          name: 'Premier Logistics',
          email: 'dispatch@premierlog.com',
          phone: '+1-555-0789',
          city: 'Atlanta',
          state: 'GA',
          performanceScore: 96.3,
          onTimePerformance: 98.1,
          acceptanceRate: 92.4,
          costRating: 4.4,
          qualityRating: 4.8,
          aiReliabilityScore: 95.2,
          totalShipments: 2134,
          serviceLanes: ['GA-FL', 'GA-NC', 'GA-SC'],
          certifications: ['ISO 9001', 'SmartWay', 'HAZMAT', 'Food Grade'],
          isActive: true,
          createdAt: '2023-11-10T09:15:00Z',
        },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 3,
        pages: 1,
      },
    });
  }

  getMockLoadPlans() {
    return Promise.resolve({
      loadPlans: [
        {
          id: 'plan-001',
          name: 'Midwest Consolidation Route',
          status: 'OPTIMIZED',
          orders: ['order-001', 'order-002'],
          totalCost: 5700,
          totalSavings: 1200,
          optimizationScore: 92.5,
          createdAt: '2024-07-05T10:30:00Z',
          creator: {
            id: 'user-001',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@company.com',
          },
        },
        {
          id: 'plan-002',
          name: 'West Coast Express',
          status: 'APPROVED',
          orders: ['order-003', 'order-004', 'order-005'],
          totalCost: 8900,
          totalSavings: 2100,
          optimizationScore: 89.3,
          createdAt: '2024-07-04T15:45:00Z',
          creator: {
            id: 'user-002',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@company.com',
          },
        },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 2,
        pages: 1,
      },
    });
  }
}

export const apiService = new ApiService();
export default apiService;
