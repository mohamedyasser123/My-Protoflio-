import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative bg-dark-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-text">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light">Touch</span>
          </h2>
          <p className="text-dark-muted max-w-2xl mx-auto">
            Have a project in mind, a question, or just want to say hi? I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/3 space-y-8"
          >
            <div className="glass-card p-6 flex items-start gap-4 hover:border-primary-light/50 transition-colors">
              <div className="p-3 bg-primary/10 rounded-xl text-primary-light">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Email</h4>
                <a href="mailto:mohamedyzahar@gmail.com" className="text-sm text-dark-muted hover:text-primary-light transition-colors">
                  mohamedyzahar@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4 hover:border-primary-light/50 transition-colors">
              <div className="p-3 bg-primary/10 rounded-xl text-primary-light">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Location</h4>
                <span className="text-sm text-dark-muted">
                  Cairo, Egypt
                </span>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4 hover:border-primary-light/50 transition-colors">
              <div className="p-3 bg-primary/10 rounded-xl text-primary-light">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Phone</h4>
                <span className="text-sm text-dark-muted">
                  +20 100 9390 789
                </span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-2/3 glass-card p-8 sm:p-10"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-dark-muted">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-3 text-white placeholder-dark-muted/50 focus:outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-dark-muted">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-3 text-white placeholder-dark-muted/50 focus:outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-dark-muted">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Project Inquiry"
                  className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-3 text-white placeholder-dark-muted/50 focus:outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-dark-muted">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Tell me about your project..."
                  className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-3 text-white placeholder-dark-muted/50 focus:outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full gap-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
