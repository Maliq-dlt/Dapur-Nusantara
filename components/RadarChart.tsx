import React from 'react';

interface RadarChartProps {
  flavors: Record<string, number>;
}

export function RadarChart({ flavors }: RadarChartProps) {
  const axes = ['Pedas', 'Asam', 'Gurih', 'Manis', 'Segar'];
  const size = 180;
  const center = size / 2;
  const radius = size * 0.35;

  // Generate Grid Rings
  const rings = [1, 2, 3].map((i) => {
    const r = (radius / 3) * i;
    const points = axes.map((_, index) => {
      const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    }).join(' ');
    return <polygon key={`ring-${i}`} points={points} fill="none" stroke="#C4522A" strokeOpacity="0.15" />;
  });

  // Generate Axis Lines and Labels
  const axisLines = axes.map((axis, index) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const x2 = center + radius * Math.cos(angle);
    const y2 = center + radius * Math.sin(angle);
    
    const labelX = center + (radius + 20) * Math.cos(angle);
    const labelY = center + (radius + 20) * Math.sin(angle);

    return (
      <g key={`axis-${axis}`}>
        <line x1={center} y1={center} x2={x2} y2={y2} stroke="#C4522A" strokeOpacity="0.3" />
        <text 
          x={labelX} 
          y={labelY} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill="#F5F0E8"
          style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
        >
          {axis}
        </text>
      </g>
    );
  });

  // Generate Data Polygon
  const dataPoints = axes.map((axis, index) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const val = (flavors[axis] || 0) / 10;
    const r = radius * val;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      {rings}
      {axisLines}
      <polygon 
        points={dataPoints} 
        fill="rgba(196, 82, 42, 0.35)" 
        stroke="#C4522A" 
        strokeWidth="1.5" 
        className="transition-transform duration-400 ease-out origin-center scale-0 group-hover:scale-100"
      />
    </svg>
  );
}
