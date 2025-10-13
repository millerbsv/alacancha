import './App.css'
import { useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import Search from './pages/Search'
import Results from './pages/Results'
import Profile from './pages/Profile'
import Login from './pages/Login'
import CreateProfile from './pages/CreateProfile'
import CreateSpot from './pages/CreateSpot'
import moment from 'moment';
import 'moment/dist/locale/es'; // Importa el locale español
moment.locale('es');
import logo from "./assets/logo.jpg";
import { useAppStore } from './store/useAppStore';


function App() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const {user, setUser} = useAppStore();

  const location = useLocation();

  const onClickMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden">
      {location.pathname !== "/login" || user !== null ? <><div className='h-[60px] flex w-full bg-white items-center px-2'>
        <div className='size-[32px] flex items-center cursor-pointer' onClick={onClickMenu}>
          <span className="material-symbols-outlined text-gray-500"> menu </span>
        </div>
      </div>
        <div className={`absolute flex top-0 w-full h-full z-10 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' :
          '-translate-x-full'}`} >
          <div className='relative top-0 left-0 w-5/6 h-full bg-white p-6'>
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 mb-6">
                <div className="w-full h-full flex rounded-full overflow-hidden items-center justify-center border b-1">
                  <img src={logo} alt="Logo" className="w-32 h-32 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="w-full h-100 flex flex-col p-6 border-b-2 border-gray-600">
              <h2 className="text-2xl font-bold tracking-tight text-black">Menu</h2>
            </div>
            <div className='p-6 flex flex-col'>
              {user === null ? 
              <Link to="/login" className='h-[32px] w-full flex gap-4 items-center text-black' onClick={() => setIsOpen(false)}>
                <span className="material-symbols-outlined"> person </span>
                <div className='flex-1 text-left'>
                  Iniciar sesión
                </div>
              </Link>
              : ''}
              
              <Link to="/  " className='h-[32px] w-full flex gap-4 items-center text-black' onClick={() => setIsOpen(false)}>
                <span className="material-symbols-outlined"> search </span>
                <div className='flex-1 text-left'>
                  Buscar
                </div>
              </Link>
              {user !== null ? <>
              <Link to="/profile" className='h-[32px] w-full flex gap-4 items-center text-black' onClick={() => setIsOpen(false)}>
                <span className="material-symbols-outlined"> person </span>
                <div className='flex-1 text-left'>
                  Perfil
                </div>
              </Link>
              <Link to="/createspot" className='h-[32px] w-full flex gap-4 items-center text-black' onClick={() => setIsOpen(false)}>
                <span className="material-symbols-outlined"> Sports </span>
                <div className='flex-1 text-left'>
                  Crear cupo
                </div>
              </Link>
              <div className='h-[32px] mt-[100px] w-full flex gap-4 items-center text-black' onClick={() => {setUser(null); setIsOpen(false); navigate('/');}}>
                <span className="material-symbols-outlined"> close </span>
                <div className='flex-1 text-left'>
                  Salir
                </div>
              </div>
              </>
              : ''}
              
            </div>
          </div>
          <div className='flex-1 bg-[#0000004d]' onClick={() => setIsOpen(false)}></div>
        </div>
        <div className="flex flex-1 overflow-hidden" >
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/results" element={<Results />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createspot" element={<CreateSpot />} />
            <Route path="/createProfile" element={<CreateProfile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div></> :
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createProfile" element={<CreateProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      }

    </div >
  )
}

export default App
