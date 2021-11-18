import pick from 'lodash/pick'

// can load from .env file
export const BASE_URL = 'https://aircall-job.herokuapp.com'

async function buildResponse (response) {
  let body = {}

  try {
    body = await response.json()
  } catch (error) {
    // capture error
  }

  return {
    ...pick(response, ['status', 'statusText', 'ok', 'headers', 'url']),
    body
  }
}

function throwErrorForResponse (response) {
  const apiError = new Error(response.body.error || 'Request failed')
  apiError.data = response.body.data
  apiError.response = response
  apiError.error = response.body.error

  throw apiError
}

export async function request (url, method, headers = {}, body) {
  const backendApi = `${BASE_URL}${url}`
  const requestUrl = /^https?:\/\//.test(url) ? url : backendApi

  const params = {
    method,
    headers: {
      Accept: 'application/json',
      ...headers
    }
  }
  if (body) {
    params.body = body
  }
  const call = fetch(requestUrl, params)
  const fetchResponse = await call
  const response = await buildResponse(fetchResponse)

  if (response.ok) {
    return response
  }

  throwErrorForResponse(response)
}

function bodyHeaders (headers) {
  return {
    'Content-Type': 'application/json',
    ...headers
  }
}

export async function get (
  url,
  headers = {},
  refreshJwt = true,
  useApiVersion = true
) {
  return request(url, 'GET', headers, undefined, refreshJwt, useApiVersion)
}

export async function post (url, body, headers = {}, refreshJwt = true) {
  return request(
    url,
    'POST',
    bodyHeaders(headers),
    JSON.stringify(body),
    refreshJwt
  )
}
