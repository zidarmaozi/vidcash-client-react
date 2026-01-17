import { useEffect, useState } from "react";

export interface FolderVideo {
    id: number;
    video_code: string;
    title: string;
    thumbnail_path: string;
    generated_link: string;
    thumbnail_url?: string;
}

export interface FolderData {
    name: string;
    slug: string;
    videos: FolderVideo[];
}

export const useFolderData = (folderSlug: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [folderData, setFolderData] = useState<FolderData | null>(null);
    
    const LARAVEL_API_URL = 'https://vidcash.cc/api';

    useEffect(() => {
        const fetchFolderVideos = async () => {
            try {
                const response = await fetch(`${LARAVEL_API_URL}/service/folder/${folderSlug}`);
                const data = await response.json();
                setFolderData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching folder videos:', error);
                setError('Error fetching folder videos');
                setIsLoading(false);
            }
        };

        fetchFolderVideos();
    }, [folderSlug]);

    return {
        folderData,
        isLoading,
        error,
    };
}