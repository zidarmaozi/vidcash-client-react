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

export const useVideoData = (videoId: string) => {
    const [videoTitle, setVideoTitle] = useState<string>('Loading...');
    const [videoSettings, setVideoSettings] = useState<VideoSettings | null>(null);
    const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
    const [viewRecorded, setViewRecorded] = useState(false);
    
    const LARAVEL_API_URL = 'https://vidcash.cc/api';

    const getSettings = async (): Promise<VideoSettings | null> => {
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

    const getRelatedVideos = async (): Promise<RelatedVideo[] | null> => {
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
                await getRelatedVideos();
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
