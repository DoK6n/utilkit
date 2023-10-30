import { FetchError } from './fetch-error'

export async function rejectIfNeeded(response: Response) {
  if (!response.ok) {
    const data = await response.json()
    throw new FetchError(response, data)
  }
  return response
}
