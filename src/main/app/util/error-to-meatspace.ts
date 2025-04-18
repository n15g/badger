import * as axios from 'axios'

export function errorToMeatspace(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      // Server responded with a status code outside 2xx
      return `Request failed with status ${String(err.response.status)}.`
    } else if (err.request) {
      // Request was made but no response received
      return 'No response received from server.'
    } else {
      // Something happened in setting up the request
      return `Axios error: ${err.message}.`
    }
  }

  if (err instanceof Error) {
    return err.message
  }

  if (typeof err === 'string') {
    return err
  }

  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}
