import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAvatar } from '@dicebear/core';
import axios from 'axios';
import { avataaarsNeutral } from '@dicebear/collection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProfile() {
  const navigate = useNavigate()

  type SportKey = 'futbol' | 'baloncesto' | 'voleibol';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [sports, setSports] = useState({ futbol: false, baloncesto: false, voleibol: false });
  const [location, setLocation] = useState({
    lat: 3.442,
    lng: -76.528,
  });


  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          toast.error(err.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Optional options
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  }, []);


  const onChangeSport = (key: SportKey) => {
    setSports((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const onChangeName = (e: any) => {
    setName(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangePass = (e: any) => {
    setPass(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onSaveProfile = () => {

    let sport = [];
    if (sports.futbol)
      sport.push('futbol')
    if (sports.baloncesto)
      sport.push('baloncesto')
    if (sports.voleibol)
      sport.push('voleibol')
    axios.post('https://api.alacancha.online/api/auth/crearperfil', { nombre: name, correo: email, contrasena: pass, deportes_preferidos: `{${sport.toString()}}`, lat:location.lat, lon:location.lng },)
      .then((response) => {
        console.log(response)
        toast.success('Perfil creado!', { position: 'top-center' });
        navigate('/login')
      })
      .catch((error) => {
        toast.error(error.response.data.detalle ?? error.response.data.error, { position: 'top-center' });
        console.log(error);
      });
  }




  return (
    <div className="relative flex flex-1 w-full flex flex-col overflow-hidden items-center justify-center">
      <div className="w-full h-100 flex flex-col p-6 border-b-2 border-gray-600">
        <h2 className="text-2xl font-bold text-white tracking-tight">Crear perfil</h2>
        <p className="mt-1 text-base text-gray-400">Estas a un paso de ser parte de la comunidad</p>
      </div>
      <div className="flex flex-1 flex-col w-full p-6 gap-8 overflow-auto">
        <div className="flex flex-col items-center">
          <div className="relative h-40 w-40 mb-6">
            <div
              dangerouslySetInnerHTML={{ __html: createAvatar(avataaarsNeutral, { seed: name, backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'] }).toString() }}
              className="w-full h-full rounded-full overflow-hidden"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> person </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Nombres y Apellidos" type="text" onChange={onChangeName} value={name} />
          </div>
          <div className="col-span-2 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> email </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Correo" type="email" onChange={onChangeEmail} value={email} />
          </div>
          <div className="col-span-2 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> lock </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Contraseña" type="password" onChange={onChangePass} value={pass} />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Deportes de Interés</h3>
          <div className="flex gap-6 items-center justify-center">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" type="checkbox" onChange={() => onChangeSport('futbol')} checked={sports.futbol} />
              <span className="text-white">Fútbol</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" type="checkbox" onChange={() => onChangeSport('baloncesto')} checked={sports.baloncesto} />
              <span className="text-white">Baloncesto</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" type="checkbox" onChange={() => onChangeSport('voleibol')} checked={sports.voleibol} />
              <span className="text-white">Voleibol</span>
            </label>
          </div>
        </div>
      </div>
      <div className="p-6 flex border-t-2 border-gray-600">
        <button className="flex w-full w-auto cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30" type="submit" onClick={onSaveProfile}>
          <span className="material-symbols-outlined mr-2"> save </span>
          <span className="truncate">Crear Perfil</span>
        </button>
      </div>
    </div>
  )
}