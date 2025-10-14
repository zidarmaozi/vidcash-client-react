export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Navigation */}
            <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">V</span>
                        </div>
                        <span className="text-white text-xl font-bold">VidCash</span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                        <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
                        <a href="#earnings" className="text-gray-300 hover:text-white transition-colors">Earnings</a>
                    </div>
                    <button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105">
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Stream Videos,
                            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent"> Earn Money</span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Transform your video content into a revenue stream. Watch, share, and earn with every view on our revolutionary platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Start Earning Now
                            </button>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-pink-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-violet-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
            </section>

            {/* Video Player Demo Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 bg-black/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Experience Premium Video Streaming
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Watch high-quality videos and earn money with every view
                        </p>
                    </div>
                    
                    {/* Video Player Container */}
                    <div className="relative max-w-5xl mx-auto">
                        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                            {/* Video Player */}
                            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
                                {/* Video Placeholder/Preview */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-all duration-300 cursor-pointer">
                                            <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        </div>
                                        <p className="text-white text-lg font-semibold">Click to Play Demo Video</p>
                                        <p className="text-gray-400 text-sm">Earn $0.05 per view</p>
                                    </div>
                                </div>
                                
                                {/* Video Controls Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            </button>
                                            <div className="text-white">
                                                <div className="text-sm font-medium">Demo Video</div>
                                                <div className="text-xs text-gray-300">2:45 / 5:30</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                </div>
                                                <span className="text-white text-sm font-medium">+$0.05</span>
                                            </div>
                                            
                                            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                            
                                            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="w-full bg-white/20 rounded-full h-1">
                                            <div className="bg-gradient-to-r from-pink-500 to-violet-500 h-1 rounded-full" style={{width: '50%'}}></div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Quality Badge */}
                                <div className="absolute top-4 right-4">
                                    <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                                        <span className="text-white text-sm font-medium">4K</span>
                                    </div>
                                </div>
                                
                                {/* Live Badge */}
                                <div className="absolute top-4 left-4">
                                    <div className="bg-red-600 rounded-full px-3 py-1 flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                        <span className="text-white text-sm font-medium">LIVE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Video Stats */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">1.2M+</div>
                                <div className="text-gray-300">Total Views</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">$60K+</div>
                                <div className="text-gray-300">Earned by Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">4.8★</div>
                                <div className="text-gray-300">User Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Why Choose VidCash?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Experience the future of video monetization with our cutting-edge platform
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Instant Earnings</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Earn money immediately for every video you watch and share. No waiting, no delays.
                            </p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">High-Quality Streaming</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Enjoy crystal-clear video quality with our advanced streaming technology.
                            </p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Secure & Reliable</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Your earnings are protected with bank-level security and instant payouts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Start earning in just three simple steps
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                                1
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Sign Up</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Create your free account in seconds. No credit card required.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                                2
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Watch & Share</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Browse our video library and share content you love with your network.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                                3
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Earn Money</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Get paid for every view and interaction. Withdraw your earnings anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Earnings Preview Section */}
            <section id="earnings" className="px-4 sm:px-6 lg:px-8 py-20 bg-black/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Real Earnings, Real People
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Join thousands of users already earning with VidCash
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">$2.5M+</div>
                            <div className="text-gray-300">Total Paid Out</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">50K+</div>
                            <div className="text-gray-300">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">$127</div>
                            <div className="text-gray-300">Average Monthly</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">24/7</div>
                            <div className="text-gray-300">Support</div>
                        </div>
                    </div>
                    
                    {/* Testimonials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold">
                                    S
                                </div>
                                <div className="ml-4">
                                    <div className="text-white font-semibold">Sarah M.</div>
                                    <div className="text-gray-300 text-sm">Content Creator</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">
                                "I've earned over $500 in my first month just by sharing videos I love. VidCash has changed my life!"
                            </p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                    M
                                </div>
                                <div className="ml-4">
                                    <div className="text-white font-semibold">Mike R.</div>
                                    <div className="text-gray-300 text-sm">Student</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">
                                "Perfect for students like me. I earn money while studying and watching educational content."
                            </p>
                        </div>
                        
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                                    A
                                </div>
                                <div className="ml-4">
                                    <div className="text-white font-semibold">Alex T.</div>
                                    <div className="text-gray-300 text-sm">Freelancer</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">
                                "The best passive income source I've found. Easy to use and payments are always on time."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Ready to Start Earning?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        Join thousands of users who are already earning with VidCash. Start your journey today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Get Started Free
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-4 sm:px-6 lg:px-8 py-12 border-t border-white/20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">V</span>
                            </div>
                            <span className="text-white text-xl font-bold">VidCash</span>
                        </div>
                        <div className="flex space-x-6 text-gray-300">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Support</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/20 text-center text-gray-400">
                        <p>&copy; 2024 VidCash. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}