// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { projects } from '../data/ProjectsData';
import { skills } from '../data/SkillsData';


const Home = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeInOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const zoomIn = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <main className="bg-gray-100 dark:bg-gray-800 min-h-screen">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="bg-transparent h-[80vh] flex flex-col justify-center items-center text-center px-4"
            >
                <motion.h1
                    variants={fadeInUp}
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                >
                    Welcome to My Mobile Development Portfolio
                </motion.h1>
                <motion.p
                    variants={fadeInUp}
                    className="text-lg text-gray-700 dark:text-gray-300 mt-4"
                >
                    Bringing innovative mobile app designs and solutions to life.
                </motion.p>
                <motion.div variants={zoomIn} className="mt-8" whileHover={{ scale: 1.05 }}>
                    <ScrollLink
                        to="about-section"
                        smooth={true}
                        duration={500}

                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:text-gray-200 hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        <motion.p whileHover={{ scale: 1.05 }}>Learn More</motion.p>

                    </ScrollLink>
                </motion.div>
            </motion.section>

            {/* About Section */}
            <motion.section
                id='about-section'
                className="py-16 bg-gray-200 dark:bg-gray-700"
                initial="hidden"
                whileInView="visible"
                variants={staggerContainer}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4 text-center">
                    <motion.h2 variants={fadeInUp} className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                        About Me
                    </motion.h2>
                    <motion.p variants={fadeInUp} className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                        I am a passionate mobile app developer with a focus on creating clean and functional user experiences.
                    </motion.p>
                    <motion.div variants={zoomIn} className="mt-8">
                        <ScrollLink
                            to="featured-projects-section"
                            smooth={true}
                            duration={500}
                            className="inline-block text-blue-600 dark:text-blue-400 font-medium text-lg hover:underline cursor-pointer"
                        >
                            Featured Projects
                        </ScrollLink>
                    </motion.div>
                </div>
            </motion.section>

            {/* Featured Projects Section */}
            <motion.section
                id='featured-projects-section'
                className="py-20 bg-gray-100 dark:bg-gray-800"
                initial="hidden"
                whileInView="visible"
                variants={staggerContainer}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6">
                    <motion.h2 variants={fadeInUp} className="text-4xl font-semibold text-center text-gray-900 dark:text-white">
                        Featured Projects
                    </motion.h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Project Cards */}
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                variants={fadeInUp}
                            >
                                <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {project.name}
                                    </h3>
                                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                                        {project.description}
                                    </p>
                                    <Link
                                        to={project.link}
                                        className="inline-block mt-6 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>


            {/* Skills & Services Section */}
            <motion.section
                className="py-20 bg-gray-100 dark:bg-gray-800"
                initial="hidden"
                whileInView="visible"
                variants={staggerContainer}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6">
                    <motion.h2 variants={fadeInUp} className="text-4xl font-semibold text-center text-gray-900 dark:text-white">
                        Skills & Services
                    </motion.h2>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {skills.map((service, index) => (
                            <motion.div
                                key={index}
                                className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center"
                                whileHover={{ scale: 1.05 }}
                                variants={fadeInUp}
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {service.title}
                                </h3>
                                <p className="mt-4 text-gray-700 dark:text-gray-300">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Call to Action Section */}
            <motion.section
                className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-semibold">
                        Ready to Start Your Project?
                    </h2>
                    <p className="mt-6 text-xl max-w-2xl mx-auto">
                        Let's collaborate to bring your mobile app ideas to life. Reach out today, and let's make something amazing together!
                    </p>
                    <motion.div className="mt-12" whileHover={{ scale: 1.1 }}>
                        <Link
                            to="/my-portofolio/contact"
                            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            Get In Touch
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        </main>
    );
};

export default Home;
