/**
 * Footer - cursorhabits
 * 
 * Minimal footer with essential links
 */

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-accent-primary flex items-center justify-center">
              <span className="text-white font-mono font-bold text-sm">ch</span>
            </div>
            <span className="font-display font-medium text-text-secondary text-base">
              cursorhabits
            </span>
          </div>

          {/* Links - min touch target with padding */}
          <nav className="flex items-center gap-4 text-base text-text-secondary">
            <a 
              href="https://github.com/rohunvora/prmpt-hstry/tree/main/cursor-habits"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-primary transition-colors py-2 px-1"
            >
              GitHub
            </a>
            <a 
              href="/privacy"
              className="hover:text-accent-primary transition-colors py-2 px-1"
            >
              Privacy
            </a>
            <a 
              href="/terms"
              className="hover:text-accent-primary transition-colors py-2 px-1"
            >
              Terms
            </a>
          </nav>

          {/* Credit */}
          <p className="text-base text-text-tertiary">
            Made with ☕ by{' '}
            <a 
              href="https://twitter.com/rohunvora"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-primary transition-colors"
            >
              @rohunvora
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
