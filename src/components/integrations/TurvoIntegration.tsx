import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  ExternalLink,
  Truck,
  Package,
  MapPin,
  Clock
} from 'lucide-react';

interface TurvoIntegrationProps {
  shipment: any;
  onSuccess?: (turvoShipmentId: string) => void;
}

const TurvoIntegration: React.FC<TurvoIntegrationProps> = ({ shipment, onSuccess }) => {
  const [apiToken, setApiToken] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connected' | 'error'>('idle');
  const [turvoShipmentId, setTurvoShipmentId] = useState<string | null>(null);
  const [carrierInfo, setCarrierInfo] = useState({
    id: '',
    name: '',
    mcNumber: '',
    dotNumber: '',
  });
  const { toast } = useToast();

  const testConnection = async () => {
    if (!apiToken.trim()) {
      toast({
        title: 'API Token Required',
        description: 'Please enter your Turvo API token.',
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);
    setConnectionStatus('idle');

    try {
      const response = await fetch('/api/turvo/test-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          apiToken: apiToken.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Connection test failed');
      }

      setConnectionStatus('connected');
      toast({
        title: 'Connection Successful',
        description: 'Successfully connected to Turvo API.',
      });
    } catch (error: any) {
      setConnectionStatus('error');
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect to Turvo API.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const sendToTurvo = async () => {
    if (connectionStatus !== 'connected') {
      toast({
        title: 'Connection Required',
        description: 'Please test the connection first.',
        variant: 'destructive',
      });
      return;
    }

    if (!carrierInfo.name.trim()) {
      toast({
        title: 'Carrier Information Required',
        description: 'Please enter carrier information.',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/turvo/create-shipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          shipmentId: shipment.id,
          turvoApiToken: apiToken.trim(),
          carrierInfo: {
            id: carrierInfo.id || `carrier-${Date.now()}`,
            name: carrierInfo.name,
            mcNumber: carrierInfo.mcNumber,
            dotNumber: carrierInfo.dotNumber,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send shipment to Turvo');
      }

      const result = await response.json();
      setTurvoShipmentId(result.turvoShipment.id);

      toast({
        title: 'Shipment Sent Successfully',
        description: `Shipment ${shipment.shipmentNumber} has been sent to Turvo.`,
      });

      if (onSuccess) {
        onSuccess(result.turvoShipment.id);
      }
    } catch (error: any) {
      toast({
        title: 'Send Failed',
        description: error.message || 'Failed to send shipment to Turvo.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const getConnectionStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Connection Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Not Connected
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ExternalLink className="h-5 w-5 text-blue-600" />
          <span>Send to Turvo</span>
          {getConnectionStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Shipment Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Shipment Details</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-gray-500" />
              <span>{shipment.shipmentNumber}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-gray-500" />
              <span>{shipment.carrier?.name || 'No carrier assigned'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{shipment.origin} → {shipment.destination}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString() : 'TBD'}</span>
            </div>
          </div>
        </div>

        {/* API Token Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Turvo API Token</label>
          <div className="flex space-x-2">
            <Input
              type="password"
              placeholder="Enter your Turvo API token"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              onClick={testConnection}
              disabled={isConnecting || !apiToken.trim()}
            >
              {isConnecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Test Connection'
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-600">
            Your API token is used to authenticate with Turvo and is not stored.
          </p>
        </div>

        {/* Carrier Information */}
        {connectionStatus === 'connected' && (
          <div className="space-y-4">
            <h4 className="font-medium">Carrier Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Carrier Name *</label>
                <Input
                  placeholder="Enter carrier name"
                  value={carrierInfo.name}
                  onChange={(e) => setCarrierInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Carrier ID</label>
                <Input
                  placeholder="Enter carrier ID (optional)"
                  value={carrierInfo.id}
                  onChange={(e) => setCarrierInfo(prev => ({ ...prev, id: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">MC Number</label>
                <Input
                  placeholder="Enter MC number (optional)"
                  value={carrierInfo.mcNumber}
                  onChange={(e) => setCarrierInfo(prev => ({ ...prev, mcNumber: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">DOT Number</label>
                <Input
                  placeholder="Enter DOT number (optional)"
                  value={carrierInfo.dotNumber}
                  onChange={(e) => setCarrierInfo(prev => ({ ...prev, dotNumber: e.target.value }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Send Button */}
        {connectionStatus === 'connected' && !turvoShipmentId && (
          <div className="flex justify-end">
            <Button 
              onClick={sendToTurvo}
              disabled={isSending || !carrierInfo.name.trim()}
              className="min-w-32"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send to Turvo
                </>
              )}
            </Button>
          </div>
        )}

        {/* Success Message */}
        {turvoShipmentId && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-800">Shipment Sent Successfully</h4>
            </div>
            <p className="text-sm text-green-700 mb-3">
              Your shipment has been successfully sent to Turvo and is now being processed.
            </p>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm">
                <strong>Turvo Shipment ID:</strong> {turvoShipmentId}
              </div>
              <div className="text-sm mt-1">
                <strong>TMS Shipment:</strong> {shipment.shipmentNumber}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">How to use Turvo Integration:</h4>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Enter your Turvo API token and test the connection</li>
            <li>Fill in the carrier information for this shipment</li>
            <li>Click "Send to Turvo" to create the shipment in Turvo</li>
            <li>The shipment will be automatically tracked and updated</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default TurvoIntegration;
