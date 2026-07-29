import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 relative bg-dark-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-text">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light">Me</span>
          </h2>
          <div className="w-16 h-1 bg-primary-light mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Decorative graphic / Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden glass-card group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10 group-hover:opacity-0 transition-opacity duration-500" />
              {/* Replace src with your actual photo */}
              <img
                src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&q=80&w=1000"
                alt="Mohamed Coding"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 space-y-6 text-dark-muted"
          >
            <p className="text-lg">
              I’m a Frontend & Flutter Developer with 3+ years of experience delivering high-quality web and mobile applications. I excel at building scalable React applications and robust Flutter apps, with a strong focus on performance, clean architecture, and seamless user experience.
            </p>
            <p className="text-lg">
              I’ve built and contributed to real-world projects that involve complex logic, API integrations, and efficient state management. I take pride in writing clean, maintainable code and transforming ideas into polished, production-ready products.
            </p>
            <p className="text-lg">
              Always learning, always building — I aim to create solutions that not only work, but make an impact.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="glass-card px-6 py-4 flex-1 min-w-[140px] text-center border-l-4 border-primary-light">
                <span className="block text-3xl font-bold text-dark-text mb-1">10+</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-primary-light">Projects</span>
              </div>
              <div className="glass-card px-6 py-4 flex-1 min-w-[140px] text-center border-l-4 border-secondary-light">
                <span className="block text-3xl font-bold text-dark-text mb-1">3+</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-secondary-light">Years Exp.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
