import React from 'react';
import telegram from '../../const/telegram';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = React.memo(({ className = '' }) => {
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

                    {/* Telegram Banner - Hidden on Mobile */}
                    <div className="hidden sm:flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5">
                        <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        <a 
                            href={telegram.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors"
                        >
                            Join Telegram
                        </a>
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
});
