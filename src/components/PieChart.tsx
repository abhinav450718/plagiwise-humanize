
import React, { useEffect, useRef } from 'react';

interface PieChartProps {
  aiPercentage: number;
  humanPercentage: number;
}

const PieChart: React.FC<PieChartProps> = ({ aiPercentage, humanPercentage }) => {
  const chartRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Animation logic for the chart
    const aiPath = chartRef.current.querySelector('#ai-segment');
    const humanPath = chartRef.current.querySelector('#human-segment');
    
    if (aiPath && humanPath) {
      setTimeout(() => {
        (aiPath as SVGPathElement).style.strokeDashoffset = '0';
        (humanPath as SVGPathElement).style.strokeDashoffset = '0';
      }, 300);
    }
  }, [aiPercentage, humanPercentage]);

  // Calculate angles for pie segments
  const aiAngle = (aiPercentage / 100) * 360;
  const humanAngle = (humanPercentage / 100) * 360;
  
  // Helper to create SVG arc path
  const createArc = (startAngle: number, endAngle: number) => {
    const radius = 50;
    const cx = 60;
    const cy = 60;
    
    // Convert angles to radians
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    
    // Calculate points
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    
    // Determine large arc flag
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Create paths for segments
  const aiPath = createArc(0, aiAngle);
  const humanPath = createArc(aiAngle, 360);
  
  // Calculate stroke dash arrays for animation
  const aiPathLength = aiAngle * (Math.PI / 180) * 50;
  const humanPathLength = humanAngle * (Math.PI / 180) * 50;

  return (
    <div className="relative w-[150px] h-[150px] flex items-center justify-center">
      <svg 
        ref={chartRef}
        width="120" 
        height="120" 
        viewBox="0 0 120 120" 
        className="transform -rotate-90"
      >
        {/* AI Segment */}
        <path
          id="ai-segment"
          d={aiPath}
          fill="#4f46e5"
          className="opacity-90 chart-animation"
          style={{
            strokeDasharray: aiPathLength,
            strokeDashoffset: aiPathLength,
          }}
        />
        
        {/* Human Segment */}
        <path
          id="human-segment"
          d={humanPath}
          fill="#22c55e"
          className="opacity-80 chart-animation"
          style={{
            strokeDasharray: humanPathLength,
            strokeDashoffset: humanPathLength,
          }}
        />
        
        {/* Center circle */}
        <circle cx="60" cy="60" r="25" fill="white" className="drop-shadow-sm" />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">{aiPercentage}%</div>
          <div className="text-xs text-muted-foreground">AI Content</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute -bottom-12 left-0 right-0 flex justify-center space-x-6 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
          <span>AI</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span>Human</span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
