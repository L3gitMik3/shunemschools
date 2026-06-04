import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const linkBase =
    "block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200";
  const linkActive = "bg-blue-600 text-white";
  const linkInactive =
    "text-gray-700 hover:bg-gray-100 md:text-gray-600 md:hover:bg-gray-200 md:hover:text-gray-900";

  return (
    <nav className="bg-white border-b px-4 md:px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Brand */}
        <h3 className="text-xl font-bold text-gray-800">Chamapawa</h3>

        {/* Hamburger button (visible on small screens) */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop links (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/adminpanel"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Admin Panel
          </NavLink>
        </div>
      </div>

      {/* Mobile menu (conditionally shown) */}
      {menuOpen && (
        <div className="mt-3 flex flex-col gap-1 md:hidden">
          <NavLink
            to="/dashboard"

            onClick={closeMenu}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/adminpanel"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            Admin Panel
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;