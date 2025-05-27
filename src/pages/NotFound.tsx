
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="text-center max-w-md">
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold text-wings-navy mb-4">404</h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6">Oops! Page not found</p>
          <p className="text-gray-500 mb-8 mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
