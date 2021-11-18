import calls from './calls'
import callDetails from './callDetails'

const rootReducers = {
  calls,
  callDetails
}

const whitelist = ['calls']

export { rootReducers, whitelist }
