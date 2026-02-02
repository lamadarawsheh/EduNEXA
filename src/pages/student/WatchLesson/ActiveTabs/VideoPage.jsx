export default function VideoPage() {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <video 
        className="w-full aspect-video object-cover" 
        controls 
        poster="../../../../image/Video Player.png"
      >
        <source src="your-video-link.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}