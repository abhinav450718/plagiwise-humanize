
import React from 'react';
import { Pen, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 animate-fade-in bg-gradient-to-b from-background via-background to-transparent backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-800/20">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 blur-md opacity-80 rounded-lg"></div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg relative">
              <Pen className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight flex items-center">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">WriteRight</span>
            <span className="text-foreground ml-1 font-light">AI</span>
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded animate-pulse">Beta</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-primary smart-underline transition-colors">
            Features
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-primary smart-underline transition-colors">
            How It Works
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-primary smart-underline transition-colors">
            Pricing
          </a>
          <button className="text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all hover:scale-105">
            Try Free
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
