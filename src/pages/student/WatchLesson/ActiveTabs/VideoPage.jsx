export default function VideoPage({ videoUrl, onVideoEnd }) {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      {videoUrl ? (
        <video 
          key={videoUrl} 
          className="w-full aspect-video object-cover" 
          controls 
          autoPlay
          onEnded={onVideoEnd} 
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="text-white">Video not available</div>
      )}
    </div>
  );
}