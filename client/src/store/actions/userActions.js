import axios from 'axios';

import {
  USER_SUBSCRIBE_FAIL,
  USER_SUBSCRIBE_REQUEST,
  USER_SUBSCRIBE_SUCCESS,
} from './actionTypes';

export const userSubscribe = (email) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_SUBSCRIBE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        '/api/user/subscribe',
        { email }, //isAdmin default value would be taken
        config
      );
      dispatch({ type: USER_SUBSCRIBE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: USER_SUBSCRIBE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
