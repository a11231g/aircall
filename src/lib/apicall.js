import { get, post } from './apiClient'

/**
 * fetch all calls endpoint
 */
export async function fetchAllCallsApi () {
  const response = await get('/activities')
  return response.body
}

/**
 * reset all calls endpoint
 */
export async function resetAllCallsApi () {
  const response = await get('/reset')
  return response.body
}

/**
 * fetch call details endpoint
 */
export async function fetchCallDetailsApi (id) {
  const response = await get(`/activities/${id}`)
  return response.body
}

/**
 * update a all endpoint
 */
export async function updateCallApi (id, is_archived) {
  const response = await post(`/activities/${id}`, {is_archived})
  return response.body
}
