export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Location */}
          <p className="text-text-muted">Greater Phoenix, Arizona</p>
          
          {/* Social links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://linkedin.com/in/bradshaffer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-text-subtle text-sm">
            © {new Date().getFullYear()} Brad Shaffer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}