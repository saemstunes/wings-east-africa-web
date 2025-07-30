import React, { useState } from 'react';
import { useSignIn, useUser } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wings-orange"></div>
      </div>
    );
  }

  // Redirect if already signed in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        });
        navigate('/dashboard');
      } else {
        // Handle additional requirements like 2FA
        console.log(result);
      }
    } catch (err: any) {
      toast({
        title: "Sign in failed",
        description: err.errors?.[0]?.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-wings-orange/10 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="h-8 w-8 text-wings-orange" />
          </div>
          <CardTitle className="text-2xl text-wings-navy mb-2">Welcome Back</CardTitle>
          <p className="text-sm text-gray-600">
            Sign in to access your account
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <Link 
                to="/reset-password" 
                className="text-sm text-wings-orange hover:text-wings-orange/80"
              >
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-wings-navy hover:bg-wings-navy/90" 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/sign-up" 
                className="text-wings-orange hover:text-wings-orange/80 font-medium"
              >
                Create one
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

export default SignInPage;