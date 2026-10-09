import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Plane className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-white">
                SkyBooker
              </span>
            </div>

            <p className="text-sm">
              Your trusted partner for seamless flight bookings worldwide.
              Travel smarter, fly better.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-sm font-medium transition-colors hover:text-blue-500"
              >
                Facebook
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="text-sm font-medium transition-colors hover:text-blue-500"
              >
                Twitter
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="text-sm font-medium transition-colors hover:text-blue-500"
              >
                Instagram
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="text-sm font-medium transition-colors hover:text-blue-500"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-500"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-500"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-500"
                >
                  Press
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-500"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-500"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-500"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-500"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-blue-500"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold text-white">
              Contact
            </h3>

            <ul className="space-y-2 text-sm">
              <li>Email: support@skybooker.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} SkyBooker. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;