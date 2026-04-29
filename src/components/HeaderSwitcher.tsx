'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface SwitcherItem {
  slug: string;
  order: number;
  company?: string;
  title: string;
  status: 'published' | 'coming-soon';
}

interface HeaderSwitcherProps {
  label: string;
  items: SwitcherItem[];
  currentSlug?: string;
  basePath: string;
  indexHref: string;
}

export default function HeaderSwitcher({
  label,
  items,
  currentSlug,
  basePath,
  indexHref,
}: HeaderSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close dropdown when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle outside clicks and ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Focus management for keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const focusableItems = dropdownRef.current?.querySelectorAll('[role="menuitem"]');
    if (!focusableItems) return;

    const currentIndex = Array.from(focusableItems).findIndex(
      (item) => item === document.activeElement
    );

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = currentIndex < focusableItems.length - 1 ? currentIndex + 1 : 0;
      (focusableItems[nextIndex] as HTMLElement).focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableItems.length - 1;
      (focusableItems[prevIndex] as HTMLElement).focus();
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Focus first item when opening
      setTimeout(() => {
        const firstItem = dropdownRef.current?.querySelector('[role="menuitem"]') as HTMLElement;
        firstItem?.focus();
      }, 0);
    }
  };

  const countWord = items.length === 1 ? 'One' : 
    items.length === 2 ? 'Two' : 
    items.length === 3 ? 'Three' : 
    items.length === 4 ? 'Four' : 
    items.length === 5 ? 'Five' : 
    items.length === 6 ? 'Six' : 
    items.length.toString();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={triggerRef}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors px-1 py-1 ${
          isOpen ? 'text-text border-b border-border-strong' : 'text-text-muted hover:text-text'
        }`}
        style={{ fontSize: '0.8125rem' }}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="switcher-dropdown"
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
      >
        {label}
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="switcher-dropdown"
          role="menu"
          className="absolute top-full left-0 mt-2 bg-bg border border-border-strong rounded shadow-none z-50"
          style={{ 
            minWidth: '22rem',
            maxWidth: '28rem',
            borderRadius: '0.375rem'
          }}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
            <div className="font-serif font-medium text-base text-text">
              {label}
            </div>
            <div className="font-mono uppercase text-xs text-text-muted" style={{ letterSpacing: '0.08em' }}>
              {countWord} in this issue
            </div>
          </div>

          {/* Items */}
          <div>
            {items.map((item, index) => {
              const pageNum = item.order.toString().padStart(2, '0');
              const isCurrent = item.slug === currentSlug;
              const isComingSoon = item.status === 'coming-soon';
              
              const isInteractive = !isComingSoon && !isCurrent;

              if (isInteractive) {
                return (
                  <Link
                    key={item.slug}
                    href={`${basePath}/${item.slug}`}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => setIsOpen(false)}
                    className={`
                      grid grid-cols-[2.5rem_1fr] gap-4 px-5 py-3 min-h-[3.5rem] items-baseline no-underline
                      transition-all duration-150 ease-out hover:bg-surface-alt hover:pl-6 cursor-pointer
                      ${index < items.length - 1 ? 'border-b border-border' : ''}
                    `}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.location.href = `${basePath}/${item.slug}`;
                        setIsOpen(false);
                      }
                    }}
                  >
                    <div className="font-serif font-medium text-accent-500 tabular-nums text-xl">
                      {pageNum}
                    </div>
                    <div className="min-w-0">
                      {item.company && (
                        <div className="font-mono uppercase text-xs text-text-muted mb-0.5" style={{ letterSpacing: '0.08em' }}>
                          {item.company}
                        </div>
                      )}
                      <div 
                        className="font-serif text-text leading-tight line-clamp-2 font-medium"
                        style={{ 
                          fontSize: '0.9375rem',
                          lineHeight: '1.3'
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  </Link>
                );
              }

              // Non-interactive (current or coming soon)
              return (
                <div
                  key={item.slug}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => setIsOpen(false)}
                  className={`
                    grid grid-cols-[2.5rem_1fr] gap-4 px-5 py-3 min-h-[3.5rem] items-baseline no-underline
                    ${isComingSoon 
                      ? 'opacity-55 cursor-default' 
                      : 'border-l-4 border-accent-500 pl-4 cursor-pointer'
                    }
                    ${index < items.length - 1 ? 'border-b border-border' : ''}
                  `}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsOpen(false);
                    }
                  }}
                >
                  <div className="font-serif font-medium text-accent-500 tabular-nums text-xl">
                    {pageNum}
                  </div>
                  <div className="min-w-0">
                    {item.company && (
                      <div className="font-mono uppercase text-xs text-text-muted mb-0.5" style={{ letterSpacing: '0.08em' }}>
                        {item.company}
                        {isCurrent && <span className="text-accent-500 font-semibold"> · current</span>}
                        {isComingSoon && <span className="font-mono"> · coming soon</span>}
                      </div>
                    )}
                    <div 
                      className={`font-serif text-text leading-tight line-clamp-2 ${
                        isCurrent ? 'font-semibold' : 'font-medium'
                      }`}
                      style={{ 
                        fontSize: '0.9375rem',
                        lineHeight: '1.3'
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel footer */}
          <div className="border-t border-border px-5 py-2.5 text-right">
            <Link
              href={indexHref}
              className="font-mono uppercase text-xs font-semibold text-text-muted hover:text-text transition-colors"
              style={{ letterSpacing: '0.08em' }}
              role="menuitem"
              tabIndex={0}
              onClick={() => setIsOpen(false)}
            >
              View full index →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}