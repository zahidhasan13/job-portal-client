import React from 'react';
import { Linkedin, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side: Copyright Text */}
        <div className="text-sm text-gray-400 mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="mailto:your-email@example.com"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;