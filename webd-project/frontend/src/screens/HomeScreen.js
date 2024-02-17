import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Fooditem from "../components/Fooditem";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import VideoIntro from "../components/VideoIntro";
import Meta from "../components/Meta";
import { listFooditems } from "../actions/fooditemActions";
import "./CSS/HomeScreen.css";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const fooditemList = useSelector((state) => state.fooditemList);
  const { loading, error, fooditems, page, pages } = fooditemList;

  useEffect(() => {
    dispatch(listFooditems(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />

      {!keyword ? (
        <VideoIntro />
      ) : (
        // <FooditemCarousel />
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}

      <div className="intro-section">
        <p className="intro-section-text">
          HungryHub is a culinary journey through the finest ingredients
          and flavors. Our delivery portal is built around the idea of bringing
          people together with the love of food and great company. We have tied up with a restaurant which has a
          variety of American dishes with an Italian twist, all prepared with
          fresh and locally sourced ingredients. Our menu is inspired by
          seasonal changes and features scratch-made pasta, antipasti,
          wood-fired pizzas, and much more.
        </p>
        <Link to="/about" className="btn btn-black">
          About Us
        </Link>
      </div>

      <p className="menu-header">Menu</p>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Container className="mx-auto">
            <Row>
              {fooditems.slice(0, 3).map((fooditem) => (
                <Col key={fooditem._id} sm={12} md={6} lg={4} xl={4}>
                  <Fooditem fooditem={fooditem} />
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
              <Link to="/menu" className="menu-btn">
                VIEW FULL MENU
              </Link>
            </div>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </Container>

          <div
            className="press-section"
            style={{ backgroundColor: "black", color: "white" }}
          >
            <p className="press-text">Featured Press</p>
            <Row className="mt-4 rowRow">
              <Col md={6}>
                <div className="press-links">
                  <a href="https://www.nytimes.com/">NEW YORK TIMES</a>
                  <p>
                    If you're looking for a culinary experience that blends
                    tradition with innovation, look no further than HungryHub.
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="press-links">
                  <a href="https://www.eater.com/">EATER</a>
                  <p>
                    Our recent meal ordered from HungryHub was nothing short of
                    spectacular. The flavors and presentation of each dish was
                    on point and executed with precision.
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div
            className="image-section-container"
            style={{ backgroundImage: "url(./images/reservation.jpg)" }}
          >
            <div className="image-section-overlay"></div>
            <div className="image-section-text">
              <p>No time to cook? Order Now</p>
              <Link to="/contact" className="image-btn">
                Scheduled Orders
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
