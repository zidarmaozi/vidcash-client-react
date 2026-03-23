import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import TikTokVideoPlayer from '../components/shared/TikTokVideoPlayer';

interface Video {
    id: number;
    video_code: string;
    title: string;
    thumbnail_path?: string;
    thumbnail_url?: string;
}

export default function VidShortPage() {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [allVideos, setAllVideos] = useState<Video[]>([]);
    const [displayCount, setDisplayCount] = useState(3);
    const [loading, setLoading] = useState(true);
    const [fetchingMore, setFetchingMore] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    // Search overlay states
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [exploreVideos, setExploreVideos] = useState<Video[]>([]);
    const [explorePage, setExplorePage] = useState(1);
    const [isExploreLoading, setIsExploreLoading] = useState(false);

    const handleOpenSearch = async () => {
        setIsSearchOpen(true);
        if (exploreVideos.length === 0) {
            setIsExploreLoading(true);
            try {
                // Fetch fresh videos for explore feed
                const response = await fetch('https://vidcash.cc/api/service/related-videos');
                if (response.ok) {
                    const data = await response.json();
                    setExploreVideos(data || []);
                }
            } catch(e) {
                console.error("Explore fetch failed", e);
            } finally {
                setIsExploreLoading(false);
            }
        }
    };

    const observerRef = useRef<IntersectionObserver | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const url = videoId 
                    ? `https://vidcash.cc/api/service/related-videos/${videoId}` 
                    : 'https://vidcash.cc/api/service/related-videos';
                    
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    let videoList: Video[] = data || [];
                    
                    // Selalu acak total urutan array (Fisher-Yates Shuffle)
                    for (let i = videoList.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [videoList[i], videoList[j]] = [videoList[j], videoList[i]];
                    }
                    
                    // Posisikan video dari URL di urutan paling atas jika ada
                    if (videoId) {
                        const targetIdx = videoList.findIndex(v => v.video_code === videoId);
                        if (targetIdx !== -1) {
                            const [targetVid] = videoList.splice(targetIdx, 1);
                            videoList.unshift(targetVid);
                        } else {
                            videoList.unshift({
                                id: Date.now(),
                                video_code: videoId,
                                title: `Video ${videoId}`,
                                thumbnail_path: ''
                            });
                        }
                    }
                    
                    setAllVideos([...videoList]);
                    setDisplayCount(3);
                }
            } catch (err) {
                console.error("Failed to fetch videos", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, [videoId]);

    const displayedVideos = allVideos.slice(0, displayCount);

    // Load 3 more videos when reaching the end of the currently displayed list
    useEffect(() => {
        if (activeIndex >= displayCount - 1 && !fetchingMore) {
            if (displayCount + 3 <= allVideos.length) {
                setDisplayCount(prev => prev + 3);
            } else {
                setFetchingMore(true);
                fetch('https://vidcash.cc/api/service/related-videos')
                    .then(res => res.json())
                    .then(data => {
                        setAllVideos(prev => {
                            const existingCodes = new Set(prev.map(v => v.video_code));
                            const newVideos = data.filter((v: Video) => !existingCodes.has(v.video_code));
                            
                            // Acak juga video tambahan yang baru dimuat
                            for (let i = newVideos.length - 1; i > 0; i--) {
                                const j = Math.floor(Math.random() * (i + 1));
                                [newVideos[i], newVideos[j]] = [newVideos[j], newVideos[i]];
                            }
                            
                            return [...prev, ...newVideos];
                        });
                        setDisplayCount(prev => prev + 3);
                    })
                    .finally(() => setFetchingMore(false));
            }
        }
    }, [activeIndex, displayCount, allVideos.length, fetchingMore]);

    // Intersection observer logic to update active index and URL
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = Number(entry.target.getAttribute('data-index'));
                if (!isNaN(index)) {
                    setActiveIndex(index);
                    // Update URL silently without triggering React Router loop
                    if (displayedVideos[index]) {
                        window.history.replaceState(null, '', `/vidshort/${displayedVideos[index].video_code}`);
                    }
                }
            }
        });
    }, [displayedVideos]);

    useEffect(() => {
        const options = {
            root: containerRef.current,
            rootMargin: '0px',
            threshold: 0.6, // Trigger when 60% of the video is in view
        };
        
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        
        observerRef.current = new IntersectionObserver(handleObserver, options);
        const elements = document.querySelectorAll('.video-snap-item');
        elements.forEach((el) => observerRef.current?.observe(el));

        return () => observerRef.current?.disconnect();
    }, [displayedVideos, handleObserver]);

    // Custom wheel handler to strictly scroll exactly one video at a time
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            
            if (isScrollingRef.current) return;
            isScrollingRef.current = true;
            
            const direction = e.deltaY > 0 ? 1 : -1;
            const clientHeight = container.clientHeight;
            
            // Calculate exactly where we are
            const currentSnapIndex = Math.round(container.scrollTop / clientHeight);
            const nextIndex = currentSnapIndex + direction;
            
            // Prevent scrolling out of bounds
            if (nextIndex < 0) {
                isScrollingRef.current = false;
                return;
            }
            
            container.scrollTo({
                top: nextIndex * clientHeight,
                behavior: 'smooth'
            });

            // Lock scrolling for 750ms so the user can't spam their mouse wheel 
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 750);
        };

        // passive: false is required to allow e.preventDefault()
        container.addEventListener('wheel', handleWheel, { passive: false });
        
        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const handleScrollNavigation = (direction: 'up' | 'down') => {
        const container = containerRef.current;
        if (!container) return;
        
        const clientHeight = container.clientHeight;
        const currentSnapIndex = Math.round(container.scrollTop / clientHeight);
        const nextIndex = direction === 'down' ? currentSnapIndex + 1 : currentSnapIndex - 1;
        
        if (nextIndex >= 0) {
            container.scrollTo({
                top: nextIndex * clientHeight,
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory scroll-smooth relative"
        >
            {/* Overlay Navigation Header */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm">
                <button 
                    onClick={() => navigate('/')}
                    className="p-2 bg-black/40 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <div className="text-white font-bold tracking-wide text-lg drop-shadow-md">
                    VidShort
                </div>
                <button 
                    onClick={handleOpenSearch}
                    className="p-2 bg-black/40 rounded-full backdrop-blur-md text-white hover:bg-white/20 transition-colors"
                    aria-label="Search"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            {/* Search/Explore Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[60] bg-black overflow-y-auto pointer-events-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-black/90 backdrop-blur-md z-10 px-4 py-3 flex items-center gap-3 border-b border-white/10">
                        <button onClick={() => setIsSearchOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div className="flex-1 bg-white/10 rounded-full flex items-center px-4 py-2 border border-white/20 focus-within:border-pink-500 transition-colors">
                            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setExplorePage(1); }}
                                placeholder="Cari video..." 
                                className="bg-transparent text-white w-full outline-none placeholder-gray-400 text-sm"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 pb-12">
                        {isExploreLoading && exploreVideos.length === 0 ? (
                            <div className="flex justify-center py-16">
                                <div className="w-12 h-12 border-4 border-white/20 border-t-pink-500 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    {exploreVideos
                                        .filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .slice(0, explorePage * 6)
                                        .map((v) => (
                                        <div 
                                            key={v.id} 
                                            className="relative aspect-[9/16] rounded-md overflow-hidden bg-gray-900 cursor-pointer group border border-white/5 hover:border-white/20 transition-all"
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                // Trigger fresh feed directly to this video
                                                navigate(`/vidshort/${v.video_code}`);
                                            }}
                                        >
                                            <img 
                                                src={v.thumbnail_url || v.thumbnail_path || `https://cdn2.videy.co/${v.video_code}.jpg`} 
                                                alt={v.title} 
                                                className="absolute w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform" 
                                                onError={(e) => { e.currentTarget.setAttribute('src', 'https://via.placeholder.com/300x533?text=Video'); }} 
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/70 to-transparent">
                                                <p className="text-white text-xs sm:text-sm font-semibold line-clamp-2 drop-shadow-md leading-relaxed">{v.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination / Load More */}
                                {!isExploreLoading && exploreVideos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase())).length > explorePage * 6 && (
                                    <div className="mt-8 mb-4 flex justify-center">
                                        <button 
                                            onClick={() => setExplorePage(p => p + 1)}
                                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full font-semibold transition-colors border border-white/20 text-sm shadow-lg flex items-center gap-2"
                                        >
                                            <span>Muat 6 Berikutnya</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </button>
                                    </div>
                                )}
                                
                                {!isExploreLoading && exploreVideos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                    <div className="text-center py-20 text-gray-400 text-sm">
                                        Tidak ada video yang cocok dengan pencarian "{searchQuery}"
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Global Manual Scroll Controls */}
            {displayedVideos.length > 0 && (
                <div className="fixed top-1/2 right-4 sm:right-6 -translate-y-1/2 z-50 flex flex-col items-center gap-3 bg-black/20 p-2 rounded-full backdrop-blur-md">
                    <button 
                        onClick={() => handleScrollNavigation('up')}
                        disabled={activeIndex === 0}
                        className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-black/40 transition-colors pointer-events-auto cursor-pointer"
                        aria-label="Previous Video"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => handleScrollNavigation('down')}
                        className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto cursor-pointer"
                        aria-label="Next Video"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            )}

            {displayedVideos.length === 0 && (
                <div className="h-full w-full flex items-center justify-center text-white">
                    No videos found.
                </div>
            )}

            {displayedVideos.map((video, index) => (
                <div 
                    key={`${video.video_code}-${index}`} 
                    data-index={index}
                    className="video-snap-item h-[100dvh] w-full snap-start snap-always relative overflow-hidden flex items-center justify-center bg-black"
                >
                    <TikTokVideoPlayer 
                        videoCode={video.video_code} 
                        isActive={index === activeIndex} 
                        shouldLoad={index === activeIndex}
                    />
                    
                    {/* Dark gradient at the bottom for text readability */}
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10"></div>

                    {/* Basic Info Overlay */}
                    <div className="absolute bottom-10 left-4 right-20 z-20 pointer-events-none">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-white font-bold text-xl drop-shadow-lg line-clamp-3">
                                {video.title}
                            </h2>
                            <span className="text-white/80 text-sm font-medium">#{video.video_code}</span>
                        </div>
                    </div>

                    {/* Action Buttons Overlay (Right Side) */}
                    <div className="absolute bottom-10 right-4 z-30 flex flex-col items-center gap-6">
                        {/* Like Button */}
                        <button className="flex flex-col items-center gap-1 group cursor-pointer">
                            <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-black/80 transition-all hover:scale-105 active:scale-95">
                                <svg className="w-6 h-6 text-white group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <span className="text-white text-xs font-semibold drop-shadow-md">Like</span>
                        </button>
                        
                        {/* Comment Button */}
                        <button className="flex flex-col items-center gap-1 group cursor-pointer">
                            <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-black/80 transition-all hover:scale-105 active:scale-95">
                                <svg className="w-6 h-6 text-white group-hover:text-violet-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
                                    <path d="M6 12h12v2H6zm0-3h12v2H6zm0-3h12v2H6z" />
                                </svg>
                            </div>
                            <span className="text-white text-xs font-semibold drop-shadow-md">Comment</span>
                        </button>

                        {/* Share Button */}
                        <button className="flex flex-col items-center gap-1 group cursor-pointer">
                            <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-black/80 transition-all hover:scale-105 active:scale-95">
                                <svg className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                </svg>
                            </div>
                            <span className="text-white text-xs font-semibold drop-shadow-md">Share</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
