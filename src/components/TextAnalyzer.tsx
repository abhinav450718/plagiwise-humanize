
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import TextInput from './TextInput';
import AnalysisResults from './AnalysisResults';
import { generateMockPlagiarismData, generateMockVariations, generateRefreshedVariation } from '../utils/textAnalysis';

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
      // Generate mock data
      const mockPlagiarismData = generateMockPlagiarismData();
      const mockVariations = generateMockVariations(inputText);
      
      setPlagiarismData(mockPlagiarismData);
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
      const refreshedVariation = generateRefreshedVariation(type, inputText);
      
      updatedVariations[index] = {
        ...updatedVariations[index],
        text: refreshedVariation.text,
        readabilityScore: refreshedVariation.readabilityScore,
        similarityScore: refreshedVariation.similarityScore
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
        <TextInput 
          inputText={inputText}
          setInputText={setInputText}
          analyzeText={analyzeText}
          isAnalyzing={isAnalyzing}
        />
      ) : (
        <AnalysisResults 
          inputText={inputText}
          resetAnalysis={resetAnalysis}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          variations={variations}
          onRefreshVariation={refreshVariation}
          onSelectVariation={selectVariation}
          plagiarismData={plagiarismData}
        />
      )}
    </div>
  );
};

export default TextAnalyzer;
