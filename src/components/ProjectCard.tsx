import React from 'react';

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl }) => (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        </div>
    </div>
);

export default ProjectCard;
