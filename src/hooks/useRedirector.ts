import { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router';
import videoTransfer from '../const/video-transfer';

interface RedirectorState {
    redirectMessage: string;
    progress: number;
}

interface RedirectorActions {
    handleRedirect: () => void;
}

export const useRedirector = (): RedirectorState & RedirectorActions => {
    const { videoId } = useParams();
    const [searchParams] = useSearchParams();
    const [redirectMessage, setRedirectMessage] = useState('Preparing redirect...');
    const [progress, setProgress] = useState(0);

    const handleRedirect = useCallback(() => {
        if (!videoId) {
            setRedirectMessage('Redirecting to VidCash...');
            setProgress(100);
            
            setTimeout(() => {
                window.location.replace('https://vidcash.cc');
            }, 500);
            return;
        }

        // Store video data in localStorage
        localStorage.setItem(videoTransfer.videoIdKey, videoId);
        localStorage.setItem(videoTransfer.videoOpenTimestamp, Date.now().toString());
        localStorage.setItem(videoTransfer.videoViaKey, searchParams.get('v') || '1');

        setRedirectMessage('Loading video...');
        setProgress(50);

        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 70);

        setTimeout(() => {
            clearInterval(progressInterval);
            setProgress(100);
            setRedirectMessage('Redirecting...');

            if (window.location.hostname.startsWith('localhost')) {
                window.location.href = `/`;
            } else {
                window.location.href = 'https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://vidcash.cfd/&ved=2ahUKEwiWqOCr5qSQAxVEd2wGHZwINx4QFnoECBcQAQ&usg=AOvVaw2h3YlYrhegakvncvpVpCAR';
            }
        }, 600);
    }, [videoId, searchParams]);

    useEffect(() => {
        handleRedirect();
    }, [handleRedirect]);

    return {
        redirectMessage,
        progress,
        handleRedirect
    };
};
