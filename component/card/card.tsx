import { CardDatatype } from "../dataInterface";
import style from './card.module.css'

export const Card: React.FC<CardDatatype> = ({
  name,
  description,
  rating,
  image_url,
}) => {
  return (  
        <div className={style.card}>
        <img src={image_url} alt={name} className={style.cardImage} />
        <div className={style.cardContent}>
          <div className={style.cardTitle}>{name}</div>
          <p className={style.cardDescription}>
            {description}
          </p>
          <p className={style.cardDescription}>{rating} out of 5.0</p>
        </div>
      </div>

  );
};
