import { useRef, useState, useEffect } from 'react';

interface TikTokVideoPlayerProps {
    videoCode: string;
    isActive: boolean;
    shouldLoad: boolean;
}

export default function TikTokVideoPlayer({ videoCode, isActive, shouldLoad }: TikTokVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const [isSpeeding, setIsSpeeding] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const pressStartTimeRef = useRef<number>(0);
    const isLongPressRef = useRef<boolean>(false);
    const pressTimerRef = useRef<number | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isActive) {
                videoRef.current.play().catch(e => console.log('Auto-play prevented:', e));
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [isActive]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(e => console.log('Play prevented:', e));
            } else {
                videoRef.current.pause();
            }
        }
    };

    const handlePointerDown = () => {
        isLongPressRef.current = false;
        pressStartTimeRef.current = Date.now();
        
        pressTimerRef.current = window.setTimeout(() => {
            isLongPressRef.current = true;
            if (videoRef.current) {
                videoRef.current.playbackRate = 2.0;
                setIsSpeeding(true);
            }
        }, 500); // 500ms for long press
    };

    const handlePointerUp = () => {
        if (pressTimerRef.current) {
            clearTimeout(pressTimerRef.current);
            pressTimerRef.current = null;
        }
        
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.0;
            setIsSpeeding(false);
        }
    };

    const handleClick = () => {
        if (!isLongPressRef.current) {
            togglePlay();
        }
    };

    return (
        <div className="relative w-full h-full bg-black flex items-center justify-center select-none">
            <video
                ref={videoRef}
                className={`absolute inset-0 m-auto bg-black transition-all duration-300 origin-center object-contain ${
                    isRotated ? 'w-[100vh] h-[100vw] rotate-90' : 'w-full h-full rotate-0'
                }`}
                loop
                playsInline
                muted={isMuted}
                preload={shouldLoad ? "auto" : "none"}
                onClick={handleClick}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onContextMenu={(e) => e.preventDefault()}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedMetadata={(e) => {
                    const target = e.target as HTMLVideoElement;
                    setIsLandscape(target.videoWidth > target.videoHeight);
                }}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => setIsBuffering(false)}
                onCanPlay={() => setIsBuffering(false)}
                onTimeUpdate={(e) => {
                    const target = e.target as HTMLVideoElement;
                    if (target.duration) {
                        setProgress((target.currentTime / target.duration) * 100);
                    }
                }}
            >
                {shouldLoad && (
                    <>
                        <source src={`https://cdn.videy.co/${videoCode}.mp4`} type="video/mp4" />
                        <source src={`https://cdn.videy.co/${videoCode}.mov`} type="video/quicktime" />
                    </>
                )}
            </video>

            {/* Video Loading Overlay */}
            {shouldLoad && isBuffering && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 bg-black/40 backdrop-blur-sm">
                    <div className="relative flex items-center justify-center">
                        <div className="w-14 h-14 border-4 border-white/20 border-t-pink-500 rounded-full animate-spin"></div>
                        <svg className="absolute w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                        </svg>
                    </div>
                    <span className="text-white/90 text-xs font-semibold mt-4 tracking-widest uppercase animate-pulse drop-shadow-md">Memuat...</span>
                </div>
            )}

            {/* Play/Pause overlay */}
            {!isPlaying && !isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md">
                        <svg className="w-10 h-10 text-white ml-2 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* 2x Speed overlay */}
            {isSpeeding && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-black/60 px-5 py-2 rounded-full backdrop-blur-md pointer-events-none transition-opacity duration-200 z-50">
                    <span className="text-white font-bold tracking-wider text-sm flex items-center shadow-sm">
                        <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        2x Speed
                    </span>
                </div>
            )}

            {/* Mute Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                }}
                className={`absolute top-20 right-4 sm:right-6 z-50 bg-black/40 text-white p-2.5 rounded-full backdrop-blur-md hover:bg-white/20 transition-transform duration-300 border border-white/10 ${isRotated ? '-rotate-90' : ''}`}
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </button>

            {/* Fake Fullscreen Button for Landscape Videos */}
            {isLandscape && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsRotated(!isRotated);
                    }}
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/60 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all shadow-lg ${isRotated ? '-rotate-90 bottom-1/4' : ''}`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isRotated ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h4v4m0-4l-5 5M20 10h-4V6m0 4l5-5M4 10h4V6m0 4l-5-5M20 14h-4v4m0-4l5 5" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        )}
                    </svg>
                    {isRotated ? 'Perkecil' : 'Layar Penuh'}
                </button>
            )}

            {/* Progress Bar (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 h-4 flex items-end z-40 group cursor-pointer">
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="0.1"
                    value={isNaN(progress) ? 0 : progress}
                    onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setProgress(val);
                        if (videoRef.current && videoRef.current.duration) {
                            videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
                        }
                    }}
                    onPointerDown={(e) => e.stopPropagation()} // Prevent video double-interaction
                    onClick={(e) => e.stopPropagation()} 
                    className="w-full h-1 bg-white/20 appearance-none outline-none group-hover:h-1.5 transition-all duration-200 cursor-pointer rounded-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100"
                    style={{
                        background: `linear-gradient(to right, white ${progress}%, rgba(255,255,255,0.2) ${progress}%)`
                    }}
                />
            </div>
        </div>
    );
}
