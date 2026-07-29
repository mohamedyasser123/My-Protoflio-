import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';
import { Globe, Smartphone, Wrench, Lightbulb } from 'lucide-react';

// Map string icon names from data to actual Lucide components
const iconMap = {
  Globe: Globe,
  Smartphone: Smartphone,
  Wrench: Wrench,
  Lightbulb: Lightbulb
};

const getProficiencyText = (level) => {
  if (level >= 90) return 'Advanced';
  if (level >= 80) return 'Intermediate';
  return 'Basic';
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative bg-dark-bg/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-text">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-primary-light mx-auto rounded-full"></div>
          <p className="text-dark-muted max-w-2xl mx-auto pt-4">
            A comprehensive overview of my technical expertise, encompassing modern web architecture, robust mobile development, and core engineering principles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {skills.map((skillGroup, index) => {
            const IconComponent = iconMap[skillGroup.icon] || Globe;
            
            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 lg:p-8 flex flex-col h-full group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-dark-border/50 hover:border-primary/30 relative overflow-hidden"
              >
                {/* Subtle background glow effect on hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-dark-border/50">
                    <div className="p-3 bg-dark-bg/80 rounded-xl text-primary-light group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {skillGroup.category}
                    </h3>
                  </div>

                  <ul className="space-y-6 flex-grow">
                    {skillGroup.items.map((skill, idx) => (
                      <li key={idx} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-medium text-dark-text group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] uppercase font-semibold tracking-wider text-dark-muted">
                            {getProficiencyText(skill.level)}
                          </span>
                        </div>
                        
                        {/* Progress Bar Container */}
                        <div className="h-1.5 w-full bg-dark-bg/80 rounded-full overflow-hidden">
                          {/* Animated Progress Bar */}
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                          >
                           {/* Shimmer effect inside the bar */}
                           <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                          </motion.div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
