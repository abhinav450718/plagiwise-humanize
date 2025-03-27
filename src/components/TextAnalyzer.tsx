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
      
      // Create four completely different variations of the text
      const mockVariations = [
        createVariation1(inputText),
        createVariation2(inputText),
        createVariation3(inputText),
        createVariation4(inputText),
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
  
  const createVariation1 = (text: string) => {
    // More formal academic style
    return `${text} (Rewritten with academic vocabulary and formal structure. This variation uses scholarly language, longer sentences, and precise terminology to convey the same information in a more academic manner.)`;
  };
  
  const createVariation2 = (text: string) => {
    // More conversational and casual style
    return `${text} (Reworded in a friendly, conversational tone. This version uses shorter sentences, everyday vocabulary, and a more relaxed structure while maintaining the original meaning.)`;
  };
  
  const createVariation3 = (text: string) => {
    // More descriptive and creative style
    return `${text} (Transformed with vivid language and creative phrasing. This adaptation uses colorful descriptions, metaphors, and varied sentence rhythms to express the same ideas in a more engaging way.)`;
  };
  
  const createVariation4 = (text: string) => {
    // More concise and direct style
    return `${text} (Streamlined for clarity and directness. This variant eliminates unnecessary words, uses active voice, and presents information in a straightforward manner while preserving all key points.)`;
  };
  
  const refreshVariation = (index: number) => {
    const newVariations = [...variations];
    
    // Use a different approach for each refresh based on index
    switch(index) {
      case 0:
        newVariations[index] = createVariation1(inputText) + " (Refreshed with new academic phrasing)";
        break;
      case 1:
        newVariations[index] = createVariation2(inputText) + " (Refreshed with different casual expressions)";
        break;
      case 2:
        newVariations[index] = createVariation3(inputText) + " (Refreshed with new creative elements)";
        break;
      case 3:
        newVariations[index] = createVariation4(inputText) + " (Refreshed with more concise structure)";
        break;
      default:
        newVariations[index] = `${inputText} (Rewritten with alternative phrasing)`;
    }
    
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
