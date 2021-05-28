import axios from 'axios';
import {
  ADMIN_CLEAR_SENDMAIL_ERROR,
  ADMIN_CLEAR_TOKEN,
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
      dispatch({ type: ADMIN_CLEAR_SENDMAIL_ERROR });
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
  return async (dispatch, getState) => {
    try {
      localStorage.removeItem('adminInfo');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.adminInfo.token}`,
        },
      };

      await axios.post('/api/admin/logout', {}, config);
      dispatch({ type: ADMIN_LOGOUT }); //clears the local state(adminInfo).
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

export const adminLogoutAll = () => {
  return async (dispatch, getState) => {
    try {
      localStorage.removeItem('adminInfo');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.adminInfo.token}`,
        },
      };

      await axios.post('/api/admin/logoutall', {}, config);
      dispatch({ type: ADMIN_LOGOUT }); //clears the local state(adminInfo).
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

export const adminSendMailAction = (subject, body) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_SENDMAIL_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().adminLogin.adminInfo.token}`,
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
      dispatch({ type: ADMIN_CLEAR_TOKEN }); //clears the full admin Info state(adminInfo).
      localStorage.removeItem('adminInfo');
    }
  };
};
