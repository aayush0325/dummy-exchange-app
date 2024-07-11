import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './components/signup'
import { Signin } from './components/signin'
import  { Dashboard } from './components/dashboard'
import { ProtectedRoute } from './components/protected'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/signin" element={<Signin />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
   </>
  )
}

export default App
