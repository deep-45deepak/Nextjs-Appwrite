'use client';

import React from 'react';
import QuestionForm from '@/components/QuestionForm';
import Meteors from '@/components/magicui/meteors';
import Particles from '@/components/magicui/particles';

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4 sm:px-6 lg:px-10 py-28 relative overflow-hidden">
            {/* Background Particles */}
            <Particles
                className="absolute inset-0 h-full w-full"
                quantity={500}
                ease={100}
                color="#ffffff"
                refresh
            />

            {/* Question Form Card */}
            <div className="relative w-full max-w-4xl bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 border border-white/10">
                <Meteors number={30} />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                    Submit a Question
                </h1>
                <p className="text-sm sm:text-base text-gray-300 mb-8 text-center max-w-2xl mx-auto">
                    Fill out the form below to submit your question. Make it clear and specific to get better answers!
                </p>
                <QuestionForm />
            </div>
        </div>
    );
}
