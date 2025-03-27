
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search } from 'lucide-react';

interface TextInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  analyzeText: () => void;
  isAnalyzing: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  inputText,
  setInputText,
  analyzeText,
  isAnalyzing
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          WriteRight-AI: Content Humanizer & Plagiarism Detector
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Detect AI-generated text, analyze plagiarism, and transform content into undetectable human-like writing.
        </p>
      </div>
      
      <div className="glass-card p-6 bg-gradient-to-b from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-900/70">
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
            Paste your content
          </label>
          <Textarea
            id="content"
            placeholder="Enter or paste your content here to analyze and humanize..."
            className="min-h-[200px] resize-y border-indigo-100 focus-visible:ring-indigo-300 dark:border-indigo-900"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end mt-4">
          <Button 
            onClick={analyzeText} 
            disabled={isAnalyzing || !inputText.trim()}
            className="space-x-2 min-w-[150px] bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Analyze Text</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
