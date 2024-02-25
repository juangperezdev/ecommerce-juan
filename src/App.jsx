import react from 'react'
import { useState } from 'react'
import Header from './components/Header/Header'
import Content from './components/Content/Content'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Header/>
      <Content/>
      <Footer/>
      
      
       
    </>
  )
}

export default App
