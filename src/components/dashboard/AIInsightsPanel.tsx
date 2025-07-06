
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertCircle, Zap, Target, DollarSign } from 'lucide-react';

const AIInsightsPanel = () => {
  const insights = [
    {
      id: 1,
      type: 'optimization',
      title: 'Route Optimization Opportunity',
      description: 'Intelligence identified 12% cost savings potential on Chicago-Atlanta lane through load consolidation',
      confidence: 94,
      impact: 'high',
      savings: '$2,400',
      timeframe: '2 days'
    },
    {
      id: 2,
      type: 'prediction',
      title: 'Demand Surge Predicted',
      description: 'Expected 25% increase in westbound freight next week based on seasonal patterns and market indicators',
      confidence: 87,
      impact: 'medium',
      action: 'Pre-book capacity at current rates',
      timeframe: '7 days'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Carrier Performance Alert',
      description: 'TransCorp showing declining OTP (82% vs 95% historical) - potential service degradation detected',
      confidence: 99,
      impact: 'high',
      action: 'Review contracts and diversify carrier mix',
      timeframe: 'immediate'
    },
    {
      id: 4,
      type: 'cost',
      title: 'Rate Negotiation Window',
      description: 'Market conditions favorable for 8-12% savings on West Coast lanes based on capacity analysis',
      confidence: 85,
      impact: 'medium',
      savings: '$1,800/month',
      timeframe: '30 days'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <Target className="h-4 w-4" />;
      case 'prediction':
        return <TrendingUp className="h-4 w-4" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4" />;
      case 'cost':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
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

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <span>Intelligence Insights & Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="text-blue-600 mt-1">
                  {getIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  {insight.action && (
                    <p className="text-sm font-medium text-blue-600 mt-2">
                      Recommended: {insight.action}
                    </p>
                  )}
                  {insight.savings && (
                    <p className="text-sm font-medium text-green-600 mt-2">
                      Potential savings: {insight.savings}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Confidence: {insight.confidence}%</span>
                    <span>Timeframe: {insight.timeframe}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge className={getImpactColor(insight.impact)}>
                  {insight.impact} impact
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;
