
import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Search, Zap } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import PlagiarismScore from './PlagiarismScore';
import HumanizedVariations from './HumanizedVariations';
import AnalysisSummary from './AnalysisSummary';

const TextAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentTab, setCurrentTab] = useState('variations');
  const [plagiarismData, setPlagiarismData] = useState({
    score: 0,
    aiGenerated: 0,
    humanWritten: 0,
    aiSource: '',
  });
  
  const [variations, setVariations] = useState<string[]>([]);

  const analyzeText = () => {
    if (!inputText.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter some text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // This is mock data - in a real app, this would come from an API
      const mockScore = Math.floor(Math.random() * 80) + 20;
      const mockAiGenerated = Math.floor(Math.random() * 60) + 40;
      const mockHumanWritten = 100 - mockAiGenerated;
      
      const aiSources = ['ChatGPT-3.5', 'ChatGPT-4', 'Claude', 'Bard', 'Jasper'];
      const randomSource = aiSources[Math.floor(Math.random() * aiSources.length)];
      
      // Create four variations of the text
      const mockVariations = [
        generateVariation(inputText, 1),
        generateVariation(inputText, 2),
        generateVariation(inputText, 3),
        generateVariation(inputText, 4),
      ];
      
      setPlagiarismData({
        score: mockScore,
        aiGenerated: mockAiGenerated,
        humanWritten: mockHumanWritten,
        aiSource: randomSource,
      });
      
      setVariations(mockVariations);
      setIsAnalyzing(false);
      setShowResults(true);
      
      toast({
        title: "Analysis Complete",
        description: "Your content has been analyzed and humanized variations are ready.",
      });
    }, 3000);
  };
  
  const generateVariation = (text: string, version: number) => {
    // This is a mock function to simulate different variations
    // In a real application, this would call an API or use NLP libraries
    
    const variations = [
      `${text} (Rewritten version ${version} - More formal and scholarly)`,
      `${text} (Rewritten version ${version} - More casual and conversational)`,
      `${text} (Rewritten version ${version} - More technical and precise)`,
      `${text} (Rewritten version ${version} - More creative and engaging)`
    ];
    
    return variations[version - 1];
  };
  
  const refreshVariation = (index: number) => {
    const newVariations = [...variations];
    newVariations[index] = generateVariation(inputText, index + 1) + " (Refreshed)";
    setVariations(newVariations);
    
    toast({
      title: "Variation Refreshed",
      description: "A new variation has been generated.",
    });
  };
  
  const resetAnalysis = () => {
    setInputText('');
    setShowResults(false);
    setPlagiarismData({
      score: 0,
      aiGenerated: 0,
      humanWritten: 0,
      aiSource: '',
    });
    setVariations([]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {!showResults ? (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              AI Content Humanizer & Plagiarism Detector
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detect AI-generated text, analyze plagiarism, and transform content into undetectable human-like writing.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
                Paste your content
              </label>
              <Textarea
                id="content"
                placeholder="Enter or paste your content here to analyze and humanize..."
                className="min-h-[200px] resize-y"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                onClick={analyzeText} 
                disabled={isAnalyzing || !inputText.trim()}
                className="space-x-2 min-w-[150px]"
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
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Analysis Results</h2>
            <Button variant="outline" onClick={resetAnalysis}>
              New Analysis
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PlagiarismScore data={plagiarismData} />
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-lg shadow-sm border p-4">
                <div className="flex space-x-1 mb-4">
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-all ${currentTab === 'variations' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setCurrentTab('variations')}
                  >
                    Humanized Variations
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-all ${currentTab === 'summary' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setCurrentTab('summary')}
                  >
                    Analysis Summary
                  </button>
                </div>
                
                <div className="mt-4">
                  {currentTab === 'variations' ? (
                    <HumanizedVariations 
                      variations={variations} 
                      onRefresh={refreshVariation}
                      originalText={inputText}
                    />
                  ) : (
                    <AnalysisSummary 
                      data={plagiarismData}
                      originalTextLength={inputText.length}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAnalyzer;
