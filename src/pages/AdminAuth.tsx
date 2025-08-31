import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Eye, EyeOff, Building2, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/SecureAuthContext';
import CEODashboard from '@/components/admin/CEODashboard';
import { useToast } from '@/components/ui/use-toast';

const AdminAuth = () => {
  const { user, isAdmin, loading, signIn, signUp, checkAdminStatus } = useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const location = useLocation();
  const navigate = useNavigate();

  // Check admin status on user change
  useEffect(() => {
    const checkAccess = async () => {
      if (user) {
        const adminStatus = await checkAdminStatus();
        if (!adminStatus) {
          setError('Access denied. Administrator privileges required.');
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
        }
      }
    };

    checkAccess();
  }, [user, checkAdminStatus, navigate]);

  // Security validation for admin access
  useEffect(() => {
    const performSecurityChecks = () => {
      try {
        // Check valid admin routes
        const validRoutes = ['/executive', '/dashboard', '/admin'];
        if (!validRoutes.includes(location.pathname)) {
          navigate('/', { replace: true });
          return;
        }

        // Business hours validation (6 AM - 11 PM)
        const now = new Date();
        const hour = now.getHours();
        const isBusinessHours = hour >= 6 && hour <= 23;

        if (!isBusinessHours) {
          setError('Admin access is restricted to business hours (6:00 AM - 11:00 PM).');
        }
      } catch (error) {
        console.error('Security validation failed:', error);
        navigate('/', { replace: true });
      }
    };

    performSecurityChecks();
  }, [location.pathname, navigate]);

  // Show dashboard if authenticated admin
  if (user && isAdmin) {
    return <CEODashboard />;
  }

  // Show access denied for authenticated non-admin users
  if (user && !isAdmin && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-wings-navy mb-2">Access Denied</CardTitle>
            <CardDescription>
              You do not have administrator privileges to access this dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/')} 
              className="w-full bg-wings-navy hover:bg-wings-navy/90"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let result;
      
      if (authMode === 'signin') {
        result = await signIn(credentials.email, credentials.password);
      } else {
        result = await signUp(credentials.email, credentials.password);
        if (!result.error) {
          setSuccess('Account created successfully! Please check your email to verify your account.');
        }
      }

      if (result.error) {
        setError(result.error.message);
        toast({
          title: "Authentication Error",
          description: result.error.message,
          variant: "destructive"
        });
      } else if (authMode === 'signin') {
        toast({
          title: "Authentication Successful",
          description: "Welcome to the admin dashboard.",
        });
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // Show authentication form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900 px-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-wings-orange/10 rounded-full flex items-center justify-center mb-6">
            <Building2 className="h-8 w-8 text-wings-orange" />
          </div>
          <CardTitle className="text-2xl text-wings-navy mb-2">Wings Ltd.</CardTitle>
          <CardTitle className="text-lg text-gray-600">Secure Admin Portal</CardTitle>
          <CardDescription className="text-sm mt-4">
            Authorized personnel only - Enhanced security authentication
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'signin' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6">
              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-wings-navy font-medium">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Admin Email
                  </Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    placeholder="admin@wingsindustries.com"
                    className="h-12"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-wings-navy font-medium">
                    <Lock className="h-4 w-4 inline mr-2" />
                    Secure Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      placeholder="Enter secure password"
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

                {success && (
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
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
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-wings-navy font-medium">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Admin Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    placeholder="admin@wingsindustries.com"
                    className="h-12"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-wings-navy font-medium">
                    <Lock className="h-4 w-4 inline mr-2" />
                    Secure Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      placeholder="Create secure password"
                      className="h-12 pr-12"
                      required
                      disabled={loading}
                      minLength={8}
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

                {success && (
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-green-600 hover:bg-green-700" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Admin Account
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-600 text-center">
              🔒 Secure Supabase Authentication • All admin access is logged and monitored
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;