import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { personalInfo, experiences } from '../data/portfolioData';
import { SparklesIcon, ArrowRightIcon, LocationIcon, MailIcon, CheckIcon } from '../components/Icons';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Top Profile Header */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="glass-card rounded-3xl p-8 sm:p-14 border border-slate-800/80 shadow-2xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Profile Avatar */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 blur-lg opacity-50 group-hover:opacity-80 transition duration-500" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Profile Bio */}
          <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Background & Experience</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
              About <span className="gradient-text">{personalInfo.name}</span>
            </h1>

            <p className="text-slate-300 text-base leading-relaxed">
              {personalInfo.detailedBio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-sm text-slate-300">
                <LocationIcon className="w-5 h-5 text-cyan-400" />
                <span>Location: {personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-sm text-slate-300">
                <MailIcon className="w-5 h-5 text-indigo-400" />
                <span>{personalInfo.email}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 transition-all duration-300"
              >
                <span>Get in Touch</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Experience & Education Timeline */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="space-y-10"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
            Milestones & Roles
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
            Education & Organizational Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="glass-card rounded-2xl p-7 border border-slate-800/80 space-y-5 relative"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
                  {exp.period}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                <h4 className="text-sm font-medium text-cyan-400 mt-1">{exp.organization}</h4>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>

              <div className="space-y-2 pt-2 border-t border-slate-900">
                {exp.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckIcon className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default About;
