import { combineReducers } from 'redux';
import userSubscribeReducer from './userReducer/userSubscribeReducer';
import adminLoginReducer from './adminReducer/adminLoginReducer';
import adminSendMailReducer from './adminReducer/adminSendMailReducer';

const rootReducer = () =>
  combineReducers({
    userSubscribe: userSubscribeReducer,
    adminLogin: adminLoginReducer,
    adminSendMail: adminSendMailReducer,
  });

export default rootReducer;
