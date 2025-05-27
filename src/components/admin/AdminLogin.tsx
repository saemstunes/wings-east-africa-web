
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin = () => {
  const { login, loading } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (attemptCount >= 3) {
      setError('Too many failed attempts. Please wait before trying again.');
      return;
    }

    const success = await login(credentials.username, credentials.password);
    
    if (!success) {
      setAttemptCount(prev => prev + 1);
      setError('Invalid credentials. Access restricted to authorized personnel only.');
      setCredentials({ username: '', password: '' });
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
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

export default AdminLogin;
