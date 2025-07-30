import React from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings, 
  LogOut,
  Bell,
  Activity,
  Zap,
  Users,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { toast } = useToast();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wings-navy to-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wings-orange"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const stats = [
    {
      title: "Active Projects",
      value: "12",
      icon: Activity,
      change: "+2.1%",
      changeType: "positive",
    },
    {
      title: "Power Systems",
      value: "847",
      icon: Zap,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Team Members",
      value: "24",
      icon: Users,
      change: "+3.2%",
      changeType: "positive",
    },
    {
      title: "Efficiency",
      value: "98.7%",
      icon: BarChart3,
      change: "+0.3%",
      changeType: "positive",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {user.firstName}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className={`text-xs ${
                      stat.changeType === 'positive' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-wings-orange/10">
                    <stat.icon className="h-6 w-6 text-wings-orange" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-wings-orange/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-wings-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {user.firstName} {user.lastName}
                  </h3>
                  <Badge variant="secondary" className="mt-1">
                    Professional User
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm">{user.primaryEmailAddress?.emailAddress}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm">
                    Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="text-sm">
                    Account Status: {user.emailAddresses[0]?.verification?.status === 'verified' ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Generator Installation Completed",
                    description: "Site #47 - Backup power system online",
                    time: "2 hours ago",
                    type: "success"
                  },
                  {
                    title: "Maintenance Scheduled",
                    description: "Routine check for industrial compressor",
                    time: "4 hours ago",
                    type: "info"
                  },
                  {
                    title: "New Quote Request",
                    description: "Power solution for manufacturing facility",
                    time: "6 hours ago",
                    type: "warning"
                  },
                  {
                    title: "Team Meeting",
                    description: "Weekly engineering review completed",
                    time: "1 day ago",
                    type: "info"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col bg-wings-navy hover:bg-wings-navy/90">
                <Zap className="h-6 w-6 mb-2" />
                Request Quote
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;