export default function RemovedPage() {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="bg-black/90 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
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

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Icon */}
                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Video Removed
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        This video is no longer available. It may have been removed by the creator or due to a violation of our terms of service.
                    </p>

                    {/* Reasons */}
                    <div className="bg-gray-800/50 rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-6">Why was this video removed?</h2>
                        <div className="space-y-4 text-left">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                                <p className="text-gray-300">The creator may have deleted the video</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                                <p className="text-gray-300">Content violated our community guidelines</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                                <p className="text-gray-300">Copyright or legal issues were reported</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                                <p className="text-gray-300">Technical issues with the video file</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a 
                            href="/"
                            className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Browse Other Videos
                        </a>
                        <a 
                            href="https://vidcash.cc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                        >
                            Start Earning
                        </a>
                    </div>

                    {/* Help Section */}
                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
                        <p className="text-gray-400 mb-4">
                            If you believe this video was removed in error, please contact our support team.
                        </p>
                        <a 
                            href="mailto:support@vidcash.cc"
                            className="text-pink-400 hover:text-pink-300 transition-colors font-medium"
                        >
                            Contact Support →
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-black border-t border-gray-800 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">V</span>
                                </div>
                                <span className="text-white text-xl font-bold">VidCash</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                The ultimate platform for video streaming and earning. Watch amazing content and get paid for every view.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-semibold mb-4">Platform</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How it Works</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Earning Guide</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Creator Tools</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-white font-semibold mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">&copy; 2024 VidCash. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}