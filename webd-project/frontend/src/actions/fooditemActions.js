import axios from "axios";
import {
  FOODITEM_LIST_REQUEST,
  FOODITEM_LIST_SUCCESS,
  FOODITEM_LIST_FAIL,
  FOODITEM_DETAILS_REQUEST,
  FOODITEM_DETAILS_SUCCESS,
  FOODITEM_DETAILS_FAIL,
  FOODITEM_DELETE_SUCCESS,
  FOODITEM_DELETE_REQUEST,
  FOODITEM_DELETE_FAIL,
  FOODITEM_CREATE_REQUEST,
  FOODITEM_CREATE_SUCCESS,
  FOODITEM_CREATE_FAIL,
  FOODITEM_UPDATE_REQUEST,
  FOODITEM_UPDATE_SUCCESS,
  FOODITEM_UPDATE_FAIL,
  FOODITEM_CREATE_REVIEW_REQUEST,
  FOODITEM_CREATE_REVIEW_SUCCESS,
  FOODITEM_CREATE_REVIEW_FAIL,
  FOODITEM_TOP_REQUEST,
  FOODITEM_TOP_SUCCESS,
  FOODITEM_TOP_FAIL,
} from "../constants/fooditemConstants";
import { logout } from "./userActions";

export const listFooditems =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: FOODITEM_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/fooditems?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: FOODITEM_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FOODITEM_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listFooditemDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FOODITEM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/fooditems/${id}`);

    dispatch({
      type: FOODITEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOODITEM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFooditem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOODITEM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/fooditems/${id}`, config);

    dispatch({
      type: FOODITEM_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: FOODITEM_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createFooditem = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOODITEM_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/fooditems`, {}, config);

    dispatch({
      type: FOODITEM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: FOODITEM_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateFooditem = (fooditem) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOODITEM_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/fooditems/${fooditem._id}`,
      fooditem,
      config
    );

    dispatch({
      type: FOODITEM_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: FOODITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: FOODITEM_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createFooditemReview =
  (fooditemId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FOODITEM_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/fooditems/${fooditemId}/reviews`, review, config);

      dispatch({
        type: FOODITEM_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: FOODITEM_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

export const listTopFooditems = () => async (dispatch) => {
  try {
    dispatch({ type: FOODITEM_TOP_REQUEST });

    const { data } = await axios.get(`/api/fooditems/top`);

    dispatch({
      type: FOODITEM_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FOODITEM_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
