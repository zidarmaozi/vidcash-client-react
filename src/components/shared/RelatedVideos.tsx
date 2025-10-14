import React from 'react';

interface RelatedVideo {
    title: string;
    thumbnail_url?: string;
    duration?: string;
    views?: number;
    generated_link: string;
}

interface RelatedVideosProps {
    videos: RelatedVideo[];
    className?: string;
}

export const RelatedVideos: React.FC<RelatedVideosProps> = ({ videos, className = '' }) => {
    if (videos.length === 0) {
        return (
            <div className={`py-8 ${className}`}>
                <h2 className="text-xl font-bold text-white mb-6">Related Videos</h2>
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-400">No related videos available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`py-8 ${className}`}>
            <h2 className="text-xl font-bold text-white mb-6">Related Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                    <a 
                        key={index}
                        href={`${video.generated_link}?v=2`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer block"
                    >
                        <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-900">
                            {video.thumbnail_url ? (
                                <img 
                                    src={video.thumbnail_url} 
                                    alt="Video Thumbnail" 
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                            )}
                            <div className="absolute bottom-2 right-2 bg-black/80 rounded px-2 py-1">
                                <span className="text-white text-xs">{video.duration || '0:00'}</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">VC</span>
                                </div>
                                <span className="text-gray-400 text-sm">VidCash User</span>
                            </div>
                            <div className="flex items-center justify-between text-gray-400 text-sm">
                                <span>{video.views || 0} views</span>
                                <span>Recently uploaded</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
