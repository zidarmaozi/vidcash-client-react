import React, { useCallback } from 'react';
import telegram from '../../const/telegram';
import { Link } from 'react-router';

interface VideoInfoProps {
    videoTitle: string;
    videoId: string;
    onReportVideo: (videoCode: string) => Promise<void>;
    className?: string;
    folder?: {
        name: string;
        slug: string;
        video_count: number;
    } | null;
}

export const VideoInfo: React.FC<VideoInfoProps> = React.memo(({ 
    videoTitle, 
    videoId, 
    onReportVideo, 
    className = '',
    folder = null
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

            {folder && (
                <Link 
                    to={`/f/${folder.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="group relative z-[999999999999] bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 hover:from-violet-500/20 hover:to-fuchsia-500/20 border border-violet-500/30 rounded-xl p-4 mb-6 transition-all duration-300 hover:border-violet-500/50"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-violet-200 text-xs font-medium uppercase tracking-wider mb-0.5">Buka Folder</p>
                                <h3 className="text-white font-bold text-lg group-hover:text-violet-200 transition-colors line-clamp-1">{folder.name}</h3>
                                <div className="flex items-center mt-1">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-violet-500/20 text-violet-200 border border-violet-500/20">
                                        {folder.video_count}+ Videos
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                                <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
            
            {/* Telegram Channel Banner */}
            <div className="mb-4">
                <a 
                    href={telegram.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="relative flex z-[999999999999] items-center justify-between bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg px-4 py-3 transition-colors group"
                >
                    <div className="flex items-center space-x-3">
                         <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        <span className="text-blue-200 font-medium text-sm">Join Telegram Channel</span>
                    </div>
                    <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>

            {/* Ad Notice */}
            <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2 mb-4">
                <svg className="w-4 h-4 text-yellow-500/80 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <p className="text-yellow-200/90 text-xs">
                    Anda harus melewati beberapa iklan untuk memutar video ini!
                </p>
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
