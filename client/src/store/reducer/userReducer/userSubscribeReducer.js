import {
  USER_SUBSCRIBE_FAIL,
  USER_SUBSCRIBE_REQUEST,
  USER_SUBSCRIBE_SUCCESS,
} from '../../actions/actionTypes';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const userSubscribeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_SUBSCRIBE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case USER_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case USER_SUBSCRIBE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default userSubscribeReducer;
