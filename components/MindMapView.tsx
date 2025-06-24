'use client';

import { useState } from 'react';
import { 
  Plus, 
  Zap, 
  Download, 
  Share2, 
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Type,
  Circle,
  Square
} from 'lucide-react';

export function MindMapView() {
  const [selectedTool, setSelectedTool] = useState('move');
  
  const tools = [
    { id: 'move', icon: Move, label: 'Move' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'square', icon: Square, label: 'Rectangle' },
  ];

  const sampleMindMap = {
    nodes: [
      { id: 1, x: 400, y: 200, text: 'Machine Learning', type: 'root', color: 'violet' },
      { id: 2, x: 200, y: 100, text: 'Supervised Learning', type: 'branch', color: 'blue' },
      { id: 3, x: 200, y: 300, text: 'Unsupervised Learning', type: 'branch', color: 'green' },
      { id: 4, x: 600, y: 150, text: 'Deep Learning', type: 'branch', color: 'pink' },
      { id: 5, x: 50, y: 50, text: 'Linear Regression', type: 'leaf', color: 'blue' },
      { id: 6, x: 50, y: 150, text: 'Decision Trees', type: 'leaf', color: 'blue' },
      { id: 7, x: 50, y: 350, text: 'K-Means', type: 'leaf', color: 'green' },
      { id: 8, x: 750, y: 100, text: 'Neural Networks', type: 'leaf', color: 'pink' },
    ],
    connections: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 2, to: 6 },
      { from: 3, to: 7 },
      { from: 4, to: 8 },
    ]
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] gap-6">
      {/* Toolbar */}
      <div className="w-64 space-y-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Mind Maps</h1>
          <p className="text-sm text-gray-400">Visualize your knowledge</p>
        </div>

        {/* AI Generation */}
        <div className="glass rounded-2xl p-4">
          <h3 className="font-semibold mb-3">AI Generation</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter topic..."
              className="w-full px-3 py-2 glass rounded-lg border border-white/10 focus:border-violet-400/50 focus:outline-none transition-colors text-sm"
            />
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg font-medium hover:scale-105 transition-transform text-sm">
              <Zap className="w-4 h-4" />
              Generate Mind Map
            </button>
          </div>
        </div>

        {/* Drawing Tools */}
        <div className="glass rounded-2xl p-4">
          <h3 className="font-semibold mb-3">Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                    selectedTool === tool.id 
                      ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-400/30' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${selectedTool === tool.id ? 'text-violet-400' : 'text-gray-400'}`} />
                  <span className="text-xs">{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="glass rounded-2xl p-4">
          <h3 className="font-semibold mb-3">Controls</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm">
              <ZoomIn className="w-4 h-4" />
              Zoom In
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm">
              <ZoomOut className="w-4 h-4" />
              Zoom Out
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm">
              <RotateCcw className="w-4 h-4" />
              Reset View
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="glass rounded-2xl p-4">
          <h3 className="font-semibold mb-3">Actions</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm">
              <Download className="w-4 h-4" />
              Export PNG
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm">
              <Share2 className="w-4 h-4" />
              Share Link
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="text-xs text-gray-400">Machine Learning Concepts</span>
        </div>

        {/* Mind Map Canvas */}
        <div className="w-full h-full relative bg-gradient-to-br from-gray-900/20 to-gray-800/20 rounded-xl overflow-hidden">
          <svg className="w-full h-full absolute inset-0">
            {/* Connections */}
            {sampleMindMap.connections.map((connection, index) => {
              const fromNode = sampleMindMap.nodes.find(n => n.id === connection.from);
              const toNode = sampleMindMap.nodes.find(n => n.id === connection.to);
              
              return (
                <line
                  key={index}
                  x1={fromNode?.x}
                  y1={fromNode?.y}
                  x2={toNode?.x}
                  y2={toNode?.y}
                  stroke="rgba(159, 122, 234, 0.5)"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {sampleMindMap.nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                node.type === 'root' ? 'z-30' : node.type === 'branch' ? 'z-20' : 'z-10'
              }`}
              style={{ left: node.x, top: node.y }}
            >
              <div className={`
                ${node.type === 'root' ? 'w-32 h-16 text-lg font-bold' : ''}
                ${node.type === 'branch' ? 'w-28 h-12 text-base font-semibold' : ''}
                ${node.type === 'leaf' ? 'w-24 h-10 text-sm font-medium' : ''}
                bg-gradient-to-r from-${node.color}-500/20 to-${node.color}-400/20 
                border border-${node.color}-400/30 
                rounded-xl flex items-center justify-center text-center
                backdrop-blur-sm shadow-lg
                hover:shadow-${node.color}-400/25 hover:border-${node.color}-400/50
              `}>
                <span className="px-2 text-white">{node.text}</span>
              </div>
            </div>
          ))}

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{ 
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        </div>

        {/* Help Text */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-500">
          Click and drag nodes to reorganize • Double-click to edit text
        </div>
      </div>
    </div>
  );
}