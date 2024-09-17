// src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';


const Home = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <main className="bg-gray-100 dark:bg-gray-800 min-h-screen">
            {/* Hero Section */}
            <motion.section initial="hidden"
                animate="visible"
                variants={fadeInUp} className="bg-transparent h-[80vh] flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Welcome to My Mobile Development Portfolio
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
                    Bringing innovative mobile app designs and solutions to life.
                </p>
                <div className="mt-8">
                    <ScrollLink
                        to="about-section"
                        smooth={true}
                        duration={500}
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        Learn More
                    </ScrollLink>
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section
                className="py-16 bg-gray-200 dark:bg-gray-700"

                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                        About Me
                    </h2>
                    <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                        I am a passionate mobile app developer with a focus on creating clean
                        and functional user experiences.
                    </p>
                    <div className="mt-8">
                        <ScrollLink
                            to="featured-projects-section"
                            smooth={true}
                            duration={500}
                            className="inline-block text-blue-600 dark:text-blue-400 font-medium text-lg hover:underline cursor-pointer"
                        >
                            Featured Projects
                        </ScrollLink>
                    </div>
                </div>
            </motion.section>

            {/* Featured Projects Section */}
            <motion.section
                className="py-20 bg-gray-100 dark:bg-gray-800"

                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-semibold text-center text-gray-900 dark:text-white">
                        Featured Projects
                    </h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Project Cards */}
                        {[
                            {
                                name: 'Role Dice App',
                                description: 'An interactive app simulating dice rolls for role-playing games, built with Flutter.',
                                link: '/projects/role-dice-app',
                                image: '/images/projects/role-dice-app.jpg',
                            },
                            {
                                name: 'Quiz App',
                                description: 'A dynamic quiz application with various topics and difficulty levels, developed using React Native.',
                                link: '/projects/quiz-app',
                                image: '/images/projects/quiz-app.jpg',
                            },
                            {
                                name: 'Expense Tracker App',
                                description: 'Effortlessly track your daily expenses with this intuitive app, created with Swift.',
                                link: '/projects/expense-tracker-app',
                                image: '/images/projects/expense-tracker-app.jpg',
                            },
                            {
                                name: 'Meals App',
                                description: 'Discover recipes and create meal plans, developed using Kotlin for Android.',
                                link: '/projects/meals-app',
                                image: '/images/projects/meals-app.jpg',
                            },
                            {
                                name: 'Shopping List App',
                                description: 'Organize and share your shopping lists, built with Xamarin.',
                                link: '/projects/shopping-list-app',
                                image: '/images/projects/shopping-list-app.jpg',
                            },
                            {
                                name: 'E-Wise (E-Waste Management App)',
                                description: 'Promoting responsible e-waste disposal and recycling, developed with Flutter.',
                                link: '/projects/e-wise',
                                image: '/images/projects/e-wise.jpg',
                            },
                        ].map((project, index) => (
                            <motion.div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden" whileHover={{ scale: 1.05 }}>
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

            {/* Testimonials Section */}
            <motion.section
                className="py-20 bg-white dark:bg-gray-900"

                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-semibold text-center text-gray-900 dark:text-white">
                        What People Say
                    </h2>
                    <div className="mt-12 flex flex-wrap justify-center gap-10">
                        <motion.blockquote className="max-w-md mx-auto p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
                            <p className="text-lg text-gray-800 dark:text-gray-200">
                                "An exceptional developer who delivers high-quality work on time. Truly impressive!"
                            </p>
                            <cite className="mt-6 block text-gray-700 dark:text-gray-400">
                                — Jane Doe, CEO at TechCorp
                            </cite>
                        </motion.blockquote>
                        {/* Add more testimonials if needed */}
                    </div>
                </div>
            </motion.section>

            {/* Skills & Services Section */}
            <motion.section
                className="py-20 bg-gray-100 dark:bg-gray-800"

                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-semibold text-center text-gray-900 dark:text-white">
                        Skills & Services
                    </h2>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: 'iOS Development',
                                description: 'Expertise in Swift and Objective-C for building native iOS applications.',
                            },
                            {
                                title: 'Android Development',
                                description: 'Proficient in Java and Kotlin for creating native Android apps.',
                            },
                            {
                                title: 'Cross-Platform Development',
                                description: 'Building apps with React Native and Flutter for both iOS and Android.',
                            },
                            {
                                title: 'UI/UX Design',
                                description: 'Designing user-friendly interfaces and experiences.',
                            },
                            {
                                title: 'Backend Integration',
                                description: 'Experienced in integrating RESTful APIs and Firebase services.',
                            },
                            {
                                title: 'App Deployment',
                                description: 'Handling app store submissions and deployment processes.',
                            },
                        ].map((skill, index) => (
                            <motion.div key={index} className="p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md" whileHover={{ scale: 1.05 }}>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {skill.title}
                                </h3>
                                <p className="mt-4 text-gray-700 dark:text-gray-300">
                                    {skill.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Call to Action Section */}
            <motion.section initial="hidden"
                animate="visible"
                variants={fadeInUp} className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-semibold">
                        Ready to Start Your Project?
                    </h2>
                    <p className="mt-6 text-xl max-w-2xl mx-auto">
                        Let's collaborate to bring your mobile app ideas to life. Reach out today, and let's make something amazing together!
                    </p>
                    <div className="mt-12">
                        <Link
                            to="/contact"
                            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </motion.section>
        </main>
    )
}

export default Home;
