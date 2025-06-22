import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

interface SocialLink {
    platform: 'github' | 'linkedin' | 'twitter';
    url: string;
}

interface UserProfile {
    name: string;
    email: string;
    avatarUrl: string;
    about: string;
    phone: string;
    location: string;
    socialLinks: SocialLink[];
    skills: string[];
    projects: { name: string; description: string; url: string }[];
}

const mockUser: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: '/default-avatar.png',
    about: 'Backend Developer with a passion for building scalable applications. Experienced in Node.js, MongoDB, and cloud infrastructure.',
    phone: '(123) 456-7890',
    location: 'Anytown, USA',
    socialLinks: [
        { platform: 'github', url: 'https://github.com/johndoe' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/johndoe' },
        { platform: 'twitter', url: 'https://twitter.com/johndoe' },
    ],
    skills: ['Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'GraphQL'],
    projects: [
        {
            name: 'Task Manager API',
            description: 'A RESTful API for managing tasks with JWT authentication and MongoDB.',
            url: 'https://github.com/johndoe/task-manager-api',
        },
        {
            name: 'Portfolio Website',
            description: 'Personal portfolio built with Next.js and Tailwind CSS.',
            url: 'https://johndoe.dev',
        },
    ],
};

const getSocialIcon = (platform: string) => {
    switch (platform) {
        case 'github':
            return <FaGithub />;
        case 'linkedin':
            return <FaLinkedin />;
        case 'twitter':
            return <FaTwitter />;
        default:
            return null;
    }
};

const ProfilePage: React.FC = () => {
    const user = mockUser; // Replace with actual user data

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center py-10">
            <div className="w-full max-w-3xl bg-gray-900 text-white shadow-2xl rounded-2xl p-8">
                <div className="flex flex-col sm:flex-row items-center mb-8 gap-8">
                    <img
                        className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYbP-248zDkKcJG_swsx0pK2Hhe8hwE0fHQ&s"
                        alt={`${user.name}'s avatar`}
                        loading="lazy"
                    />
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-3xl font-bold font-[family-name:var(--font-geist-mono)]">{user.name}</h1>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
                            <span className="flex items-center gap-1 text-indigo-300 text-sm">
                                <FaEnvelope /> {user.email}
                            </span>
                            <span className="flex items-center gap-1 text-indigo-300 text-sm">
                                <FaPhone /> {user.phone}
                            </span>
                            <span className="flex items-center gap-1 text-indigo-300 text-sm">
                                <FaMapMarkerAlt /> {user.location}
                            </span>
                        </div>
                        <div className="flex gap-4 mt-4 justify-center sm:justify-start">
                            {user.socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-400 hover:text-indigo-200 text-2xl transition-colors"
                                    aria-label={link.platform}
                                >
                                    {getSocialIcon(link.platform)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6">
                    <h2 className="text-xl font-semibold mb-2 text-indigo-400">About Me</h2>
                    <p className="text-gray-300">{user.about}</p>
                </div>
                <div className="border-t border-gray-700 pt-6 mt-6">
                    <h2 className="text-xl font-semibold mb-2 text-indigo-400">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="bg-indigo-700/30 text-indigo-200 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6 mt-6">
                    <h2 className="text-xl font-semibold mb-2 text-indigo-400">Projects</h2>
                    <ul className="space-y-4">
                        {user.projects.map((project, idx) => (
                            <li key={idx} className="bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-300 font-semibold hover:underline text-lg"
                                >
                                    {project.name}
                                </a>
                                <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
