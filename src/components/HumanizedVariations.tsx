
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, Check, BookOpen, Zap } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface HumanizedVariationsProps {
  variations: string[];
  onRefresh: (index: number) => void;
  originalText: string;
}

const HumanizedVariations: React.FC<HumanizedVariationsProps> = ({ 
  variations, 
  onRefresh,
  originalText
}) => {
  const { toast } = useToast();
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const [readabilityScores, setReadabilityScores] = useState<number[]>([]);
  const [similarity, setSimilarity] = useState(0);
  
  useEffect(() => {
    // Calculate mock readability scores when variations change
    const generateReadabilityScores = () => {
      return variations.map((variation, index) => {
        // Mock readability scores - in a real app would use an algorithm
        const baseScore = 65 + (index * 5); // Different base scores
        // Add some randomness
        return Math.min(98, Math.max(60, baseScore + Math.floor(Math.random() * 15)));
      });
    };
    
    // Calculate similarity percentage with original
    const calculateSimilarity = () => {
      if (!variations[selectedVariation] || !originalText) return 0;
      // This is a simplified mock calculation - real implementation would use NLP
      const varLen = variations[selectedVariation].length;
      const origLen = originalText.length;
      const diff = Math.abs(varLen - origLen);
      // Return inverse similarity (lower difference = higher similarity)
      return Math.max(0, Math.min(100, 100 - Math.floor((diff / origLen) * 100)));
    };
    
    setReadabilityScores(generateReadabilityScores());
    setSimilarity(calculateSimilarity());
  }, [variations, selectedVariation, originalText]);
  
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    
    toast({
      title: "Copied to clipboard",
      description: "The humanized text has been copied to your clipboard.",
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };
  
  // Get readability color based on score
  const getReadabilityColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-emerald-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 60) return "text-amber-500";
    return "text-orange-500";
  };
  
  // Get progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-emerald-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-orange-500";
  };
  
  // Colors for variation tabs
  const colors = [
    "from-blue-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
    "from-purple-400 to-pink-500"
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex overflow-x-auto space-x-2 pb-3">
        {variations.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedVariation(index)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedVariation === index 
                ? `bg-gradient-to-r ${colors[index]} text-white shadow-sm`
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            Variation {index + 1}
            {readabilityScores[index] && (
              <span className={`ml-2 text-xs ${selectedVariation === index ? 'text-white/90' : getReadabilityColor(readabilityScores[index])}`}>
                {readabilityScores[index]}%
              </span>
            )}
          </button>
        ))}
      </div>
      
      <div className="border rounded-lg p-4 mt-2 bg-white dark:bg-gray-900 min-h-[200px]">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h4 className={`text-sm font-medium bg-gradient-to-r ${colors[selectedVariation]} bg-clip-text text-transparent`}>
              Humanized Version {selectedVariation + 1}
            </h4>
            <div className="ml-3 flex items-center">
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              <span className={`text-xs font-medium ${getReadabilityColor(readabilityScores[selectedVariation] || 0)}`}>
                Readability: {readabilityScores[selectedVariation] || 0}%
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRefresh(selectedVariation)}
              className="h-8"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(variations[selectedVariation], selectedVariation)}
              className="h-8"
            >
              {copied === selectedVariation ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                  <span className="text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="mb-3">
          <Progress 
            value={readabilityScores[selectedVariation] || 0} 
            className="h-1.5" 
            indicatorClassName={getProgressColor(readabilityScores[selectedVariation] || 0)}
          />
        </div>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {variations[selectedVariation] || 'No variation available.'}
          </p>
        </div>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <h4 className="text-sm font-medium text-muted-foreground">Original Text</h4>
            <div className="ml-4 flex items-center">
              <Zap className="w-3.5 h-3.5 mr-1 text-amber-500" />
              <span className="text-xs font-medium">
                Similarity: {similarity}%
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(originalText, -1)}
            className="h-7"
          >
            {copied === -1 ? (
              <>
                <Check className="h-3 w-3 mr-1 text-green-500" />
                <span className="text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert bg-muted/50 p-3 rounded-md">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {originalText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HumanizedVariations;
