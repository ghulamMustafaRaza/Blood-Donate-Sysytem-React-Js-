import { DonorActions } from '../actions'
const initState = {
  donors: [],
  raw: {},
  isLoading: false
}

export const donorReducer = (state = initState, action) => {
  // console.log('<In Reducer> ---', action)
  switch (action.type) {
    case DonorActions.LOAD_DONORS:
      return { ...state, isLoading: true }
    case DonorActions.LOAD_DONORS_FAIL:
      return { ...state, isLoading: false }
    case DonorActions.LOAD_DONORS_FULL_FILL:
      return { ...state, isLoading: false, ...action.payload }
    case DonorActions.AFTER_TEST_HELLO:
      // console.log("In PatientActions. After Test hello", action.payload)
      return { ...state, data: action.payload }
    default:
      return state
  }
}