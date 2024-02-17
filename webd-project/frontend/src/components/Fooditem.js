import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Fooditem = ({ fooditem }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{height:'354px'}}>
      <Link to={`/fooditem/${fooditem._id}`}>
        <Card.Img src={fooditem.image} variant="top" style={{height:'145px'}}/>
      </Link>

      <Card.Body>
        <Link to={`/fooditem/${fooditem._id}`}>
          <Card.Title as="div">
            <strong>{fooditem.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={fooditem.rating}
            text={`${fooditem.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${fooditem.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Fooditem;
