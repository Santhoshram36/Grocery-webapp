import React, { useState } from 'react';
import './BulkOrder.css';
import { food_list } from '../../assets/assets'; // Assuming this contains a list of menu items with IDs, names, and prices

function BulkOrder() {
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [bulkOrderItems, setBulkOrderItems] = useState({});
  const [sampleOrderItems, setSampleOrderItems] = useState({});
  const [additionalRequests, setAdditionalRequests] = useState('');

  // Handle input changes for bulk order items
  const handleBulkOrderChange = (itemId, quantity) => {
    setBulkOrderItems((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  // Handle input changes for sample order items
  const handleSampleOrderChange = (itemId, quantity) => {
    setSampleOrderItems((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  // Handle order submission
  const handleSubmitOrder = () => {
    // Here, you would typically send order data to the backend for processing
    alert('Bulk and sample orders submitted successfully!');
  };

  return (
    <React.Fragment>
    <div className="bulk-order">
      <h2>Bulk & Sample Orders for Events</h2>
      
      {/* Event Details */}
      <div className="bulk-order-event">
        <label>Event Type:</label>
        <input
          type="text"
          placeholder="e.g., Wedding, Birthday, Corporate Event"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />

        <label>Guest Count:</label>
        <input
          type="number"
          placeholder="Approximate number of guests"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
        />
      </div>

      {/* Bulk Order Section */}
      <div className="bulk-order-items">
        <h3>Bulk Order</h3>
        <p>Select items and quantities for bulk order:</p>
        {food_list.map((item) => (
          <div key={item._id} className="bulk-order-item">
            <p>{item.name} - ₹{item.price}</p>
            <input
              type="number"
              placeholder="Quantity"
              min="0"
              onChange={(e) => handleBulkOrderChange(item._id, parseInt(e.target.value) || 0)}
            />
          </div>
        ))}
      </div>

      {/* Sample Order Section */}
      <div className="sample-order-items">
        <h3>Sample Order</h3>
        <p>Select items for sample taste-testing:</p>
        {food_list.map((item) => (
          <div key={item._id} className="sample-order-item">
            <p>{item.name}</p>
            <input
              type="number"
              placeholder="Sample Quantity"
              min="0"
              onChange={(e) => handleSampleOrderChange(item._id, parseInt(e.target.value) || 0)}
            />
          </div>
        ))}
      </div>

      {/* Additional Requests */}
      <div className="additional-requests">
        <h3>Additional Requests:</h3>
        <textarea
          placeholder="Any specific requests for catering or sample orders"
          value={additionalRequests}
          onChange={(e) => setAdditionalRequests(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmitOrder}>Submit Bulk & Sample Order</button>
    </div>
    </React.Fragment>
  );
}

export default BulkOrder;
