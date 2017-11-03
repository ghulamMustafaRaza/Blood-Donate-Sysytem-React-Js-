import { createEpicMiddleware, combineEpics } from "redux-observable";
import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger';


import { DonorActions, AuthActions } from './actions'
import { donorReducer, authReducer } from './reducers'
import { DonorEpics, AuthEpics } from './epics'

const rootEpics = combineEpics(
    DonorEpics.testHello,
    DonorEpics.fetchDonor,
    AuthEpics.login,
    AuthEpics.signup,
)
const epicMiddlerware = createEpicMiddleware(rootEpics);
const rootReducer = combineReducers({
    auth: authReducer,
    donor: donorReducer
})
const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddlerware)
)

console.log('index store', store)

export default store;