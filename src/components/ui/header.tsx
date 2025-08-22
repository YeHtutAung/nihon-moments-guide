import { LanguageSwitcher } from "./language-switcher";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">NM</span>
            </div>
            <span className="font-bold text-xl text-mountain-gray">Nihon Moments</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-mountain-gray hover:text-primary transition-colors">
              Home
            </a>
            <a href="#services" className="text-mountain-gray hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-mountain-gray hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-mountain-gray hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
