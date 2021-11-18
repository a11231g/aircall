import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: [],
  error: null,
  updateCallLoader: false,
  updateCallError: null
}

const calls = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    fetchAllCalls: state => {
      return {
        ...state,
        loading: true
      }
    },
    fetchAllCallsSuccess: (state, { payload }) => {
      return {
        ...state,
        data: payload,
        loading: false,
        error: null
      }
    },
    fetchAllCallsFailure: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload
      }
    },
    updateCall: (state, { payload }) => {
      return {
        ...state,
        updateCallLoader: true,
        updateCallError: null
      }
    },
    updateCallSuccess: (state, {payload} ) => {
      const newData = [...state.data].map((d, i) => {
        if(d.id === payload.id){
          return {
            ...d,
            is_archived: payload.is_archived
          }
        }else{
          return d
        }
      })
      return {
        ...state,
        updateCallLoader: false,
        updateCallError: null,
        data: newData
      }
    },
    updateCallFailure: (state, payload) => {
      return {
        ...state,
        updateCallLoader: false,
        updateCallError: payload
      }
    },
    reset: state => {
      return state
    },
    clearCalls () {
      return initialState
    }
  }
})

export const {
  fetchAllCalls,
  clearCalls,
  fetchAllCallsSuccess,
  fetchAllCallsFailure,
  updateCall,
  updateCallSuccess,
  updateCallFailure,
  reset
} = calls.actions

export default calls.reducer
