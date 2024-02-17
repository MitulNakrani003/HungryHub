import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listFooditems,
  deleteFooditem,
  createFooditem,
} from "../actions/fooditemActions";
import { FOODITEM_CREATE_RESET } from "../constants/fooditemConstants";

const FooditemListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const fooditemList = useSelector((state) => state.fooditemList);
  const { loading, error, fooditems, page, pages } = fooditemList;

  const fooditemDelete = useSelector((state) => state.fooditemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = fooditemDelete;

  const fooditemCreate = useSelector((state) => state.fooditemCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    fooditem: createdFooditem,
  } = fooditemCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: FOODITEM_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/fooditem/${createdFooditem._id}/edit`);
    } else {
      dispatch(listFooditems("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdFooditem,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteFooditem(id));
    }
  };

  const createFooditemHandler = () => {
    dispatch(createFooditem());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Fooditems</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createFooditemHandler}>
            <i className="fas fa-plus"></i> Create Fooditem
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>CALORIES</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
            <tbody>
              {fooditems.map((fooditem) => (
                <tr key={fooditem._id}>
                  <td>{fooditem._id}</td>
                  <td>{fooditem.name}</td>
                  <td>${fooditem.price}</td>
                  <td>{fooditem.category}</td>
                  <td>{fooditem.calories}</td>
                  <td>
                    <LinkContainer to={`/admin/fooditem/${fooditem._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      EDIT</Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(fooditem._id)}
                    >
                      <i className="fas fa-trash"></i>
                    DELETE</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default FooditemListScreen;
