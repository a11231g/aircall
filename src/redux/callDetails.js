import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: {},
  error: null
}

const call = createSlice({
  name: 'callDetails',
  initialState,
  reducers: {
    fetchCallDetails: (state, { payload }) => {
      return {
        ...state,
        loading: true,
        data: {},
        error: null
      }
    },
    fetchCallDetailsSuccess: (state, { payload }) => {
      return {
        data: payload,
        loading: false,
        error: null
      }
    },
    fetchCallDetailsFailure: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload
      }
    },
    clear () {
      return initialState
    }
  }
})

export const {
  fetchCallDetails,
  fetchCallDetailsSuccess,
  fetchCallDetailsFailure
} = call.actions

export default call.reducer
