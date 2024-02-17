import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listFooditemDetails,
  createFooditemReview,
} from "../actions/fooditemActions";
import { FOODITEM_CREATE_REVIEW_RESET } from "../constants/fooditemConstants";

const FooditemScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const fooditemDetails = useSelector((state) => state.fooditemDetails);
  const { loading, error, fooditem } = fooditemDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const fooditemReviewCreate = useSelector(
    (state) => state.fooditemReviewCreate
  );
  const {
    success: successFooditemReview,
    loading: loadingFooditemReview,
    error: errorFooditemReview,
  } = fooditemReviewCreate;

  useEffect(() => {
    if (successFooditemReview) {
      setRating(0);
      setComment("");
    }
    if (!fooditem._id || fooditem._id !== match.params.id) {
      dispatch(listFooditemDetails(match.params.id));
      dispatch({ type: FOODITEM_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successFooditemReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createFooditemReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link
        className="btn btn-light my-3"
        to="/"
        style={{ border: "2px solid black" }}
      >
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={fooditem.name} />
          <Row>
            <Col md={6}>
              <Image src={fooditem.image} alt={fooditem.name} fluid />
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${fooditem.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {fooditem.countInStock > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {fooditem.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            style={{ width: "100px" }}
                          >
                            {[...Array(fooditem.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={fooditem.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ textAlign: "left" }}>
                  <h3>{fooditem.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item style={{ textAlign: "left" }}>
                  <Rating
                    value={fooditem.rating}
                    text={`${fooditem.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${fooditem.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {fooditem.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <h2 style={{ padding: "0.75rem 1.25rem" }}>Reviews</h2>
              {fooditem.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {fooditem.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2 style={{textAlign: "center"}}>Write a Customer Review</h2>
                  {successFooditemReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingFooditemReview && <Loader />}
                  {errorFooditemReview && (
                    <Message variant="danger">{errorFooditemReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingFooditemReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default FooditemScreen;
