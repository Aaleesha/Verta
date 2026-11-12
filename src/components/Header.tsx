import React from 'react';
import { Sparkles, Sun, ChevronDown, Check } from 'lucide-react';
import { BALCONY_SCENARIOS } from '../data/mockData';

interface HeaderProps {
  currentScenarioId: string;
  onSelectScenario: (id: string) => void;
  isLiveAR: boolean;
  onToggleLiveAR: () => void;
  onOpenProfile: () => void;
  userAvatarUrl?: string;
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScenarioId,
  onSelectScenario,
  isLiveAR,
  onToggleLiveAR,
  onOpenProfile,
  userAvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80",
  isLoggedIn = true,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const currentScenario = BALCONY_SCENARIOS.find((s) => s.id === currentScenarioId) || BALCONY_SCENARIOS[0];

  return (
    <header className="sticky top-0 z-40 bg-[#f8faf4]/90 backdrop-blur-md px-4 py-3 border-b border-[#18392b]/5 flex items-center justify-between">
      {/* Brand & Location */}
      <div className="flex items-center gap-3">
        {/* Geometric Verta Logo Emblem */}
        <div className="w-8 h-8 rounded-full border border-[#18392b]/30 flex items-center justify-center bg-white shadow-xs">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-[#18392b]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Minimal botanical geometric sprout */}
            <path d="M12 22V8" />
            <path d="M12 14C8 14 5 11 5 7c3 0 6 3 7 7z" />
            <path d="M12 10C16 10 19 7 19 3c-3 0-6 3-7 7z" />
            <circle cx="12" cy="5" r="1.5" fill="currentColor" />
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-[#012317] text-lg">
              VERTA
            </span>
            <span className="text-[#727974] text-xs font-bold">•</span>
            <span className="font-bold text-[#012317] text-lg">Scan</span>
          </div>

          {/* Subtitle with Location Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-xs text-[#414844] hover:text-[#012317] transition-colors focus:outline-none"
            >
              <Sun className="w-3.5 h-3.5 text-[#d97757]" />
              <span className="font-medium">{currentScenario.name.split(' (')[0]}</span>
              <span className="text-[#727974]">•</span>
              <span className="font-telemetry font-medium">{currentScenario.temp}</span>
              <ChevronDown className="w-3 h-3 text-[#727974] ml-0.5" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#18392b]/10 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-semibold">
                  Switch Balcony Geometry
                </div>
                {BALCONY_SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      onSelectScenario(sc.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#f2f4ee] transition-colors ${
                      sc.id === currentScenarioId ? 'bg-[#f2f4ee] font-semibold text-[#012317]' : 'text-[#414844]'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-[#191c19]">{sc.name}</div>
                      <div className="text-[11px] text-[#727974] font-telemetry">{sc.orientation} • {sc.temp}</div>
                    </div>
                    {sc.id === currentScenarioId && <Check className="w-3.5 h-3.5 text-[#2c694e]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Live AR Badge & Avatar */}
      <div className="flex items-center gap-2.5">
        {/* Live AR Button Toggle */}
        <button
          onClick={onToggleLiveAR}
          title="Toggle AR Live Feed"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            isLiveAR
              ? 'bg-[#aeeecb]/50 text-[#0e5138] border border-[#2c694e]/20 shadow-xs'
              : 'bg-[#edefe9] text-[#727974] hover:bg-[#e1e3dd]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isLiveAR ? 'bg-[#2c694e] animate-ping opacity-80' : 'bg-[#727974]'
            }`}
          />
          <span className="relative flex h-2 w-2">
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isLiveAR ? 'bg-[#2c694e]' : 'bg-[#727974]'
              }`}
            />
          </span>
          <span className="font-telemetry">Live AR</span>
        </button>

        {/* User Profile Avatar - Click opens Profile / Settings / Login / Logout */}
        <button
          onClick={onOpenProfile}
          type="button"
          aria-label="Open Profile and Settings"
          title={isLoggedIn ? "Grower Profile & Settings" : "Sign In"}
          className="relative group cursor-pointer rounded-full p-0 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2c694e]"
        >
          {isLoggedIn ? (
            <img
              src={userAvatarUrl}
              alt="Grower Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#2c694e]/30 shadow-xs group-hover:ring-[#2c694e] transition-all"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#edefe9] flex items-center justify-center text-[#414844] ring-2 ring-[#727974]/30 shadow-xs group-hover:ring-[#012317] transition-all">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-currentColor stroke-[1.8]" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          )}
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center border-2 border-white ${
            isLoggedIn ? 'bg-[#2c694e]' : 'bg-[#727974]'
          }`}>
            <Sparkles className="w-1.5 h-1.5 text-white" />
          </div>
        </button>
      </div>
    </header>
  );
};
