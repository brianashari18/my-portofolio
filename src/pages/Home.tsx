import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects, skillCategories, personalInfo } from '../data/portfolioData';
import {
  SmartphoneIcon,
  CodeIcon,
  ServerIcon,
  WrenchIcon,
  ArrowRightIcon,
  SparklesIcon,
  GithubIcon,
  ExternalLinkIcon,
} from '../components/Icons';

const Home = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <SmartphoneIcon className="w-6 h-6 text-cyan-400" />;
      case 'Server':
        return <ServerIcon className="w-6 h-6 text-indigo-400" />;
      case 'Code':
        return <CodeIcon className="w-6 h-6 text-purple-400" />;
      default:
        return <WrenchIcon className="w-6 h-6 text-pink-400" />;
    }
  };

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow pointer-events-none -z-0" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-96 left-10 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-0" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          {/* Status Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Available for Mobile & Software Projects</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.1]"
          >
            Crafting Digital Solutions for{' '}
            <span className="gradient-text">Mobile & Web</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Hi, I'm <strong className="text-slate-200 font-semibold">{personalInfo.name}</strong>. {personalInfo.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-200 glass-card glass-card-hover border border-slate-800 transition-all duration-300"
            >
              <span>Get in Touch</span>
            </Link>
          </motion.div>

          {/* Quick Tech Pills */}
          <motion.div
            variants={fadeInUp}
            className="pt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 font-medium"
          >
            <span className="text-slate-500 mr-1">Main Tech:</span>
            {['Flutter', 'Dart', 'Firebase', 'React', 'TypeScript', 'Tailwind CSS'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Stats & Bio Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800/80 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Bio info */}
            <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <SparklesIcon className="w-4 h-4" />
                <span>About Brian</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
                Building user-centered mobile apps with passion & clarity.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                {personalInfo.bio} Dedicated to continuous learning, responsive UI engineering, and real-world app deployment.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                  <span>Read Full Background & Education</span>
                  <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-5 grid grid-cols-2 gap-4"
            >
              {personalInfo.stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-900/90 border border-slate-800/90 p-5 rounded-2xl text-center hover:border-cyan-500/30 transition-colors"
                >
                  <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mt-2">
                Featured Mobile Applications
              </h2>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors group"
            >
              <span>View All ({projects.length} Projects)</span>
              <ArrowRightIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group border border-slate-800/80"
              >
                {/* Card Thumbnail */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 border border-slate-800 text-cyan-300 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                    <Link
                      to={`/projects#${project.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      <span>Project Details</span>
                      <ExternalLinkIcon className="w-3.5 h-3.5" />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills & Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
              Technical Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100">
              Skills & Development Stack
            </h2>
            <p className="text-slate-400 text-sm">
              Core technologies and tools I utilize to engineer scalable mobile apps & web interfaces.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={fadeInUp}
                className="glass-card rounded-2xl p-7 border border-slate-800/80 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{category.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/60"
                    >
                      <span className="text-xs font-medium text-slate-200">{skill.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 shadow-2xl shadow-cyan-500/20"
        >
          {/* Decorative Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Let's Build Something Amazing Together.
            </h2>
            <p className="text-cyan-100 text-base sm:text-lg">
              Have an app idea or looking for a developer for your team? I'm always open to discussing new projects and technical opportunities.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Start a Conversation</span>
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
