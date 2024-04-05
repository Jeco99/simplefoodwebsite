import { useState } from "react";
import { Movies } from "../dataInterface";
import { validateHttps, phoneNumber_format, formatTitle } from "../../utils/validated";

export const MovieCard: React.FC<Movies> = ({
  id,
  title,
  poster_path,
  popularity,
  overview,
  phoneNumber,
}) => {
  const [isFullScreen, setFullScreen] = useState(false);

  const handleImgFullScreen = () => {
    setFullScreen(!isFullScreen);
    if (!isFullScreen) {
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
      <div
        className={`relative overflow-hidden ${
          isFullScreen ? "h-screen" : "h-64"
        } cursor-pointer`}
        onClick={handleImgFullScreen}
      >
        {validateHttps(poster_path) ? (
          <img
            src={poster_path}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}

        {isFullScreen && (
          <button
            type="button"
            className="absolute top-0 right-0 m-4 bg-white text-black px-2 py-1 rounded"
            onClick={handleImgFullScreen}
          >
            Exit
          </button>
        )}
      </div>

      <div className="mt-4">
        <div className="text-lg font-semibold text-center">{formatTitle(title)}</div>
        <p className="text-sm mt-4">{overview}</p>
        <p className="text-sm mt-4">Popularity: {popularity}</p>
        <p className="text-sm mt-4">
          {typeof phoneNumber == "string"
            ? `${phoneNumber_format(phoneNumber)}`
            : "No Phone Number"}
        </p>
      </div>
    </div>
  );
};
