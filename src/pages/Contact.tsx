import { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import {
  MailIcon,
  LinkedinIcon,
  GithubIcon,
  LocationIcon,
  SendIcon,
  CheckIcon,
  SparklesIcon,
} from '../components/Icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
          Let's Work Together
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Whether you have a mobile app project in mind, a question, or just want to connect, feel free to reach out!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Tiles */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-7 border border-slate-800/80 space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
              <SparklesIcon className="w-4 h-4" />
              <span>Contact Information</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              I try my best to respond to all inquiries within 24 hours.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">Email</div>
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {personalInfo.email}
                  </div>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-indigo-500/40 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">LinkedIn</div>
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                    Brian Anashari
                  </div>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-purple-500/40 transition-colors group"
              >
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">GitHub</div>
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-purple-400 transition-colors">
                    @brianashari18
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/60">
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <LocationIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500">Location</div>
                  <div className="text-sm font-semibold text-slate-200">
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800/80 shadow-2xl"
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto">
                  <CheckIcon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">Message Sent!</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Thank you for reaching out. I have received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-semibold text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-slate-100 mb-6">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-medium text-slate-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-medium text-slate-300">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-medium text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-medium text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <SendIcon className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
