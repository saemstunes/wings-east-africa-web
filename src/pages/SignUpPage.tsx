import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, User, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';

const SignUpPage = () => {
  const { signUp } = useClerk();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [securityValidated, setSecurityValidated] = useState(false);

  // Security validation
  React.useEffect(() => {
    const validateSecurity = () => {
      try {
        // Browser validation
        if (navigator.userAgent.includes('bot')) {
          navigate('/');
          return;
        }

        // Referrer check
        if (document.referrer && !document.referrer.includes(window.location.origin)) {
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      
      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      navigate('/verify-email');
      
    } catch (err: any) {
      setError(err.errors[0].message || 'Registration failed. Please try again.');
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-wings-orange/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="h-8 w-8 text-wings-orange" />
          </div>
          <CardTitle className="text-2xl text-wings-navy mb-2">Create Your Account</CardTitle>
          <CardDescription className="text-sm">
            Secure access for authorized personnel only
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-6">
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
                  disabled={loading}
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
                  placeholder="Create secure access code"
                  className="h-12 pl-10 pr-12"
                  required
                  disabled={loading}
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
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
              <p className="text-xs text-gray-600 mt-1">
                Minimum 8 characters with uppercase, number, and symbol
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <ShieldCheck className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-wings-navy hover:bg-wings-navy/90" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Create Secure Account
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-600 text-center">
              All access is monitored and logged. By registering, you agree to our security protocols.
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/sign-in')}
              className="text-sm text-gray-600"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
