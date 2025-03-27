
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Search, Zap } from 'lucide-react';
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
      
      // Create four completely different variations with proper object structure
      const mockVariations = [
        {
          type: 'academic',
          text: `${inputText} (Rewritten with academic vocabulary and formal structure. This variation uses scholarly language, longer sentences, and precise terminology to convey the same information in a more academic manner.)`,
          label: 'Academic',
          description: 'Scholarly and formal language',
          color: '#4F46E5', // indigo
          readabilityScore: Math.floor(Math.random() * 30) + 60, // 60-90
          similarityScore: Math.floor(Math.random() * 20) + 75, // 75-95
        },
        {
          type: 'conversational',
          text: `${inputText} (Reworded in a friendly, conversational tone. This version uses shorter sentences, everyday vocabulary, and a more relaxed structure while maintaining the original meaning.)`,
          label: 'Conversational',
          description: 'Friendly and approachable tone',
          color: '#10B981', // emerald
          readabilityScore: Math.floor(Math.random() * 20) + 75, // 75-95
          similarityScore: Math.floor(Math.random() * 30) + 65, // 65-95
        },
        {
          type: 'creative',
          text: `${inputText} (Transformed with vivid language and creative phrasing. This adaptation uses colorful descriptions, metaphors, and varied sentence rhythms to express the same ideas in a more engaging way.)`,
          label: 'Creative',
          description: 'Vivid and engaging style',
          color: '#8B5CF6', // violet
          readabilityScore: Math.floor(Math.random() * 25) + 65, // 65-90
          similarityScore: Math.floor(Math.random() * 40) + 50, // 50-90
        },
        {
          type: 'concise',
          text: `${inputText} (Streamlined for clarity and directness. This variant eliminates unnecessary words, uses active voice, and presents information in a straightforward manner while preserving all key points.)`,
          label: 'Concise',
          description: 'Clear and direct wording',
          color: '#EC4899', // pink
          readabilityScore: Math.floor(Math.random() * 15) + 80, // 80-95
          similarityScore: Math.floor(Math.random() * 25) + 70, // 70-95
        }
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
    const updatedVariations = [...variations];
    const index = updatedVariations.findIndex(v => v.type === type);
    
    if (index !== -1) {
      // Generate a new variation based on the type
      let updatedText = '';
      let updatedReadability = 0;
      let updatedSimilarity = 0;
      
      switch(type) {
        case 'academic':
          updatedText = `${inputText} (Refreshed academic version with more scholarly terminology and formal structure. This revision employs sophisticated vocabulary and meticulous sentence construction to articulate the concepts with scholarly precision.)`;
          updatedReadability = Math.floor(Math.random() * 30) + 60;
          updatedSimilarity = Math.floor(Math.random() * 20) + 75;
          break;
        case 'conversational':
          updatedText = `${inputText} (Refreshed conversational version with a more casual and friendly approach. This new take uses simpler words, contractions, and a chatty style that feels like you're having a conversation with a friend.)`;
          updatedReadability = Math.floor(Math.random() * 20) + 75;
          updatedSimilarity = Math.floor(Math.random() * 30) + 65;
          break;
        case 'creative':
          updatedText = `${inputText} (Refreshed creative version with new metaphors and expressive language. This reimagined version paints vivid word pictures, weaves in fresh analogies, and plays with rhythm to create a more engaging and imaginative rendition.)`;
          updatedReadability = Math.floor(Math.random() * 25) + 65;
          updatedSimilarity = Math.floor(Math.random() * 40) + 50;
          break;
        case 'concise':
          updatedText = `${inputText} (Refreshed concise version with maximum efficiency. This distilled version cuts right to the core message, eliminates all fluff, and delivers the essential information with crisp precision.)`;
          updatedReadability = Math.floor(Math.random() * 15) + 80;
          updatedSimilarity = Math.floor(Math.random() * 25) + 70;
          break;
        default:
          updatedText = `${inputText} (Alternative version)`;
          updatedReadability = Math.floor(Math.random() * 30) + 60;
          updatedSimilarity = Math.floor(Math.random() * 30) + 60;
      }
      
      updatedVariations[index] = {
        ...updatedVariations[index],
        text: updatedText,
        readabilityScore: updatedReadability,
        similarityScore: updatedSimilarity
      };
      
      setVariations(updatedVariations);
      
      toast({
        title: "Variation Refreshed",
        description: `A new ${type} variation has been generated.`,
      });
    }
  };
  
  const selectVariation = (text: string) => {
    setInputText(text);
    toast({
      title: "Variation Selected",
      description: "The selected variation is now available in the editor.",
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
                    className={`px-4 py-2 text-sm font-medium transition-all ${currentTab === 'variations' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setCurrentTab('variations')}
                  >
                    Humanized Variations
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-all ${currentTab === 'summary' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-muted-foreground hover:text-foreground'}`}
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
                      onSelectVariation={selectVariation}
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

