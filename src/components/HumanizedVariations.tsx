
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CopyCheck, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HumanizedVariationsProps {
  originalText: string;
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
}

const HumanizedVariations: React.FC<HumanizedVariationsProps> = ({
  originalText,
  variations,
  onRefreshVariation,
  onSelectVariation
}) => {
  const { toast } = useToast();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [copiedVariation, setCopiedVariation] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedVariation(type);
      toast({
        title: "Copied to clipboard",
        description: `The ${type} variation has been copied to your clipboard.`,
      });
      
      setTimeout(() => {
        setCopiedVariation(null);
      }, 2000);
    });
  };

  const getReadabilityLabel = (score: number) => {
    if (score >= 90) return "Very Easy";
    if (score >= 80) return "Easy";
    if (score >= 70) return "Fairly Easy";
    if (score >= 60) return "Standard";
    if (score >= 50) return "Fairly Difficult";
    if (score >= 30) return "Difficult";
    return "Very Difficult";
  };

  const getSimilarityLabel = (score: number) => {
    if (score >= 90) return "Very Similar";
    if (score >= 70) return "Similar";
    if (score >= 50) return "Moderately Changed";
    if (score >= 30) return "Significantly Changed";
    return "Completely Different";
  };

  const getReadabilityColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return "bg-red-500";
    if (score >= 60) return "bg-orange-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const toggleExpandCard = (type: string) => {
    if (expandedCard === type) {
      setExpandedCard(null);
    } else {
      setExpandedCard(type);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {variations.map((variation) => (
        <Card 
          key={variation.type}
          className={`relative transition-all overflow-hidden hover:shadow-md ${
            expandedCard === variation.type ? 'h-auto' : 'h-[300px]'
          }`}
          style={{ borderTop: `4px solid ${variation.color}` }}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span style={{ color: variation.color }}>{variation.label}</span>
                </CardTitle>
                <CardDescription>{variation.description}</CardDescription>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onRefreshVariation(variation.type)}
                className="flex-shrink-0"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-col space-y-2 mt-2">
              <div className="flex justify-between text-xs">
                <span>Readability: {getReadabilityLabel(variation.readabilityScore)}</span>
                <span>{variation.readabilityScore}%</span>
              </div>
              <Progress 
                value={variation.readabilityScore} 
                className={`h-2 ${getReadabilityColor(variation.readabilityScore)}`}
              />
              
              <div className="flex justify-between text-xs mt-1">
                <span>Similarity to Original: {getSimilarityLabel(variation.similarityScore)}</span>
                <span>{variation.similarityScore}%</span>
              </div>
              <Progress 
                value={variation.similarityScore}
                className={`h-2 ${getSimilarityColor(variation.similarityScore)}`}
              />
            </div>
          </CardHeader>
          <CardContent className={`relative ${
            expandedCard === variation.type ? 'max-h-none' : 'max-h-24 overflow-hidden'
          }`}>
            <p className="text-sm text-foreground/90">
              {variation.text}
            </p>
            {expandedCard !== variation.type && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between mt-auto">
            <Button
              variant="ghost"
              onClick={() => toggleExpandCard(variation.type)}
              className="text-xs"
            >
              {expandedCard === variation.type ? 'Show Less' : 'Show More'}
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => onSelectVariation(variation.text)}
              >
                Use This
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${copiedVariation === variation.type ? 'bg-green-100 text-green-800 border-green-300' : ''}`}
                onClick={() => copyToClipboard(variation.text, variation.type)}
              >
                {copiedVariation === variation.type ? (
                  <>
                    <CopyCheck className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  'Copy'
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HumanizedVariations;
