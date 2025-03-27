
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Copy, Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

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
          </button>
        ))}
      </div>
      
      <div className="border rounded-lg p-4 mt-2 bg-white dark:bg-gray-900 min-h-[200px]">
        <div className="flex justify-between items-center mb-3">
          <h4 className={`text-sm font-medium bg-gradient-to-r ${colors[selectedVariation]} bg-clip-text text-transparent`}>
            Humanized Version {selectedVariation + 1}
          </h4>
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
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {variations[selectedVariation] || 'No variation available.'}
          </p>
        </div>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-muted-foreground">Original Text</h4>
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
