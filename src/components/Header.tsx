
import React from 'react';
import { Pen, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
            <Pen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">WriteRight</span>
            <span className="text-foreground ml-1 font-light">AI</span>
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
          <button className="text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all">
            Try Free
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
