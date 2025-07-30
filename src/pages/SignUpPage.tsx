import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wings-orange"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
      toast({
        title: "Verification email sent",
        description: "Please check your email for a verification code.",
      });
    } catch (err: any) {
      toast({
        title: "Sign up failed",
        description: err.errors?.[0]?.message || "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        toast({
          title: "Account created successfully!",
          description: "Welcome to Wings Engineering.",
        });
        navigate('/dashboard');
      } else {
        console.log(completeSignUp);
      }
    } catch (err: any) {
      toast({
        title: "Verification failed",
        description: err.errors?.[0]?.message || "Please check your code and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-wings-orange/10 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="h-8 w-8 text-wings-orange" />
            </div>
            <CardTitle className="text-2xl text-wings-navy mb-2">Verify Your Email</CardTitle>
            <p className="text-sm text-gray-600">
              Enter the verification code sent to {emailAddress}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-wings-navy font-medium">
                  Verification Code
                </Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter verification code"
                  className="h-12 text-center text-lg tracking-widest"
                  required
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-wings-navy hover:bg-wings-navy/90" 
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setPendingVerification(false)}
                className="text-sm text-gray-600"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign Up
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
            <ShieldCheck className="h-8 w-8 text-wings-orange" />
          </div>
          <CardTitle className="text-2xl text-wings-navy mb-2">Create Account</CardTitle>
          <p className="text-sm text-gray-600">
            Join Wings Engineering Services
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-wings-navy font-medium">
                  First Name
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="h-12 pl-10"
                    required
                    disabled={loading}
                  />
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-wings-navy font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="h-12"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-wings-navy font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="name@company.com"
                  className="h-12 pl-10"
                  required
                  disabled={loading}
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-wings-navy font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="h-12 pl-10 pr-10"
                  required
                  disabled={loading}
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-wings-navy hover:bg-wings-navy/90" 
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/sign-in" 
                className="text-wings-orange hover:text-wings-orange/80 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-sm text-gray-600"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;