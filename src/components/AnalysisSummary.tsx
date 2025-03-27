
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, BarChart2, Clock, FileText } from 'lucide-react';

interface AnalysisSummaryProps {
  data: {
    score: number;
    aiGenerated: number;
    humanWritten: number;
    aiSource: string;
  };
  originalTextLength: number;
}

const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ data, originalTextLength }) => {
  const readingTime = Math.max(1, Math.round(originalTextLength / 1000));
  
  const getScoreAssessment = (score: number) => {
    if (score > 80) return { 
      label: 'High Risk', 
      description: 'Content has significant plagiarism issues that need immediate attention.',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      icon: <AlertCircle className="h-4 w-4 mr-1" />
    };
    if (score > 50) return { 
      label: 'Medium Risk', 
      description: 'Content contains some plagiarized elements that should be revised.',
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
      icon: <AlertCircle className="h-4 w-4 mr-1" />
    };
    return { 
      label: 'Low Risk', 
      description: 'Content appears to be mostly original with minimal plagiarism concerns.',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      icon: <CheckCircle2 className="h-4 w-4 mr-1" />
    };
  };
  
  const assessment = getScoreAssessment(data.score);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card rounded-lg p-4 border">
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-primary" />
          Analysis Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Plagiarism Score</div>
            <div className="flex items-center">
              <span className="text-xl font-semibold">{data.score}%</span>
              <Badge className={`ml-2 ${assessment.color}`}>
                <span className="flex items-center">
                  {assessment.icon}
                  {assessment.label}
                </span>
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{assessment.description}</p>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">AI Source Detected</div>
            <div className="flex items-center">
              <span className="text-xl font-semibold">{data.aiSource || 'None'}</span>
              <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {data.aiGenerated}% Content Match
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Our analysis suggests this content was likely generated using {data.aiSource}.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-4 border">
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Content Statistics</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm font-medium">{originalTextLength} Characters</div>
              <div className="text-xs text-muted-foreground">Content Length</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
            <div>
              <div className="text-sm font-medium">{readingTime} min</div>
              <div className="text-xs text-muted-foreground">Reading Time</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Humanization Summary</h4>
          <p className="text-xs text-muted-foreground">
            We've generated 4 unique humanized variations of your content. Each version maintains
            the original meaning while using different phrasing, vocabulary, and sentence structures
            to avoid detection as AI-generated content.
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-4 border">
        <div className="flex items-start">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
            <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium">Humanization Recommendation</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Based on our analysis, we recommend using Variation 1 or Variation 2 for the best balance
              of originality and natural human writing style. These versions have the highest humanization
              scores and are least likely to be detected as AI-generated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSummary;
