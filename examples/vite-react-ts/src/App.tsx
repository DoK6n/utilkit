import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { readonly } from '@utilkit/core'
import { useFetch } from '@utilkit/react'

interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

function App() {
  const [count, setCount] = useState(0)

  // const data = { a: 1, b: { c: [1, 2, 3] } }

  // const readonlyData = readonly(data)

  // readonlyData.a = 1;

  const sleep = (sec: number) => new Promise((resolve) => setTimeout(resolve, sec * 1000))

  const getTodos = async (): Promise<Todo> => {
    await sleep(1)
    return fetch('https://jsonplaceholder.typicode.com/todos/2').then((res) => res.json())
  }

  // const { data, error, isLoading, mutate } = useFetch<Todo>(getTodos, {
  //   fallbackData: {
  //     userId: 0,
  //     id: 0,
  //     title: '',
  //     completed: false,
  //   },
  // })

  const { data, error, isLoading, mutate } = useFetch<Todo>(getTodos)

  console.log(data, error, isLoading)

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react loading' alt='React logo' />
        </a>
      </div>
    )

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => mutate()}>Refetch</button>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <input type='checkbox' checked={data?.completed} disabled />
          <p className='read-the-docs'>id: {data?.id}</p>
          <p className='read-the-docs'>usrId: {data?.userId}</p>
        </div>
        <p>
          <b>title:</b> {data?.title}
        </p>
      </div>
    </>
  )
}

export default App
