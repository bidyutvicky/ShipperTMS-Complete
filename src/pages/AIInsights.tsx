
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Target,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const AIInsights = () => {
  const insights = [
    {
      id: 1,
      category: 'Route Optimization',
      title: 'Consolidation Opportunity Detected',
      description: 'AI identified potential to consolidate 3 LTL shipments into 1 FTL on Chicago-Dallas lane',
      impact: 'high',
      confidence: 96,
      savings: '$3,200',
      timeframe: '2 days',
      status: 'actionable'
    },
    {
      id: 2,
      category: 'Demand Forecasting',
      title: 'Capacity Crunch Predicted',
      description: 'ML models predict 35% increase in eastbound freight demand starting next Tuesday',
      impact: 'high',
      confidence: 89,
      recommendation: 'Pre-book capacity at current rates',
      timeframe: '5 days',
      status: 'urgent'
    },
    {
      id: 3,
      category: 'Carrier Performance',
      title: 'Performance Degradation Alert',
      description: 'TransCorp showing 15% decline in OTP over past 30 days. Historical pattern suggests service issues.',
      impact: 'medium',
      confidence: 94,
      recommendation: 'Diversify carrier mix for critical lanes',
      timeframe: 'ongoing',
      status: 'monitoring'
    },
    {
      id: 4,
      category: 'Cost Optimization',
      title: 'Rate Negotiation Opportunity',
      description: 'Market analysis suggests 8-12% savings possible on West Coast lanes based on current capacity',
      impact: 'medium',
      confidence: 87,
      savings: '$5,800/month',
      timeframe: '30 days',
      status: 'actionable'
    },
    {
      id: 5,
      category: 'Risk Management',
      title: 'Weather Disruption Forecast',
      description: 'Severe weather system tracking toward major freight corridors. 12 active shipments at risk.',
      impact: 'high',
      confidence: 92,
      recommendation: 'Activate contingency routing for affected shipments',
      timeframe: '48 hours',
      status: 'urgent'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'actionable':
        return 'bg-blue-100 text-blue-800';
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Route Optimization':
        return <Target className="h-5 w-5" />;
      case 'Demand Forecasting':
        return <TrendingUp className="h-5 w-5" />;
      case 'Carrier Performance':
        return <Activity className="h-5 w-5" />;
      case 'Cost Optimization':
        return <BarChart3 className="h-5 w-5" />;
      case 'Risk Management':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Insights & Recommendations</h1>
          <p className="text-gray-600">Advanced machine learning insights to optimize your transportation network</p>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-gray-600">Active Insights</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">$47K</div>
                  <div className="text-sm text-gray-600">Potential Savings</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-gray-600">Urgent Actions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-sm text-gray-600">Avg Confidence</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Insights List */}
        <div className="space-y-6">
          {insights.map((insight) => (
            <Card key={insight.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">
                      {getCategoryIcon(insight.category)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{insight.title}</h3>
                      <p className="text-sm text-gray-600 font-normal">{insight.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(insight.status)}>
                      {insight.status}
                    </Badge>
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact} impact
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{insight.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Confidence: {insight.confidence}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Timeframe: {insight.timeframe}</span>
                  </div>
                  {insight.savings && (
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-green-600 font-medium">Savings: {insight.savings}</span>
                    </div>
                  )}
                </div>
                
                {insight.recommendation && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <Brain className="h-4 w-4 text-blue-600 mt-1" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">AI Recommendation</h4>
                        <p className="text-sm text-blue-700 mt-1">{insight.recommendation}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <Button size="sm">Take Action</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="ghost" size="sm">Dismiss</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AIInsights;
