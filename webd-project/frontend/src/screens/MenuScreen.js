import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Fooditem from "../components/Fooditem";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { listFooditems } from "../actions/fooditemActions";
import './CSS/Menu.css'

// import './CSS/MenuCss.css'

const MenuScreen = ({ match }) => {
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
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Card className="bg-white text-dark" style={{ position: "relative", width: "90%", height: "40%", margin: "0 auto", border: "none" }}>
                        <Card.Img className='pageBanner' src="./images/menubanner.jpg" alt="Card image" />
                    </Card>
                    <Container className="mx-auto">
                        <p className="pageTitle">Menu</p>
                        <Row>
                            {fooditems.slice(2,).map((fooditem) => (   
                                <Col key={fooditem._id} sm={12} md={6} lg={4} xl={4}>
                                    <Fooditem fooditem={fooditem} />
                                </Col>
                            ))}
                        </Row>
                        <p className="pageTitle">Chef's Choice</p>
                        <Row>
                            {fooditems.slice(0,2).map((fooditem) => (   
                                <Col key={fooditem._id} sm={12} md={6} lg={4} xl={4}>
                                    <Fooditem fooditem={fooditem} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </>
            )}
        </>
    )
}

export default MenuScreen;