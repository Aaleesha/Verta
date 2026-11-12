import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#18392b]/10 py-1.5 px-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-around">
        {/* 1. Scan Tab */}
        <button
          onClick={() => onChangeTab('scan')}
          className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
            activeTab === 'scan' ? 'text-[#012317]' : 'text-[#727974] hover:text-[#191c19]'
          }`}
        >
          {/* Custom Viewfinder Scanner Icon matching screenshot */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 ${activeTab === 'scan' ? 'stroke-[#012317] stroke-[2.2]' : 'stroke-[#727974] stroke-[1.8]'}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 8V5a1 1 0 0 1 1-1h3" />
              <path d="M16 4h3a1 1 0 0 1 1 1v3" />
              <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
              <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span
            className={`text-[11px] leading-tight font-telemetry ${
              activeTab === 'scan' ? 'font-extrabold text-[#012317]' : 'font-medium text-[#727974]'
            }`}
          >
            Scan
          </span>
        </button>

        {/* 2. Picks Tab */}
        <button
          onClick={() => onChangeTab('picks')}
          className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
            activeTab === 'picks' ? 'text-[#012317]' : 'text-[#727974] hover:text-[#191c19]'
          }`}
        >
          {/* Plant Selector Seedling / Question Icon */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 ${activeTab === 'picks' ? 'stroke-[#012317] stroke-[2.2]' : 'stroke-[#727974] stroke-[1.8]'}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21V11" />
              <path d="M12 11c-2.5-3-5.5-3.5-8-1 0 3.5 3 6.5 8 6.5" />
              <path d="M12 11c2.5-3 5.5-3.5 8-1 0 3.5-3 6.5-8 6.5" />
              <circle cx="12" cy="5" r="2" />
            </svg>
          </div>
          <span
            className={`text-[11px] leading-tight font-telemetry ${
              activeTab === 'picks' ? 'font-extrabold text-[#012317]' : 'font-medium text-[#727974]'
            }`}
          >
            Picks
          </span>
        </button>

        {/* 3. Visualizer Tab */}
        <button
          onClick={() => onChangeTab('visualizer')}
          className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
            activeTab === 'visualizer' ? 'text-[#012317]' : 'text-[#727974] hover:text-[#191c19]'
          }`}
        >
          {/* Architectural Balcony / Pergola / Planter Structure Icon */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 ${activeTab === 'visualizer' ? 'stroke-[#012317] stroke-[2.2]' : 'stroke-[#727974] stroke-[1.8]'}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21h18" />
              <path d="M5 21V7l7-4 7 4v14" />
              <path d="M9 21V10h6v11" />
              <path d="M9 14h6" />
            </svg>
          </div>
          <span
            className={`text-[11px] leading-tight font-telemetry ${
              activeTab === 'visualizer' ? 'font-extrabold text-[#012317]' : 'font-medium text-[#727974]'
            }`}
          >
            Visualizer
          </span>
        </button>

        {/* 4. Care Tab */}
        <button
          onClick={() => onChangeTab('care')}
          className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
            activeTab === 'care' ? 'text-[#012317]' : 'text-[#727974] hover:text-[#191c19]'
          }`}
        >
          {/* Sprouting Pot / Care Icon */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 ${activeTab === 'care' ? 'stroke-[#012317] stroke-[2.2]' : 'stroke-[#727974] stroke-[1.8]'}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 10v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9" />
              <path d="M5 10h14" />
              <path d="M12 10V4" />
              <path d="M8 6c1 0 2.5 1 4 4" />
              <path d="M16 6c-1 0-2.5 1-4 4" />
            </svg>
          </div>
          <span
            className={`text-[11px] leading-tight font-telemetry ${
              activeTab === 'care' ? 'font-extrabold text-[#012317]' : 'font-medium text-[#727974]'
            }`}
          >
            Care
          </span>
        </button>
      </div>
    </nav>
  );
};
