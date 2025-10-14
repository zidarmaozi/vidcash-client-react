import React, { useEffect, useCallback, useMemo } from 'react';
import { useVideoPlayer } from '../../hooks/useVideoPlayer';

interface VideoPlayerProps {
    videoId: string;
    onViewRecorded?: () => void;
    className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = React.memo(({ 
    videoId, 
    onViewRecorded, 
    className = '' 
}) => {
    const {
        currentTime,
        duration,
        isPlaying,
        isVideoLoading,
        isMuted,
        hoverTime,
        showPreview,
        handlePlay,
        handlePause,
        handleTimeUpdate,
        handleLoadedMetadata,
        handleError,
        handleSeek,
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave,
        handleMuteToggle,
        handleFullscreenToggle,
        formatTime,
        videoRef
    } = useVideoPlayer(videoId, onViewRecorded);

    // Set video source when videoId changes
    useEffect(() => {
        if (videoRef.current && videoId) {
            videoRef.current.src = `https://cdn.videy.co/${videoId}.mp4`;
        }
    }, [videoId, videoRef]);

    const progressPercentage = useMemo(() => 
        duration > 0 ? (currentTime / duration) * 100 : 0, 
        [currentTime, duration]
    );

    const handlePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    }, [isPlaying]);

    return (
        <div className={`w-full max-w-7xl mx-auto lg:px-8 ${className}`}>
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
                                    onClick={handlePlayPause}
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
    );
});
