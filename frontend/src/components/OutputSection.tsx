import React from 'react';
import { Copy, Download, CheckCircle } from 'lucide-react';

interface OutputSectionProps {
  summary: string;
  originalWordCount: number;
  summaryWordCount: number;
  darkMode: boolean;
}

export const OutputSection: React.FC<OutputSectionProps> = ({
  summary,
  originalWordCount,
  summaryWordCount,
  darkMode
}) => {
  const [copySuccess, setCopySuccess] = React.useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const compressionRatio = originalWordCount > 0 
    ? Math.round(((originalWordCount - summaryWordCount) / originalWordCount) * 100)
    : 0;

  if (!summary) return null;

  return (
    <div className={`rounded-2xl shadow-lg transition-all duration-300 ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
    }`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              darkMode ? 'bg-green-600' : 'bg-green-500'
            }`}>
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <h2 className={`text-xl font-bold transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Summary
            </h2>
          </div>

          {/* Word Count Stats */}
          <div className={`text-right text-sm transition-colors ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <div>{summaryWordCount} words (from {originalWordCount})</div>
            <div className="text-green-500 font-medium">
              {compressionRatio}% reduction
            </div>
          </div>
        </div>

        {/* Summary Content */}
        <div className={`p-4 rounded-xl border transition-colors mb-6 ${
          darkMode 
            ? 'bg-gray-700/50 border-gray-600 text-gray-200' 
            : 'bg-gray-50 border-gray-200 text-gray-800'
        }`}>
          <p className="leading-relaxed whitespace-pre-wrap">{summary}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCopyToClipboard}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              copySuccess
                ? darkMode 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-500 text-white'
                : darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Copy className="h-4 w-4" />
            <span>{copySuccess ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>
          
          <button
            onClick={handleDownload}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Download className="h-4 w-4" />
            <span>Download Summary</span>
          </button>
        </div>
      </div>
    </div>
  );
};