import React, { useState, useEffect } from 'react';
import { Mail, RefreshCw } from 'lucide-react';

interface Props {
  email: string;
  onVerify: () => void;
  onBack: () => void;
}

export const OTPVerification: React.FC<Props> = ({ email, onVerify, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setError('');
    // Simulate OTP resend
    console.log('Resending OTP to', email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    // For demo, accept any 6-digit OTP
    if (enteredOTP.length === 6) {
      onVerify();
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-4 mx-auto w-fit p-3 bg-purple-100 rounded-full">
          <Mail className="h-8 w-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a verification code to {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          ))}
        </div>

        <div className="flex justify-between items-center text-sm">
          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0}
            className="flex items-center gap-1 text-purple-600 hover:text-purple-700 disabled:text-gray-400"
          >
            <RefreshCw className="h-4 w-4" />
            Resend Code {timer > 0 && `(${timer}s)`}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            Change Email
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};