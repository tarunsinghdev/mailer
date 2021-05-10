import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducer/rootReducer';

const configStore = () => {
  const store = createStore(
    rootReducer(),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};

export default configStore;
