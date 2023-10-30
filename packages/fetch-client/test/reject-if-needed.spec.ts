import { rejectIfNeeded } from '../src/reject-if-needed'

describe('rejectIfNeeded', () => {
  it('should not throw an error if the response is ok', async () => {
    // Arrange
    const response = new Response(null, { status: 200, statusText: 'OK' })

    // Act
    const result = await rejectIfNeeded(response)

    // Assert
    expect(result).toEqual(response)
  })

  it('should throw a FetchError if the response is not ok', async () => {
    // Arrange
    const errorResponse = new Response(null, { status: 404, statusText: 'Not Found' })

    // Act & Assert
    await expect(async () => {
      await rejectIfNeeded(errorResponse)
    }).rejects.toThrowError('Fetch failed with status 404')
  })
})
