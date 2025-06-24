'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  Tag,
  Clock,
  Edit3,
  Star,
  Hash,
  Mic,
  Image,
  Link,
  MoreVertical
} from 'lucide-react';

export function NotesView() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Binary Search Trees',
      content: 'A binary search tree (BST) is a data structure where each node has at most two children...',
      tags: ['DSA', 'Trees', 'Important'],
      createdAt: '2 hours ago',
      lastEdited: '1 hour ago',
      starred: true,
      subject: 'Data Structures',
      wordCount: 234
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      content: 'Machine learning is a subset of artificial intelligence that focuses on...',
      tags: ['ML', 'Algorithms', 'Basics'],
      createdAt: '1 day ago',
      lastEdited: '6 hours ago',
      starred: false,
      subject: 'Machine Learning',
      wordCount: 567
    },
    {
      id: 3,
      title: 'System Design Principles',
      content: 'When designing large-scale systems, consider scalability, reliability...',
      tags: ['System Design', 'Scalability'],
      createdAt: '2 days ago',
      lastEdited: '1 day ago',
      starred: true,
      subject: 'System Design',
      wordCount: 423
    }
  ]);

  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const noteTools = [
    { icon: Edit3, label: 'Text', color: 'blue' },
    { icon: Mic, label: 'Voice', color: 'purple' },
    { icon: Image, label: 'Image', color: 'green' },
    { icon: Link, label: 'Link', color: 'orange' }
  ];

  return (
    <div className="flex h-[calc(100vh-3rem)] gap-6">
      {/* Notes List */}
      <div className="w-1/3 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Notes</h1>
            <p className="text-sm text-gray-400">{notes.length} notes total</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg font-medium hover:scale-105 transition-transform text-sm">
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass rounded-xl border border-white/10 focus:border-violet-400/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Notes List */}
        <div className="space-y-3 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-4 glass rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${
                selectedNote?.id === note.id ? 'ring-2 ring-violet-400/50 glow-effect' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold truncate">{note.title}</h3>
                <div className="flex items-center gap-1">
                  {note.starred && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                  <button className="p-1 hover:bg-white/10 rounded">
                    <MoreVertical className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {note.content}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {note.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full">
                    #{tag}
                  </span>
                ))}
                {note.tags.length > 2 && (
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    +{note.tags.length - 2}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{note.wordCount} words</span>
                <span>{note.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 glass rounded-2xl p-6">
        {selectedNote ? (
          <div className="h-full flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex-1">
                <input
                  value={selectedNote.title}
                  className="text-2xl font-bold bg-transparent border-none outline-none w-full"
                  placeholder="Note title..."
                />
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedNote.lastEdited}
                  </span>
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {selectedNote.subject}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Star className={`w-4 h-4 ${selectedNote.starred ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Note Tools */}
            <div className="flex items-center gap-2 mb-4">
              {noteTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 glass rounded-lg border border-white/10 hover:border-${tool.color}-400/50 transition-colors text-sm`}
                  >
                    <Icon className={`w-4 h-4 text-${tool.color}-400`} />
                    {tool.label}
                  </button>
                );
              })}
            </div>

            {/* Editor */}
            <div className="flex-1 glass rounded-xl p-4 border border-white/10">
              <textarea
                value={selectedNote.content}
                className="w-full h-full bg-transparent resize-none outline-none text-gray-300 leading-relaxed"
                placeholder="Start writing your notes..."
              />
            </div>

            {/* Tags */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-400" />
                {selectedNote.tags.map((tag, index) => (
                  <span key={index} className="text-sm px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full">
                    #{tag}
                  </span>
                ))}
                <button className="text-sm px-3 py-1 border border-dashed border-white/30 rounded-full hover:border-white/50 transition-colors">
                  + Add tag
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Edit3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a note to edit</h3>
              <p className="text-gray-500">Choose a note from the sidebar or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}