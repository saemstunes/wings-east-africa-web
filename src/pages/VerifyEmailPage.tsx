import React, { useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Clock } from 'lucide-react';

const VerifyEmailPage = () => {
  const { signUp } = useClerk();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(60);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await signUp.attemptEmailAddressVerification({ code });
      // Redirect to dashboard after successful verification
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await signUp.prepareEmailAddressVerification();
      setCountdown(60);
    } catch (err) {
      setError('Failed to resend code. Please try again later.');
    }
    setResending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="h-8 w-8 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-wings-navy mb-2">Verify Your Identity</CardTitle>
          <p className="text-sm text-gray-600">
            We've sent a verification code to your corporate email
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="h-12 text-center text-xl font-mono tracking-widest"
                maxLength={6}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button 
              onClick={handleVerify}
              className="w-full h-12 bg-green-600 hover:bg-green-700"
              disabled={loading || code.length !== 6}
            >
              {loading ? 'Verifying...' : 'Verify Identity'}
            </Button>

            <div className="text-center text-sm text-gray-600 flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1" />
              Didn't receive code? 
              <Button
                variant="link"
                onClick={handleResend}
                disabled={resending || countdown > 0}
                className="text-sm text-wings-orange px-1 h-auto"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend now'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
