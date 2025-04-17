
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/dashBoard'
import HomePage from './pages/homepage'

function App() {

  return (
    <div className='w-screen h-screen'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
