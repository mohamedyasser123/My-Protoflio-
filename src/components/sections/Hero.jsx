import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import profile from '../../assets/profile.png'
const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-50 -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary-light font-medium tracking-wider uppercase text-sm mb-4 block">
              Hello World
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold font-sans text-dark-text mb-6 leading-tight flex flex-col gap-2"
          >
            <span>I'm Mohamed 👋</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light">
              Frontend Developer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-dark-muted mb-10 max-w-2xl mx-auto md:mx-0"
          >
            I build modern, scalable web and mobile applications using React and Flutter. Let's create beautiful, user-centric experiences together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
          >
            <a href="#projects" className="btn btn-primary w-full sm:w-auto gap-2">
              View Work <ArrowRight size={18} />
            </a>
            <a href="/Mohamed_Alzahar_CV.pdf" className="btn btn-secondary w-full sm:w-auto gap-2">
              <Download size={18} /> Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center p-8 md:p-0 relative"
        >
          {/* Decorative graphic placeholder */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-20 animate-pulse" />
             <div className="absolute inset-4 bg-dark-card rounded-full border border-dark-border flex items-center justify-center overflow-hidden">
          <img src={profile} alt="hero" className="w-full h-full object-cover" />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
