/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { ARViewfinder } from './components/ARViewfinder';
import { AssessmentCard } from './components/AssessmentCard';
import { BottomNav } from './components/BottomNav';
import { PicksView } from './components/PicksView';
import { VisualizerView } from './components/VisualizerView';
import { CareView } from './components/CareView';
import { ZoneDetailModal } from './components/ZoneDetailModal';
import { PlanModal } from './components/PlanModal';
import { ProfileModal } from './components/ProfileModal';
import { INITIAL_ZONES, INITIAL_SENSOR_DATA, BALCONY_SCENARIOS } from './data/mockData';
import { TabType, SpatialZone, SensorData, UserProfile, SystemSettings } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('scan');
  const [scenarioId, setScenarioId] = useState<string>('south-balcony');
  const [isLiveAR, setIsLiveAR] = useState<boolean>(true);
  const [zones, setZones] = useState<SpatialZone[]>(INITIAL_ZONES);
  const [sensors, setSensors] = useState<SensorData>(INITIAL_SENSOR_DATA);
  const [selectedZone, setSelectedZone] = useState<SpatialZone | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isRescanning, setIsRescanning] = useState<boolean>(false);
  const [rescanToast, setRescanToast] = useState<string | null>(null);

  // User Profile & Authentication State
  const [user, setUser] = useState<UserProfile>({
    name: 'Aaleesha Sawhney',
    email: 'aaleeshasawhney@gmail.com',
    handle: '@aaleesha.grow',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    level: 'Bio-Architect Tier',
    joinedDate: 'Joined March 2026',
    balconyType: 'South Balcony (12th Fl)',
    isLoggedIn: true,
    totalHarvestKg: 28.4,
    speciesActive: 5
  });

  // Instrumentation & Telemetry Settings State
  const [settings, setSettings] = useState<SystemSettings>({
    tempUnit: 'celsius',
    lidarSensitivity: 'high',
    autoWateringAlerts: true,
    solarTrackingNotifications: true,
    hapticFeedback: true,
    meshResolution: 'ultra'
  });

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    setRescanToast('Profile updated successfully');
    setTimeout(() => setRescanToast(null), 2500);
  };

  const handleUpdateSettings = (updated: Partial<SystemSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
    setRescanToast('System telemetry preferences saved');
    setTimeout(() => setRescanToast(null), 2000);
  };

  const handleLogin = (email: string, name: string) => {
    setUser((prev) => ({
      ...prev,
      email,
      name,
      handle: `@${email.split('@')[0]}`,
      isLoggedIn: true
    }));
    setRescanToast(`Welcome back, ${name}! Balcony synced.`);
    setTimeout(() => setRescanToast(null), 3000);
  };

  const handleLogout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false
    }));
    setRescanToast('Logged out of VERTA session.');
    setTimeout(() => setRescanToast(null), 2500);
  };

  // Handle switching balcony presets
  const handleSelectScenario = (id: string) => {
    setScenarioId(id);
    if (id === 'east-terrace') {
      setSensors((prev) => ({
        ...prev,
        solarYieldHours: 4.9,
        solarYieldPeak: '08:30 - 12:00',
        ambientTempC: 21.4,
        aeroProfile: 'Low Wind',
        aeroSub: 'Courtyard Protected'
      }));
    } else if (id === 'sunset-penthouse') {
      setSensors((prev) => ({
        ...prev,
        solarYieldHours: 6.4,
        solarYieldPeak: '13:00 - 17:30',
        ambientTempC: 27.8,
        aeroProfile: 'High Shear',
        aeroSub: '22nd Fl Exposed'
      }));
    } else {
      setSensors(INITIAL_SENSOR_DATA);
    }
  };

  // Rescan simulation: triggers quick recalibration animation
  const handleRescan = () => {
    setIsRescanning(true);
    setRescanToast('Re-triangulating LiDAR point cloud...');
    setTimeout(() => {
      setRescanToast('Recalculating solar incidence angle & microclimates...');
    }, 800);
    setTimeout(() => {
      setIsRescanning(false);
      setRescanToast('LiDAR Mesh Synced: Grade A Microclimate Verified');
      setTimeout(() => setRescanToast(null), 2500);
    }, 1600);
  };

  // Add crop to a zone
  const handleAddCropToZone = (zoneId: string, cropName: string) => {
    setZones((prev) =>
      prev.map((z) => {
        if (z.id === zoneId) {
          const current = z.currentPlanted || [];
          if (!current.includes(cropName)) {
            return { ...z, currentPlanted: [...current, cropName] };
          }
        }
        return z;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#f8faf4] text-[#191c19] flex flex-col antialiased selection:bg-[#2c694e]/20 selection:text-[#012317]">
      {/* Toast Notification */}
      {rescanToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#012317] text-[#aeeecb] text-xs font-telemetry font-bold px-4 py-2 rounded-full shadow-2xl border border-white/20 animate-in fade-in slide-in-from-top-2">
          {rescanToast}
        </div>
      )}

      {/* Main Container constrained to mobile/tablet column width matching screenshot */}
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col bg-[#f8faf4] relative shadow-2xl min-h-screen">
        {/* Sticky Header with profile click connection */}
        <Header
          currentScenarioId={scenarioId}
          onSelectScenario={handleSelectScenario}
          isLiveAR={isLiveAR}
          onToggleLiveAR={() => setIsLiveAR(!isLiveAR)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          userAvatarUrl={user.avatarUrl}
          isLoggedIn={user.isLoggedIn}
        />

        {/* Tab Views */}
        <main className="flex-1 flex flex-col">
          {activeTab === 'scan' && (
            <div className="flex-1 flex flex-col pb-24 animate-in fade-in duration-200">
              {/* AR Viewfinder (Top half of the screen from screenshot) */}
              <ARViewfinder
                zones={zones}
                sensors={sensors}
                scenarioId={scenarioId}
                onSelectZone={(zone) => setSelectedZone(zone)}
                onOpenPlan={() => setIsPlanModalOpen(true)}
                onRescan={handleRescan}
              />

              {/* Bio-Algorithmic Assessment Card (Bottom half of the screen from screenshot) */}
              <AssessmentCard
                zones={zones}
                onSelectZone={(zone) => setSelectedZone(zone)}
                onRescan={handleRescan}
                onAnalyzePlan={() => setIsPlanModalOpen(true)}
                isRescanning={isRescanning}
              />
            </div>
          )}

          {activeTab === 'picks' && (
            <div className="flex-1 animate-in fade-in duration-200">
              <PicksView
                zones={zones}
                onAddCropToZone={handleAddCropToZone}
              />
            </div>
          )}

          {activeTab === 'visualizer' && (
            <div className="flex-1 animate-in fade-in duration-200">
              <VisualizerView
                zones={zones}
                onSelectZone={(zone) => setSelectedZone(zone)}
                onOpenPlan={() => setIsPlanModalOpen(true)}
              />
            </div>
          )}

          {activeTab === 'care' && (
            <div className="flex-1 animate-in fade-in duration-200">
              <CareView sensors={sensors} zones={zones} />
            </div>
          )}
        </main>

        {/* Bottom Navigation matching screenshot */}
        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>

      {/* Zone Detail Modal */}
      <ZoneDetailModal
        zone={selectedZone}
        onClose={() => setSelectedZone(null)}
        onAddCropToZone={handleAddCropToZone}
      />

      {/* Bio-Algorithmic Master Plan Modal */}
      <PlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        zones={zones}
      />

      {/* Profile & Settings & Login/Logout Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        settings={settings}
        onUpdateUser={handleUpdateUser}
        onUpdateSettings={handleUpdateSettings}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}
