    'use client';

    import axios from 'axios';
    import React, { useEffect, useState } from 'react';
    import { useRouter } from 'next/navigation';

    interface UserProfile {
        name: string;
        email: string;
        avatarUrl: string;
        about: string;
        phone: string;
        location: string;
    }

    const mockUser: UserProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarUrl: '/default-avatar.png',
        about: 'Backend Developer with a passion for building scalable applications.',
        phone: '(123) 456-7890',
        location: 'Anytown, USA',
    };

    const ProfilePage: React.FC = () => {
        const router = useRouter();
        const [user, setUser] = useState<UserProfile | null>(null);

        const getUserProfile = async () => {
            try {
                const response = await axios.get('/api/users/profile');
                setUser(response.data.data); // update state
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setUser(mockUser); // fallback to mock if error
            }
        };

        const handleLogout = async () => {
            try {
                await axios.get('/api/users/logout');
                router.push('/login');
            } catch (error) {
                console.log('Error logging out user:', error);
            }
        };

        useEffect(() => {
            getUserProfile();
        }, []);

        if (!user) return <p className="text-white text-center mt-10">Loading user profile...</p>;

        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center py-10">
                <div className="w-full max-w-2xl bg-gray-900 text-white shadow-xl rounded-xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold font-[family-name:var(--font-geist-mono)]">
                            User Profile
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Log Out
                        </button>
                    </div>
                    <hr className="border-gray-700 mb-6" />
                    <div className="flex flex-col sm:flex-row items-center mb-8">
                        <img
                            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg mb-4 sm:mb-0 sm:mr-8"
                            src={user.avatarUrl}
                            alt={`${user.name}'s avatar`}
                        />
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-semibold">{user.name}</h2>
                            <p className="text-indigo-300">{user.email}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-lg font-semibold mb-2 text-indigo-400">About Me</h3>
                        <p className="text-gray-300">{user.about}</p>
                    </div>
                    <div className="border-t border-gray-700 pt-6 mt-6">
                        <h3 className="text-lg font-semibold mb-2 text-indigo-400">Contact Information</h3>
                        <p className="text-gray-300">Phone: {user.phone}</p>
                        <p className="text-gray-300">Location: {user.location}</p>
                    </div>
                    <KeyValueTable data={user} />
                </div>
            </div>
        );
    };

    type KeyValueProps = {
        data: Record<string, any>;
    };

    const KeyValueTable: React.FC<KeyValueProps> = ({ data }) => (
        <table className="min-w-full text-left text-sm mt-6">
            <tbody>
                {Object.entries(data)
                    .filter(([key]) => key !== 'avatarUrl')
                    .map(([key, value]) => (
                        <tr key={key}>
                            <td className="font-semibold pr-4 text-indigo-300 capitalize">{key}</td>
                            <td className="text-gray-200">{String(value)}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );

    export default ProfilePage;
