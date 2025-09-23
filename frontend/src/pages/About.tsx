import React from 'react';
import { Brain, Zap, Shield, Users, BookOpen, Target } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

export const About: React.FC<AboutProps> = ({ darkMode }) => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced natural language processing algorithms analyze your text to identify key concepts and important information."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant summaries in seconds. Our optimized processing ensures quick turnaround times for all your documents."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure. We process everything locally when possible and never store your personal content."
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Intuitive interface designed for everyone. No technical expertise required to get professional-quality summaries."
    },
    {
      icon: BookOpen,
      title: "Multiple Formats",
      description: "Support for various text formats including plain text, markdown, and voice input for maximum flexibility."
    },
    {
      icon: Target,
      title: "Precise Results",
      description: "Customizable summary lengths and intelligent content analysis ensure you get exactly what you need."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          About NoteSummarizer
        </h1>
        <p className={`text-xl md:text-2xl leading-relaxed transition-colors ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Revolutionizing how you process and understand information with the power of artificial intelligence.
        </p>
      </div>

      {/* Mission Statement */}
      <div className={`rounded-2xl p-8 mb-16 transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-lg'
      }`}>
        <h2 className={`text-3xl font-bold mb-6 transition-colors ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Our Mission
        </h2>
        <p className={`text-lg leading-relaxed mb-4 transition-colors ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          In today's information-rich world, we're often overwhelmed by the sheer volume of content we need to process. 
          NoteSummarizer was created to bridge this gap, providing intelligent, context-aware summaries that help you 
          understand and retain key information efficiently.
        </p>
        <p className={`text-lg leading-relaxed transition-colors ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Whether you're a student reviewing lecture notes, a professional analyzing reports, or a researcher 
          processing articles, our AI-powered platform adapts to your needs and delivers precise, actionable summaries.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className={`text-3xl font-bold text-center mb-12 transition-colors ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Why Choose NoteSummarizer?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800 border border-gray-700 hover:border-blue-600' 
                    : 'bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:border-blue-300'
                }`}
              >
                <div className={`p-3 rounded-lg inline-flex mb-4 ${
                  darkMode ? 'bg-blue-600' : 'bg-blue-500'
                }`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`transition-colors ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology Section */}
      <div className={`rounded-2xl p-8 mb-16 transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-lg'
      }`}>
        <h2 className={`text-3xl font-bold mb-6 transition-colors ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-xl font-semibold mb-4 transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Frontend
            </h3>
            <ul className={`space-y-2 transition-colors ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• React 19 with TypeScript</li>
              <li>• Vite for fast development</li>
              <li>• TailwindCSS for styling</li>
              <li>• Lucide React for icons</li>
              <li>• Web Speech API for voice input</li>
            </ul>
          </div>
          <div>
            <h3 className={`text-xl font-semibold mb-4 transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Backend
            </h3>
            <ul className={`space-y-2 transition-colors ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <li>• Node.js with Express</li>
              <li>• TypeScript for type safety</li>
              <li>• MongoDB for data storage</li>
              <li>• Swagger for API documentation</li>
              <li>• Advanced NLP algorithms</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className={`text-3xl font-bold mb-6 transition-colors ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Ready to Get Started?
        </h2>
        <p className={`text-lg mb-8 transition-colors ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Join thousands of users who are already transforming their note-taking experience.
        </p>
        <a
          href="/"
          className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-offset-gray-800' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <span>Try NoteSummarizer Now</span>
        </a>
      </div>
    </div>
  );
};