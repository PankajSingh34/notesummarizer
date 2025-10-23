import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin, MessageSquare } from 'lucide-react';

interface ContactProps {
  darkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, we'll just show success
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after successful submission
    if (submitStatus === 'success') {
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "singhps588@gmail.com",
      href: "mailto:singhps588@gmail.com"
    },
    {
      icon: Github,
      title: "GitHub",
      content: "@PankajSingh34",
      href: "https://github.com/PankajSingh34"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      content: "Pankaj Singh",
      href: "https://www.linkedin.com/in/pankaj-singh-2a968b212/"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/PankajSingh34", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/pankaj-singh-2a968b212/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:singhps588@gmail.com", label: "Email" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Get in Touch
        </h1>
        <p className={`text-xl md:text-2xl leading-relaxed transition-colors ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className={`rounded-2xl p-8 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-lg'
          }`}>
            <h2 className={`text-2xl font-bold mb-8 transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Contact Information
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                      darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${
                      darkMode ? 'bg-blue-600' : 'bg-blue-500'
                    }`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold transition-colors ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`transition-colors ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.content}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-600">
              <h3 className={`text-lg font-semibold mb-4 transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className={`rounded-2xl p-8 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-lg'
          }`}>
            <h2 className={`text-2xl font-bold mb-8 transition-colors ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Send us a Message
            </h2>

            {submitStatus === 'success' && (
              <div className={`mb-6 p-4 rounded-lg border-l-4 border-green-500 ${
                darkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-700'
              }`}>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  <span className="font-medium">Message sent successfully!</span>
                </div>
                <p className="mt-1 text-sm">We'll get back to you as soon as possible.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-offset-gray-800' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <Send className={`h-5 w-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  <span>
                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Sent!' : 'Send Message'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <div className={`rounded-2xl p-8 transition-all duration-300 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-lg'
        }`}>
          <h2 className={`text-2xl font-bold mb-8 transition-colors ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                How accurate are the summaries?
              </h3>
              <p className={`transition-colors ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Our AI uses advanced natural language processing to achieve 95%+ accuracy in capturing key points and maintaining context.
              </p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Is my data secure?
              </h3>
              <p className={`transition-colors ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Yes, we prioritize privacy. Your content is processed securely and we never store personal documents.
              </p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                What file formats are supported?
              </h3>
              <p className={`transition-colors ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Currently we support .txt, .md files, direct text input, and voice input. More formats coming soon!
              </p>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Do you offer API access?
              </h3>
              <p className={`transition-colors ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Yes! Contact us for enterprise API access and integration options for your applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};