import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        {/* <i
          style={{ color }}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i> */}
        {value >= 1 ? <FaStar color={color} /> : value >= 0.5 ? <FaStarHalfAlt color={color} /> : <FaRegStar color={color} />}
      </span>
      <span>
        {/* <i
          style={{ color }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i> */}
         {value >= 2 ? <FaStar color={color} /> : value >= 1.5 ? <FaStarHalfAlt color={color} /> : <FaRegStar color={color} />}
      </span>
      <span>
        {/* <i
          style={{ color }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i> */}
         {value >= 3 ? <FaStar color={color} /> : value >= 2.5 ? <FaStarHalfAlt color={color} /> : <FaRegStar color={color} />}
      </span>
      <span>
        {/* <i
          style={{ color }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i> */}
         {value >= 4 ? <FaStar color={color} /> : value >= 3.5 ? <FaStarHalfAlt color={color} /> : <FaRegStar color={color} />}
      </span>
      <span>
        {/* <i
          style={{ color }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i> */}
        {value >= 5 ? <FaStar color={color} /> : value >= 4.5 ? <FaStarHalfAlt color={color} /> : <FaRegStar color={color} />}
      </span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
