import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Search } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
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
  
  const [variations, setVariations] = useState<{
    type: string;
    text: string;
    label: string;
    description: string;
    color: string;
    readabilityScore: number;
    similarityScore: number;
  }[]>([]);

  const { toast } = useToast();

  const createVariation1 = (text: string) => ({
    type: 'academic',
    text: text + ' (Rewritten with academic vocabulary and formal structure)',
    label: 'Academic',
    description: 'Formal academic style with scholarly language',
    color: '#8B5CF6',
    readabilityScore: Math.floor(Math.random() * 20) + 70,
    similarityScore: Math.floor(Math.random() * 30) + 60,
  });
  
  const createVariation2 = (text: string) => ({
    type: 'casual',
    text: text + ' (Reworded in a friendly, conversational tone)',
    label: 'Conversational',
    description: 'Casual and friendly tone',
    color: '#0EA5E9',
    readabilityScore: Math.floor(Math.random() * 20) + 80,
    similarityScore: Math.floor(Math.random() * 30) + 50,
  });
  
  const createVariation3 = (text: string) => ({
    type: 'creative',
    text: text + ' (Transformed with vivid language and creative phrasing)',
    label: 'Creative',
    description: 'Creative and engaging style',
    color: '#D946EF',
    readabilityScore: Math.floor(Math.random() * 20) + 75,
    similarityScore: Math.floor(Math.random() * 30) + 40,
  });
  
  const createVariation4 = (text: string) => ({
    type: 'concise',
    text: text + ' (Streamlined for clarity and directness)',
    label: 'Concise',
    description: 'Clear and direct style',
    color: '#F97316',
    readabilityScore: Math.floor(Math.random() * 20) + 85,
    similarityScore: Math.floor(Math.random() * 30) + 70,
  });

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
      const mockScore = Math.floor(Math.random() * 80) + 20;
      const mockAiGenerated = Math.floor(Math.random() * 60) + 40;
      const mockHumanWritten = 100 - mockAiGenerated;
      
      const aiSources = ['ChatGPT-3.5', 'ChatGPT-4', 'Claude', 'Bard', 'Jasper'];
      const randomSource = aiSources[Math.floor(Math.random() * aiSources.length)];
      
      // Create variations with proper structure
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
  
  const refreshVariation = (type: string) => {
    const newVariations = variations.map(variation => {
      if (variation.type === type) {
        switch (type) {
          case 'academic':
            return createVariation1(inputText);
          case 'casual':
            return createVariation2(inputText);
          case 'creative':
            return createVariation3(inputText);
          case 'concise':
            return createVariation4(inputText);
          default:
            return variation;
        }
      }
      return variation;
    });
    
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
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Analysis Results
            </h2>
            <Button 
              variant="outline" 
              onClick={resetAnalysis}
              className="border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-900/40"
            >
              New Analysis
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PlagiarismScore data={plagiarismData} />
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-lg shadow-sm border p-4">
                <div className="flex space-x-1 mb-4 border-b">
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      currentTab === 'variations' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setCurrentTab('variations')}
                  >
                    Humanized Variations
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-all ${
                      currentTab === 'summary' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setCurrentTab('summary')}
                  >
                    Analysis Summary
                  </button>
                </div>
                
                <div className="mt-4">
                  {currentTab === 'variations' ? (
                    <HumanizedVariations 
                      originalText={inputText}
                      variations={variations}
                      onRefreshVariation={refreshVariation}
                      onSelectVariation={(text) => setInputText(text)}
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
