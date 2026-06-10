export default function VideoBackground({
  src,
  poster,
  className = "",
  overlay = true,
  opacity = 1,
}) {
  if (!src) {
    return (
      <div className={`video-placeholder ${className}`} aria-hidden="true">
        <div className="video-placeholder-noise" />
      </div>
    );
  }

  return (
    <div className={`video-bg ${className}`} style={{ opacity }} aria-hidden="true">
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {overlay && <div className="video-bg-overlay" />}
    </div>
  );
}