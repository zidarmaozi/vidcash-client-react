import { useEffect, useRef, memo } from "react";

// Extend window interface for fluidPlayer
declare global {
  interface Window {
    fluidPlayer: (target: HTMLVideoElement | string, options: any) => any;
  }
}

interface VideoPlayerProps {
  videoId: string;
  onViewRecorded?: () => void;
  className?: string;
}

export const VideoPlayer = memo(
  ({ videoId, onViewRecorded, className = "" }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null);
    const viewRecordedRef = useRef(false);
    const watchTimerRef = useRef<number | null>(null);
    const onViewRecordedRef = useRef(onViewRecorded);

    // Update ref when prop changes
    useEffect(() => {
      onViewRecordedRef.current = onViewRecorded;
    }, [onViewRecorded]);

    // Reset view recorded state when videoId changes
    useEffect(() => {
      viewRecordedRef.current = false;
      if (watchTimerRef.current) {
        clearTimeout(watchTimerRef.current);
        watchTimerRef.current = null;
      }
    }, [videoId]);

    useEffect(() => {
      let mounted = true;

      const initializePlayer = () => {
        if (!videoRef.current || !window.fluidPlayer) return;

        // Cleanup previous instance if exists
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch (e) {
            console.warn("Error destroying player:", e);
          }
        }

        try {
          // Initialize Fluid Player with user-defined settings
          const player = window.fluidPlayer(videoRef.current, {
            layoutControls: {
              controlBar: {
                autoHideTimeout: 3,
                animated: true,
                autoHide: true,
              },
              htmlOnPauseBlock: {
                html: null,
                height: null,
                width: null,
              },
              autoPlay: false,
              mute: true,
              allowTheatre: true,
              playPauseAnimation: true,
              playbackRateEnabled: true,
              allowDownload: false,
              playButtonShowing: true,
              fillToContainer: true,
              posterImage: "",
              controlForwardBackward: {
                show: true,
              },
              contextMenu: {
                controls: false,
                links: [],
              },
            },
            vastOptions: {
              adList: [],
              adCTAText: false,
              adCTATextPosition: "",
            },
          });

          if (mounted) {
            playerRef.current = player;

            // Setup view recording logic
            const handleTimeUpdate = () => {
              if (!videoRef.current) return;

              // Check if user has watched for 10 seconds
              if (
                !viewRecordedRef.current &&
                !videoRef.current.paused &&
                videoRef.current.currentTime > 10
              ) {
                if (onViewRecordedRef.current) {
                  onViewRecordedRef.current();
                  viewRecordedRef.current = true;
                }
              }
            };

            videoRef.current.addEventListener("timeupdate", handleTimeUpdate);

            // Cleanup event listener when component updates or unmounts will be handled in return
          }
        } catch (error) {
          console.error("Error initializing Fluid Player:", error);
        }
      };

      const loadAssets = async () => {
        // Load CSS if not present
        if (!document.querySelector('link[href*="fluidplayer.min.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://cdn.fluidplayer.com/v3/current/fluidplayer.min.css";
          document.head.appendChild(link);
        }

        // Load JS if not present
        if (!window.fluidPlayer) {
          const script = document.createElement("script");
          script.src =
            "https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js";
          script.async = true;
          script.onload = () => {
            if (mounted) initializePlayer();
          };
          document.head.appendChild(script);
        } else {
          initializePlayer();
        }
      };

      loadAssets();

      return () => {
        mounted = false;
        // Only destroy if we are actually unmounting or changing videoId,
        // NOT when onViewRecorded changes (which is handled by ref now)
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch (e) {
            console.warn("Error destroying player:", e);
          }
          playerRef.current = null;
        }
      };
    }, [videoId]); // Removed onViewRecorded from dependencies

    return (
      <div className={`w-full max-w-7xl mx-auto lg:px-8 ${className}`}>
        <div className="relative bg-black rounded-none sm:rounded-2xl overflow-hidden shadow-2xl aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full"
            width="100%"
            height="100%"
            playsInline
            controls={false}
          >
            <source
              src={`https://cdn2.videy.co/${videoId}.mp4`}
              type="video/mp4"
            />
            <source
              src={`https://cdn2.videy.co/${videoId}.mov`}
              type="video/quicktime"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  },
);
