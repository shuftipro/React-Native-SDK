import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native'
import rootReducer from '../Reducers/index' 

const config = {
    key: 'root',
    storage: AsyncStorage,
    // blacklist: ['loadingReducer'],
    debug: true, //to get useful logging
};

const reducers = persistCombineReducers(config, rootReducer);
export const store = createStore(reducers, applyMiddleware(thunk));
// const persistor = persistStore(store);

const configureStore = () => {
    return { store };
  };

export default configureStore;