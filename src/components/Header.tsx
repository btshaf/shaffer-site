export default function Header() {
  return (
    <header className="sticky top-0 bg-bg border-b border-border z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between md:block md:px-6 md:py-4">
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo mark */}
          <div className="w-8 h-8 bg-accent flex items-center justify-center rounded">
            <span className="text-bg font-serif font-medium text-lg">b</span>
          </div>
          
          {/* Navigation */}
          <nav>
            <ul className="flex items-center gap-8">
              <li>
                <a 
                  href="#about" 
                  className="text-text hover:text-accent transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#work" 
                  className="text-text hover:text-accent transition-colors"
                >
                  Work
                </a>
              </li>
              <li>
                <a 
                  href="#case-studies" 
                  className="text-text hover:text-accent transition-colors"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-text hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="mobile-header md:hidden w-full">
          <div className="mobile-header-logo">
            <div className="mark bg-accent flex items-center justify-center">
              <span className="text-bg font-serif font-medium">b</span>
            </div>
            <span className="name text-text">Brad Shaffer</span>
          </div>
          <button className="mobile-header-menu" aria-label="Menu">
            <span className="lines">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}