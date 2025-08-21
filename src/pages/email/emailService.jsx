export const EmailService = {
  
  async sendBookingConfirmation(bookingData) {
    try {
      console.log('Sending email with data:', bookingData); 
      
  //     const API_URL = import.meta.env.MODE === "production"
  // ? "https://admin.didihat.com"
  // : "http://localhost:1350";

  const API_URL = import.meta.env.VITE_PUBLIC_STRAPI_API_URL;

const response = await fetch(`${API_URL}/api/send-booking-email`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  },
  body: JSON.stringify(bookingData),
});
      // const response = await fetch('http://localhost:1350/api/send-booking-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      //   },
      //   body: JSON.stringify(bookingData),
      // });

      console.log('Response status:', response.status); 

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData); 
        throw new Error(errorData.error?.message || 'Failed to send email');
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Error sending booking confirmation email:', error);
      throw error;
    }
  },

  
  generatePaymentLink(bookingId) {
    const baseUrl = window.location.origin;
    return `${baseUrl}/payment/${bookingId}`;
  },

  
  formatCartItemsForEmail(cartItems) {
    return cartItems.map(item => ({
      id: item.id,
      name: item.name,
      type: item.type,
      quantity: item.quantity,
      price: item.totalPrice || item.price || 0,
      location: item.location,
      selectedDate: item.selectedDate,
      selectedTime: item.selectedTime,
      guests: item.guests,
      duration: item.duration,
      ticketTypes: item.ticketTypes,
      image: item.image,
    }));
  },

  //  email content
  createEmailContent(user, cartItems, totals, paymentMethod) {
    const bookingId = `BOOK_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const paymentLink = this.generatePaymentLink(bookingId);
    
    console.log('Creating email content for user:', user.email); // Debug log
    
    return {
      to: user.email,
      bookingId,
      subject: `Booking Confirmation - ${bookingId}`,
      customerName: user.name || user.firstName || user.username || 'Valued Customer',
      cartItems: this.formatCartItemsForEmail(cartItems),
      totals,
      paymentMethod: this.getPaymentMethodLabel(paymentMethod),
      paymentLink,
      userId: user.id, // Add user ID for database storage
    };
  },

  //  template
  generateEmailHTML(user, cartItems, totals, paymentMethod, bookingId, paymentLink) {
    const customerName = user.name || user.firstName || 'Valued Customer';
    
    const itemsHTML = cartItems.map(item => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 8px;">
          <div style="font-weight: 600; color: #111827; margin-bottom: 4px;">${item.name}</div>
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 2px;">${this.getTypeLabel(item.type)}</div>
          ${item.location ? `<div style="font-size: 12px; color: #9ca3af;">📍 ${item.location}</div>` : ''}
          ${item.selectedDate ? `<div style="font-size: 12px; color: #9ca3af;">📅 ${new Date(item.selectedDate).toLocaleDateString()}</div>` : ''}
          ${item.selectedTime ? `<div style="font-size: 12px; color: #9ca3af;">🕐 ${item.selectedTime}</div>` : ''}
        </td>
        <td style="padding: 12px 8px; text-align: center; font-weight: 500;">${item.quantity}</td>
        <td style="padding: 12px 8px; text-align: right; font-weight: 600; color: #003B95;">₹${((item.totalPrice || item.price) * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation - DIDIHAT</title>
        </head>
        <body style="font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #003B95 0%, #4F8CE5 100%); color: white; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">DIDIHAT</h1>
              <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.9;">Travel & Tourism</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #003B95; margin: 0 0 8px 0; font-size: 24px; font-weight: 700;">Booking Confirmed!</h2>
                <p style="margin: 0; font-size: 16px; color: #6b7280;">Booking ID: <strong style="color: #003B95;">${bookingId}</strong></p>
              </div>

              <p style="margin: 0 0 30px 0; font-size: 16px; color: #4b5563;">
                Dear <strong>${customerName}</strong>,<br><br>
                Thank you for choosing DIDIHAT! Your booking has been confirmed. Please complete your payment using the secure link below to finalize your reservation.
              </p>

              <!-- Booking Details -->
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin: 30px 0; border: 1px solid #e2e8f0;">
                <h3 style="margin: 0 0 20px 0; color: #374151; font-size: 18px; font-weight: 600;">Booking Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="border-bottom: 2px solid #d1d5db;">
                      <th style="text-align: left; padding: 12px 8px; color: #6b7280; font-weight: 600; font-size: 14px;">Item Details</th>
                      <th style="text-align: center; padding: 12px 8px; color: #6b7280; font-weight: 600; font-size: 14px;">Qty</th>
                      <th style="text-align: right; padding: 12px 8px; color: #6b7280; font-weight: 600; font-size: 14px;">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                  </tbody>
                </table>
              </div>

              <!-- Payment Summary -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 24px; margin: 30px 0; border: 1px solid #bae6fd;">
                <h3 style="margin: 0 0 20px 0; color: #0c4a6e; font-size: 18px; font-weight: 600;">Payment Summary</h3>
                <div style="space-y: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="color: #475569; font-size: 15px;">Subtotal (${totals.itemCount} items):</span>
                    <span style="font-weight: 600; color: #1e293b;">₹${totals.subtotal.toLocaleString()}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="color: #475569; font-size: 15px;">Taxes & Fees (18% GST):</span>
                    <span style="font-weight: 600; color: #1e293b;">₹${totals.tax.toLocaleString()}</span>
                  </div>
                  <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 16px 0;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <span style="font-size: 18px; font-weight: 700; color: #0c4a6e;">Total Amount:</span>
                    <span style="font-size: 20px; font-weight: 700; color: #003B95;">₹${totals.total.toLocaleString()}</span>
                  </div>
                  <div style="background-color: rgba(59, 130, 246, 0.1); padding: 12px; border-radius: 8px; margin-top: 16px;">
                    <div style="font-size: 14px; color: #1e40af;">
                      <strong>Payment Method:</strong> ${this.getPaymentMethodLabel(paymentMethod)}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Payment Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${paymentLink}" 
                   style="display: inline-block; background: linear-gradient(135deg, #003B95 0%, #1d4ed8 100%); color: white; padding: 16px 48px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 16px rgba(0, 59, 149, 0.3); transition: all 0.3s ease;">
                  💳 Complete Payment Now
                </a>
                <p style="margin: 16px 0 0 0; font-size: 14px; color: #6b7280;">
                  🔒 Secure payment • Link expires in 24 hours
                </p>
              </div>

              <!-- Important Notes -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 16px; font-weight: 600;">⚠️ Important</h4>
                <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 14px;">
                  <li>Complete payment within 24 hours to secure your booking</li>
                  <li>You'll receive final confirmation after successful payment</li>
                  <li>Keep this booking ID for future reference</li>
                </ul>
              </div>

              <!-- Contact Info -->
              <div style="border-top: 2px solid #e5e7eb; padding-top: 30px; margin-top: 40px;">
                <h4 style="margin: 0 0 16px 0; color: #374151; font-size: 16px; font-weight: 600;">Need Help? 🤝</h4>
                <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px;">
                  <p style="margin: 0 0 8px 0; font-size: 14px; color: #4b5563;">
                    📧 Email: <a href="mailto:contact@didihat.com" style="color: #003B95; text-decoration: none; font-weight: 500;">contact@didihat.com</a>
                  </p>
                  <p style="margin: 0; font-size: 14px; color: #4b5563;">
                    📞 Phone: <a href="tel:+919410116800" style="color: #003B95; text-decoration: none; font-weight: 500;">+91 9410116800</a>
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; font-weight: 500;">
                © 2024 DIDIHAT - Your Trusted Travel Partner
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                📍 Uttarakhand, India | 🌐 www.didihat.com
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  },

 
  // createEmailContent(user, cartItems, totals, paymentMethod) {
  //   const bookingId = `BOOK_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  //   const paymentLink = this.generatePaymentLink(bookingId);
    
  //   console.log('Creating email content for user:', user.email); 
    
  //   return {
  //     to: user.email,
  //     bookingId,
  //     subject: `Booking Confirmation - ${bookingId}`,
  //     customerName: user.name || user.firstName || 'Valued Customer',
  //     cartItems: this.formatCartItemsForEmail(cartItems),
  //     totals,
  //     paymentMethod: this.getPaymentMethodLabel(paymentMethod),
  //     paymentLink,
  //   };
  // },

  // Helper methods
  getTypeLabel(type) {
    const labels = {
      'stay': 'Stay',
      'attraction': 'Attraction',
      'tour-package': 'Tour Package',
      'car-rental': 'Car Rental'
    };
    return labels[type] || 'Item';
  },

  getPaymentMethodLabel(method) {
    const labels = {
      'upi': 'UPI Payment',
      'card': 'Credit/Debit Card',
      'netbanking': 'Net Banking',
      'wallet': 'Digital Wallet'
    };
    return labels[method] || 'Selected Payment Method';
  }
};