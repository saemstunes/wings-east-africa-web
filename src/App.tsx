
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import AboutEnhanced from "./pages/AboutEnhanced";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import SecureAdminAuth from "./pages/SecureAdminAuth";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./hooks/use-theme";
import { SecureAuthProvider } from "./contexts/SecureAuthContext";
import FloatingInquiryTab from "./components/ui/FloatingInquiryTab";
import ScrollToTop from "./components/ui/ScrollToTop";
import { LanguageProvider } from "./contexts/LanguageContext";

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
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/about-enhanced" element={<AboutEnhanced />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                {/* Secure admin routes */}
                <Route path="/admin" element={<SecureAdminAuth />} />
                <Route path="/executive" element={<SecureAdminAuth />} />
                <Route path="/dashboard" element={<SecureAdminAuth />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
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
