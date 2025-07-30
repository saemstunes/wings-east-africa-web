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
import Admin from "./pages/Admin";
import SecureAdminAuth from "./pages/SecureAdminAuth";
import { ThemeProvider } from "./hooks/use-theme";
import FloatingInquiryTab from "./components/ui/FloatingInquiryTab";
import ScrollToTop from "./components/ui/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SecureAuthProvider } from "./contexts/SecureAuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="wings-theme">
      <LanguageProvider>
        <SecureAuthProvider>
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
                
                {/* Admin Routes */}
                <Route path="/admin-auth" element={<SecureAdminAuth />} />
                <Route path="/admin" element={<Admin />} />
                
                {/* Fallback Routes */}
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" replace />} />
              </Routes>
              <FloatingInquiryTab />
            </BrowserRouter>
          </TooltipProvider>
        </SecureAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;