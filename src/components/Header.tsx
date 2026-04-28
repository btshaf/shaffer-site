'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [savedScrollY, setSavedScrollY] = useState(0);

  const openMobileMenu = () => {
    const scrollY = window.scrollY;
    setSavedScrollY(scrollY);
    document.body.style.top = `-${scrollY}px`;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    setIsMobileMenuOpen(false);
    window.scrollTo(0, savedScrollY);
  };

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 bg-bg border-b border-border-strong z-50">
        <div className="max-w-[1100px] mx-auto px-8 h-14 flex items-center justify-between">
          
          {/* Logo cluster - left side */}
          <a 
            href="#top" 
            className="flex items-center gap-2 flex-shrink-0"
          >
            {/* Logo mark - always 28×28px */}
            <div 
              className="bg-accent-500 flex items-center justify-center flex-shrink-0"
              style={{ width: '28px', height: '28px', borderRadius: '5px' }}
            >
              <span className="text-bg font-serif font-medium text-sm italic">b</span>
            </div>
            
            {/* Name text */}
            <span className="text-text font-semibold text-sm whitespace-nowrap">
              Brad Shaffer
            </span>
          </a>

          {/* Desktop navigation - hidden below 720px */}
          <nav className="hidden lg:flex items-center gap-7">
            <a 
              href="#case-studies"
              className="text-text-muted hover:text-text font-medium text-sm transition-colors"
            >
              What I've built
            </a>
            <a 
              href="#experience"
              className="text-text-muted hover:text-text font-medium text-sm transition-colors"
            >
              Where I've built
            </a>
            <a 
              href="#about"
              className="text-text-muted hover:text-text font-medium text-sm transition-colors"
            >
              About
            </a>
            <a 
              href="#contact"
              className="text-text border border-border-strong rounded font-semibold hover:bg-surface-alt transition-colors"
              style={{ 
                fontSize: '0.8125rem',
                padding: '0.4375rem 0.875rem'
              }}
            >
              Get in touch
            </a>
          </nav>

          {/* Hamburger button - hidden on desktop */}
          <button 
            className="lg:hidden flex items-center justify-center" 
            style={{ width: '44px', height: '44px' }}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={openMobileMenu}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.75" 
              strokeLinecap="round"
              className="w-6 h-6"
            >
              <path d="M4 7h16M4 12h16M4 17h16"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-bg z-50 flex flex-col"
          id="mobile-menu"
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 h-14 border-b border-border-strong">
            <a 
              href="#top" 
              className="flex items-center gap-2"
              onClick={closeMobileMenu}
            >
              <div 
                className="bg-accent-500 flex items-center justify-center flex-shrink-0"
                style={{ width: '28px', height: '28px', borderRadius: '5px' }}
              >
                <span className="text-bg font-serif font-medium text-sm italic">b</span>
              </div>
              <span className="text-text font-semibold text-sm">Brad Shaffer</span>
            </a>
            
            <button 
              className="flex items-center justify-center" 
              style={{ width: '44px', height: '44px' }}
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.75" 
                strokeLinecap="round"
                className="w-6 h-6"
              >
                <path d="M6 6l12 12M18 6L6 18"/>
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 flex flex-col gap-1 overflow-y-auto">
            <a 
              href="#case-studies"
              className="font-serif font-medium text-text border-b border-border flex items-center justify-between min-h-14 py-3.5"
              style={{ fontSize: '2rem' }}
              onClick={closeMobileMenu}
            >
              What I've built
            </a>
            <a 
              href="#experience"
              className="font-serif font-medium text-text border-b border-border flex items-center justify-between min-h-14 py-3.5"
              style={{ fontSize: '2rem' }}
              onClick={closeMobileMenu}
            >
              Where I've built
            </a>
            <a 
              href="#about"
              className="font-serif font-medium text-text border-b border-border flex items-center justify-between min-h-14 py-3.5"
              style={{ fontSize: '2rem' }}
              onClick={closeMobileMenu}
            >
              About
            </a>
            
            {/* CTA button */}
            <a 
              href="#contact"
              className="bg-accent-500 text-bg rounded font-semibold flex items-center justify-center min-h-14 mt-6 px-5 py-4"
              style={{ fontSize: '1.125rem' }}
              onClick={closeMobileMenu}
            >
              Get in touch
            </a>
          </nav>

          {/* Footer ribbon */}
          <div className="border-t border-border px-6 py-6 flex flex-col gap-2">
            {/* Status line */}
            <div className="font-mono text-xs uppercase text-text-muted tracking-wide">
              <strong className="text-accent-500 font-semibold">Available now</strong> · Greater Phoenix, AZ
            </div>
            
            {/* Social links */}
            <div className="flex gap-5">
              <a 
                href="https://linkedin.com/in/bradshaffer"
                className="font-medium text-sm text-text hover:underline underline-offset-2 decoration-1"
              >
                LinkedIn ↗
              </a>
              <a 
                href="/Shaffer Brad - Resume - Product.pdf"
                className="font-medium text-sm text-text hover:underline underline-offset-2 decoration-1"
              >
                Resume ↓
              </a>
            </div>
            
            {/* Copyright */}
            <div className="font-mono text-xs uppercase text-text-muted tracking-wide">
              © 2026 Brad Shaffer
            </div>
          </div>
        </div>
      )}
    </>
  );
}