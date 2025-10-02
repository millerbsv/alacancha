import './App.css'
import { Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import Results from './pages/Results'
import Profile from './pages/Profile'
import CreateProfile from './pages/CreateProfile'
import moment from 'moment';
import 'moment/dist/locale/es'; // Importa el locale español
moment.locale('es');

function App() {

  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/results" element={<Results />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createProfile" element={<CreateProfile />} />
    </Routes>
  )
}

export default App
