
import React, { useState, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Search, Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import PlagiarismScore from './PlagiarismScore';
import HumanizedVariations from './HumanizedVariations';
import AnalysisSummary from './AnalysisSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Enhanced academic vocabulary transformation with more comprehensive word replacements
  const createAcademicVariation = (text: string) => {
    const academicReplacements: Record<string, string> = {
      // Common words to academic alternatives
      'show': 'demonstrate',
      'use': 'utilize',
      'make': 'formulate',
      'think': 'postulate',
      'big': 'substantial',
      'small': 'minimal',
      'good': 'advantageous',
      'bad': 'detrimental',
      'important': 'significant',
      'start': 'commence',
      'end': 'conclude',
      'get': 'acquire',
      'find': 'ascertain',
      'help': 'facilitate',
      'change': 'modify',
      'look': 'examine',
      'need': 'require',
      'want': 'desire',
      'look at': 'scrutinize',
      'also': 'additionally',
      'but': 'however',
      'so': 'consequently',
      
      // Additional academic words
      'about': 'regarding',
      'after': 'subsequent to',
      'before': 'prior to',
      'now': 'presently',
      'later': 'subsequently',
      'many': 'numerous',
      'few': 'limited',
      'almost': 'nearly',
      'like': 'comparable to',
      'unlike': 'dissimilar to',
      'same': 'identical',
      'different': 'distinct',
      'more': 'additional',
      'less': 'diminished',
      'often': 'frequently',
      'sometimes': 'occasionally',
      'never': 'in no instance',
      'always': 'invariably',
      'because': 'due to the fact that',
      'if': 'provided that',
      'then': 'subsequently',
      'when': 'at such time as',
      'where': 'in which location',
      'how': 'by what method',
      'why': 'for what reason',
      'what': 'that which',
      'who': 'which individual',
      'yet': 'nevertheless',
      'still': 'nonetheless',
      'say': 'articulate',
      'tell': 'inform',
      'ask': 'inquire',
      'answer': 'respond',
      'learn': 'acquire knowledge',
      'teach': 'instruct',
      'create': 'construct',
      'build': 'fabricate',
      'destroy': 'dismantle',
      'fix': 'rectify',
      'break': 'fracture',
      'solve': 'resolve',
      'problem': 'dilemma',
      'idea': 'concept',
      'thought': 'contemplation',
      'belief': 'conviction',
      'view': 'perspective',
      'opinion': 'assessment',
      'feeling': 'sentiment',
      'emotion': 'affective response',
      'happy': 'content',
      'sad': 'melancholic',
      'angry': 'irate',
      'afraid': 'apprehensive',
      'sure': 'certain',
      'maybe': 'perhaps'
    };
    
    // Apply advanced replacement strategy with regular expressions
    let academicText = text;
    
    // Replace exact words with word boundaries to avoid partial matches
    for (const [common, academic] of Object.entries(academicReplacements)) {
      const regex = new RegExp(`\\b${common}\\b`, 'gi');
      academicText = academicText.replace(regex, academic);
    }
    
    // Complex sentence structure transformations
    academicText = academicText
      .replace(/I think that/gi, 'It can be posited that')
      .replace(/In my opinion/gi, 'From a scholarly perspective')
      .replace(/To sum up/gi, 'In conclusion')
      .replace(/To summarize/gi, 'To synthesize the aforementioned points')
      .replace(/In other words/gi, 'To rephrase')
      .replace(/For example/gi, 'To illustrate')
      .replace(/I agree/gi, 'This analysis concurs')
      .replace(/I disagree/gi, 'This perspective contests the notion')
      .replace(/It seems that/gi, 'Evidence suggests that')
      .replace(/This shows/gi, 'This demonstrates')
      .replace(/This means/gi, 'This indicates');
    
    return {
      type: 'academic',
      text: academicText,
      label: 'Academic',
      description: 'Formal academic style with scholarly vocabulary and complex structures',
      color: '#8B5CF6',
      readabilityScore: Math.floor(Math.random() * 20) + 70,
      similarityScore: Math.floor(Math.random() * 30) + 60,
    };
  };
  
  // Enhanced conversational tone transformation with more natural speech patterns
  const createConversationalVariation = (text: string) => {
    const conversationalReplacements: Record<string, string> = {
      // Formal to casual replacements
      'therefore': 'so',
      'however': 'but',
      'furthermore': 'also',
      'demonstrate': 'show',
      'utilize': 'use',
      'obtain': 'get',
      'purchase': 'buy',
      'sufficient': 'enough',
      'assistance': 'help',
      'attempt': 'try',
      'inquire': 'ask',
      'comprehend': 'understand',
      'request': 'ask for',
      'commence': 'start',
      'terminate': 'end',
      'consequently': 'so',
      'additionally': 'also',
      'subsequently': 'later',
      
      // Additional conversational replacements
      'regarding': 'about',
      'numerous': 'a lot of',
      'currently': 'right now',
      'previously': 'before',
      'observe': 'see',
      'consider': 'think about',
      'facilitate': 'help out',
      'indicate': 'show',
      'require': 'need',
      'proceed': 'go ahead',
      'ascertain': 'find out',
      'endeavor': 'try',
      'implement': 'do',
      'monitor': 'keep an eye on',
      'allocate': 'give out',
      'conclude': 'finish up',
      'expedite': 'speed up',
      'formulate': 'come up with',
      'incorporate': 'add in',
      'necessitate': 'need',
      'obligated': 'have to',
      'procure': 'get',
      'significant': 'important',
      'specifications': 'details',
      'substantiate': 'back up',
      'pertaining to': 'about',
      'due to the fact that': 'because',
      'in the event that': 'if',
      'with regard to': 'about',
      'at this point in time': 'now',
      'for the purpose of': 'to',
      'in the near future': 'soon',
      'in spite of the fact that': 'although',
      'it is important to note that': 'note that',
      'on the grounds that': 'because',
      'in accordance with': 'following',
      'in the majority of instances': 'usually'
    };
    
    // Apply advanced replacement strategy
    let conversationalText = text;
    
    // Replace exact words with word boundaries
    for (const [formal, casual] of Object.entries(conversationalReplacements)) {
      const regex = new RegExp(`\\b${formal}\\b`, 'gi');
      conversationalText = conversationalText.replace(regex, casual);
    }
    
    // Add conversational fillers and shortenings
    conversationalText = conversationalText
      .replace(/I am/gi, "I'm")
      .replace(/You are/gi, "You're")
      .replace(/They are/gi, "They're")
      .replace(/We are/gi, "We're")
      .replace(/He is/gi, "He's")
      .replace(/She is/gi, "She's")
      .replace(/It is/gi, "It's")
      .replace(/That is/gi, "That's")
      .replace(/There is/gi, "There's")
      .replace(/There are/gi, "There're")
      .replace(/who is/gi, "who's")
      .replace(/what is/gi, "what's")
      .replace(/where is/gi, "where's")
      .replace(/when is/gi, "when's")
      .replace(/why is/gi, "why's")
      .replace(/how is/gi, "how's")
      .replace(/is not/gi, "isn't")
      .replace(/are not/gi, "aren't")
      .replace(/was not/gi, "wasn't")
      .replace(/were not/gi, "weren't")
      .replace(/have not/gi, "haven't")
      .replace(/has not/gi, "hasn't")
      .replace(/had not/gi, "hadn't")
      .replace(/will not/gi, "won't")
      .replace(/would not/gi, "wouldn't")
      .replace(/should not/gi, "shouldn't")
      .replace(/could not/gi, "couldn't")
      .replace(/cannot/gi, "can't")
      .replace(/do not/gi, "don't")
      .replace(/does not/gi, "doesn't")
      .replace(/did not/gi, "didn't");
    
    // Add conversation starters/transitions
    if (Math.random() > 0.7) {
      const starters = [
        "Look, ", 
        "Well, ", 
        "So, ", 
        "Y'know, ", 
        "Honestly, ", 
        "Basically, ", 
        "I mean, "
      ];
      const randomStarter = starters[Math.floor(Math.random() * starters.length)];
      conversationalText = randomStarter + conversationalText.charAt(0).toLowerCase() + conversationalText.slice(1);
    }
    
    return {
      type: 'casual',
      text: conversationalText,
      label: 'Conversational',
      description: 'Casual and friendly tone with everyday language',
      color: '#0EA5E9',
      readabilityScore: Math.floor(Math.random() * 20) + 80,
      similarityScore: Math.floor(Math.random() * 30) + 50,
    };
  };
  
  // Enhanced creative language transformation with rich vocabulary and expressive style
  const createCreativeVariation = (text: string) => {
    const creativeReplacements: Record<string, string> = {
      // Standard to creative replacements
      'see': 'visualize',
      'big': 'enormous',
      'small': 'tiny',
      'walk': 'stroll',
      'run': 'dash',
      'happy': 'ecstatic',
      'sad': 'melancholic',
      'angry': 'furious',
      'scared': 'terrified',
      'tired': 'exhausted',
      'house': 'dwelling',
      'car': 'vehicle',
      'good': 'spectacular',
      'bad': 'dreadful',
      'nice': 'delightful',
      'mean': 'cruel',
      'old': 'ancient',
      'new': 'fresh',
      'look': 'gaze',
      'beautiful': 'stunning',
      
      // Additional creative replacements
      'say': 'proclaim',
      'tell': 'narrate',
      'go': 'venture',
      'come': 'approach',
      'hear': 'perceive',
      'touch': 'caress',
      'feel': 'sense',
      'think': 'contemplate',
      'know': 'comprehend',
      'understand': 'fathom',
      'remember': 'recall',
      'forget': 'disregard',
      'want': 'desire',
      'need': 'require',
      'like': 'adore',
      'love': 'cherish',
      'hate': 'despise',
      'fear': 'dread',
      'hope': 'aspire',
      'try': 'endeavor',
      'do': 'accomplish',
      'make': 'craft',
      'build': 'construct',
      'create': 'fashion',
      'destroy': 'demolish',
      'break': 'shatter',
      'fix': 'restore',
      'change': 'transform',
      'start': 'initiate',
      'stop': 'cease',
      'continue': 'persist',
      'finish': 'conclude',
      'begin': 'commence',
      'end': 'culminate',
      'find': 'discover',
      'lose': 'misplace',
      'hide': 'conceal',
      'seek': 'pursue',
      'search': 'scour',
      'look for': 'hunt for',
      'get': 'obtain',
      'give': 'bestow',
      'take': 'seize',
      'put': 'place',
      'move': 'shift',
      'stay': 'remain',
      'leave': 'depart',
      'arrive': 'emerge',
      'fast': 'swift',
      'slow': 'gradual',
      'hard': 'arduous',
      'easy': 'effortless',
      'difficult': 'challenging',
      'simple': 'elementary',
      'complex': 'intricate',
      'clear': 'transparent',
      'dark': 'shadowy'
    };
    
    // Apply advanced replacement strategy
    let creativeText = text;
    
    // Replace exact words with word boundaries
    for (const [standard, creative] of Object.entries(creativeReplacements)) {
      const regex = new RegExp(`\\b${standard}\\b`, 'gi');
      creativeText = creativeText.replace(regex, creative);
    }
    
    // Add vivid descriptors and metaphors
    const sentences = creativeText.split(/(?<=[.!?])\s+/);
    const enhancedSentences = sentences.map(sentence => {
      // Randomly enhance some sentences with descriptive phrases
      if (Math.random() > 0.7) {
        const descriptiveAdditions = [
          ", like a scene from a vibrant painting,",
          ", reminiscent of a distant memory,",
          ", dancing like shadows in the twilight,",
          ", standing out in stark relief,",
          ", weaving an intricate tapestry of thought,"
        ];
        const randomAddition = descriptiveAdditions[Math.floor(Math.random() * descriptiveAdditions.length)];
        
        // Find a good position to insert the descriptive phrase
        const insertPosition = sentence.length > 40 
          ? sentence.substring(0, Math.floor(sentence.length / 2)).lastIndexOf(',') + 1
          : sentence.length > 20 
            ? sentence.indexOf(' ', 10)
            : -1;
        
        if (insertPosition > 0) {
          sentence = sentence.substring(0, insertPosition) + randomAddition + sentence.substring(insertPosition);
        }
      }
      return sentence;
    });
    
    creativeText = enhancedSentences.join(' ');
    
    return {
      type: 'creative',
      text: creativeText,
      label: 'Creative',
      description: 'Vivid, expressive style with rich vocabulary and imagery',
      color: '#D946EF',
      readabilityScore: Math.floor(Math.random() * 20) + 75,
      similarityScore: Math.floor(Math.random() * 30) + 40,
    };
  };
  
  // Enhanced concise variation with focus on clarity and brevity
  const createConciseVariation = (text: string) => {
    // Advanced trimming of wordy phrases
    const wordyPhrases: Record<string, string> = {
      'in order to': 'to',
      'for the purpose of': 'to',
      'due to the fact that': 'because',
      'in spite of the fact that': 'although',
      'in the event that': 'if',
      'in my opinion': 'I think',
      'as a matter of fact': 'actually',
      'at this point in time': 'now',
      'at the present time': 'currently',
      'for the most part': 'mostly',
      'in a manner of speaking': 'somewhat',
      'in the final analysis': 'finally',
      'until such time as': 'until',
      'for all intents and purposes': 'effectively',
      'in the nature of': 'like',
      'with the exception of': 'except',
      'in the near future': 'soon',
      'in close proximity to': 'near',
      'in the majority of instances': 'usually',
      'it is often the case that': 'often',
      'there is no doubt that': 'clearly',
      'on a regular basis': 'regularly',
      'it is interesting to note that': '',
      'it should be noted that': '',
      'it is important to note that': '',
      'it is significant that': '',
      'it is worth noting that': '',
      'it is noteworthy that': '',
      'needless to say': '',
      'as you can see': '',
      'as already stated': '',
      'as mentioned earlier': '',
      'in the process of': '',
      'in conjunction with': 'with',
      'with reference to': 'about',
      'with regard to': 'about',
      'in relation to': 'about',
      'in respect to': 'about',
      'in the case of': 'for',
      'in the context of': 'in',
      'on the basis of': 'by',
      'on the grounds that': 'because',
      'on the occasion of': 'during',
      'on the subject of': 'about',
      'at the conclusion of': 'after',
      'prior to the start of': 'before'
    };
    
    // Apply advanced replacement strategy
    let conciseText = text;
    
    // Replace wordy phrases
    for (const [wordy, concise] of Object.entries(wordyPhrases)) {
      const regex = new RegExp(wordy, 'gi');
      conciseText = conciseText.replace(regex, concise);
    }
    
    // Remove redundant words and phrases
    conciseText = conciseText
      .replace(/\b(very|really|quite|extremely|actually|basically|simply|just)\s+/gi, '')
      .replace(/\b(absolutely|completely|totally|entirely|utterly|wholly)\s+/gi, '')
      .replace(/\b(begin to|start to|commence to)\s+/gi, '')
      .replace(/\b(each and every|any and all|full and complete|true and accurate)\b/gi, m => m.split(' and ')[0])
      .replace(/\b(first and foremost)\b/gi, 'first')
      .replace(/\b(various different|repeat again|return back|completely eliminate)\b/gi, m => m.split(' ')[1]);
    
    // Simplify verbs
    conciseText = conciseText
      .replace(/\b(is able to|are able to|was able to|were able to)\b/gi, 'can')
      .replace(/\b(will be able to)\b/gi, 'can')
      .replace(/\b(has got|have got)\b/gi, 'has')
      .replace(/\b(make a decision)\b/gi, 'decide')
      .replace(/\b(give consideration to)\b/gi, 'consider')
      .replace(/\b(make a statement)\b/gi, 'state')
      .replace(/\b(provide an explanation)\b/gi, 'explain')
      .replace(/\b(make an assumption)\b/gi, 'assume')
      .replace(/\b(reach a conclusion)\b/gi, 'conclude')
      .replace(/\b(take into consideration)\b/gi, 'consider');
      
    // Remove nominalizations (converting verbs to nouns)
    conciseText = conciseText
      .replace(/\b(make a recommendation)\b/gi, 'recommend')
      .replace(/\b(provide a description of)\b/gi, 'describe')
      .replace(/\b(perform an analysis of)\b/gi, 'analyze')
      .replace(/\b(conduct an investigation of)\b/gi, 'investigate')
      .replace(/\b(make a determination)\b/gi, 'determine')
      .replace(/\b(take into account)\b/gi, 'consider')
      .replace(/\b(come to the realization)\b/gi, 'realize')
      .replace(/\b(make reference to)\b/gi, 'refer to')
      .replace(/\b(provide assistance to)\b/gi, 'help')
      .replace(/\b(give authorization to)\b/gi, 'authorize');
      
    return {
      type: 'concise',
      text: conciseText,
      label: 'Concise',
      description: 'Clear and direct style focused on brevity and efficiency',
      color: '#F97316',
      readabilityScore: Math.floor(Math.random() * 20) + 85,
      similarityScore: Math.floor(Math.random() * 30) + 70,
    };
  };
  
  // Create a fifth business/corporate style variation
  const createBusinessVariation = (text: string) => {
    const businessReplacements: Record<string, string> = {
      'use': 'leverage',
      'start': 'initiate',
      'make': 'implement',
      'think': 'strategize',
      'say': 'communicate',
      'tell': 'convey',
      'help': 'support',
      'show': 'demonstrate',
      'look': 'analyze',
      'get': 'acquire',
      'give': 'provide',
      'need': 'require',
      'want': 'seek',
      'change': 'transition',
      'grow': 'scale',
      'fix': 'optimize',
      'do': 'execute',
      'buy': 'procure',
      'sell': 'monetize',
      'lead': 'spearhead',
      'improve': 'enhance',
      'increase': 'maximize',
      'decrease': 'minimize',
      'create': 'develop',
      'end': 'finalize',
      'plan': 'strategize',
      'talk': 'dialogue',
      'meet': 'interface',
      'learn': 'onboard',
      'solve': 'address',
      'try': 'pilot',
      'work': 'operate',
      'teach': 'train',
      'build': 'construct',
      'find': 'identify',
      'see': 'observe',
      'know': 'recognize',
      'like': 'prefer',
      'believe': 'maintain',
      'compete': 'position',
      'advance': 'progress',
      'control': 'manage',
      'money': 'capital',
      'value': 'equity',
      'goal': 'objective',
      'problem': 'challenge',
      'idea': 'concept',
      'project': 'initiative',
      'meeting': 'sync',
      'group': 'team',
      'person': 'individual',
      'customer': 'client',
      'worker': 'associate',
      'boss': 'supervisor',
      'business': 'enterprise',
      'company': 'organization',
      'job': 'role',
      'task': 'action item',
      'pay': 'remunerate',
      'fire': 'terminate',
      'hire': 'onboard'
    };
    
    // Apply advanced replacement strategy
    let businessText = text;
    
    // Replace exact words with word boundaries
    for (const [standard, business] of Object.entries(businessReplacements)) {
      const regex = new RegExp(`\\b${standard}\\b`, 'gi');
      businessText = businessText.replace(regex, business);
    }
    
    // Add business jargon phrases
    const sentences = businessText.split(/(?<=[.!?])\s+/);
    const enhancedSentences = sentences.map(sentence => {
      // Randomly enhance some sentences with business jargon
      if (Math.random() > 0.8) {
        const jargonAdditions = [
          " in order to drive results",
          " to maximize stakeholder value",
          " with a focus on ROI",
          " aligned with our core competencies",
          " to maintain a competitive advantage",
          " as we pivot to new opportunities",
          " to achieve synergistic outcomes",
          " while optimizing operational efficiency",
          " leveraging our core strengths",
          " with end-to-end solutions"
        ];
        const randomAddition = jargonAdditions[Math.floor(Math.random() * jargonAdditions.length)];
        
        // Add at the end of sentence
        if (sentence.match(/[.!?]$/)) {
          sentence = sentence.replace(/[.!?]$/, randomAddition + ".");
        }
      }
      return sentence;
    });
    
    businessText = enhancedSentences.join(' ');
    
    return {
      type: 'business',
      text: businessText,
      label: 'Business',
      description: 'Professional corporate style with strategic terminology',
      color: '#6366F1',
      readabilityScore: Math.floor(Math.random() * 20) + 65,
      similarityScore: Math.floor(Math.random() * 30) + 55,
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
      
      // Create all five variations with proper structure
      const mockVariations = [
        createAcademicVariation(inputText),
        createConversationalVariation(inputText),
        createCreativeVariation(inputText),
        createConciseVariation(inputText),
        createBusinessVariation(inputText)
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
          case 'business':
            return createBusinessVariation(inputText);
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
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Only accept text files
    if (!file.type.includes('text') && !file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a text file (.txt, .md).",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        setInputText(content);
        toast({
          title: "File Uploaded",
          description: `${file.name} has been loaded successfully.`,
        });
      }
    };
    reader.readAsText(file);
  };
  
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center space-y-3 mb-8">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          WriteRight-AI
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Redefining Plagiarism Detection with AI-Powered Humanization and Ethical Text Transformation
        </p>
      </div>
      
      {!showResults ? (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-card p-6 bg-gradient-to-b from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-900/70 shadow-lg border-2 border-indigo-100 dark:border-indigo-900/30">
            <div className="mb-4">
              <label htmlFor="content" className="block text-lg font-medium text-foreground mb-2">
                Paste your content
              </label>
              <Textarea
                id="content"
                placeholder="Enter or paste your content here to analyze and humanize..."
                className="min-h-[250px] resize-y border-indigo-100 focus-visible:ring-indigo-300 dark:border-indigo-900 text-base"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-between items-center mt-6 gap-2">
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.md,text/plain"
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  onClick={triggerFileUpload}
                  size="lg"
                  className="border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-900/40 transition-all hover:scale-105"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Text File
                </Button>
              </div>
              
              <Button 
                onClick={analyzeText} 
                disabled={isAnalyzing || !inputText.trim()}
                size="lg"
                className="space-x-2 min-w-[180px] bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all hover:scale-105 hover:shadow-md"
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
              <div className="bg-card rounded-lg shadow-lg border p-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/95">
                <Tabs 
                  defaultValue="variations" 
                  className="w-full" 
                  onValueChange={(value) => setCurrentTab(value)}
                >
                  <TabsList className="mb-4 grid grid-cols-2 w-full bg-muted/80">
                    <TabsTrigger value="variations" className="text-sm font-medium">
                      Humanized Variations
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="text-sm font-medium">
                      Analysis Summary
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="variations" className="space-y-4 mt-2 focus-visible:outline-none focus-visible:ring-0">
                    <HumanizedVariations 
                      originalText={inputText}
                      variations={variations}
                      onRefreshVariation={refreshVariation}
                      onSelectVariation={(text) => setInputText(text)}
                    />
                  </TabsContent>
                  <TabsContent value="summary" className="focus-visible:outline-none focus-visible:ring-0">
                    <AnalysisSummary 
                      data={plagiarismData}
                      originalTextLength={inputText.length}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextAnalyzer;
