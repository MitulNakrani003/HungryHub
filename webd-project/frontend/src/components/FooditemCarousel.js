import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopFooditems } from "../actions/fooditemActions";

const FooditemCarousel = () => {
  const dispatch = useDispatch();

  const fooditemTopRated = useSelector((state) => state.fooditemTopRated);
  const { loading, error, fooditems } = fooditemTopRated;

  useEffect(() => {
    dispatch(listTopFooditems());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {fooditems.map((fooditem) => (
        <Carousel.Item key={fooditem._id}>
          <Link to={`/fooditem/${fooditem._id}`}>
            <Image src={fooditem.image} alt={fooditem.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {fooditem.name} (${fooditem.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FooditemCarousel;
