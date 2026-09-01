import { Plane, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router";

const Navbar =() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">SkyBooker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#destinations" className="text-gray-700 hover:text-blue-600 transition-colors">
              Destinations
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Reviews
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">
              FAQ
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
            <Button>Book Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="#destinations" className="block text-gray-700 hover:text-blue-600">
              Destinations
            </a>
            <a href="#features" className="block text-gray-700 hover:text-blue-600">
              Features
            </a>
            <a href="#testimonials" className="block text-gray-700 hover:text-blue-600">
              Reviews
            </a>
            <a href="#faq" className="block text-gray-700 hover:text-blue-600">
              FAQ
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Link to="/admin" className="w-full">
                <Button variant="ghost" className="w-full">Admin</Button>
              </Link>
              <Button className="w-full">Book Now</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar