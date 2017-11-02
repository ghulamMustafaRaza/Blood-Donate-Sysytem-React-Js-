import { createEpicMiddleware, combineEpics } from "redux-observable";
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger';


import { DonorActions } from './actions'
import { donorReducer } from './reducers/patientReducer'
import { DonorEpics } from './epics/index'

const rootEpics = combineEpics(
    DonorEpics.testHello,
    DonorEpics.fetchDonor,
)
const epicMiddlerware = createEpicMiddleware(rootEpics);
const store = createStore(
    donorReducer,
    applyMiddleware(epicMiddlerware, logger)
)

console.log('index store', store)

export default store;