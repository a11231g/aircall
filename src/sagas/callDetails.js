import { takeLatest, call, put } from 'redux-saga/effects'
import {
  fetchCallDetails,
  fetchCallDetailsFailure,
  fetchCallDetailsSuccess
} from '../redux/callDetails'
import { fetchCallDetailsApi } from '../lib/apicall'

export function * fetchCallDetailsSaga ({payload}) {
  try {
    const details = yield call(fetchCallDetailsApi, payload)
    yield put(fetchCallDetailsSuccess(details))
  } catch (error) {
    yield put(fetchCallDetailsFailure(error))
  }
}

export function * watchFetchCallDetails () {
  yield takeLatest(fetchCallDetails.toString(), fetchCallDetailsSaga)
}

export default [watchFetchCallDetails]
