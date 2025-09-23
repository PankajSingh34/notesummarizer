import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Note, AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentNote: '',
    currentSummary: '',
    history: [],
    isLoading: false,
    darkMode: false,
  });

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setState(prev => ({ ...prev, darkMode: darkMode }));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !state.darkMode;
    setState(prev => ({ ...prev, darkMode: newDarkMode }));
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors ${
        state.darkMode ? 'dark' : ''
      }`}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
          <Navbar 
            darkMode={state.darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  state={state}
                  setState={setState}
                />
              } 
            />
            <Route path="/about" element={<About darkMode={state.darkMode} />} />
            <Route path="/contact" element={<Contact darkMode={state.darkMode} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;