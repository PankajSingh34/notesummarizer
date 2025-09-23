import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Moon, Sun, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => location.pathname === path;

  const getLinkClasses = (path: string) => `text-sm font-medium transition-colors hover:text-blue-500 ${
    isActiveRoute(path) 
      ? 'text-blue-500 font-semibold' 
      : darkMode ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                NoteSummarizer AI
              </h1>
              <p className={`text-xs transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Intelligent Text Summarization
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={getLinkClasses('/')}>
              Home
            </Link>
            <Link to="/about" className={getLinkClasses('/about')}>
              About
            </Link>
            <Link to="/contact" className={getLinkClasses('/contact')}>
              Contact
            </Link>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'bg-gray-800 text-yellow-400' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t transition-colors ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={getLinkClasses('/')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={getLinkClasses('/about')}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={getLinkClasses('/contact')}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};