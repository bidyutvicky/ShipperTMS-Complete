
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import MetricsCard from '@/components/dashboard/MetricsCard';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import InteractiveMap from '@/components/shipments/InteractiveMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  Target,
  Zap,
  RefreshCw,
  Activity,
  Eye,
  Play,
  Brain
} from 'lucide-react';

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'optimization',
      message: 'AI optimized 12 shipments, saving $3,200',
      time: '2 minutes ago',
      icon: Brain,
      color: 'text-purple-600',
    },
    {
      id: 2,
      type: 'execution',
      message: 'Load plan PLAN-2024-001 executed successfully',
      time: '5 minutes ago',
      icon: Play,
      color: 'text-green-600',
    },
    {
      id: 3,
      type: 'tracking',
      message: 'Shipment SHIP-2024-045 delivered on time',
      time: '8 minutes ago',
      icon: Package,
      color: 'text-blue-600',
    },
    {
      id: 4,
      type: 'alert',
      message: 'Weather delay predicted for TX-CA lane',
      time: '12 minutes ago',
      icon: AlertTriangle,
      color: 'text-yellow-600',
    },
  ]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLastUpdated(new Date());
    setIsRefreshing(false);

    toast({
      title: 'Dashboard Refreshed',
      description: 'All data has been updated with the latest information.',
    });
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: 'Quick Action',
      description: `${action} initiated. Redirecting to relevant page...`,
    });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered TMS Dashboard</h1>
              <p className="text-gray-600">Real-time insights and intelligent recommendations for your transportation network</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
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
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Active Shipments"
            value="247"
            change="+12% from last week"
            changeType="positive"
            icon={Package}
            description="Intelligence-optimized routing active"
          />
          <MetricsCard
            title="Carrier Performance"
            value="94.2%"
            change="+2.1% improvement"
            changeType="positive"
            icon={Truck}
            description="Intelligence-powered scoring"
          />
          <MetricsCard
            title="Cost Savings"
            value="$24,500"
            change="This month via Intelligence optimization"
            changeType="positive"
            icon={DollarSign}
            description="vs traditional planning"
          />
          <MetricsCard
            title="ETA Accuracy"
            value="96.8%"
            change="Industry leading precision"
            changeType="positive"
            icon={Target}
            description="Intelligence predictive models"
          />
        </div>
        
        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Avg Transit Time"
            value="2.3 days"
            change="-0.4 days vs target"
            changeType="positive"
            icon={Clock}
          />
          <MetricsCard
            title="Active Alerts"
            value="8"
            change="3 resolved today"
            changeType="positive"
            icon={AlertTriangle}
          />
          <MetricsCard
            title="Fuel Efficiency"
            value="6.8 MPG"
            change="+0.3 MPG improvement"
            changeType="positive"
            icon={TrendingUp}
          />
          <MetricsCard
            title="Intelligence Optimizations"
            value="156"
            change="Applied this week"
            changeType="positive"
            icon={Zap}
          />
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleQuickAction('Create Load Plan')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Optimize</h3>
                  <p className="text-sm text-gray-600">Create optimized load plan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleQuickAction('Execute Plan')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Play className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Execute Plan</h3>
                  <p className="text-sm text-gray-600">Launch approved shipments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleQuickAction('Track Shipments')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Track Live</h3>
                  <p className="text-sm text-gray-600">Real-time visibility</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleQuickAction('Manage Carriers')}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Carriers</h3>
                  <p className="text-sm text-gray-600">Manage carrier network</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <InteractiveMap />
          </div>
          <div>
            <AIInsightsPanel />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 bg-white rounded-lg ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Performance Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>On-Time Delivery</span>
                    <span>94.2% / 95%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cost Optimization</span>
                    <span>87% / 85%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Carrier Performance</span>
                    <span>92.1% / 90%</span>
                  </div>
                  <Progress value={92.1} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>AI Utilization</span>
                    <span>78% / 80%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
