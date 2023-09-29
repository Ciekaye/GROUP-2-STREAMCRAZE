import React, { useMemo } from "react";
import "./CardContainer.css";

const CardContainer = ({
  image,
  title,
  genreYear,
  dimensionLabel,
  propLeft,

}) => {
  const card4Style = useMemo(() => {
    return {
      left: propLeft,
    };
  }, [propLeft]);

  const baseUrl = "https://image.tmdb.org/t/p/w500";  // Base URL for TMDB images
  



  return (
    <div className="card4" style={card4Style}>
      <img className="card4-child" alt={title} src={`${baseUrl}${image}`} />
      <div className="card4-item" />
      <div className="house-of-gucci">{title}</div>
      <div className="drama">{genreYear}</div>
      <div className="heart-wrapper1">
        <img className="heart-icon4" alt="" src={dimensionLabel} />
      </div>
    </div>
  );
};

export default CardContainer;
