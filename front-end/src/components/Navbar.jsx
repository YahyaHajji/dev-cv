// src/components/Navbar.js
import React, { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { href: "#Home", label: "Home" },
    { href: "#About", label: "About" },
    { href: "#Education", label: "Education" },
    { href: "#Portfolio", label: "Portfolio" },
    { href: "#Languages", label: "Languages" },
    { href: "#Hobbies", label: "Hobbies" },
    { href: "#Contact", label: "Contact" },
  ];

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    const sections = navItems.map((item) => {
      const section = document.querySelector(item.href);
      if (section) {
        return {
          id: item.href.replace("#", ""),
          offset: section.offsetTop - 550,
          height: section.offsetHeight,
        };
      }
      return null;
    }).filter(Boolean);

    const currentPosition = window.scrollY;
    const active = sections.find(
      (section) =>
        currentPosition >= section.offset &&
        currentPosition < section.offset + section.height
    );

    if (active) setActiveSection(active.id);
  }, [navItems]);

  useEffect(() => {
    const debouncedScroll = () => {
      clearTimeout(window.scrollDebounceTimeout);
      window.scrollDebounceTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", debouncedScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = section.offsetTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav 
      id="navbar"
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isOpen
          ? "bg-[#111011] opacity-100"
          : scrolled
          ? "bg-[#111011]/50 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className=" logo flex-shrink-0">
            <a
              href="#Home"
              onClick={(e) => scrollToSection(e, "#Home")}
              className="text-xl font-bold bg-gradient-to-r from-[#009E66] to-[#00C77B] bg-clip-text text-transparent"
            >
              <img
                src="/images/logo.png"
                alt="logo"
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative px-3 py-2 text-sm font-medium ${
                  activeSection === item.href.substring(1)
                    ? "bg-gradient-to-r from-[#009E66] to-[#00C77B] bg-clip-text text-transparent font-semibold"
                    : "text-[#e2d3fd] hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 bg-[#111011] transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col h-full px-4 py-6 space-y-4 justify-center items-center">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ${
                activeSection === item.href.substring(1)
                  ? "bg-gradient-to-r from-[#009E66] to-[#00C77B] bg-clip-text text-transparent font-semibold"
                  : "text-[#e2d3fd] hover:text-white"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transform: isOpen ? "translateX(0)" : "translateX(50px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
