import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducer/rootReducer';

const adminInfoFromStorage = JSON.parse(localStorage.getItem('adminInfo'))
  ? JSON.parse(localStorage.getItem('adminInfo'))
  : {};

const initialState = {
  adminLogin: {
    adminInfo: adminInfoFromStorage,
  },
};

const configStore = () => {
  const store = createStore(
    rootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};

export default configStore;
