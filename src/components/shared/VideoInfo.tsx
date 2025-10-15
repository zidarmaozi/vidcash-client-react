import React, { useCallback } from 'react';
import telegram from '../../const/telegram';

interface VideoInfoProps {
    videoTitle: string;
    videoId: string;
    onReportVideo: (videoCode: string) => Promise<void>;
    className?: string;
}

export const VideoInfo: React.FC<VideoInfoProps> = React.memo(({ 
    videoTitle, 
    videoId, 
    onReportVideo, 
    className = '' 
}) => {
    const handleShare = useCallback(async () => {
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
    }, [videoTitle, videoId]);

    const handleReport = useCallback(async () => {
        try {
            await onReportVideo(videoId);
            alert('Video reported successfully!');
        } catch (error) {
            alert('Failed to report video');
        }
    }, [onReportVideo, videoId]);

    return (
        <div className={`bg-gray-800 rounded-b-2xl md:rounded-2xl p-6 mb-6 ${className}`}>
            <h1 className="text-2xl font-bold text-white mb-4">{videoTitle}</h1>
            
            {/* Telegram Channel Banner */}
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-blue-200 font-semibold text-sm">Join Our Telegram Channel</h3>
                            <p className="text-blue-300 text-xs">Get latest updates and exclusive content</p>
                        </div>
                    </div>
                    <a 
                        href={telegram.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        <span>Join Now</span>
                    </a>
                </div>
            </div>

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
});
