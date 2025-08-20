import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  Building2, 
  Camera,
  Package,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Banknote,
  University,
  Check
} from 'lucide-react';
import { EmailService } from '../email/emailService';
import EmailNotification from '../email/emailNotificaton';


const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotals, clearCart } = useCart();
  const navigate = useNavigate();
  const { subtotal, tax, total, itemCount } = getCartTotals();

  const [selectedPayment, setSelectedPayment] = useState('');
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailMessage, setEmailMessage] = useState('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  
  // User state management (same pattern as Header component)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem('user')));
      } catch {
        setUser(null);
      }
    };

    // Listen for storage changes and user logout events
    window.addEventListener('storage', syncUser);
    window.addEventListener('userLogout', syncUser);

    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('userLogout', syncUser);
    };
  }, []);

  const paymentOptions = [
    { id: 'upi', label: 'UPI', icon: <Smartphone className="w-5 h-5" />, desc: 'Pay using UPI apps like PhonePe, GPay, Paytm' },
    { id: 'card', label: 'Credit/Debit Card', icon: <CreditCard className="w-5 h-5" />, desc: 'Visa, Mastercard, Rupay cards accepted' },
    { id: 'netbanking', label: 'Net Banking', icon: <University className="w-5 h-5" />, desc: 'All major banks supported' },
    { id: 'wallet', label: 'Wallet', icon: <Banknote className="w-5 h-5" />, desc: 'Paytm, PhonePe, Amazon Pay' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'stay':
        return <Building2 className="w-5 h-5" />;
      case 'attraction':
        return <Camera className="w-5 h-5" />;
      case 'tour-package':
        return <Package className="w-5 h-5" />;
      case 'car-rental':
        return <Car className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'stay':
        return 'Stay';
      case 'attraction':
        return 'Attraction';
      case 'tour-package':
        return 'Tour Package';
      case 'car-rental':
        return 'Car Rental';
      default:
        return 'Item';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPlaceholderImage = (type) => {
    switch (type) {
      case 'stay':
        return '/images/properties/hotels.jpg';
      case 'attraction':
        return '/images/attractions/spiritual.webp';
      case 'tour-package':
        return '/images/tour-packages/adventure.webp';
      case 'car-rental':
        return '/images/car-rentals/swift.webp';
      default:
        return '/images/hero-bg.webp';
    }
  };

  const CartItemCard = ({ item }) => {
    const itemPrice = item.totalPrice || item.price || 0;

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={item.image || getPlaceholderImage(item.type)}
              alt={item.name}
              className="w-full lg:w-32 h-32 object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getPlaceholderImage(item.type);
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getTypeIcon(item.type)}
                  <span className="text-sm text-gray-500 font-medium">
                    {getTypeLabel(item.type)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
              </div>
              <button
                onClick={() => removeFromCart(item.cartId)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remove from cart"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/*  Details */}
            <div className="space-y-2 mb-4">
              {item.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
              )}
              
              {item.selectedDate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.selectedDate).toLocaleDateString()}</span>
                </div>
              )}
              
              {item.selectedTime && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{item.selectedTime}</span>
                </div>
              )}

              {item.guests && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{item.guests} guests</span>
                </div>
              )}

              {item.duration && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{item.duration}</span>
                </div>
              )}

              {/* Ticket Types for attractions/tours */}
              {item.ticketTypes && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Tickets: </span>
                  {Object.entries(item.ticketTypes)
                    .filter(([_, count]) => count > 0)
                    .map(([type, count]) => `${count} ${type}`)
                    .join(', ')}
                </div>
              )}
            </div>

            {/* Quantity and Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    className="p-2 hover:bg-gray-50 rounded-l-lg"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    className="p-2 hover:bg-gray-50 rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {formatPrice(itemPrice * item.quantity)}
                </div>
                {/* {item.quantity > 1 && (
                  <div className="text-sm text-gray-500">
                    {formatPrice(itemPrice)} each
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PaymentSection = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Payment Options
      </h2>
      
      <div className="space-y-3">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedPayment === option.id
                ? 'border-[#003B95] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPayment(option.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedPayment === option.id ? 'bg-[#003B95] text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{option.label}</h4>
                  <p className="text-sm text-gray-500">{option.desc}</p>
                </div>
              </div>
              {selectedPayment === option.id && (
                <Check className="w-5 h-5 text-[#003B95]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Handle confirm and pay later button click
  async function handleConfirmAndPayLater() {
    console.log('Button clicked! User:', user, 'Payment:', selectedPayment); // Debug log
    
    if (!selectedPayment || !user) {
      console.log('Missing requirements - Payment:', selectedPayment, 'User:', user); // Debug log
      return;
    }

    setIsProcessingOrder(true);
    setEmailStatus('loading');
    setEmailMessage('Sending booking confirmation to your email...');

    try {
      // Create email content
      const emailContent = EmailService.createEmailContent(
        user,
        cartItems,
        { subtotal, tax, total, itemCount },
        selectedPayment
      );

      console.log('Email content created:', emailContent); // Debug log

      // Send email
      const result = await EmailService.sendBookingConfirmation(emailContent);

      console.log('Email result:', result); // Debug log

      if (result.success) {
        setEmailStatus('success');
        setEmailMessage(`Booking confirmation sent to ${user.email}. Redirecting to homepage...`);
        
        // Wait for user to see the success message, then clear cart and redirect
        setTimeout(() => {
          clearCart();
          navigate('/', { replace: true });
        }, 3000);
        
      } else {
        throw new Error(result.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending booking confirmation:', error);
      setEmailStatus('error');
      setEmailMessage(`Failed to send booking confirmation: ${error.message}. Please try again or contact support.`);
      setIsProcessingOrder(false);
      
      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setEmailStatus(null);
        setEmailMessage('');
      }, 5000);
    }
  }

  if (cartItems.length === 0 && !isProcessingOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
       
        <section className="bg-gray-900 pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">

            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 -mt-8">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
              Start exploring our amazing stays, attractions, tour packages, and car rentals!
            </p>
            <div className="space-y-4">
              <Link
                to="/stays"
                className="inline-block bg-[#003B95] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#002D70] transition-colors mr-4"
              >
                Browse Stays
              </Link>
              <Link
                to="/attractions"
                className="inline-block bg-[#003B95] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#002D70] transition-colors mr-4"
              >
                Explore Attractions
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gray-900 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">

          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 -mt-2">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <CartItemCard key={item.cartId} item={item} />
            ))}

            
            <PaymentSection />
          </div>

          {/* Price */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Price Details</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                {/* <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹0</span>
                </div> */}
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-[#003B95]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Selection Summary */}
              <div className="mb-6 space-y-2">
                {!selectedPayment && (
                  <p className="text-red-500 text-sm">Please select a payment method</p>
                )}
                {!user && (
                  <p className="text-red-500 text-sm">Please login to continue with booking</p>
                )}
                {user && (
                  <p className="text-green-600 text-sm">✓ Email will be sent to: {user.email}</p>
                )}
              </div>

              <button 
                onClick={handleConfirmAndPayLater}
                className={`w-full py-3 rounded-lg font-medium transition-colors mb-4 ${
                  selectedPayment && user && !isProcessingOrder
                    ? 'bg-[#003B95] text-white hover:bg-[#002D70]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedPayment || !user || emailStatus === 'loading' || isProcessingOrder}
              >
                {emailStatus === 'loading' ? 'Sending Email...' : 
                 emailStatus === 'success' ? 'Redirecting...' : 
                 'Confirm and Pay Later'}
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Booking
              </button>

            
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Your payment information is secure and encrypted
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Notification - Only show for loading and error states */}
        {emailStatus && emailStatus !== 'success' && (
          <EmailNotification
            status={emailStatus}
            message={emailMessage}
            userEmail={user?.email}
            onClose={() => {
              setEmailStatus(null);
              setEmailMessage('');
            }}
          />
        )}

        {/* Success Overlay */}
        {emailStatus === 'success' && isProcessingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Confirmed!</h3>
              <p className="text-gray-600 mb-4">
                Booking confirmation sent to {user?.email}
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to homepage...
              </p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#003B95] h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;