import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import AboutEnhanced from "./pages/AboutEnhanced";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/use-theme";
import FloatingInquiryTab from "./components/ui/FloatingInquiryTab";
import ScrollToTop from "./components/ui/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminDashboard from "./pages/AdminDashboard";
import ExecutiveDashboard from "./pages/ExecutiveDashboard";
import UserDashboard from "./pages/UserDashboard";

const queryClient = new QueryClient();

// Retrieve Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

// Admin Protected Route Component
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <SignedIn>
      {(user) => 
        user.publicMetadata.role === "admin" ? (
          children
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-red-600 mb-4">Access Denied</h2>
              <p className="text-gray-700">
                You don't have permission to access this resource.
              </p>
              <button 
                className="mt-4 bg-wings-navy text-white px-4 py-2 rounded hover:bg-wings-navy/90"
                onClick={() => window.location.href = "/"}
              >
                Return to Home
              </button>
            </div>
          </div>
        )
      }
    </SignedIn>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="wings-theme">
      <LanguageProvider>
        <ClerkProvider publishableKey={clerkPubKey}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/about-enhanced" element={<AboutEnhanced />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Authentication Routes */}
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                
                {/* Protected User Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                
                {/* Admin Protected Routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  }
                />
                
                <Route
                  path="/executive"
                  element={
                    <AdminProtectedRoute>
                      <ExecutiveDashboard />
                    </AdminProtectedRoute>
                  }
                />
                
                {/* Fallback Routes */}
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" replace />} />
              </Routes>
              <FloatingInquiryTab />
            </BrowserRouter>
          </TooltipProvider>
        </ClerkProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
