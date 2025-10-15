import { useRedirector } from '../hooks/useRedirector';

export default function RedirectorPage() {
    const { redirectMessage, progress } = useRedirector();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                        <span className="text-white font-bold text-3xl">V</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">VidCash</h1>
                    <p className="text-gray-300">Video Streaming Platform</p>
                </div>

                {/* Loading Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                    {/* Loading Animation */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-spin border-t-pink-500"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-violet-500"></div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-white mb-2">
                            {redirectMessage}
                        </h2>
                        <p className="text-gray-300 text-sm">
                            Please wait while we prepare your video experience...
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-300 mb-2">
                            <span>Loading</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                            <div 
                                className="h-2 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Secure video streaming</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                            <span>Earn while watching</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                            <span>High-quality content</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-gray-400 text-xs">
                        Powered by VidCash Technology
                    </p>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
        </div>
    );
}