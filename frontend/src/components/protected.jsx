import React from 'react'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }){
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/signin" />
  }
  return children
}
