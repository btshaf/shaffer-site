'use client';

import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 bg-bg border-b border-border z-50">
      {/* Universal header pattern - same at all viewport widths */}
      <div className="max-w-4xl mx-auto px-5 py-3.5 flex items-center justify-between" style={{ minHeight: '56px' }}>
        
        {/* Logo cluster - left side */}
        <a 
          href="#top" 
          className="flex items-center gap-2 flex-shrink-0"
        >
          {/* Logo mark - always 28×28px */}
          <div 
            className="bg-accent flex items-center justify-center rounded flex-shrink-0"
            style={{ width: '28px', height: '28px', borderRadius: '5px' }}
          >
            <span className="text-bg font-serif font-medium text-sm">b</span>
          </div>
          
          {/* Name text */}
          <span className="text-text font-semibold text-sm whitespace-nowrap flex-shrink-0">
            Brad Shaffer
          </span>
        </a>

        {/* Hamburger menu button - right side */}
        <button 
          className="flex items-center justify-center flex-shrink-0" 
          style={{ width: '44px', height: '44px' }}
          aria-label="Menu"
          onClick={toggleMobileMenu}
        >
          <span className="flex flex-col gap-1">
            <span className="w-4 h-0.5 bg-text block"></span>
            <span className="w-4 h-0.5 bg-text block"></span>
            <span className="w-4 h-0.5 bg-text block"></span>
          </span>
        </button>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-bg/95 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <nav>
                <ul className="flex flex-col items-center gap-8 text-center">
                  <li>
                    <a 
                      href="#about" 
                      className="text-text hover:text-accent transition-colors h2"
                      onClick={closeMobileMenu}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#work" 
                      className="text-text hover:text-accent transition-colors h2"
                      onClick={closeMobileMenu}
                    >
                      Work
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#case-studies" 
                      className="text-text hover:text-accent transition-colors h2"
                      onClick={closeMobileMenu}
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#contact" 
                      className="text-text hover:text-accent transition-colors h2"
                      onClick={closeMobileMenu}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}