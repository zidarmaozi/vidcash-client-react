import { useState, useEffect } from 'react';

interface VideoSettings {
    video_title?: string;
    is_available?: boolean;
    watch_time_seconds?: number;
}

interface RelatedVideo {
    title: string;
    thumbnail_url?: string;
    duration?: string;
    views?: number;
    generated_link: string;
}

interface CacheData {
    settings: VideoSettings | null;
    relatedVideos: RelatedVideo[];
    timestamp: number;
}

// Cache storage with expiration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const CACHE_PREFIX = 'vidcash_cache_';

export const useVideoData = (videoId: string) => {
    const [videoTitle, setVideoTitle] = useState<string>('Loading...');
    const [videoSettings, setVideoSettings] = useState<VideoSettings | null>(null);
    const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
    const [viewRecorded, setViewRecorded] = useState(false);
    
    const LARAVEL_API_URL = 'https://vidcash.cc/api';

    // Check if cache is valid
    const isCacheValid = (cacheKey: string): boolean => {
        try {
            const cached = localStorage.getItem(cacheKey);
            if (!cached) return false;
            
            const data: CacheData = JSON.parse(cached);
            const now = Date.now();
            return (now - data.timestamp) < CACHE_DURATION;
        } catch (error) {
            console.error('Error checking cache validity:', error);
            return false;
        }
    };

    // Get cached data
    const getCachedData = (cacheKey: string): CacheData | null => {
        try {
            if (isCacheValid(cacheKey)) {
                const cached = localStorage.getItem(cacheKey);
                if (cached) {
                    return JSON.parse(cached);
                }
            }
            return null;
        } catch (error) {
            console.error('Error getting cached data:', error);
            return null;
        }
    };

    // Set cached data
    const setCachedData = (cacheKey: string, settings: VideoSettings | null, relatedVideos: RelatedVideo[]) => {
        try {
            const data: CacheData = {
                settings,
                relatedVideos,
                timestamp: Date.now()
            };
            localStorage.setItem(cacheKey, JSON.stringify(data));
        } catch (error) {
            console.error('Error setting cached data:', error);
            // If localStorage is full, try to clean up some space
            cleanupExpiredCache();
            try {
                const data: CacheData = {
                    settings,
                    relatedVideos,
                    timestamp: Date.now()
                };
                localStorage.setItem(cacheKey, JSON.stringify(data));
            } catch (retryError) {
                console.error('Failed to cache data after cleanup:', retryError);
            }
        }
    };

    // Clean up expired cache entries
    const cleanupExpiredCache = () => {
        try {
            const now = Date.now();
            const keysToRemove: string[] = [];
            
            // Get all localStorage keys that start with our cache prefix
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(CACHE_PREFIX)) {
                    try {
                        const cached = localStorage.getItem(key);
                        if (cached) {
                            const data: CacheData = JSON.parse(cached);
                            if ((now - data.timestamp) >= CACHE_DURATION) {
                                keysToRemove.push(key);
                            }
                        }
                    } catch (error) {
                        // If we can't parse the data, remove it
                        keysToRemove.push(key);
                    }
                }
            }
            
            // Remove expired entries
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                console.log('Removed expired cache entry:', key);
            });
        } catch (error) {
            console.error('Error cleaning up cache:', error);
        }
    };

    // Run cleanup every 2 minutes
    useEffect(() => {
        const cleanupInterval = setInterval(cleanupExpiredCache, 2 * 60 * 1000);
        return () => clearInterval(cleanupInterval);
    }, []);

    const getSettings = async (): Promise<VideoSettings | null> => {
        const cacheKey = `${CACHE_PREFIX}settings_${videoId}`;
        
        // Check cache first
        const cached = getCachedData(cacheKey);
        if (cached?.settings) {
            console.log('Using cached settings for video:', videoId);
            setVideoSettings(cached.settings);
            setVideoTitle(cached.settings?.video_title || 'Video Title');
            return cached.settings;
        }

        try {
            console.log('Fetching settings from server for video:', videoId);
            const response = await fetch(`${LARAVEL_API_URL}/service/settings/${videoId}`);
            if (!response.ok) throw new Error('Failed to fetch settings');
            const settings = await response.json();
            setVideoSettings(settings);
            setVideoTitle(settings?.video_title || 'Video Title');
            
            // Cache the settings
            setCachedData(cacheKey, settings, []);
            
            return settings;
        } catch (error) {
            console.error('Error fetching settings:', error);
            return null;
        }
    };

    const getRelatedVideos = async (): Promise<RelatedVideo[] | null> => {
        const cacheKey = `${CACHE_PREFIX}related_${videoId}`;
        
        // Check cache first
        const cached = getCachedData(cacheKey);
        if (cached?.relatedVideos) {
            console.log('Using cached related videos for video:', videoId);
            setRelatedVideos(cached.relatedVideos);
            return cached.relatedVideos;
        }

        try {
            console.log('Fetching related videos from server for video:', videoId);
            const response = await fetch(`${LARAVEL_API_URL}/service/related-videos/${videoId}`);
            if (!response.ok) throw new Error('Failed to fetch related videos');
            const videos = await response.json();
            const relatedVideosData = videos || [];
            setRelatedVideos(relatedVideosData);
            
            // Cache the related videos
            setCachedData(cacheKey, null, relatedVideosData);
            
            return relatedVideosData;
        } catch (error) {
            console.error('Error fetching related videos:', error);
            return null;
        }
    };

    const recordView = async (): Promise<void> => {
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

    const reportVideo = async (videoCode: string, description: string = ''): Promise<{ success: boolean; data?: any; error?: any }> => {
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

    // Initialize video data
    useEffect(() => {
        if (!videoId) return;

        const initializeVideo = async () => {
            const settings = await getSettings();
            
            if (settings && settings.is_available === false) {
                window.location.replace('/removed');
                return;
            }

            // Load related videos after a delay
            setTimeout(async () => {
                const relatedVideosData = await getRelatedVideos();
                
                // Cache the complete data for this video
                if (settings && relatedVideosData) {
                    const cacheKey = `${CACHE_PREFIX}complete_${videoId}`;
                    setCachedData(cacheKey, settings, relatedVideosData);
                }
            }, 2000);
        };

        initializeVideo();
    }, [videoId]);

    return {
        videoTitle,
        videoSettings,
        relatedVideos,
        viewRecorded,
        recordView,
        reportVideo
    };
};
