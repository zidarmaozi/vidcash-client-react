import { useEffect, useState } from "react";
import LandingPage from "../components/home/LandingPage";
import videoTransfer from "../const/video-transfer";
import VideoSection from "../components/home/VideoSection";

export default function HomePage() {
    const [pageType, setPageType] = useState<'landing' | 'video'>('landing');

    useEffect(() => {
        const videoId = localStorage.getItem(videoTransfer.videoIdKey);
        const videoTs = localStorage.getItem(videoTransfer.videoOpenTimestamp);

        if (!videoId || !videoTs) {
            setPageType('landing');
            return;
        }

        // check if it already 30 minutes
        // if (Number(videoTs) > 30 * 60 * 1000) {
        //     localStorage.removeItem(videoTransfer.videoIdKey);
        //     localStorage.removeItem(videoTransfer.videoOpenTimestamp);
        //     setPageType('landing');
        //     return;
        // }

        setPageType('video');
    }, []);
    
    if (pageType === 'landing') {
        return (
            <LandingPage />
        );
    }

    return (
        <VideoSection />
    );
}