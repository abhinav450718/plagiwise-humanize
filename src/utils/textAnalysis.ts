
export const generateMockPlagiarismData = () => {
  const mockScore = Math.floor(Math.random() * 80) + 20;
  const mockAiGenerated = Math.floor(Math.random() * 60) + 40;
  const mockHumanWritten = 100 - mockAiGenerated;
  
  const aiSources = ['ChatGPT-3.5', 'ChatGPT-4', 'Claude', 'Bard', 'Jasper'];
  const randomSource = aiSources[Math.floor(Math.random() * aiSources.length)];
  
  return {
    score: mockScore,
    aiGenerated: mockAiGenerated,
    humanWritten: mockHumanWritten,
    aiSource: randomSource,
  };
};

export const generateMockVariations = (inputText: string) => {
  return [
    {
      type: 'academic',
      text: `${inputText} (Rewritten with academic vocabulary and formal structure. This variation uses scholarly language, longer sentences, and precise terminology to convey the same information in a more academic manner.)`,
      label: 'Academic',
      description: 'Scholarly and formal language',
      color: '#4F46E5', // indigo
      readabilityScore: Math.floor(Math.random() * 30) + 60, // 60-90
      similarityScore: Math.floor(Math.random() * 20) + 75, // 75-95
    },
    {
      type: 'conversational',
      text: `${inputText} (Reworded in a friendly, conversational tone. This version uses shorter sentences, everyday vocabulary, and a more relaxed structure while maintaining the original meaning.)`,
      label: 'Conversational',
      description: 'Friendly and approachable tone',
      color: '#10B981', // emerald
      readabilityScore: Math.floor(Math.random() * 20) + 75, // 75-95
      similarityScore: Math.floor(Math.random() * 30) + 65, // 65-95
    },
    {
      type: 'creative',
      text: `${inputText} (Transformed with vivid language and creative phrasing. This adaptation uses colorful descriptions, metaphors, and varied sentence rhythms to express the same ideas in a more engaging way.)`,
      label: 'Creative',
      description: 'Vivid and engaging style',
      color: '#8B5CF6', // violet
      readabilityScore: Math.floor(Math.random() * 25) + 65, // 65-90
      similarityScore: Math.floor(Math.random() * 40) + 50, // 50-90
    },
    {
      type: 'concise',
      text: `${inputText} (Streamlined for clarity and directness. This variant eliminates unnecessary words, uses active voice, and presents information in a straightforward manner while preserving all key points.)`,
      label: 'Concise',
      description: 'Clear and direct wording',
      color: '#EC4899', // pink
      readabilityScore: Math.floor(Math.random() * 15) + 80, // 80-95
      similarityScore: Math.floor(Math.random() * 25) + 70, // 70-95
    }
  ];
};

export const generateRefreshedVariation = (type: string, inputText: string) => {
  let updatedText = '';
  let updatedReadability = 0;
  let updatedSimilarity = 0;
  
  switch(type) {
    case 'academic':
      updatedText = `${inputText} (Refreshed academic version with more scholarly terminology and formal structure. This revision employs sophisticated vocabulary and meticulous sentence construction to articulate the concepts with scholarly precision.)`;
      updatedReadability = Math.floor(Math.random() * 30) + 60;
      updatedSimilarity = Math.floor(Math.random() * 20) + 75;
      break;
    case 'conversational':
      updatedText = `${inputText} (Refreshed conversational version with a more casual and friendly approach. This new take uses simpler words, contractions, and a chatty style that feels like you're having a conversation with a friend.)`;
      updatedReadability = Math.floor(Math.random() * 20) + 75;
      updatedSimilarity = Math.floor(Math.random() * 30) + 65;
      break;
    case 'creative':
      updatedText = `${inputText} (Refreshed creative version with new metaphors and expressive language. This reimagined version paints vivid word pictures, weaves in fresh analogies, and plays with rhythm to create a more engaging and imaginative rendition.)`;
      updatedReadability = Math.floor(Math.random() * 25) + 65;
      updatedSimilarity = Math.floor(Math.random() * 40) + 50;
      break;
    case 'concise':
      updatedText = `${inputText} (Refreshed concise version with maximum efficiency. This distilled version cuts right to the core message, eliminates all fluff, and delivers the essential information with crisp precision.)`;
      updatedReadability = Math.floor(Math.random() * 15) + 80;
      updatedSimilarity = Math.floor(Math.random() * 25) + 70;
      break;
    default:
      updatedText = `${inputText} (Alternative version)`;
      updatedReadability = Math.floor(Math.random() * 30) + 60;
      updatedSimilarity = Math.floor(Math.random() * 30) + 60;
  }
  
  return {
    text: updatedText,
    readabilityScore: updatedReadability,
    similarityScore: updatedSimilarity
  };
};
