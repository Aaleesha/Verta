import React, { useState } from 'react';
import {
  X,
  User,
  LogOut,
  LogIn,
  Settings,
  Bell,
  Thermometer,
  ShieldCheck,
  Cpu,
  Sparkles,
  Check,
  ChevronRight,
  Sliders,
  Sprout,
  Compass,
  KeyRound,
  Mail,
  Camera
} from 'lucide-react';
import { UserProfile, SystemSettings } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  settings: SystemSettings;
  onUpdateUser: (user: Partial<UserProfile>) => void;
  onUpdateSettings: (settings: Partial<SystemSettings>) => void;
  onLogin: (email: string, name: string) => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  settings,
  onUpdateUser,
  onUpdateSettings,
  onLogin,
  onLogout
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editHandle, setEditHandle] = useState(user.handle);

  // Login form state (when logged out)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    onUpdateUser({
      name: editName.trim(),
      email: editEmail.trim() || user.email,
      handle: editHandle.trim() ? (editHandle.startsWith('@') ? editHandle.trim() : `@${editHandle.trim()}`) : user.handle
    });
    setIsEditing(false);
  };

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setLoginError('Please enter a valid email address');
      return;
    }
    const nameToUse = loginName.trim() || loginEmail.split('@')[0];
    onLogin(loginEmail.trim(), nameToUse);
    setLoginError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#f8faf4] w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-[#18392b]/15 animate-in slide-in-from-bottom duration-250 flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-[#18392b]/10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#012317] flex items-center justify-center text-[#aeeecb] shadow-xs">
              {activeSubTab === 'profile' ? <User className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#2c694e] font-bold">
                VERTA GROWER ACCOUNT
              </span>
              <h3 className="text-lg font-extrabold text-[#012317] leading-tight">
                {activeSubTab === 'profile' ? (user.isLoggedIn ? 'Grower Profile' : 'Sign In to VERTA') : 'System Settings'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#edefe9] hover:bg-[#e1e3dd] flex items-center justify-center text-[#191c19] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switchers: Profile / Settings */}
        <div className="px-5 pt-3 bg-white border-b border-[#18392b]/5 flex gap-2">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`pb-2.5 px-3 text-xs font-telemetry font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'profile'
                ? 'border-[#012317] text-[#012317]'
                : 'border-transparent text-[#727974] hover:text-[#191c19]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Session</span>
          </button>
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`pb-2.5 px-3 text-xs font-telemetry font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'settings'
                ? 'border-[#012317] text-[#012317]'
                : 'border-transparent text-[#727974] hover:text-[#191c19]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Telemetry &amp; LiDAR Settings</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 space-y-4 flex-1">
          {activeSubTab === 'profile' ? (
            user.isLoggedIn ? (
              // LOGGED IN VIEW
              <div className="space-y-4">
                {/* User Card */}
                <div className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#2c694e]/30 shadow-xs"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2c694e] text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                          <Sparkles className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-extrabold text-[#191c19] tracking-tight leading-snug">
                            {user.name}
                          </h4>
                          <span className="text-[10px] font-telemetry font-bold px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#002115]">
                            {user.level}
                          </span>
                        </div>
                        <div className="text-xs text-[#727974] font-medium font-telemetry">
                          {user.handle} • {user.email}
                        </div>
                        <div className="text-[11px] text-[#2c694e] font-telemetry mt-1 flex items-center gap-1">
                          <Compass className="w-3 h-3" />
                          <span>{user.balconyType}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setEditName(user.name);
                        setEditEmail(user.email);
                        setEditHandle(user.handle);
                        setIsEditing(!isEditing);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#f2f4ee] hover:bg-[#e7e9e3] text-[#191c19] transition-colors"
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {/* Edit Form */}
                  {isEditing && (
                    <form onSubmit={handleSaveProfile} className="mt-4 pt-4 border-t border-[#18392b]/10 space-y-3">
                      <div>
                        <label className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-bold block mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-[#f2f4ee] rounded-xl px-3 py-2 text-xs text-[#191c19] border border-transparent focus:border-[#2c694e] focus:bg-white outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-bold block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="w-full bg-[#f2f4ee] rounded-xl px-3 py-2 text-xs text-[#191c19] border border-transparent focus:border-[#2c694e] focus:bg-white outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-bold block mb-1">
                          Handle
                        </label>
                        <input
                          type="text"
                          value={editHandle}
                          onChange={(e) => setEditHandle(e.target.value)}
                          className="w-full bg-[#f2f4ee] rounded-xl px-3 py-2 text-xs text-[#191c19] border border-transparent focus:border-[#2c694e] focus:bg-white outline-none"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#012317] hover:bg-[#18392b] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Lifetime Grower Metrics */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 text-center">
                    <Sprout className="w-4 h-4 text-[#2c694e] mx-auto mb-1" />
                    <div className="text-lg font-extrabold text-[#012317]">
                      {user.speciesActive}
                    </div>
                    <div className="text-[10px] text-[#727974] font-telemetry">
                      Active Cultivars
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 text-center">
                    <ShieldCheck className="w-4 h-4 text-[#d97757] mx-auto mb-1" />
                    <div className="text-lg font-extrabold text-[#012317]">
                      {user.totalHarvestKg} kg
                    </div>
                    <div className="text-[10px] text-[#727974] font-telemetry">
                      Harvested to Date
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-[#18392b]/10 text-center">
                    <Cpu className="w-4 h-4 text-[#2c694e] mx-auto mb-1" />
                    <div className="text-lg font-extrabold text-[#012317]">
                      Grade A
                    </div>
                    <div className="text-[10px] text-[#727974] font-telemetry">
                      Balcony Rating
                    </div>
                  </div>
                </div>

                {/* Account details card */}
                <div className="bg-white rounded-3xl p-4 border border-[#18392b]/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-[#18392b]/5">
                    <span className="text-[#727974]">Membership Status</span>
                    <span className="font-bold text-[#012317] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#52b788]" />
                      VERTA Pro Biome Tier
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-[#18392b]/5">
                    <span className="text-[#727974]">Account Created</span>
                    <span className="font-telemetry font-medium text-[#191c19]">{user.joinedDate}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-[#727974]">LiDAR Hardware Sync</span>
                    <span className="font-telemetry text-[#2c694e] font-semibold">Apple LiDAR / WebXR Ready</span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="w-full py-3 px-4 rounded-2xl bg-[#ffdad6] hover:bg-[#ffb59e]/60 text-[#93000a] text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of VERTA</span>
                </button>
              </div>
            ) : (
              // LOGGED OUT / LOGIN FORM VIEW
              <div className="space-y-4">
                <div className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#aeeecb]/40 text-[#0e5138] flex items-center justify-center mx-auto mb-2">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-extrabold text-[#191c19] tracking-tight">
                    Welcome Back, Urban Grower
                  </h4>
                  <p className="text-xs text-[#414844] max-w-sm mx-auto leading-relaxed">
                    Sign in to sync your balcony LiDAR meshes, microclimate sensor telemetry, and crop rotation schedules across all devices.
                  </p>
                </div>

                <form onSubmit={handleLoginFormSubmit} className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs space-y-3.5">
                  {loginError && (
                    <div className="p-3 bg-[#ffdad6] text-[#93000a] text-xs font-semibold rounded-xl">
                      {loginError}
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-bold block mb-1">
                      Grower Name
                    </label>
                    <input
                      type="text"
                      value={loginName}
                      onChange={(e) => setLoginName(e.target.value)}
                      placeholder="e.g. Aaleesha Sawhney"
                      className="w-full bg-[#f2f4ee] rounded-xl px-3.5 py-2.5 text-xs text-[#191c19] border border-transparent focus:border-[#2c694e] focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-telemetry uppercase tracking-wider text-[#727974] font-bold block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. aaleeshasawhney@gmail.com"
                      className="w-full bg-[#f2f4ee] rounded-xl px-3.5 py-2.5 text-xs text-[#191c19] border border-transparent focus:border-[#2c694e] focus:bg-white outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-2xl bg-[#012317] hover:bg-[#18392b] text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-[0.99]"
                  >
                    <LogIn className="w-4 h-4 text-[#aeeecb]" />
                    <span>Sign In to Balcony Profile</span>
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => onLogin('demo.grower@verta.bio', 'Aaleesha Sawhney')}
                      className="text-xs text-[#2c694e] font-semibold hover:underline"
                    >
                      Quick Demo Login as Aaleesha Sawhney
                    </button>
                  </div>
                </form>
              </div>
            )
          ) : (
            // SYSTEM SETTINGS VIEW
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-[#18392b]/10 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-telemetry uppercase tracking-wider text-[#2c694e] font-bold">
                    INSTRUMENTATION PREFERENCES
                  </span>
                </div>

                {/* Temperature Unit */}
                <div className="flex items-center justify-between py-2 border-b border-[#18392b]/5">
                  <div>
                    <div className="text-xs font-bold text-[#191c19]">Temperature Units</div>
                    <div className="text-[11px] text-[#727974]">Thermal heatmap and sensor readout display</div>
                  </div>
                  <div className="flex gap-1 bg-[#f2f4ee] p-1 rounded-xl">
                    <button
                      onClick={() => onUpdateSettings({ tempUnit: 'celsius' })}
                      className={`px-3 py-1 rounded-lg text-xs font-telemetry font-bold transition-all ${
                        settings.tempUnit === 'celsius' ? 'bg-[#012317] text-white shadow-xs' : 'text-[#727974]'
                      }`}
                    >
                      °C
                    </button>
                    <button
                      onClick={() => onUpdateSettings({ tempUnit: 'fahrenheit' })}
                      className={`px-3 py-1 rounded-lg text-xs font-telemetry font-bold transition-all ${
                        settings.tempUnit === 'fahrenheit' ? 'bg-[#012317] text-white shadow-xs' : 'text-[#727974]'
                      }`}
                    >
                      °F
                    </button>
                  </div>
                </div>

                {/* LiDAR Sensitivity */}
                <div className="py-2 border-b border-[#18392b]/5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-xs font-bold text-[#191c19]">LiDAR Mesh Point Density</div>
                    <span className="text-[11px] font-telemetry font-bold text-[#2c694e] capitalize">
                      {settings.lidarSensitivity}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['high', 'balanced', 'power-saver'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => onUpdateSettings({ lidarSensitivity: mode })}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-telemetry font-bold capitalize transition-all ${
                          settings.lidarSensitivity === mode
                            ? 'bg-[#012317] text-white shadow-xs'
                            : 'bg-[#f2f4ee] text-[#414844] hover:bg-[#e7e9e3]'
                        }`}
                      >
                        {mode.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mesh Resolution */}
                <div className="py-2 border-b border-[#18392b]/5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-xs font-bold text-[#191c19]">Spatial Resolution Bounds</div>
                    <span className="text-[11px] font-telemetry font-bold text-[#2c694e] capitalize">
                      {settings.meshResolution}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['ultra', 'standard', 'coarse'] as const).map((res) => (
                      <button
                        key={res}
                        onClick={() => onUpdateSettings({ meshResolution: res })}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-telemetry font-bold capitalize transition-all ${
                          settings.meshResolution === res
                            ? 'bg-[#012317] text-white shadow-xs'
                            : 'bg-[#f2f4ee] text-[#414844] hover:bg-[#e7e9e3]'
                        }`}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-Watering Alerts Toggle */}
                <div className="flex items-center justify-between py-2 border-b border-[#18392b]/5">
                  <div>
                    <div className="text-xs font-bold text-[#191c19]">Substrate Moisture Alerts</div>
                    <div className="text-[11px] text-[#727974]">Push notification when soil moisture drops below 45%</div>
                  </div>
                  <button
                    onClick={() => onUpdateSettings({ autoWateringAlerts: !settings.autoWateringAlerts })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      settings.autoWateringAlerts ? 'bg-[#2c694e]' : 'bg-[#d8dbd5]'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                        settings.autoWateringAlerts ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Solar Tracking Notifications */}
                <div className="flex items-center justify-between py-2 border-b border-[#18392b]/5">
                  <div>
                    <div className="text-xs font-bold text-[#191c19]">Solar Noon Peak Warning</div>
                    <div className="text-[11px] text-[#727974]">Alert for high UV index and extreme thermal retention</div>
                  </div>
                  <button
                    onClick={() => onUpdateSettings({ solarTrackingNotifications: !settings.solarTrackingNotifications })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      settings.solarTrackingNotifications ? 'bg-[#2c694e]' : 'bg-[#d8dbd5]'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                        settings.solarTrackingNotifications ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Haptic Feedback */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-xs font-bold text-[#191c19]">Haptic Reticle Locking</div>
                    <div className="text-[11px] text-[#727974]">Vibrate upon successful LiDAR plane lock</div>
                  </div>
                  <button
                    onClick={() => onUpdateSettings({ hapticFeedback: !settings.hapticFeedback })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      settings.hapticFeedback ? 'bg-[#2c694e]' : 'bg-[#d8dbd5]'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                        settings.hapticFeedback ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Version & Build */}
              <div className="text-center text-[10px] text-[#727974] font-telemetry py-2">
                VERTA Bio-Spatial Engine v2.4.0 • Build 8820 • Spatial Engine Active
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
