
import React from 'react';
import HumanizedVariations from './HumanizedVariations';
import AnalysisSummary from './AnalysisSummary';

interface ResultsTabsProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  inputText: string;
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

const ResultsTabs: React.FC<ResultsTabsProps> = ({
  currentTab,
  setCurrentTab,
  inputText,
  variations,
  onRefreshVariation,
  onSelectVariation,
  plagiarismData
}) => {
  return (
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
            onRefreshVariation={onRefreshVariation}
            onSelectVariation={onSelectVariation}
          />
        ) : (
          <AnalysisSummary 
            data={plagiarismData}
            originalTextLength={inputText.length}
          />
        )}
      </div>
    </div>
  );
};

export default ResultsTabs;
