import React, { useState } from 'react';
import { Eye, EyeOff, X, ArrowLeft, Mail, Lock, AlertCircle, UserPlus, LogIn } from 'lucide-react';

const GoogleButton = ({ text }) => (
  <button 
    type="button"
    className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
  >
    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
    <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900">{text}</span>
  </button>
);

const InputField = ({ icon: Icon, inputKey, ...props }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      <Icon size={18} />
    </div>
    <input
      key={inputKey}
      {...props}
      className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-100 focus:border-gray-400 transition-all duration-200"
    />
  </div>
);

const LoginModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('initial');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  if (!isOpen) return null;

  const handleBack = () => {
    switch (step) {
      case 'email-login':
      case 'register':
        setStep('initial');
        break;
      case 'register-email':
        setStep('register');
        break;
      case 'register-password':
        setStep('register-email');
        break;
      case 'verification':
        setStep('register-password');
        break;
      default:
        setStep('initial');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  const handleRegisterEmailSubmit = (e) => {
    e.preventDefault();
    setStep('register-password');
  };

  const handleRegisterPasswordSubmit = (e) => {
    e.preventDefault();
    setStep('verification');
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    console.log('Registration complete');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          {step !== 'initial' && (
            <button
              onClick={handleBack}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="flex items-center mx-auto">
            <img src="./mart.png" alt="Smart Mart" className="h-7 w-7 mr-2.5 object-cover" />
            <span className="text-lg font-semibold text-gray-900">Smart Mart</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {step === 'initial' && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">Welcome back</h2>
                <p className="mt-1.5 text-sm text-gray-600">Login to access your account</p>
              </div>
              <GoogleButton text="Continue with Google" />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-xs text-gray-500">or</span>
                </div>
              </div>
              <button 
                onClick={() => setStep('email-login')}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Mail size={18} />
                Continue with Email
              </button>
              <button 
                onClick={() => setStep('register')}
                className="w-full flex items-center justify-center gap-2 text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors"
              >
                <UserPlus size={18} />
                Create an account
              </button>
            </div>
          )}

          {step === 'email-login' && (
            <div>
              <div className="text-center mb-5">
                <h2 className="text-xl font-semibold text-gray-900">Log in with Email</h2>
                <p className="mt-1.5 text-sm text-gray-600">Enter your email and password to continue</p>
              </div>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <InputField
                    inputKey="email"
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <InputField
                      inputKey="password"
                      icon={Lock}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <LogIn size={18} />
                  Log in
                </button>
                <button
                  type="button"
                  className="w-full text-gray-900 hover:text-gray-700 text-xs font-medium transition-colors"
                >
                  Forgot your password?
                </button>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-xs text-gray-500">or</span>
                  </div>
                </div>
                <GoogleButton text="Continue with Google" />
              </form>
            </div>
          )}

          {step === 'register' && (
            <div>
              <div className="text-center mb-5">
                <h2 className="text-xl font-semibold text-gray-900">Create your account</h2>
                <p className="mt-1.5 text-sm text-gray-600">Join Smart Mart today</p>
              </div>
              <div className="space-y-5">
                <GoogleButton text="Sign up with Google" />
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-xs text-gray-500">or</span>
                  </div>
                </div>
                <form onSubmit={handleRegisterEmailSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Email address
                      </label>
                      <InputField
                        inputKey="reg-email"
                        icon={Mail}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      <ArrowLeft size={18} />
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {step === 'register-password' && (
            <div>
              <div className="text-center mb-5">
                <h2 className="text-xl font-semibold text-gray-900">Create a password</h2>
                <p className="mt-1.5 text-sm text-gray-600">Make it strong and unique</p>
              </div>
              <form onSubmit={handleRegisterPasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <InputField
                      inputKey="reg-password"
                      icon={Lock}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <ArrowLeft size={18} />
                  Continue
                </button>
              </form>
            </div>
          )}

          {step === 'verification' && (
            <div>
              <div className="text-center mb-5">
                <h2 className="text-xl font-semibold text-gray-900">Verify your email</h2>
                <p className="mt-1.5 text-sm text-gray-600">
                  We've sent a verification code to {email}
                </p>
              </div>
              <form onSubmit={handleVerificationSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-100 focus:border-gray-400 text-center text-lg tracking-widest font-medium transition-all duration-200"
                    placeholder="000000"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 justify-center">
                  <AlertCircle size={16} />
                  <span>Code expires in 10 minutes</span>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Verify Email
                </button>
                <button
                  type="button"
                  className="w-full text-gray-900 hover:text-gray-800 text-sm font-medium transition-colors"
                >
                  Resend code
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
