import { takeLatest, call, put } from 'redux-saga/effects'
import {
  fetchAllCalls,
  fetchAllCallsSuccess,
  fetchAllCallsFailure,
    updateCallSuccess,
    updateCallFailure,
    updateCall,
  reset
} from '../redux/calls'
import { fetchAllCallsApi, resetAllCallsApi, updateCallApi } from '../lib/apicall'

export function * fetchAllCallsSaga () {
  try {
    const allCalls = yield call(fetchAllCallsApi)
    yield put(fetchAllCallsSuccess(allCalls))
  } catch (error) {
    yield put(fetchAllCallsFailure(error))
  }
}

export function * resetSaga () {
  try {
    yield call(resetAllCallsApi)
    yield put(fetchAllCalls())
  } catch (error) {
    // catch error
  }
}

export function * watchFetchAllCalls () {
  yield takeLatest(fetchAllCalls.toString(), fetchAllCallsSaga)
}

export function * watchResetCalls () {
  yield takeLatest(reset.toString(), resetSaga)
}

export function * updateCallSaga ({payload}) {
  try {
    const { id, is_archived } = payload
    yield call(updateCallApi,id, is_archived)
    yield put(updateCallSuccess({id, is_archived}))
  }catch (error) {
    yield put(updateCallFailure(error))
  }

}
export function * watchUpdateCall () {
  yield takeLatest(updateCall.toString(), updateCallSaga)
}

export default [watchFetchAllCalls, watchResetCalls, watchUpdateCall]
