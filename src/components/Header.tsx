
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="text-gradient">Plagiwise</span>
            <span className="text-foreground ml-1 font-light">Humanize</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-primary smart-underline transition-colors">
            Features
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-primary smart-underline transition-colors">
            How It Works
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-primary smart-underline transition-colors">
            Pricing
          </a>
        </nav>
        <div className="flex items-center space-x-2">
          <button className="text-sm font-medium px-4 py-2 rounded-lg border border-transparent hover:border-border transition-all">
            Sign In
          </button>
          <button className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all">
            Try Free
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
