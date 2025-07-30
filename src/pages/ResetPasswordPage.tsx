import React, { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResetPasswordPage = () => {
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn } = useSignIn();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Redirect if already signed in
  React.useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wings-orange"></div>
      </div>
    );
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      
      setSuccess(true);
      toast({
        title: "Reset email sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (err: any) {
      toast({
        title: "Reset failed",
        description: err.errors?.[0]?.message || "Failed to send reset instructions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-wings-navy mb-2">Check Your Email</CardTitle>
            <p className="text-sm text-gray-600">
              We've sent instructions to reset your access code to your corporate email.
            </p>
          </CardHeader>
          
          <CardContent className="text-center">
            <Button 
              onClick={() => navigate('/sign-in')}
              className="mt-4 bg-wings-navy hover:bg-wings-navy/90"
            >
              Return to Sign In
            </Button>
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
          <CardTitle className="text-2xl text-wings-navy mb-2">Reset Access Code</CardTitle>
          <p className="text-sm text-gray-600">
            Enter your corporate email to receive reset instructions
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleReset} className="space-y-6">
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
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>


            <Button 
              type="submit" 
              className="w-full h-12 bg-wings-navy hover:bg-wings-navy/90" 
              disabled={loading}
            >
              {loading ? 'Sending instructions...' : 'Reset Access Code'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Remember your password?{' '}
              <Link 
                to="/sign-in" 
                className="text-wings-orange hover:text-wings-orange/80 font-medium"
              >
                Sign in
              </Link>
            </p>
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

export default ResetPasswordPage;
