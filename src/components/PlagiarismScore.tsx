
import React from 'react';
import { CircleAlert, Bot, Cpu, RefreshCcw } from 'lucide-react';
import PieChart from './PieChart';

interface PlagiarismScoreProps {
  data: {
    score: number;
    aiGenerated: number;
    humanWritten: number;
    aiSource: string;
  };
}

const PlagiarismScore: React.FC<PlagiarismScoreProps> = ({ data }) => {
  const getScoreColor = (score: number) => {
    if (score > 80) return 'text-red-600';
    if (score > 50) return 'text-amber-600';
    return 'text-green-600';
  };
  
  const getScoreLabel = (score: number) => {
    if (score > 80) return 'High';
    if (score > 50) return 'Medium';
    return 'Low';
  };

  return (
    <div className="glass-card p-6 space-y-6 h-full animate-scale-in">
      <h3 className="text-lg font-medium flex items-center">
        <CircleAlert className="w-5 h-5 mr-2 text-primary" />
        Plagiarism Detection
      </h3>
      
      <div className="flex flex-col items-center justify-center py-4">
        <PieChart 
          aiPercentage={data.aiGenerated} 
          humanPercentage={data.humanWritten} 
        />
      </div>
      
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Plagiarism Score</div>
          <div className="text-2xl font-bold flex items-center">
            <span className={getScoreColor(data.score)}>{data.score}%</span>
            <span className="text-sm ml-2 font-normal text-muted-foreground">
              ({getScoreLabel(data.score)})
            </span>
          </div>
        </div>
        
        <div className="pt-4 border-t space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <Bot className="w-4 h-4 mr-2 text-blue-500" />
              <span>AI-Generated</span>
            </div>
            <span className="font-medium">{data.aiGenerated}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <RefreshCcw className="w-4 h-4 mr-2 text-green-500" />
              <span>Human-Written</span>
            </div>
            <span className="font-medium">{data.humanWritten}%</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground mb-1">Detected AI Source</div>
          <div className="flex items-center">
            <Cpu className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="font-medium">{data.aiSource || 'None Detected'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismScore;
