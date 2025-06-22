'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
// import axios from 'axios';


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', user);
            // console.log(response.data);
            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                router.push(`/profile/${response.data.user._id}`);
                toast.success('Login successful!');
            } else if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.error('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Show backend error if available
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen bg-gray-950 text-white p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-3xl font-bold font-[family-name:var(--font-geist-mono)]">Login Page</h1>

            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm bg-gray-900 p-8 rounded-lg shadow-lg space-y-6"
            >
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="mt-2 block w-full rounded-md bg-gray-800 px-3 py-2 text-white ring-1 ring-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="mt-2 block w-full rounded-md bg-gray-800 px-3 py-2 text-white ring-1 ring-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Log In
                </button>

                <p className="text-center text-sm text-gray-400">
                    Don’t have an account?{' '}
                    <Link href="/signup" className="text-indigo-400 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>

            <footer className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Your Company
            </footer>
        </div>
    );
}
