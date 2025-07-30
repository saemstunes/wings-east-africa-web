import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, User, ShieldCheck, ArrowRight, Key, AlertCircle } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';

const SignInPage = () => {
  const { signIn } = useClerk();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [securityValidated, setSecurityValidated] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [mfaCountdown, setMfaCountdown] = useState(300);

  // Security validation
  React.useEffect(() => {
    const validateSecurity = () => {
      try {
        // Browser validation
        if (/bot|crawler|spider/i.test(navigator.userAgent)) {
          navigate('/');
          return;
        }

        // Referrer check
        if (document.referrer && !document.referrer.includes(window.location.origin)) {
          navigate('/');
          return;
        }

        // Time-based access (business hours)
        const now = new Date();
        const hour = now.getHours();
        const isBusinessHours = hour >= 6 && hour <= 23;
        
        if (!isBusinessHours) {
          navigate('/');
          return;
        }

        setSecurityValidated(true);
      } catch (e) {
        navigate('/');
      }
    };

    validateSecurity();
  }, [navigate]);

  // MFA countdown
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mfaRequired && mfaCountdown > 0) {
      timer = setInterval(() => {
        setMfaCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mfaRequired, mfaCountdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (attemptCount >= 3) {
      setError('Too many failed attempts. Please try again later or reset your access code.');
      setLoading(false);
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'needs_second_factor') {
        setMfaRequired(true);
        setMfaCountdown(300);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setAttemptCount(prev => prev + 1);
      setError(err.errors[0].message || 'Authentication failed. Please check your credentials.');
      
      // Lock account after 3 failed attempts
      if (attemptCount >= 2) {
        setError('Account temporarily locked. Please try again in 15 minutes or reset your access code.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMFAVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn.attemptSecondFactor({
        strategy: 'totp',
        code: mfaCode,
      });
      
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.errors[0].message || 'Invalid verification code. Please try again.');
      setMfaCode('');
    } finally {
      setLoading(false);
    }
  };

  if (!securityValidated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wings-navy"></div>
      </div>
    );
  }

  if (mfaRequired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <Key className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-wings-navy mb-2">Multi-Factor Verification</CardTitle>
            <CardDescription className="text-sm">
              Enter the 6-digit code from your authenticator app
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleMFAVerification} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mfa-code" className="text-wings-navy font-medium">
                  Verification Code
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

              <div className="text-center text-sm text-gray-600 flex items-center justify-center">
                <Key className="h-4 w-4 mr-1" />
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
                onClick={() => setMfaRequired(false)}
                className="text-sm text-gray-600"
              >
                ← Back to sign in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-wings-orange/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="h-8 w-8 text-wings-orange" />
          </div>
          <CardTitle className="text-2xl text-wings-navy mb-2">Secure Sign In</CardTitle>
          <CardDescription className="text-sm">
            Access to authorized personnel only
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-wings-navy font-medium">
                Corporate Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@yourcompany.com"
                  className="h-12 pl-10"
                  required
                  disabled={loading || attemptCount >= 3}
                />
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-wings-navy font-medium">
                Access Code
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure access code"
                  className="h-12 pl-10 pr-12"
                  required
                  disabled={loading || attemptCount >= 3}
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || attemptCount >= 3}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="text-right">
              <Button 
                variant="link" 
                onClick={() => navigate('/reset-password')}
                className="text-sm text-wings-orange px-0"
              >
                Forgot Access Code?
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
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
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Access Secure Dashboard
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-600 text-center">
              All access attempts are logged and monitored. Unauthorized use is prohibited.
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/sign-up')}
              className="text-sm text-gray-600"
            >
              Don't have an account? <span className="text-wings-orange ml-1">Create one</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
