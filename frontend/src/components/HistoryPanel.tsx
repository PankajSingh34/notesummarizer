import React from 'react';
import { Clock, Eye, Trash2 } from 'lucide-react';
import { Note } from '../types';

interface HistoryPanelProps {
  history: Note[];
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  darkMode: boolean;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onSelectNote,
  onDeleteNote,
  darkMode
}) => {
  if (history.length === 0) {
    return (
      <div className={`rounded-2xl shadow-lg transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      }`}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className={`h-5 w-5 transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <h2 className={`text-xl font-bold transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              History
            </h2>
          </div>
          <p className={`text-center py-8 transition-colors ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No summaries yet. Start by summarizing your first note!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl shadow-lg transition-all duration-300 ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Clock className={`h-5 w-5 transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <h2 className={`text-xl font-bold transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              History
            </h2>
          </div>
          <span className={`text-sm transition-colors ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {history.length} {history.length === 1 ? 'summary' : 'summaries'}
          </span>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                darkMode 
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium truncate transition-colors ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {note.title}
                  </h3>
                  <p className={`text-sm mt-1 transition-colors ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {new Date(note.timestamp).toLocaleDateString()} • 
                    {' '}{note.wordCount.original} → {note.wordCount.summary} words
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => onSelectNote(note)}
                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      darkMode 
                        ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-200' 
                        : 'hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                      darkMode 
                        ? 'hover:bg-red-900/30 text-gray-400 hover:text-red-400' 
                        : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};