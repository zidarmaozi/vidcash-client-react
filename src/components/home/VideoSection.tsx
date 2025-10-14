import { useState, useEffect, useRef } from 'react';

export default function VideoSection() {
    // State management
    const [videoId, setVideoId] = useState<string>('');
    const [videoTitle, setVideoTitle] = useState<string>('Loading...');
    const [videoSettings, setVideoSettings] = useState<any>(null);
    const [relatedVideos, setRelatedVideos] = useState<any[]>([]);
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [viewRecorded, setViewRecorded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hoverTime, setHoverTime] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    
    // Refs
    const videoRef = useRef<HTMLVideoElement>(null);
    const watchTimerRef = useRef<number | null>(null);
    
    // API Configuration
    const LARAVEL_API_URL = 'https://vidcash.cc/api';
    
    // Get video ID from URL or localStorage
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const idFromUrl = urlParams.get('id');
        const idFromStorage = localStorage.getItem('videoId');
        const videoId = idFromUrl || idFromStorage || '';
        setVideoId(videoId);
    }, []);

    // Fetch video settings
    const getSettings = async () => {
        try {
            const response = await fetch(`${LARAVEL_API_URL}/service/settings/${videoId}`);
            if (!response.ok) throw new Error('Failed to fetch settings');
            const settings = await response.json();
            setVideoSettings(settings);
            setVideoTitle(settings?.video_title || 'Video Title');
            return settings;
        } catch (error) {
            console.error('Error fetching settings:', error);
            return null;
        }
    };

    // Fetch related videos
    const getRelatedVideos = async () => {
        try {
            const response = await fetch(`${LARAVEL_API_URL}/service/related-videos/${videoId}`);
            if (!response.ok) throw new Error('Failed to fetch related videos');
            const videos = await response.json();
            setRelatedVideos(videos || []);
            return videos;
        } catch (error) {
            console.error('Error fetching related videos:', error);
            return null;
        }
    };

    // Record view
    const recordView = async () => {
        if (viewRecorded) return;
        setViewRecorded(true);
        
        try {
            const response = await fetch(`${LARAVEL_API_URL}/service/record-view`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Via': localStorage.getItem('videoVia') || '1',
                },
                body: JSON.stringify({ video_code: videoId })
            });
            
            const result = await response.json();
            console.log('View recorded:', result);
        } catch (error) {
            console.error('Error recording view:', error);
        }
    };

    // Report video
    const reportVideo = async (videoCode: string, description: string = '') => {
        try {
            const response = await fetch(`${LARAVEL_API_URL}/report-video`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    video_code: videoCode,
                    description: description
                })
            });

            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error('Error reporting video:', error);
            return { success: false, error };
        }
    };

    // Handle video events
    const handlePlay = () => {
        setIsPlaying(true);
        if (!viewRecorded && videoSettings) {
            const requiredWatchTime = videoSettings.watch_time_seconds || 10;
            watchTimerRef.current = setTimeout(() => {
                recordView();
            }, requiredWatchTime * 1000);
        }
    };

    const handlePause = () => {
        setIsPlaying(false);
        if (watchTimerRef.current) {
            clearTimeout(watchTimerRef.current);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            const video = videoRef.current;
            setDuration(video.duration);
            setIsVideoLoading(false);
        }
    };

    const handleError = () => {
        console.warn('Primary video failed to load. Attempting fallback...');
        if (videoRef.current) {
            videoRef.current.src = `https://cdn.videy.co/${videoId}.mov`;
            videoRef.current.load();
        }
    };

    // Initialize video
    useEffect(() => {
        if (!videoId) return;

        const initializeVideo = async () => {
            const settings = await getSettings();
            
            if (settings && settings.is_available === false) {
                window.location.replace('/removed');
                return;
            }

            if (videoRef.current) {
                videoRef.current.src = `https://cdn.videy.co/${videoId}.mp4`;
            }

            // Load related videos after a delay
            setTimeout(async () => {
                await getRelatedVideos();
            }, 2000);
        };

        initializeVideo();
    }, [videoId]);

    // Load external script only on this page
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//pl27849312.effectivegatecpm.com/d9/82/0e/d9820eb8ae9d102d3465d76124d10179.js';
        script.async = true;
        
        // Add script to head
        document.head.appendChild(script);
        
        // Cleanup function to remove script when component unmounts
        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (watchTimerRef.current) {
                clearTimeout(watchTimerRef.current);
            }
        };
    }, []);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Handle seeking
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current && duration > 0) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = percentage * duration;
            
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    // Handle mouse move for preview
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (duration > 0) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const hoverTimeValue = percentage * duration;
            setHoverTime(hoverTimeValue);
        }
    };

    // Handle mouse enter/leave for preview
    const handleMouseEnter = () => setShowPreview(true);
    const handleMouseLeave = () => setShowPreview(false);

    // Handle mute toggle
    const handleMuteToggle = () => {
        if (videoRef.current) {
            if (isMuted) {
                videoRef.current.muted = false;
                setIsMuted(false);
            } else {
                videoRef.current.muted = true;
                setIsMuted(true);
            }
        }
    };

    // Handle fullscreen toggle
    const handleFullscreenToggle = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
    };

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

            {/* Video Player - Full Width on Mobile, Constrained on Desktop */}
            <div className="w-full max-w-7xl mx-auto lg:px-8">
                {/* Custom Video Player */}
                <div className="relative bg-black rounded-none sm:rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative w-full aspect-video">
                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            className="w-full h-full object-contain"
                            onPlay={handlePlay}
                            onPause={handlePause}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onError={handleError}
                            controls={false}
                            preload="metadata"
                        >
                            Your browser does not support the video tag.
                        </video>

                        {/* Loading Overlay */}
                        {isVideoLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                                    <p className="text-white text-lg font-semibold">Loading video...</p>
                                </div>
                            </div>
                        )}

                        {/* Video Controls Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                    <button 
                                        onClick={() => {
                                            if (videoRef.current) {
                                                if (isPlaying) {
                                                    videoRef.current.pause();
                                                } else {
                                                    videoRef.current.play();
                                                }
                                            }
                                        }}
                                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    >
                                        {isPlaying ? (
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                            </svg>
                                        )}
                                    </button>
                                    <div className="text-white">
                                        <div className="text-xs text-gray-300">{formatTime(currentTime)} / {formatTime(duration)}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                    {/* Simple Volume Button */}
                                    <button
                                        onClick={handleMuteToggle}
                                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    >
                                        {isMuted ? (
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                                            </svg>
                                        )}
                                    </button>

                                    {/* Fullscreen Button */}
                                    <button
                                        onClick={handleFullscreenToggle}
                                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div 
                                className="w-full bg-white/20 rounded-full h-2 cursor-pointer hover:h-3 transition-all duration-200 group relative"
                                onClick={handleSeek}
                                onMouseMove={handleMouseMove}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div 
                                    className="bg-gradient-to-r from-pink-500 to-violet-500 h-full rounded-full transition-all duration-300 relative group-hover:from-pink-400 group-hover:to-violet-400" 
                                    style={{width: `${progressPercentage}%`}}
                                >
                                    {/* Seek indicator */}
                                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"></div>
                                </div>
                                
                                {/* Preview tooltip */}
                                {showPreview && (
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none">
                                        {formatTime(hoverTime)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video Info and Related Videos */}
                    <div className="lg:col-span-2 md:px-8 md:mt-8">
                        {/* Video Info */}
                        <div className="bg-gray-800 rounded-b-2xl md:rounded-2xl p-6 mb-6">
                            <h1 className="text-2xl font-bold text-white mb-4">{videoTitle}</h1>
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">VC</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">VidCash User</div>
                                        <div className="text-gray-400 text-sm">Content Creator</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    onClick={async () => {
                                        if (navigator.share) {
                                            try {
                                                await navigator.share({
                                                    title: videoTitle,
                                                    url: `${window.location.origin}/v/${videoId}`
                                                });
                                            } catch (error) {
                                                console.log('Share cancelled');
                                            }
                                        } else {
                                            try {
                                                await navigator.clipboard.writeText(`${window.location.origin}/v/${videoId}`);
                                                alert('Link copied to clipboard!');
                                            } catch (error) {
                                                console.error('Failed to copy to clipboard');
                                            }
                                        }
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                    <span>Share</span>
                                </button>
                                <button
                                    onClick={async () => {
                                        const result = await reportVideo(videoId);
                                        if (result.success) {
                                            alert('Video reported successfully!');
                                        } else {
                                            alert('Failed to report video');
                                        }
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                    Report Video
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Videos Sidebar */}
                    <div className="lg:col-span-1 px-4 sm:px-6 lg:px-8 py-8">
                        <h2 className="text-xl font-bold text-white mb-6">Related Videos</h2>
                        <div className="space-y-4">
                            {relatedVideos.length > 0 ? (
                                relatedVideos.map((video, index) => (
                                    <a 
                                        key={index}
                                        href={`${video.generated_link}?v=2`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer block"
                                    >
                                        <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-900">
                                            {video.thumbnail_url ? (
                                                <img 
                                                    src={video.thumbnail_url} 
                                                    alt="Video Thumbnail" 
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="absolute bottom-2 right-2 bg-black/80 rounded px-2 py-1">
                                                <span className="text-white text-xs">{video.duration || '0:00'}</span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
                                            <div className="flex items-center space-x-2 mb-2">
                                                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-xs">VC</span>
                                                </div>
                                                <span className="text-gray-400 text-sm">VidCash User</span>
                                            </div>
                                            <div className="flex items-center justify-between text-gray-400 text-sm">
                                                <span>{video.views || 0} views</span>
                                                <span>Recently uploaded</span>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-400">No related videos available</p>
                                </div>
                            )}
                        </div>
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