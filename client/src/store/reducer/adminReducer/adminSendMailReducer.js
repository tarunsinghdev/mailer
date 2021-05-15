import {
  ADMIN_SENDMAIL_FAIL,
  ADMIN_SENDMAIL_REQUEST,
  ADMIN_SENDMAIL_SUCCESS,
} from '../../actions/actionTypes';

const initialState = {
  success: false,
  loading: false,
  error: null,
};

const adminSendMailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADMIN_SENDMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_SENDMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ADMIN_SENDMAIL_FAIL:
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

export default adminSendMailReducer;
