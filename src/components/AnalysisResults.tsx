
import React from 'react';
import { Button } from "@/components/ui/button";
import PlagiarismScore from './PlagiarismScore';
import ResultsTabs from './ResultsTabs';

interface AnalysisResultsProps {
  inputText: string;
  resetAnalysis: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  variations: {
    type: string;
    text: string;
    label: string;
    description: string;
    color: string;
    readabilityScore: number;
    similarityScore: number;
  }[];
  onRefreshVariation: (type: string) => void;
  onSelectVariation: (text: string) => void;
  plagiarismData: {
    score: number;
    aiGenerated: number;
    humanWritten: number;
    aiSource: string;
  };
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  inputText,
  resetAnalysis,
  currentTab,
  setCurrentTab,
  variations,
  onRefreshVariation,
  onSelectVariation,
  plagiarismData
}) => {
  return (
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
          <ResultsTabs
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            inputText={inputText}
            variations={variations}
            onRefreshVariation={onRefreshVariation}
            onSelectVariation={onSelectVariation}
            plagiarismData={plagiarismData}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
