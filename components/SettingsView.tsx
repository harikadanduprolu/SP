'use client';

import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download,
  Trash2,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export function SettingsView() {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: {
      studyReminders: true,
      achievementAlerts: true,
      dailyGoals: true,
      emailUpdates: false,
      pushNotifications: true,
      soundEnabled: true
    },
    privacy: {
      profileVisible: true,
      studyStatsPublic: false,
      allowFriendRequests: true
    },
    appearance: {
      theme: 'dark',
      accentColor: 'violet',
      compactMode: false,
      animations: true
    },
    study: {
      defaultSessionLength: 25,
      breakLength: 5,
      autoStartBreaks: true,
      focusMode: false
    }
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'study', label: 'Study Settings', icon: Globe },
    { id: 'data', label: 'Data & Storage', icon: Download }
  ];

  const accentColors = [
    { name: 'violet', color: 'bg-violet-500' },
    { name: 'blue', color: 'bg-blue-500' },
    { name: 'pink', color: 'bg-pink-500' },
    { name: 'green', color: 'bg-green-500' },
    { name: 'orange', color: 'bg-orange-500' }
  ];

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-400 to-blue-400 flex items-center justify-center text-2xl font-bold">
          S
        </div>
        <div>
          <h3 className="text-xl font-bold">Studier</h3>
          <p className="text-gray-400">Level 7 • 2,340 XP</p>
          <button className="text-sm text-violet-400 hover:text-violet-300 mt-1">
            Change Avatar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Display Name</label>
          <input
            type="text"
            defaultValue="Studier"
            className="w-full px-3 py-2 glass rounded-lg border border-white/10 focus:border-violet-400/50 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            defaultValue="studier@example.com"
            className="w-full px-3 py-2 glass rounded-lg border border-white/10 focus:border-violet-400/50 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          placeholder="Tell us about yourself..."
          rows={3}
          className="w-full px-3 py-2 glass rounded-lg border border-white/10 focus:border-violet-400/50 focus:outline-none transition-colors resize-none"
        />
      </div>

      <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg font-medium hover:scale-105 transition-transform">
        Save Changes
      </button>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Study Notifications</h3>
        
        {[
          { key: 'studyReminders', label: 'Study Reminders', desc: 'Get reminded to start your study sessions' },
          { key: 'dailyGoals', label: 'Daily Goal Updates', desc: 'Track progress towards daily study goals' },
          { key: 'achievementAlerts', label: 'Achievement Alerts', desc: 'Celebrate when you unlock new achievements' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 glass rounded-lg">
            <div>
              <div className="font-medium">{item.label}</div>
              <div className="text-sm text-gray-400">{item.desc}</div>
            </div>
            <button
              onClick={() => updateSetting('notifications', item.key, !settings.notifications[item.key as keyof typeof settings.notifications])}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications[item.key as keyof typeof settings.notifications] 
                  ? 'bg-violet-500' 
                  : 'bg-gray-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.notifications[item.key as keyof typeof settings.notifications] 
                  ? 'translate-x-6' 
                  : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Communication</h3>
        
        <div className="flex items-center justify-between p-4 glass rounded-lg">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-400" />
            <div>
              <div className="font-medium">Email Updates</div>
              <div className="text-sm text-gray-400">Weekly progress reports and tips</div>
            </div>
          </div>
          <button
            onClick={() => updateSetting('notifications', 'emailUpdates', !settings.notifications.emailUpdates)}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.notifications.emailUpdates ? 'bg-violet-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              settings.notifications.emailUpdates ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 glass rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-green-400" />
            <div>
              <div className="font-medium">Push Notifications</div>
              <div className="text-sm text-gray-400">Mobile app notifications</div>
            </div>
          </div>
          <button
            onClick={() => updateSetting('notifications', 'pushNotifications', !settings.notifications.pushNotifications)}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.notifications.pushNotifications ? 'bg-violet-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              settings.notifications.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 glass rounded-lg">
          <div className="flex items-center gap-3">
            {settings.notifications.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-purple-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
            <div>
              <div className="font-medium">Sound Effects</div>
              <div className="text-sm text-gray-400">Play sounds for notifications</div>
            </div>
          </div>
          <button
            onClick={() => updateSetting('notifications', 'soundEnabled', !settings.notifications.soundEnabled)}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.notifications.soundEnabled ? 'bg-violet-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              settings.notifications.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Theme</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => updateSetting('appearance', 'theme', 'dark')}
            className={`p-4 rounded-lg border-2 transition-all ${
              settings.appearance.theme === 'dark'
                ? 'border-violet-400 bg-violet-500/10'
                : 'border-white/10 glass'
            }`}
          >
            <Moon className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Dark</div>
          </button>
          <button
            onClick={() => updateSetting('appearance', 'theme', 'light')}
            className={`p-4 rounded-lg border-2 transition-all ${
              settings.appearance.theme === 'light'
                ? 'border-violet-400 bg-violet-500/10'
                : 'border-white/10 glass'
            }`}
          >
            <Sun className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">Light</div>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Accent Color</h3>
        <div className="flex gap-3">
          {accentColors.map((color) => (
            <button
              key={color.name}
              onClick={() => updateSetting('appearance', 'accentColor', color.name)}
              className={`w-10 h-10 rounded-full ${color.color} transition-all ${
                settings.appearance.accentColor === color.name
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110'
                  : 'hover:scale-105'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 glass rounded-lg">
          <div>
            <div className="font-medium">Compact Mode</div>
            <div className="text-sm text-gray-400">Reduce spacing and padding</div>
          </div>
          <button
            onClick={() => updateSetting('appearance', 'compactMode', !settings.appearance.compactMode)}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.appearance.compactMode ? 'bg-violet-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              settings.appearance.compactMode ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 glass rounded-lg">
          <div>
            <div className="font-medium">Animations</div>
            <div className="text-sm text-gray-400">Enable smooth transitions and effects</div>
          </div>
          <button
            onClick={() => updateSetting('appearance', 'animations', !settings.appearance.animations)}
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.appearance.animations ? 'bg-violet-500' : 'bg-gray-600'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
              settings.appearance.animations ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDataSection = () => (
    <div className="space-y-6">
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Storage Usage</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Notes & Documents</span>
            <span className="text-gray-400">2.3 GB</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Mind Maps</span>
            <span className="text-gray-400">456 MB</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Voice Recordings</span>
            <span className="text-gray-400">1.1 GB</span>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between items-center font-semibold">
            <span>Total Used</span>
            <span>3.9 GB</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center gap-3 p-4 glass rounded-lg hover:bg-white/10 transition-colors">
          <Download className="w-5 h-5 text-blue-400" />
          <div className="text-left">
            <div className="font-medium">Export All Data</div>
            <div className="text-sm text-gray-400">Download your complete study data</div>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 p-4 glass rounded-lg hover:bg-white/10 transition-colors">
          <Trash2 className="w-5 h-5 text-red-400" />
          <div className="text-left">
            <div className="font-medium">Clear Cache</div>
            <div className="text-sm text-gray-400">Free up space by clearing temporary files</div>
          </div>
        </button>

        <button className="w-full flex items-center gap-3 p-4 glass rounded-lg hover:bg-red-500/10 transition-colors border border-red-500/20">
          <Trash2 className="w-5 h-5 text-red-400" />
          <div className="text-left">
            <div className="font-medium text-red-400">Delete Account</div>
            <div className="text-sm text-gray-400">Permanently delete your account and all data</div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'appearance':
        return renderAppearanceSection();
      case 'data':
        return renderDataSection();
      default:
        return <div>Section not implemented yet</div>;
    }
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] gap-6">
      {/* Settings Navigation */}
      <div className="w-64 space-y-2">
        <div className="mb-6">
          <h1 className="text-2xl font-bold gradient-text">Settings</h1>
          <p className="text-sm text-gray-400">Customize your experience</p>
        </div>

        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-400/30'
                  : 'hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                activeSection === section.id ? 'text-violet-400' : 'text-gray-400'
              }`} />
              <span className={`font-medium ${
                activeSection === section.id ? 'text-white' : 'text-gray-300'
              }`}>
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="flex-1 glass rounded-2xl p-6 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
}