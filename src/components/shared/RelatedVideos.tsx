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



export const RelatedVideos: React.FC<RelatedVideosProps> = React.memo(({ videos, className = '' }) => {
    if (videos.length === 0) {
        return (
            <div className={`px-6 lg:px-0 py-8 ${className}`}>
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
        <div className={`px-4 lg:px-0 py-8 ${className}`}>
            <h2 className="text-xl font-bold text-white mb-6">Related Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => {
                    // Mock avatar for UI
                    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(video.title.substring(0, 2))}&background=random&color=fff`;

                    return (
                        <a 
                            key={`${video.generated_link}-${index}`}
                            href={`${video.generated_link}?v=2`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            {/* Card Container */}
                            <div className="relative">
                                {/* Thumbnail */}
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-800 shadow-lg">
                                    {video.thumbnail_url ? (
                                        <img 
                                            src={video.thumbnail_url} 
                                            alt={video.title} 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Custom Red Play Button Overlay */}
                                    <div className="absolute bottom-4 right-4 bg-red-600 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200 z-10">
                                         <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                    
                                     {/* Duration Badge (Mocked or real if available) */}
                                    {video.duration && (
                                        <div className="absolute bottom-4 right-20 bg-black/80 px-2 py-1 rounded text-xs text-white font-medium">
                                            {video.duration}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="mt-3 flex items-start space-x-3">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <img 
                                        src={avatarUrl} 
                                        alt="Avatar" 
                                        className="w-10 h-10 rounded-full bg-gray-700"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 min-w-0 pr-6">
                                    <h3 className="text-white text-base font-semibold leading-tight line-clamp-2 group-hover:text-gray-300 transition-colors">
                                        {video.title}
                                    </h3>
                                    <div className="mt-1 flex items-center text-sm text-gray-400">
                                        <span className="truncate">VidCash User</span>
                                        {/* No views or date as requested */}
                                    </div>
                                </div>

                                {/* Menu Icon */}
                                <div className="flex-shrink-0">
                                    <button className="text-gray-400 hover:text-white p-1">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
});
