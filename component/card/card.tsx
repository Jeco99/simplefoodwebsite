import { useState } from "react";
import { CardDatatype } from "../dataInterface";
import style from "./card.module.css";

export const Card: React.FC<CardDatatype> = ({
  name,
  description,
  rating,
  image_url,
}) => {
  const [isFullScreen, setFullScreen] = useState(false);

  const handleImgFullScreen = () => {
    setFullScreen(!isFullScreen);
    if (!isFullScreen) {
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className={style.card}>
      <div
        className={isFullScreen ? style.fullScreen : style.imageContainer}
        onClick={handleImgFullScreen}
      >
        <img
          src={image_url}
          alt={name}
          className={isFullScreen ? style.fullScreenImage : style.cardImage}
        />

        {isFullScreen && (
          <button
            type="button"
            className={style.exitButton}
            onClick={handleImgFullScreen}
          >
            Exit
          </button>
        )}
      </div>

      <div className={style.cardContent}>
        <div className={style.cardTitle}>{name}</div>
        <p className={style.cardDescription}>{description}</p>
        <p className={style.cardDescription}>{rating} out of 5.0</p>
      </div>
    </div>
  );
};
