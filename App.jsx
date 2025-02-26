import React from 'react'
import './App.css'
import {useWorker} from './useWorker'

const calbackForWorker = (num) => num * 2

function App() {
  const [value, setValue] = React.useState(0);
  const {result, run} = useWorker(calbackForWorker);

  const handleValueChange = (event) => {
    setValue(event.target.value)
  }

  const handlerClick = () => {
    run(value)
  }

  return (
    <div>
      <div style={{display: 'flex', gap: '20px'}}>
        <input type='number' placeholder='Введите число' onChange={handleValueChange} />
        <button onClick={handlerClick}>Запуск</button>
      </div>
      <p>Result: {result}</p>
    </div>
  )
}

export default App
