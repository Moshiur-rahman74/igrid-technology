'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Automation Solutions', href: '/automation-solutions' },
    { name: 'Hardware Configurator', href: '/hardware-configurator' },
    { name: 'Products', href: '/products' },
    { name: 'Industries', href: '/industries' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a192f] border-b border-[#1e3a5f] shadow-premium backdrop-blur-sm bg-opacity-95">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-2xl font-bold text-white tracking-tight group-hover:text-[#00d4ff] transition-colors">
              IGrid<span className="text-[#00d4ff] group-hover:text-white transition-colors">Technology</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#1e3a5f] rounded-lg transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/hardware-configurator"
              className="px-6 py-2.5 bg-gradient-to-r from-[#00d4ff] to-[#00b8e6] text-[#0a192f] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Start Configuring
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#1e3a5f] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2 pt-4 border-t border-[#1e3a5f]">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#1e3a5f] rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/hardware-configurator"
                className="mt-4 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#00b8e6] text-[#0a192f] font-semibold rounded-lg hover:shadow-lg transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Configuring
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
