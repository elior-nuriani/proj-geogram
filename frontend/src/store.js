import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import storageSession from 'redux-persist/lib/storage/session'


import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';

var rootReducer = combineReducers({
    user:userReducer,
    post:postReducer
})

//Persist Reducer Configuration
const persistConfig = {
    key: 'root',
    storage:storageSession
  }
   
  const persistedReducer = persistReducer(persistConfig, rootReducer)


export let store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
)

export let persistor = persistStore(store)

