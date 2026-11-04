
import { useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";

const VideoFeed = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => {
              console.log("Video autoplay prevented:", error);
            });
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <>
      <Navbar />

      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <div className="relative h-screen flex justify-center items-center snap-center bg-black">

          <video
            ref={videoRef}
            src="/Video/Video1.mp4"
            className="w-full h-full object-cover"
            loop
            muted
            controls
            playsInline
          />

          <div className="absolute bottom-5 left-5 text-white">
            <p className="text-lg font-bold">
              Carlify - Car Videos
            </p>

            <p className="text-sm">
              Explore your favourite cars.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default VideoFeed;
