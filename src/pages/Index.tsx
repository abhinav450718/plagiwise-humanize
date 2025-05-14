
import React from 'react';
import Header from '@/components/Header';
import TextAnalyzer from '@/components/TextAnalyzer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <Header />
      <main className="container mx-auto pt-8 pb-16 px-4">
        <TextAnalyzer />
      </main>
      
      <footer className="border-t py-6 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} WriteRight-AI. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
