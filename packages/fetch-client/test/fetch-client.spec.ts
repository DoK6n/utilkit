import { fetchClient } from '../src/fetch-client'

const fakeRequestInterceptor = jest.fn((requestArgs) => requestArgs)
const fakeResponseInterceptor = jest.fn((response) => response)

// 테스트할 API 엔드포인트 URL
const todosUrl = '/todos/1'

describe('fetch-client', () => {
  it('should fetch data from the API using GET method', async () => {
    // Arrange
    const client = fetchClient.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })

    // Act
    const response = await client.get(todosUrl)

    // Assert
    expect(response.status).toBe(200)
    expect(response.data).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    })
  })

  it('should send data to the API using POST method', async () => {
    // Arrange
    const client = fetchClient.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })
    const data = {
      userId: 1,
      title: 'example todo',
      completed: false,
    }

    // Act
    const response = await client.post('/todos', data)

    // Assert
    expect(response.status).toBe(201) // Created
    expect(response.data).toEqual({ ...data, id: expect.any(Number) }) // id 추가 확인
  })

  it('should update data on the API using PATCH method', async () => {
    // Arrange
    const client = fetchClient.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })
    const dataToUpdate = {
      title: 'updated todo',
    }

    // Act
    const response = await client.patch(todosUrl, dataToUpdate)

    // Assert
    expect(response.status).toBe(200)
    expect(response.data).toEqual({
      userId: 1,
      id: 1,
      title: 'updated todo', // 업데이트된 제목 확인
      completed: false,
    })
  })

  it('should delete data on the API using DELETE method', async () => {
    // Arrange
    const client = fetchClient.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })

    // Act
    const response = await client.delete(todosUrl)

    // Assert
    expect(response.status).toBe(200)
  })

  it('should use request interceptor', async () => {
    // Arrange
    const client = fetchClient.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      globalInterceptor: {
        request: fakeRequestInterceptor, // 가짜 request 인터셉터 사용
      },
    })

    // Act
    await client.get(todosUrl)

    // Assert
    expect(fakeRequestInterceptor).toHaveBeenCalled() // request 인터셉터가 호출되었는지 확인
  })

  it('should use response interceptor', async () => {
    // Arrange
    const client = fetchClient.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      globalInterceptor: {
        response: fakeResponseInterceptor, // 가짜 response 인터셉터 사용
      },
    })

    // Act
    await client.get(todosUrl)

    // Assert
    expect(fakeResponseInterceptor).toHaveBeenCalled() // response 인터셉터가 호출되었는지 확인
  })
})
