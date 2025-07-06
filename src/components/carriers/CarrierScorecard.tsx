
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Truck, Star, TrendingUp, Clock } from 'lucide-react';

interface CarrierScorecardProps {
  carrier: {
    id: string;
    name: string;
    performanceScore: number;
    onTimePerformance: number;
    acceptanceRate: number;
    costRating: number;
    qualityRating: number;
    totalShipments: number;
  };
}

const CarrierScorecard: React.FC<CarrierScorecardProps> = ({ carrier }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <span className="text-lg">{carrier.name}</span>
          </div>
          <Badge className={getScoreBadge(carrier.performanceScore)}>
            AI Score: {carrier.performanceScore}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">On-Time Performance</span>
              <span className={`text-sm font-medium ${getScoreColor(carrier.onTimePerformance)}`}>
                {carrier.onTimePerformance}%
              </span>
            </div>
            <Progress value={carrier.onTimePerformance} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Acceptance Rate</span>
              <span className={`text-sm font-medium ${getScoreColor(carrier.acceptanceRate)}`}>
                {carrier.acceptanceRate}%
              </span>
            </div>
            <Progress value={carrier.acceptanceRate} className="h-2" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{carrier.qualityRating}/5</span>
            </div>
            <div className="text-xs text-gray-500">Quality</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm font-medium">{carrier.costRating}/5</span>
            </div>
            <div className="text-xs text-gray-500">Cost Efficiency</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-sm font-medium">{carrier.totalShipments}</span>
            </div>
            <div className="text-xs text-gray-500">Total Shipments</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarrierScorecard;
