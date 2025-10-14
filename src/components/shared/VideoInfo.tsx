import React from 'react';

interface VideoInfoProps {
    videoTitle: string;
    videoId: string;
    onReportVideo: (videoCode: string) => Promise<void>;
    className?: string;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({ 
    videoTitle, 
    videoId, 
    onReportVideo, 
    className = '' 
}) => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: videoTitle,
                    url: `${window.location.origin}/v/${videoId}`
                });
            } catch (error) {
                console.log('Share cancelled');
            }
        } else {
            try {
                await navigator.clipboard.writeText(`${window.location.origin}/v/${videoId}`);
                alert('Link copied to clipboard!');
            } catch (error) {
                console.error('Failed to copy to clipboard');
            }
        }
    };

    const handleReport = async () => {
        try {
            await onReportVideo(videoId);
            alert('Video reported successfully!');
        } catch (error) {
            alert('Failed to report video');
        }
    };

    return (
        <div className={`bg-gray-800 rounded-b-2xl md:rounded-2xl p-6 mb-6 ${className}`}>
            <h1 className="text-2xl font-bold text-white mb-4">{videoTitle}</h1>
            
            {/* Ad Notice */}
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <div>
                        <p className="text-yellow-200 font-medium text-sm">
                            Anda harus melewati beberapa iklan untuk memutar video ini!
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">VC</span>
                    </div>
                    <div>
                        <div className="text-white font-semibold">VidCash User</div>
                        <div className="text-gray-400 text-sm">Content Creator</div>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={handleShare}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share</span>
                </button>
                <button
                    onClick={handleReport}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                    Report Video
                </button>
            </div>
        </div>
    );
};
