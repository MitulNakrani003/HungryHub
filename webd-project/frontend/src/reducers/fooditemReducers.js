import {
  FOODITEM_LIST_REQUEST,
  FOODITEM_LIST_SUCCESS,
  FOODITEM_LIST_FAIL,
  FOODITEM_DETAILS_REQUEST,
  FOODITEM_DETAILS_SUCCESS,
  FOODITEM_DETAILS_FAIL,
  FOODITEM_DELETE_REQUEST,
  FOODITEM_DELETE_SUCCESS,
  FOODITEM_DELETE_FAIL,
  FOODITEM_CREATE_RESET,
  FOODITEM_CREATE_FAIL,
  FOODITEM_CREATE_SUCCESS,
  FOODITEM_CREATE_REQUEST,
  FOODITEM_UPDATE_REQUEST,
  FOODITEM_UPDATE_SUCCESS,
  FOODITEM_UPDATE_FAIL,
  FOODITEM_UPDATE_RESET,
  FOODITEM_CREATE_REVIEW_REQUEST,
  FOODITEM_CREATE_REVIEW_SUCCESS,
  FOODITEM_CREATE_REVIEW_FAIL,
  FOODITEM_CREATE_REVIEW_RESET,
  FOODITEM_TOP_REQUEST,
  FOODITEM_TOP_SUCCESS,
  FOODITEM_TOP_FAIL,
} from "../constants/fooditemConstants";

export const fooditemListReducer = (state = { fooditems: [] }, action) => {
  switch (action.type) {
    case FOODITEM_LIST_REQUEST:
      return { loading: true, fooditems: [] };
    case FOODITEM_LIST_SUCCESS:
      return {
        loading: false,
        fooditems: action.payload.fooditems,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case FOODITEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fooditemDetailsReducer = (
  state = { fooditem: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case FOODITEM_DETAILS_REQUEST:
      return { ...state, loading: true };
    case FOODITEM_DETAILS_SUCCESS:
      return { loading: false, fooditem: action.payload };
    case FOODITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fooditemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FOODITEM_DELETE_REQUEST:
      return { loading: true };
    case FOODITEM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case FOODITEM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fooditemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FOODITEM_CREATE_REQUEST:
      return { loading: true };
    case FOODITEM_CREATE_SUCCESS:
      return { loading: false, success: true, fooditem: action.payload };
    case FOODITEM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FOODITEM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const fooditemUpdateReducer = (state = { fooditem: {} }, action) => {
  switch (action.type) {
    case FOODITEM_UPDATE_REQUEST:
      return { loading: true };
    case FOODITEM_UPDATE_SUCCESS:
      return { loading: false, success: true, fooditem: action.payload };
    case FOODITEM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case FOODITEM_UPDATE_RESET:
      return { fooditem: {} };
    default:
      return state;
  }
};

export const fooditemReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FOODITEM_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case FOODITEM_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case FOODITEM_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case FOODITEM_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const fooditemTopRatedReducer = (state = { fooditems: [] }, action) => {
  switch (action.type) {
    case FOODITEM_TOP_REQUEST:
      return { loading: true, fooditems: [] };
    case FOODITEM_TOP_SUCCESS:
      return { loading: false, fooditems: action.payload };
    case FOODITEM_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
