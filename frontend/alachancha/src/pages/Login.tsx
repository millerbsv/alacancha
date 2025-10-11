import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/logo.jpg";
import { useAppStore } from '../store/useAppStore';

export default function Login() {
  const navigate = useNavigate();
  const {setUser, setUserId} = useAppStore();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangePass = (e: any) => {
    setPass(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onCreateProfile = () => {
    navigate('/createProfile')
  }



  const onLogin = () => {
    if(email !== '' && pass !== ''){
      axios.post('https://api.alacancha.online/api/auth/login', { username: email, password: pass},)
        .then((response) => {
          setUser(email);
          setUserId(response.data.userid)
          toast.success('Hola y a jugar!', { position: 'top-center' });
          navigate('/')
        })
        .catch((error) => {
          toast.error(error.response.data.detalle ?? error.response.data.error ?? error.response.data.message, { position: 'top-center' });
          console.log(error);
        });
    } else {
      toast.error('Debes ingresa correo y contraseña', { position: 'top-center' });
    }

  }




  return (
    <div className="relative flex h-screen w-full flex flex-col overflow-hidden items-center justify-center">
      <div className=''>
        <div className="flex flex-1 flex-col w-full p-6 gap-8 overflow-auto">
          <div className="flex flex-col items-center">
            <div className="relative h-40 w-40 mb-6">
              <div className="w-full h-full flex rounded-full overflow-hidden items-center justify-center bg-white border b-1">
                <img src={logo} alt="Logo" className="w-32 h-32 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> email </span>
              <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Correo" type="email" onChange={onChangeEmail} value={email} />
            </div>
            <div className="col-span-2 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> lock </span>
              <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Contraseña" type="password" onChange={onChangePass} value={pass} />
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col gap-4 border-t-2 border-gray-600">
          <button className="flex w-full w-auto cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30" type="submit" onClick={onLogin}>
            <span className="truncate">Ingresar</span>
          </button>
          <button className="flex w-full w-auto cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-[var(--secundary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--secundary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30" type="submit" onClick={onCreateProfile}>
            <span className="truncate">Registrar</span>
          </button>
        </div>
      </div>
    </div>
  )
}