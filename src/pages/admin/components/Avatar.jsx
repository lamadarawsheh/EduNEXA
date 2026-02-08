import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Avatar({
  src,
  name = "",
  size = 40,
}) {
  const [imgError, setImgError] = useState(false);

  const initials = name
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const showImage = src && !imgError;

  return (
    <div
      className="flex items-center justify-center rounded-full overflow-hidden bg-gray-200 text-gray-700 font-bold"
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : name ? (
        <span>{initials}</span>
      ) : (
        <FaUserCircle size={size} />
      )}
    </div>
  );
}
