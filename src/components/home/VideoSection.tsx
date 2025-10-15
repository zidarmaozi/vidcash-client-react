import { useEffect, useCallback } from 'react';
import { useVideoId } from '../../hooks/useVideoId';
import { useVideoData } from '../../hooks/useVideoData';
import { Header, Footer, VideoPlayer, VideoInfo, RelatedVideos } from '../shared';

export default function VideoSection() {
    const videoId = useVideoId();
    const { videoTitle, relatedVideos, recordView, reportVideo } = useVideoData(videoId);

    // Load external script only on this page
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//pl27849312.effectivegatecpm.com/d9/82/0e/d9820eb8ae9d102d3465d76124d10179.js';
        script.async = true;
        
        // Add script to head
        document.head.appendChild(script);
        
        // Cleanup function to remove script when component unmounts
        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const handleReportVideo = useCallback(async (videoCode: string) => {
        const result = await reportVideo(videoCode);
        if (!result.success) {
            throw new Error('Failed to report video');
        }
    }, [reportVideo]);

    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            
            <VideoPlayer 
                videoId={videoId} 
                onViewRecorded={recordView}
            />

            <div className="max-w-7xl mx-auto">
                <div className="lg:px-8 lg:mt-8">
                    <VideoInfo 
                        videoTitle={videoTitle}
                        videoId={videoId}
                        onReportVideo={handleReportVideo}
                    />

                    <RelatedVideos videos={relatedVideos} />
                </div>
            </div>

            <Footer />
        </div>
    );
}