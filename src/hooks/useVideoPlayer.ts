import { useState, useRef, useEffect } from 'react';

interface VideoPlayerState {
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    isVideoLoading: boolean;
    isMuted: boolean;
    hoverTime: number;
    showPreview: boolean;
}

interface VideoPlayerActions {
    handlePlay: () => void;
    handlePause: () => void;
    handleTimeUpdate: () => void;
    handleLoadedMetadata: () => void;
    handleError: () => void;
    handleSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleMuteToggle: () => void;
    handleFullscreenToggle: () => void;
    formatTime: (time: number) => string;
}

export const useVideoPlayer = (videoId: string, onViewRecorded?: () => void): VideoPlayerState & VideoPlayerActions => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [hoverTime, setHoverTime] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const watchTimerRef = useRef<number | null>(null);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handlePlay = () => {
        setIsPlaying(true);
        if (onViewRecorded) {
            watchTimerRef.current = setTimeout(() => {
                onViewRecorded();
            }, 10000); // 10 seconds default
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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (duration > 0) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            const hoverTimeValue = percentage * duration;
            setHoverTime(hoverTimeValue);
        }
    };

    const handleMouseEnter = () => setShowPreview(true);
    const handleMouseLeave = () => setShowPreview(false);

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

    const handleFullscreenToggle = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (watchTimerRef.current) {
                clearTimeout(watchTimerRef.current);
            }
        };
    }, []);

    return {
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
    };
};
