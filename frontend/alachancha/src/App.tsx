import './App.css'
import { Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import Results from './pages/Results'
import Profile from './pages/Profile'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/results" element={<Results />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
