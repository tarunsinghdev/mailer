import axios from 'axios';
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_SENDMAIL_FAIL,
  ADMIN_SENDMAIL_REQUEST,
  ADMIN_SENDMAIL_SUCCESS,
} from './actionTypes';

export const adminLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADMIN_LOGIN_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        '/api/admin/login',
        { email, password },
        config
      );
      dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: response.data });
      localStorage.setItem('adminInfo', JSON.stringify(response.data));
    } catch (error) {
      dispatch({
        type: ADMIN_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const adminLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('adminInfo');
    dispatch({ type: ADMIN_LOGOUT });
  };
};

export const adminSendMailAction = (subject, body) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADMIN_SENDMAIL_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post('/api/admin/sendmail', { subject, body }, config);
      dispatch({ type: ADMIN_SENDMAIL_SUCCESS });
    } catch (error) {
      dispatch({
        type: ADMIN_SENDMAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
