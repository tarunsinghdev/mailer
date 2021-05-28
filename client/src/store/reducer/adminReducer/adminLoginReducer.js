import {
  ADMIN_CLEAR_TOKEN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
} from '../../actions/actionTypes';

const initialState = {
  loading: false,
  adminInfo: {},
  error: null,
};

const adminLoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADMIN_LOGIN_REQUEST:
      return { ...state, loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { ...state, loading: false, adminInfo: payload };
    case ADMIN_LOGIN_FAIL:
      return { ...state, loading: false, adminInfo: {}, error: payload };
    case ADMIN_LOGOUT:
      return { ...state, adminInfo: {} };
    case ADMIN_CLEAR_TOKEN:
      return { adminInfo: {} };
    default:
      return state;
  }
};

export default adminLoginReducer;
