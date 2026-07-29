import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/Icons';

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-dark-border py-12 border-opacity-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">
              Mohamed.dev
            </span>
            <p className="text-sm text-dark-muted">
              Building beautiful and functional experiences.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/mohamedyasser123"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-dark-muted hover:text-white hover:bg-dark-card rounded-full transition-all duration-300 transform hover:-translate-y-1"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="www.linkedin.com/in/mohamed-yasser-301098228"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-dark-muted hover:text-white hover:bg-dark-card rounded-full transition-all duration-300 transform hover:-translate-y-1"
            >
              <LinkedinIcon size={20} />
            </a>
          
            <a
              href="mailto:mohamedyzahar@gmail.com"
              className="p-2 text-dark-muted hover:text-white hover:bg-dark-card rounded-full transition-all duration-300 transform hover:-translate-y-1"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-dark-border/50 text-center text-sm text-dark-muted">
          <p>&copy; {new Date().getFullYear()} Mohamed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
