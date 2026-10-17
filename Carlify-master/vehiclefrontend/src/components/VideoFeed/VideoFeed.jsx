import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          "https://carlify-malviyarohitttt.onrender.com/api/videos"
        );
        setVideos(res.data);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  return (
    <>
      <Navbar />
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <div className="relative h-screen flex justify-center items-center snap-center">
            <img src="/public/images/car-logo.png" alt="" srcset="" />
          <video
            src="/public/Video/Video1.mp4"   
            className="w-full h-full object-cover"
            loop
            muted
            controls
          />
          <div className="absolute bottom-5 left-5 text-white">
            <p className="text-lg font-bold">video.title</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet,odio ut voluptatibus ipsum cupiditate.
              Esse, unde!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoFeed;
