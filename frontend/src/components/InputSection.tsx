import React, { useRef, useState, useEffect } from 'react';
import { Upload, FileText, Sparkles, Mic, MicOff, Volume2 } from 'lucide-react';

interface InputSectionProps {
  currentNote: string;
  setCurrentNote: (note: string) => void;
  onSummarize: () => void;
  isLoading: boolean;
  darkMode: boolean;
  wordCount: number;
}

export const InputSection: React.FC<InputSectionProps> = ({
  currentNote,
  setCurrentNote,
  onSummarize,
  isLoading,
  darkMode,
  wordCount
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setCurrentNote(currentNote + ' ' + finalTranscript.trim());
        }
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setVoiceError(`Voice recognition error: ${event.error}`);
        setIsRecording(false);
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
      setIsVoiceSupported(true);
    } else {
      setIsVoiceSupported(false);
      setVoiceError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
  }, [setCurrentNote, currentNote]);

  const startVoiceRecording = () => {
    if (recognition && isVoiceSupported) {
      setVoiceError(null);
      try {
        recognition.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting voice recognition:', error);
        setVoiceError('Failed to start voice recording. Please check your microphone permissions.');
      }
    }
  };

  const stopVoiceRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      stopVoiceRecording();
    } else {
      startVoiceRecording();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCurrentNote(content);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCurrentNote(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`rounded-2xl shadow-lg transition-all duration-300 ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
    }`}>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-2 rounded-lg ${
            darkMode ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h2 className={`text-xl font-bold transition-colors ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Input Your Notes
          </h2>
        </div>

        {/* File Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`relative mb-6 p-8 border-2 border-dashed rounded-xl transition-all duration-300 hover:border-blue-400 ${
            darkMode 
              ? 'border-gray-600 bg-gray-700/30 hover:bg-gray-700/50' 
              : 'border-gray-300 bg-gray-50/50 hover:bg-gray-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="text-center">
            <Upload className={`mx-auto h-12 w-12 mb-4 transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <h3 className={`text-lg font-medium mb-2 transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Upload or Drop Files
            </h3>
            <p className={`text-sm mb-4 transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Support for .txt and .md files
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Choose File
            </button>
          </div>
        </div>

        {/* Voice Input Area */}
        <div className={`mb-6 p-6 rounded-xl border transition-all duration-300 ${
          darkMode 
            ? 'border-gray-600 bg-gray-700/30' 
            : 'border-gray-300 bg-gray-50/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                isRecording 
                  ? 'bg-red-500 animate-pulse' 
                  : darkMode ? 'bg-green-600' : 'bg-green-500'
              }`}>
                <Volume2 className="h-5 w-5 text-white" />
              </div>
              <h3 className={`text-lg font-medium transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Voice Input
              </h3>
            </div>
            
            {isVoiceSupported && (
              <button
                onClick={toggleVoiceRecording}
                disabled={isLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
                    : darkMode
                    ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 focus:ring-offset-gray-800'
                    : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    <span>Start Recording</span>
                  </>
                )}
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {isRecording && (
              <div className={`p-3 rounded-lg border-l-4 border-red-500 ${
                darkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-700'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm font-medium">Recording... Speak now!</span>
                </div>
              </div>
            )}
            
            {voiceError && (
              <div className={`p-3 rounded-lg border-l-4 border-yellow-500 ${
                darkMode ? 'bg-yellow-900/20 text-yellow-400' : 'bg-yellow-50 text-yellow-700'
              }`}>
                <p className="text-sm">{voiceError}</p>
              </div>
            )}
            
            {!isVoiceSupported && (
              <div className={`p-3 rounded-lg border-l-4 border-gray-500 ${
                darkMode ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-100 text-gray-600'
              }`}>
                <p className="text-sm">
                  Voice input is not supported in this browser. Please use a modern browser like Chrome, Edge, or Safari for voice recognition features.
                </p>
              </div>
            )}
            
            {isVoiceSupported && !isRecording && !voiceError && (
              <div className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <p>Click "Start Recording" to use voice input. Make sure to allow microphone access when prompted.</p>
                <p className="mt-1">
                  <strong>Tip:</strong> Speak clearly and pause between sentences for best results.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className={`text-sm font-medium transition-colors ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Paste, type, or use voice input for your notes
            </label>
            <span className={`text-xs transition-colors ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {wordCount} words
            </span>
          </div>
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Paste your text here, upload a file above, or use voice input to speak your notes. The AI will generate a concise summary while preserving the key information..."
            className={`w-full h-64 p-4 rounded-xl border transition-all duration-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        {/* Summarize Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onSummarize}
            disabled={!currentNote.trim() || isLoading}
            className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-offset-gray-800' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Sparkles className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Summarizing...' : 'Summarize Notes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};