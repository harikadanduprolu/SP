'use client';

import { useState } from 'react';
import { 
  Plus, 
  Upload, 
  FileText, 
  Video, 
  Mic, 
  Search,
  Filter,
  Play,
  Download,
  MoreVertical,
  Calendar,
  Clock,
  Users,
  Star,
  Folder,
  Link,
  Image,
  Brain
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function WorkspaceView() {
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: 'Data Structures & Algorithms',
      description: 'Core CS concepts and problem solving',
      progress: 75,
      resources: 24,
      lastAccessed: '2 hours ago',
      color: 'violet',
      topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs'],
      collaborators: 3,
      starred: true
    },
    {
      id: 2,
      name: 'Machine Learning',
      description: 'ML algorithms and implementation',
      progress: 60,
      resources: 18,
      lastAccessed: '1 day ago',
      color: 'blue',
      topics: ['Linear Regression', 'Neural Networks', 'Deep Learning'],
      collaborators: 1,
      starred: false
    },
    {
      id: 3,
      name: 'System Design',
      description: 'Scalable system architecture',
      progress: 40,
      resources: 12,
      lastAccessed: '2 days ago',
      color: 'pink',
      topics: ['Load Balancing', 'Databases', 'Microservices'],
      collaborators: 0,
      starred: true
    },
    {
      id: 4,
      name: 'Web Development',
      description: 'Frontend and backend technologies',
      progress: 85,
      resources: 31,
      lastAccessed: '5 hours ago',
      color: 'green',
      topics: ['React', 'Node.js', 'Database Design'],
      collaborators: 2,
      starred: false
    }
  ]);

  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: '',
    color: 'violet'
  });

  const resourceTypes = [
    { type: 'pdf', icon: FileText, label: 'Upload PDF', color: 'red', desc: 'Documents, textbooks, papers' },
    { type: 'video', icon: Video, label: 'YouTube Link', color: 'green', desc: 'Lectures, tutorials, demos' },
    { type: 'voice', icon: Mic, label: 'Voice Note', color: 'purple', desc: 'Record audio notes' },
    { type: 'link', icon: Link, label: 'Web Link', color: 'blue', desc: 'Articles, websites, resources' },
    { type: 'image', icon: Image, label: 'Images', color: 'orange', desc: 'Diagrams, screenshots, charts' }
  ];

  const colors = ['violet', 'blue', 'pink', 'green', 'orange', 'red'];

  const filteredWorkspaces = workspaces.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workspace.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workspace.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'starred' && workspace.starred) ||
                         (filterBy === 'recent' && workspace.lastAccessed.includes('hour'));
    
    return matchesSearch && matchesFilter;
  });

  const createWorkspace = () => {
    if (newWorkspace.name.trim()) {
      const workspace = {
        id: workspaces.length + 1,
        ...newWorkspace,
        progress: 0,
        resources: 0,
        lastAccessed: 'Just created',
        topics: [],
        collaborators: 0,
        starred: false
      };
      setWorkspaces([...workspaces, workspace]);
      setNewWorkspace({ name: '', description: '', color: 'violet' });
    }
  };

  const toggleStar = (id: number) => {
    setWorkspaces(workspaces.map(w => 
      w.id === id ? { ...w, starred: !w.starred } : w
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Workspaces</h1>
          <p className="text-gray-400 mt-1">Organize your study materials by subject</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600">
              <Plus className="w-4 h-4" />
              New Workspace
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-white/10">
            <DialogHeader>
              <DialogTitle>Create New Workspace</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Workspace Name</label>
                <Input
                  value={newWorkspace.name}
                  onChange={(e) => setNewWorkspace({...newWorkspace, name: e.target.value})}
                  placeholder="e.g., Machine Learning Fundamentals"
                  className="glass border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input
                  value={newWorkspace.description}
                  onChange={(e) => setNewWorkspace({...newWorkspace, description: e.target.value})}
                  placeholder="Brief description of this workspace"
                  className="glass border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Color Theme</label>
                <div className="flex gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewWorkspace({...newWorkspace, color})}
                      className={`w-8 h-8 rounded-full bg-${color}-500 transition-all ${
                        newWorkspace.color === color ? 'ring-2 ring-white scale-110' : 'hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button onClick={createWorkspace} className="w-full">
                Create Workspace
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search workspaces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass rounded-xl border border-white/10 focus:border-violet-400/50 focus:outline-none transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {['all', 'starred', 'recent'].map(filter => (
            <button
              key={filter}
              onClick={() => setFilterBy(filter)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                filterBy === filter
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-400/30'
                  : 'glass hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <Folder className="w-6 h-6 text-violet-400 mx-auto mb-2" />
          <div className="text-xl font-bold">{workspaces.length}</div>
          <div className="text-sm text-gray-400">Total Workspaces</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <FileText className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold">{workspaces.reduce((sum, w) => sum + w.resources, 0)}</div>
          <div className="text-sm text-gray-400">Total Resources</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-xl font-bold">{workspaces.filter(w => w.starred).length}</div>
          <div className="text-sm text-gray-400">Starred</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-xl font-bold">{workspaces.reduce((sum, w) => sum + w.collaborators, 0)}</div>
          <div className="text-sm text-gray-400">Collaborators</div>
        </div>
      </div>

      {/* Workspaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkspaces.map((workspace) => (
          <div key={workspace.id} className="glass rounded-2xl p-6 card-hover glow-effect cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-${workspace.color}-500/20 to-${workspace.color}-400/20 flex items-center justify-center`}>
                <div className={`w-6 h-6 rounded-full bg-${workspace.color}-400`}></div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleStar(workspace.id)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Star className={`w-4 h-4 ${workspace.starred ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                </button>
                <button className="p-1 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-2">{workspace.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{workspace.description}</p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="font-medium">{workspace.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r from-${workspace.color}-400 to-${workspace.color}-300 h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${workspace.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {workspace.topics.slice(0, 3).map((topic, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    {topic}
                  </span>
                ))}
                {workspace.topics.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    +{workspace.topics.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {workspace.resources}
                </span>
                {workspace.collaborators > 0 && (
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {workspace.collaborators}
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {workspace.lastAccessed}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-lg hover:from-violet-500/30 hover:to-blue-500/30 transition-colors">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Continue</span>
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Upload className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Upload Section */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Quick Upload</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {resourceTypes.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <button key={index} className={`flex flex-col items-center gap-3 p-4 glass rounded-xl border border-white/10 hover:border-${resource.color}-400/50 transition-all card-hover text-center`}>
                <div className={`p-3 rounded-lg bg-${resource.color}-500/20`}>
                  <Icon className={`w-6 h-6 text-${resource.color}-400`} />
                </div>
                <div>
                  <div className="font-medium mb-1">{resource.label}</div>
                  <div className="text-xs text-gray-400">{resource.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Added new PDF', workspace: 'Data Structures', time: '2 hours ago', icon: FileText },
            { action: 'Completed mind map', workspace: 'Machine Learning', time: '1 day ago', icon: Brain },
            { action: 'Uploaded video notes', workspace: 'System Design', time: '2 days ago', icon: Video },
            { action: 'Created new workspace', workspace: 'Web Development', time: '3 days ago', icon: Plus }
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors">
                <div className="p-2 glass rounded-lg">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-sm text-gray-400">in {activity.workspace}</div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}