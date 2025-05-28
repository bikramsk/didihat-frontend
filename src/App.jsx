import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layout/Layout'
import Attractions from './pages/Attractions'
import StaysPage from './pages/stays/StaysPage'
import StayDetail from './pages/stays/components/StayDetail/StayDetail'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stays" element={<StaysPage />} />
        <Route path="/stays/:id" element={<StayDetail />} />
        <Route path="/attractions" element={<Attractions />} />
      </Routes>
    </Layout>
  )
}

export default App