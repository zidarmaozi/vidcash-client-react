import { useState, useEffect } from 'react';

export const useVideoId = () => {
    const [videoId, setVideoId] = useState<string>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const idFromUrl = urlParams.get('id');
        const idFromStorage = localStorage.getItem('videoId');
        const videoId = idFromUrl || idFromStorage || '';
        setVideoId(videoId);
    }, []);

    return videoId;
};
