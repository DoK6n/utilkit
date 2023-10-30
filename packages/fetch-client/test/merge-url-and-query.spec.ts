import { mergeUrlAndQuery } from '../src/merge-url-and-query'

describe('mergeUrlAndQuery', () => {
  it('should merge a URL and query string correctly', () => {
    // Arrange
    const baseUrl = 'https://example.com/api'
    const queryString = 'param1=value1&param2=value2'
    const expectedMergedUrl = 'https://example.com/api?param1=value1&param2=value2'

    // Act
    const mergedUrl = mergeUrlAndQuery(baseUrl, queryString)

    // Assert
    expect(mergedUrl).toEqual(expectedMergedUrl)
  })

  it('should handle a URL without a query string', () => {
    // Arrange
    const baseUrl = 'https://example.com/api'
    const queryString = ''
    const expectedMergedUrl = 'https://example.com/api'

    // Act
    const mergedUrl = mergeUrlAndQuery(baseUrl, queryString)

    // Assert
    expect(mergedUrl).toEqual(expectedMergedUrl)
  })

  it('should handle a query string without leading ?', () => {
    // Arrange
    const baseUrl = 'https://example.com/api'
    const queryString = 'param1=value1&param2=value2'
    const expectedMergedUrl = 'https://example.com/api?param1=value1&param2=value2'

    // Act
    const mergedUrl = mergeUrlAndQuery(baseUrl, queryString)

    // Assert
    expect(mergedUrl).toEqual(expectedMergedUrl)
  })

  it('should handle an empty URL', () => {
    // Arrange
    const baseUrl = ''
    const queryString = 'param1=value1&param2=value2'
    const expectedMergedUrl = '?param1=value1&param2=value2'

    // Act
    const mergedUrl = mergeUrlAndQuery(baseUrl, queryString)

    // Assert
    expect(mergedUrl).toEqual(expectedMergedUrl)
  })
})
