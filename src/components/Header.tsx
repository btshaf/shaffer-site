'use client';

import { useState, useEffect } from 'react';
import { SiteContent, CaseStudyMenuItem } from '@/lib/content';
import HeaderSwitcher from './HeaderSwitcher';
import HeaderBreadcrumb from './HeaderBreadcrumb';

type HeaderRoute =
  | { kind: 'home' }
  | {
      kind: 'case-study';
      currentSlug: string;
      currentNumber: string;
      currentCompany: string;
      currentTitle: string;
    }
  | {
      kind: 'thoughts';
      currentSlug: string;
      currentTitle: string;
    };

interface HeaderProps {
  siteContent: SiteContent;
  caseStudyMenuItems: CaseStudyMenuItem[];
  route: HeaderRoute;
}

export default function Header({ siteContent, caseStudyMenuItems, route }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [savedScrollY, setSavedScrollY] = useState(0);

  const openMobileMenu = () => {
    const scrollY = window.scrollY;
    setSavedScrollY(scrollY);
    document.body.style.overflow = 'hidden';
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    document.body.style.overflow = '';
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

  // Determine active route for underline
  const getActiveRoute = () => {
    if (route.kind === 'case-study') return 'case-studies';
    if (route.kind === 'thoughts') return 'thoughts';
    return null;
  };

  const activeRoute = getActiveRoute();

  return (
    <>
      <header className="sticky top-0 bg-bg border-b border-border-strong z-50">
        <div className="max-w-[1100px] mx-auto px-8 h-14 flex items-center justify-between">
          
          {/* Logo cluster + breadcrumb */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a 
              href="/" 
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

            <HeaderBreadcrumb route={route} />
          </div>

          {/* Desktop switcher region + main nav - hidden below 720px */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Switcher region */}
            {route.kind === 'case-study' && caseStudyMenuItems.length > 0 && (
              <HeaderSwitcher
                label="Case studies"
                items={caseStudyMenuItems}
                currentSlug={route.currentSlug}
                basePath="/case-studies"
                indexHref="/#case-studies"
              />
            )}

            {/* Main navigation */}
            <nav className="flex items-center gap-7">
              <a 
                href="/#case-studies"
                className={`text-text-muted hover:text-text font-medium text-sm transition-colors relative ${
                  activeRoute === 'case-studies' 
                    ? 'text-text after:absolute after:bottom-[-0.25rem] after:left-0 after:right-0 after:h-0.5 after:bg-accent-500' 
                    : ''
                }`}
              >
                {siteContent.navigation.caseStudiesLabel}
              </a>
              <a 
                href="/#experience"
                className="text-text-muted hover:text-text font-medium text-sm transition-colors"
              >
                {siteContent.navigation.experienceLabel}
              </a>
              <a 
                href="/thoughts"
                className={`text-text-muted hover:text-text font-medium text-sm transition-colors relative opacity-45 ${
                  activeRoute === 'thoughts' 
                    ? 'text-text after:absolute after:bottom-[-0.25rem] after:left-0 after:right-0 after:h-0.5 after:bg-accent-500' 
                    : ''
                }`}
                aria-disabled="true"
                tabIndex={-1}
              >
                Thoughts
              </a>
              <a 
                href="/#about"
                className="text-text-muted hover:text-text font-medium text-sm transition-colors"
              >
                {siteContent.navigation.aboutLabel}
              </a>
              <a 
                href="/#contact"
                className="text-text border border-border-strong rounded font-semibold hover:bg-surface-alt transition-colors"
                style={{ 
                  fontSize: '0.8125rem',
                  padding: '0.4375rem 0.875rem'
                }}
              >
                {siteContent.navigation.contactLabel}
              </a>
            </nav>
          </div>

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
          style={{
            touchAction: 'none'
          }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 h-14 border-b border-border-strong">
            <a 
              href="/" 
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

          {/* Scrollable content wrapper */}
          <div 
            className="flex-1 overflow-y-auto"
            style={{
              touchAction: 'pan-y',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            
            {/* Browse section (only when not on home) */}
            {route.kind !== 'home' && route.kind === 'case-study' && (
            <div className="px-6 py-8 border-b border-border">
              <div 
                className="font-mono uppercase font-semibold text-accent-500 mb-4"
                style={{ 
                  fontSize: '0.6875rem', 
                  letterSpacing: '0.1em' 
                }}
              >
                ALL CASE STUDIES ({caseStudyMenuItems.length})
              </div>
              
              <div className="space-y-0">
                {caseStudyMenuItems.map((item, index) => {
                  const pageNum = item.order.toString().padStart(2, '0');
                  const isCurrent = item.slug === route.currentSlug;
                  const isComingSoon = item.status === 'coming-soon';
                  
                  const Element = isComingSoon || isCurrent ? 'div' : 'a';
                  const props = isComingSoon || isCurrent 
                    ? { onClick: closeMobileMenu }
                    : { href: `/case-studies/${item.slug}`, onClick: closeMobileMenu };

                  return (
                    <Element
                      key={item.slug}
                      {...props}
                      className={`
                        grid grid-cols-[2.5rem_1fr] gap-5 py-3.5 min-h-[56px] items-start no-underline
                        ${isCurrent ? 'border-l-[3px] border-accent-500 pl-4' : ''}
                        ${isComingSoon ? 'opacity-55' : ''}
                        ${index < caseStudyMenuItems.length - 1 ? 'border-b border-border' : ''}
                      `}
                    >
                      <div className="font-serif font-medium text-accent-500 tabular-nums text-2xl pt-1">
                        {pageNum}
                      </div>
                      <div className="min-w-0">
                        <div 
                          className="font-mono uppercase text-text-muted mb-2"
                          style={{ 
                            fontSize: '0.75rem', 
                            letterSpacing: '0.08em' 
                          }}
                        >
                          {item.company}
                          {isCurrent && <span className="text-accent-500 font-semibold"> · you are here</span>}
                          {isComingSoon && <span className="font-mono"> · coming soon</span>}
                        </div>
                        <div className="font-serif font-medium text-text line-clamp-2 text-lg leading-tight">
                          {item.title}
                        </div>
                      </div>
                    </Element>
                  );
                })}
              </div>
            </div>
          )}

            {/* Main navigation */}
            <nav className={`px-6 py-8 flex flex-col gap-1 ${
              route.kind !== 'home' ? 'text-xl' : 'text-3xl'
            }`}>
            <a 
              href="/#case-studies"
              className="font-serif font-medium text-text border-b border-border flex items-center justify-between min-h-14 py-3.5"
              onClick={closeMobileMenu}
            >
              {siteContent.navigation.caseStudiesLabel}
            </a>
            <a 
              href="/#experience"
              className="font-serif font-medium text-text border-b border-border flex items-center justify-between min-h-14 py-3.5"
              onClick={closeMobileMenu}
            >
              {siteContent.navigation.experienceLabel}
            </a>
            <a 
              href="/thoughts"
              className="font-serif font-medium text-text border-b border-border flex items-center justify-between min-h-14 py-3.5 opacity-45"
              aria-disabled="true"
              onClick={closeMobileMenu}
            >
              Thoughts
            </a>
            <a 
              href="/#about"
              className="font-serif font-medium text-text border-b border-border flex items-center justify-between min-h-14 py-3.5"
              onClick={closeMobileMenu}
            >
              {siteContent.navigation.aboutLabel}
            </a>
            
            {/* CTA button */}
            <a 
              href="/#contact"
              className="bg-accent-500 text-bg rounded font-semibold flex items-center justify-center min-h-14 mt-6 px-5 py-4"
              style={{ fontSize: '1.125rem' }}
              onClick={closeMobileMenu}
            >
              {siteContent.navigation.contactLabel}
            </a>
          </nav>

          </div>

          {/* Footer ribbon */}
          <div className="border-t border-border px-6 py-6 flex flex-col gap-2">
            {/* Status line */}
            <div className="font-mono text-xs uppercase text-text-muted tracking-wide">
              <strong className="text-accent-500 font-semibold">Available now</strong> · Greater Phoenix, AZ
            </div>
            
            {/* Social links */}
            <div className="flex gap-5">
              <a 
                href={siteContent.linkedin}
                className="font-medium text-sm text-text hover:underline underline-offset-2 decoration-1"
              >
                LinkedIn ↗
              </a>
              <a 
                href={siteContent.resumeUrl}
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