import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects, Project } from '../data/portfolioData';
import { GithubIcon } from '../components/Icons';

const Projects = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const categories = ['All', 'Flutter / Mobile'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
          Complete Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100">
          Projects & Applications
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          A showcase of mobile applications and software projects I've built using Flutter, Dart, Firebase, and web technologies.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'glass-card text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-16">
        {filteredProjects.map((project: Project, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              id={project.id}
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/80 shadow-2xl transition-all duration-300 hover:border-cyan-500/30"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                {/* Image Showcase */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 group">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-72 sm:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Info & Details */}
                <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
                      {project.name}
                    </h2>
                    <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                      {project.detailedDescription || project.description}
                    </p>
                  </div>

                  {/* Tech stack pills */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Technologies Used
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="pt-4 flex items-center gap-4 border-t border-slate-900">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 glass-card glass-card-hover border border-slate-800"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
