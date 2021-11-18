import { createStore, compose, applyMiddleware } from 'redux'
import {
  persistStore,
  persistCombineReducers,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { rootReducers, whitelist } from '../redux/index'
import sagas from '../sagas/index'
const config = {
  key: 'root',
  storage,
  whitelist
}

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const persistedreducers = persistCombineReducers(config, rootReducers)
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose
const enhancers = [applyMiddleware(...middleware)]
const persistConfig = { enhancers }
export const store = createStore(
  persistedreducers,
  undefined,
  composeEnhancers(...enhancers)
)

export const persistor = persistStore(store, persistConfig)

sagas.map(sagaMiddleware.run)
