import React from 'react';

interface FolderVideo {
    title: string;
    thumbnail_url?: string;
    duration?: string;
    views?: number;
    generated_link: string;
}

interface FolderVideosProps {
    videos: FolderVideo[];
    className?: string;
}

export const FolderVideos: React.FC<FolderVideosProps> = React.memo(({ videos, className = '' }) => {
    if (videos.length === 0) {
        return (
            <div className={`px-6 lg:px-0 py-8 ${className}`}>
                <h2 className="text-xl font-bold text-white mb-6">Folder Videos</h2>
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-400">No Folder videos available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`px-6 lg:px-0 py-8 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                    <a 
                        key={`${video.generated_link}-${index}`}
                        href={`${video.generated_link}?v=3`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer block"
                    >
                        <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-900">
                            {/* play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
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
                        </div>
                        <div className="p-4">
                            <h3 className="text-white font-semibold mb-2 line-clamp-2">{video.title}</h3>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
});
