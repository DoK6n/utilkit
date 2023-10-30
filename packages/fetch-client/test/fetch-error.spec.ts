import { FetchError } from '../src/fetch-error'

describe('FetchError', () => {
  it('should create a FetchError instance with the provided response and data', () => {
    // Arrange
    const mockResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    })

    const mockData = { message: 'Resource not found' }

    // Act
    const fetchError = new FetchError(mockResponse, mockData)

    // Assert
    expect(fetchError).toBeInstanceOf(FetchError) // FetchError 클래스의 인스턴스인지 확인
    expect(fetchError.response).toEqual(mockResponse) // response 속성이 올바른지 확인
    expect(fetchError.data).toEqual(mockData) // data 속성이 올바른지 확인
    expect(fetchError.message).toBe(`Fetch failed with status ${mockResponse.status}`) // 오류 메시지 확인
  })
})
