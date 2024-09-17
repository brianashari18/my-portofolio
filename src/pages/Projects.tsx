import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data/ProjectsData';

const Projects = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <main className="bg-gray-100 dark:bg-gray-800 min-h-screen pt-32 pb-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
                    My Projects
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-16">
                    Here are some of the mobile apps and designs I have worked on.
                </p>
                <div>
                    {projects.map((project, index) => (
                        <div
                            id={project.id}
                            key={index}
                            className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-16 transition-transform duration-300 ease-in-out transform hover:scale-105`}
                        >
                            <div className="w-full md:w-1/2 px-4">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 transition-transform duration-300 ease-in-out transform hover:scale-105"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-4 flex flex-col justify-center">
                                <div className={`p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 ${index % 2 === 0 ? 'ml-8' : 'mr-8'}`}>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                        {project.name}
                                    </h2>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );

};

export default Projects;
