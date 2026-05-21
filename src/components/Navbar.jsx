import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Hamburger and close icons (using reliable free image CDNs)
  const hamburgerIcon = "https://cdn-icons-png.flaticon.com/512/2976/2976215.png";
  const closeIcon = "https://cdn-icons-png.flaticon.com/512/2961/2961937.png";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo placeholder – replace with your actual logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-800">
              🏫 Shunem Schools
            </Link>
            {/* Replace the line above with your image logo if needed:
                <img src="/path/to/logo.png" alt="Shunem Schools Logo" className="h-10" />
            */}
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button (hamburger) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <img
                src={isOpen ? closeIcon : hamburgerIcon}
                alt={isOpen ? "Close menu" : "Open menu"}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;