
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Plane, Menu, X } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleBookNow = () => {
    setMobileMenuOpen(false);
    router.push("/booking");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <Plane className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">SkyBooker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/#destinations"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Destinations
            </Link>

            <Link
              href="/#features"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Features
            </Link>

            <Link
              href="/#testimonials"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              Reviews
            </Link>

            <Link
              href="/#faq"
              className="text-gray-700 transition-colors hover:text-blue-600"
            >
              FAQ
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/admin">Admin</Link>
            </Button>

            <Button onClick={handleBookNow}>Book Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="p-2 md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="space-y-4 py-4 md:hidden">
            <Link
              href="/#destinations"
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-blue-600"
            >
              Destinations
            </Link>

            <Link
              href="/#features"
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-blue-600"
            >
              Features
            </Link>

            <Link
              href="/#testimonials"
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-blue-600"
            >
              Reviews
            </Link>

            <Link
              href="/#faq"
              onClick={closeMobileMenu}
              className="block text-gray-700 hover:text-blue-600"
            >
              FAQ
            </Link>

            <div className="flex flex-col gap-2 border-t pt-4">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  closeMobileMenu();
                  router.push("/admin");
                }}
              >
                Admin
              </Button>

              <Button className="w-full" onClick={handleBookNow}>
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


