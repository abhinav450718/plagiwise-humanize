
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

  // Helper function to rephrase text with academic vocabulary
  const createAcademicVariation = (text: string) => {
    // Replace common words with academic alternatives
    const academicText = text
      .replace(/show/gi, "demonstrate")
      .replace(/use/gi, "utilize")
      .replace(/make/gi, "formulate")
      .replace(/think/gi, "postulate")
      .replace(/big/gi, "substantial")
      .replace(/small/gi, "minimal")
      .replace(/good/gi, "advantageous")
      .replace(/bad/gi, "detrimental")
      .replace(/important/gi, "significant")
      .replace(/start/gi, "commence")
      .replace(/end/gi, "conclude")
      .replace(/get/gi, "acquire")
      .replace(/find/gi, "ascertain")
      .replace(/help/gi, "facilitate")
      .replace(/change/gi, "modify")
      .replace(/look/gi, "examine")
      .replace(/need/gi, "require")
      .replace(/want/gi, "desire")
      .replace(/look at/gi, "scrutinize")
      .replace(/also/gi, "additionally")
      .replace(/but/gi, "however")
      .replace(/so/gi, "consequently");
    
    return {
      type: 'academic',
      text: academicText,
      label: 'Academic',
      description: 'Formal academic style with scholarly language',
      color: '#8B5CF6',
      readabilityScore: Math.floor(Math.random() * 20) + 70,
      similarityScore: Math.floor(Math.random() * 30) + 60,
    };
  };
  
  // Helper function to rephrase text with conversational tone
  const createConversationalVariation = (text: string) => {
    // Replace with more casual, conversational alternatives
    const conversationalText = text
      .replace(/therefore/gi, "so")
      .replace(/however/gi, "but")
      .replace(/furthermore/gi, "also")
      .replace(/demonstrate/gi, "show")
      .replace(/utilize/gi, "use")
      .replace(/obtain/gi, "get")
      .replace(/purchase/gi, "buy")
      .replace(/sufficient/gi, "enough")
      .replace(/assistance/gi, "help")
      .replace(/attempt/gi, "try")
      .replace(/inquire/gi, "ask")
      .replace(/comprehend/gi, "understand")
      .replace(/request/gi, "ask for")
      .replace(/commence/gi, "start")
      .replace(/terminate/gi, "end")
      .replace(/consequently/gi, "so")
      .replace(/additionally/gi, "also")
      .replace(/subsequently/gi, "later");
    
    return {
      type: 'casual',
      text: conversationalText,
      label: 'Conversational',
      description: 'Casual and friendly tone',
      color: '#0EA5E9',
      readabilityScore: Math.floor(Math.random() * 20) + 80,
      similarityScore: Math.floor(Math.random() * 30) + 50,
    };
  };
  
  // Helper function to rephrase text with creative language
  const createCreativeVariation = (text: string) => {
    // Add vivid language and creative phrasing
    const creativeText = text
      .replace(/see/gi, "visualize")
      .replace(/big/gi, "enormous")
      .replace(/small/gi, "tiny")
      .replace(/walk/gi, "stroll")
      .replace(/run/gi, "dash")
      .replace(/happy/gi, "ecstatic")
      .replace(/sad/gi, "melancholic")
      .replace(/angry/gi, "furious")
      .replace(/scared/gi, "terrified")
      .replace(/tired/gi, "exhausted")
      .replace(/house/gi, "dwelling")
      .replace(/car/gi, "vehicle")
      .replace(/good/gi, "spectacular")
      .replace(/bad/gi, "dreadful")
      .replace(/nice/gi, "delightful")
      .replace(/mean/gi, "cruel")
      .replace(/old/gi, "ancient")
      .replace(/new/gi, "fresh")
      .replace(/look/gi, "gaze")
      .replace(/beautiful/gi, "stunning");
    
    return {
      type: 'creative',
      text: creativeText,
      label: 'Creative',
      description: 'Creative and engaging style',
      color: '#D946EF',
      readabilityScore: Math.floor(Math.random() * 20) + 75,
      similarityScore: Math.floor(Math.random() * 30) + 40,
    };
  };
  
  // Helper function to create a concise version of the text
  const createConciseVariation = (text: string) => {
    // Make text more concise by removing filler words and phrases
    const conciseText = text
      .replace(/in order to/gi, "to")
      .replace(/for the purpose of/gi, "to")
      .replace(/due to the fact that/gi, "because")
      .replace(/in spite of the fact that/gi, "although")
      .replace(/in the event that/gi, "if")
      .replace(/in my opinion/gi, "I think")
      .replace(/as a matter of fact/gi, "actually")
      .replace(/at this point in time/gi, "now")
      .replace(/at the present time/gi, "currently")
      .replace(/for the most part/gi, "mostly")
      .replace(/in a manner of speaking/gi, "somewhat")
      .replace(/in the final analysis/gi, "finally")
      .replace(/until such time as/gi, "until")
      .replace(/for all intents and purposes/gi, "effectively");
    
    return {
      type: 'concise',
      text: conciseText,
      label: 'Concise',
      description: 'Clear and direct style',
      color: '#F97316',
      readabilityScore: Math.floor(Math.random() * 20) + 85,
      similarityScore: Math.floor(Math.random() * 30) + 70,
    };
  };

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
        createAcademicVariation(inputText),
        createConversationalVariation(inputText),
        createCreativeVariation(inputText),
        createConciseVariation(inputText),
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
            return createAcademicVariation(inputText);
          case 'casual':
            return createConversationalVariation(inputText);
          case 'creative':
            return createCreativeVariation(inputText);
          case 'concise':
            return createConciseVariation(inputText);
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
