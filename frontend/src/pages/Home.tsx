import React from 'react';
import { InputSection } from '../components/InputSection';
import { OutputSection } from '../components/OutputSection';
import { HistoryPanel } from '../components/HistoryPanel';
import { Note } from '../types';
import { summarizeText, countWords, generateTitle } from '../utils/api';

interface HomeProps {
  state: {
    currentNote: string;
    currentSummary: string;
    isLoading: boolean;
    history: Note[];
    darkMode: boolean;
  };
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export const Home: React.FC<HomeProps> = ({ state, setState }) => {
  const handleSummarize = async () => {
    if (!state.currentNote.trim()) return;

    setState((prev: any) => ({ ...prev, isLoading: true }));

    try {
      const summary = await summarizeText(state.currentNote);
      const originalWordCount = countWords(state.currentNote);
      const summaryWordCount = countWords(summary);
      
      const newNote: Note = {
        id: Date.now().toString(),
        title: generateTitle(state.currentNote),
        originalText: state.currentNote,
        summary,
        wordCount: {
          original: originalWordCount,
          summary: summaryWordCount
        },
        timestamp: new Date()
      };

      setState((prev: any) => ({
        ...prev,
        currentSummary: summary,
        history: [newNote, ...prev.history],
        isLoading: false
      }));
    } catch (error) {
      console.error('Failed to summarize text:', error);
      setState((prev: any) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSelectNote = (note: Note) => {
    setState((prev: any) => ({
      ...prev,
      currentNote: note.originalText,
      currentSummary: note.summary
    }));
  };

  const handleDeleteNote = (id: string) => {
    setState((prev: any) => ({
      ...prev,
      history: prev.history.filter((note: Note) => note.id !== id)
    }));
  };

  const currentWordCount = countWords(state.currentNote);
  const summaryWordCount = countWords(state.currentSummary);

  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors ${
          state.darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Transform Your Notes with AI
        </h1>
        <p className={`text-xl md:text-2xl transition-colors ${
          state.darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Get intelligent summaries that capture the essence of your content
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-8">
          <InputSection
            currentNote={state.currentNote}
            setCurrentNote={(note) => setState((prev: any) => ({ ...prev, currentNote: note }))}
            onSummarize={handleSummarize}
            isLoading={state.isLoading}
            darkMode={state.darkMode}
            wordCount={currentWordCount}
          />
          
          <OutputSection
            summary={state.currentSummary}
            originalWordCount={currentWordCount}
            summaryWordCount={summaryWordCount}
            darkMode={state.darkMode}
          />
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1">
          <HistoryPanel
            history={state.history}
            onSelectNote={handleSelectNote}
            onDeleteNote={handleDeleteNote}
            darkMode={state.darkMode}
          />
        </div>
      </div>
    </>
  );
};