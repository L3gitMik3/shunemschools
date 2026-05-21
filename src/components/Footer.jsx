import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media links – replace with your actual profile URLs
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/your-school-page",
      icon: "📘",
      hover: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/your-school",
      icon: "🐦",
      hover: "hover:text-sky-500",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/your-school",
      icon: "📷",
      hover: "hover:text-pink-500",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/your-school",
      icon: "📺",
      hover: "hover:text-red-600",
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const contactInfo = [
    { label: "Address", value: "Lanet, Nakuru, Kenya", icon: "📍" },
    { label: "Phone", value: "+254 700 000 000", icon: "📞" },
    { label: "Email", value: "info@shunemschools.ac.ke", icon: "✉️" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-blue-400">Shunem</span> Schools
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Providing quality, holistic education in Lanet, nurturing future leaders with integrity and excellence.
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 text-xl transition-transform duration-200 hover:scale-110 ${social.hover}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 inline-block">
              Quick Links
            </h4>
            <ul className="mt-2 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 inline-block">
              Contact Us
            </h4>
            <ul className="mt-2 space-y-3">
              {contactInfo.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-gray-300">
                  <span className="text-blue-400">{item.icon}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 inline-block">
              Stay Updated
            </h4>
            <p className="text-gray-300 text-sm mb-3">
              Subscribe to our newsletter for news and events.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Newsletter subscription coming soon!");
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          &copy; {currentYear} Shunem Schools, Lanet. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;