import React from 'react';
import { CheckCircle, Mail, AlertCircle, Loader2, X } from 'lucide-react';

const EmailNotification = ({ status, message, userEmail, onClose }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return {
          icon: <Loader2 className="w-6 h-6 animate-spin text-blue-600" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          title: 'Sending Email...'
        };
      case 'success':
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-600" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          title: 'Email Sent Successfully!'
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-6 h-6 text-red-600" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          title: 'Email Failed'
        };
      default:
        return {
          icon: <Mail className="w-6 h-6 text-gray-600" />,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          title: 'Email Notification'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`fixed top-4 right-4 max-w-md w-full ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 z-50 transition-all duration-300 animate-slide-in`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${config.textColor} mb-1`}>
            {config.title}
          </h4>
          <p className={`text-sm ${config.textColor} opacity-90 mb-2`}>
            {message}
          </p>
          {userEmail && status === 'success' && (
            <p className={`text-xs ${config.textColor} opacity-75`}>
              Sent to: {userEmail}
            </p>
          )}
        </div>
        {status !== 'loading' && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${config.textColor} opacity-60 hover:opacity-100 transition-opacity`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailNotification;