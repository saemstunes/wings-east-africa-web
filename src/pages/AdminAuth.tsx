
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, Building2, Smartphone, Lock, Clock, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CEODashboard from '@/components/admin/CEODashboard';

const AdminAuth = () => {
  const { isAdminAuthenticated, login, logout, loading } = useAuth();
  const [authStep, setAuthStep] = useState('login');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [mfaCode, setMfaCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [mfaCountdown, setMfaCountdown] = useState(300);
  const [securityValidated, setSecurityValidated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Security validation for hidden access
  useEffect(() => {
    const performSecurityChecks = async () => {
      try {
        // Check 1: Validate route access
        const validRoutes = ['/executive', '/dashboard', '/admin'];
        if (!validRoutes.includes(location.pathname)) {
          navigate('/', { replace: true });
          return;
        }

        // Check 2: Time-based access (business hours)
        const now = new Date();
        const hour = now.getHours();
        const isBusinessHours = hour >= 6 && hour <= 23;

        // Check 3: User agent validation
        const userAgent = navigator.userAgent;
        const isBotLike = /bot|crawler|spider|scraper/i.test(userAgent);

        // Check 4: Direct access validation
        const referrer = document.referrer;
        const isDirectAccess = !referrer || referrer.includes(window.location.origin);

        if (!isBotLike && isBusinessHours && isDirectAccess) {
          setSecurityValidated(true);
        } else {
          // Silently redirect without revealing admin access exists
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Security validation failed:', error);
        navigate('/', { replace: true });
      }
    };

    performSecurityChecks();
  }, [location.pathname, navigate]);

  // MFA countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authStep === 'mfa' && mfaCountdown > 0) {
      timer = setInterval(() => {
        setMfaCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [authStep, mfaCountdown]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attemptCount >= 3) {
      setError('Too many failed attempts. Please wait before trying again.');
      return;
    }

    setError('');
    const success = await login(credentials.username, credentials.password);
    
    if (!success) {
      setAttemptCount(prev => prev + 1);
      setError('Invalid credentials. Access restricted to authorized personnel only.');
      setCredentials({ username: '', password: '' });
    } else {
      setAuthStep('mfa');
      setMfaCountdown(300);
    }
  };

  const handleMFAVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simulate MFA verification (in production, verify with your MFA service)
    if (mfaCode === '123456' || mfaCode === '000000') {
      setAuthStep('dashboard');
    } else {
      setError('Invalid MFA code. Please try again.');
      setMfaCode('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Show loading screen during security validation
  if (!securityValidated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wings-navy"></div>
      </div>
    );
  }

  // Show dashboard if authenticated and past MFA
  if (isAdminAuthenticated && authStep === 'dashboard') {
    return <CEODashboard />;
  }

  // Show MFA step
  if (authStep === 'mfa') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <Smartphone className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-wings-navy mb-2">Multi-Factor Authentication</CardTitle>
            <CardDescription className="text-sm">
              Enter the 6-digit code from your authenticator app
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleMFAVerification} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mfa-code" className="text-wings-navy font-medium">
                  Authentication Code
                </Label>
                <Input
                  id="mfa-code"
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="h-12 text-center text-xl font-mono tracking-widest"
                  maxLength={6}
                  required
                  disabled={loading}
                />
              </div>

              <div className="text-center text-sm text-gray-600">
                <Clock className="h-4 w-4 inline mr-1" />
                Code expires in: {formatTime(mfaCountdown)}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-green-600 hover:bg-green-700"
                disabled={loading || mfaCode.length !== 6}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  'Verify & Access Dashboard'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setAuthStep('login')}
                className="text-sm text-gray-600"
              >
                ← Back to login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-wings-orange/10 rounded-full flex items-center justify-center mb-6">
            <Building2 className="h-8 w-8 text-wings-orange" />
          </div>
          <CardTitle className="text-2xl text-wings-navy mb-2">Wings Ltd.</CardTitle>
          <CardTitle className="text-lg text-gray-600">Executive Dashboard</CardTitle>
          <CardDescription className="text-sm mt-4">
            Secure access for authorized personnel only
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-wings-navy font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="Enter executive username"
                className="h-12"
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-wings-navy font-medium">
                Access Code
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="Enter secure access code"
                  className="h-12 pr-12"
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <Shield className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-wings-navy hover:bg-wings-navy/90" 
              disabled={loading || attemptCount >= 3}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Access Dashboard
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-600 text-center">
              This system is monitored. Unauthorized access attempts are logged and reported.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
