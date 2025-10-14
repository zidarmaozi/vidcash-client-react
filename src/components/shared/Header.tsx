import React from 'react';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
    return (
        <header className={`bg-black/90 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">V</span>
                        </div>
                        <span className="text-white text-xl font-bold">VidCash</span>
                    </div>

                    {/* Start Earning Button */}
                    <div className="flex items-center space-x-4">
                        <a 
                            href="https://vidcash.cc" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 font-semibold"
                        >
                            Start Earning
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};
