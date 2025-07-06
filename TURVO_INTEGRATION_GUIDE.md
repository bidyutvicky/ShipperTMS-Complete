# Turvo Integration Guide

This guide explains how to use the TMS system to create and send shipments to Turvo using your API token.

## Overview

The TMS system now includes a complete Turvo integration that allows you to:
- Send shipments from the TMS to Turvo
- Track shipments in real-time
- Sync status updates between systems
- Manage carrier information

## Prerequisites

1. **Turvo API Token**: You need a valid Turvo API token with the following permissions:
   - Create shipments
   - Read shipment data
   - Update tracking information
   - Access carrier information

2. **TMS Access**: You need Manager or Admin access in the TMS system

## Step-by-Step Guide

### 1. Access the Execution Module

1. Navigate to the **Execution & Visibility** page (`/execution`)
2. Find the shipment you want to send to Turvo
3. Click the **"Send to Turvo"** button on the shipment card

### 2. Configure Turvo Connection

1. **Enter API Token**: 
   - Paste your Turvo API token in the "Turvo API Token" field
   - The token is used for authentication and is not stored permanently

2. **Test Connection**:
   - Click "Test Connection" to verify your API token
   - Wait for the green "Connected" badge to appear

### 3. Enter Carrier Information

Once connected, you'll need to provide carrier details:

- **Carrier Name** (Required): The name of the carrier handling the shipment
- **Carrier ID** (Optional): Unique identifier for the carrier in Turvo
- **MC Number** (Optional): Motor Carrier number
- **DOT Number** (Optional): Department of Transportation number

### 4. Send Shipment to Turvo

1. Click **"Send to Turvo"** button
2. The system will:
   - Convert the TMS shipment to Turvo format
   - Create the shipment in Turvo
   - Update the TMS shipment status
   - Display the Turvo shipment ID

### 5. Track Integration Status

After successful integration:
- The TMS shipment status will update to "DISPATCHED"
- You'll receive the Turvo shipment ID for reference
- Future tracking updates will sync between systems

## API Endpoints

The integration uses the following API endpoints:

### Test Connection
```http
POST /api/turvo/test-connection
Content-Type: application/json
Authorization: Bearer <your-tms-token>

{
  "apiToken": "your-turvo-api-token"
}
```

### Create Shipment
```http
POST /api/turvo/create-shipment
Content-Type: application/json
Authorization: Bearer <your-tms-token>

{
  "shipmentId": "ship-123",
  "turvoApiToken": "your-turvo-api-token",
  "carrierInfo": {
    "id": "carrier-456",
    "name": "FastFreight LLC",
    "mcNumber": "MC123456",
    "dotNumber": "DOT789012"
  }
}
```

### Get Shipment Status
```http
GET /api/turvo/get-shipment/{turvoShipmentId}?apiToken=your-turvo-api-token
Authorization: Bearer <your-tms-token>
```

### Get Tracking Updates
```http
GET /api/turvo/tracking/{turvoShipmentId}?apiToken=your-turvo-api-token
Authorization: Bearer <your-tms-token>
```

## Data Mapping

The system automatically converts TMS shipment data to Turvo format:

### Location Mapping
```json
{
  "pickupLocation": {
    "name": "Origin Location Name",
    "address": {
      "street": "123 Main St",
      "city": "Dallas",
      "state": "TX",
      "zipCode": "75201",
      "country": "US"
    },
    "contact": {
      "name": "Contact Name",
      "phone": "+1-555-0123",
      "email": "contact@company.com"
    }
  }
}
```

### Item Mapping
```json
{
  "items": [
    {
      "description": "General Freight",
      "quantity": 1,
      "weight": 1000,
      "dimensions": {
        "length": 48,
        "width": 40,
        "height": 36,
        "unit": "IN"
      },
      "value": 5000,
      "hazmat": false
    }
  ]
}
```

### Reference Numbers
```json
{
  "references": [
    {
      "type": "SHIPMENT_NUMBER",
      "value": "SHIP-2024-001"
    },
    {
      "type": "CUSTOMER_PO",
      "value": "PO123456"
    },
    {
      "type": "BOL",
      "value": "BOL789012"
    }
  ]
}
```

## Error Handling

Common errors and solutions:

### 401 - Invalid API Token
- **Cause**: Incorrect or expired Turvo API token
- **Solution**: Verify your API token with Turvo support

### 400 - Invalid Shipment Data
- **Cause**: Missing required fields or invalid data format
- **Solution**: Check that all required shipment information is complete

### 429 - Rate Limit Exceeded
- **Cause**: Too many API requests in a short time
- **Solution**: Wait a few minutes before retrying

### 404 - Shipment Not Found
- **Cause**: Shipment doesn't exist in TMS or Turvo
- **Solution**: Verify the shipment ID and try again

## Security Considerations

1. **API Token Security**:
   - Never share your Turvo API token
   - The token is transmitted securely but not stored permanently
   - Use environment variables for production deployments

2. **Data Privacy**:
   - All shipment data is encrypted in transit
   - Integration logs are maintained for audit purposes
   - Access is restricted to authorized users only

## Troubleshooting

### Connection Issues
1. Verify your Turvo API token is correct
2. Check your internet connection
3. Ensure Turvo API is accessible from your network

### Shipment Creation Failures
1. Verify all required fields are populated
2. Check carrier information is valid
3. Ensure shipment hasn't already been sent to Turvo

### Missing Tracking Updates
1. Verify the Turvo shipment ID is correct
2. Check that tracking is enabled in Turvo
3. Ensure carrier is providing tracking updates

## Advanced Features

### Bulk Shipment Processing
For multiple shipments, you can use the API directly:

```javascript
const shipments = ['ship-001', 'ship-002', 'ship-003'];

for (const shipmentId of shipments) {
  await fetch('/api/turvo/create-shipment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tmsToken}`,
    },
    body: JSON.stringify({
      shipmentId,
      turvoApiToken: turvoToken,
      carrierInfo: carrierData,
    }),
  });
}
```

### Webhook Integration
Set up webhooks to receive real-time updates from Turvo:

```javascript
// Webhook endpoint to receive Turvo updates
app.post('/api/turvo/webhook', (req, res) => {
  const { shipmentId, status, location } = req.body;
  
  // Update TMS shipment with Turvo data
  updateShipmentStatus(shipmentId, status, location);
  
  res.status(200).json({ received: true });
});
```

## Support

For technical support:
1. Check the TMS system logs for detailed error messages
2. Verify your Turvo API token permissions
3. Contact your system administrator for TMS-related issues
4. Contact Turvo support for API-related issues

## Example Workflow

Here's a complete example of sending a shipment to Turvo:

1. **Create shipment in TMS**:
   ```
   Origin: Dallas, TX
   Destination: Los Angeles, CA
   Weight: 15,000 lbs
   Pickup Date: 2024-07-15
   Delivery Date: 2024-07-17
   ```

2. **Navigate to Execution page** and find the shipment

3. **Click "Send to Turvo"** button

4. **Enter Turvo API token** and test connection

5. **Fill carrier information**:
   ```
   Carrier Name: FastFreight LLC
   MC Number: MC123456
   DOT Number: DOT789012
   ```

6. **Click "Send to Turvo"** and wait for confirmation

7. **Receive Turvo shipment ID**: `TRV-2024-001234`

8. **Track shipment** in both TMS and Turvo systems

The shipment is now successfully integrated and will sync tracking updates automatically!
