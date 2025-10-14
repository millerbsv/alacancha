import { useState } from 'react'
import { createAvatar } from '@dicebear/core';
import { avataaarsNeutral } from '@dicebear/collection';
import { useAppStore } from '../store/useAppStore';
import { initPushNotifications } from '../utils/notifications';
import { toast } from 'react-toastify';

export default function ProfileItem() {
  type SportKey = 'futbol' | 'baloncesto' | 'voleibol';
  const {profile, userId} = useAppStore();
  const [name, setName] = useState(profile.usuario.nombre);
  const [email, setEmail] = useState(profile.usuario.correo);
  const [sports, setSports] = useState({
    futbol: profile.usuario.deportes_preferidos.includes('fútbol'),
    baloncesto: profile.usuario.deportes_preferidos.includes('baloncesto'),
    voleibol: profile.usuario.deportes_preferidos.includes('voleibol'),
  });

  const onChangeSport = (key:SportKey ) => {
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


  const enablePush = async () => {
    if (!userId) {
      toast.error('Debes iniciar sesión para activar notificaciones');
      return;
    }

    try {
      await initPushNotifications(userId);
      toast.success('Notificaciones activadas correctamente 🎉');
    } catch (error: any) {
      console.error(error);
      toast.error('No se pudieron activar las notificaciones ❌');
    }
  };

  
  
  return (
    <div className="w-full flex flex-col overflow-hidden items-center justify-center">
      <div className="flex flex-1 flex-col p-6 gap-8 overflow-auto">
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
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Deportes de Interés</h3>
          <div className="flex gap-6 items-center justify-center">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" disabled={false} type="checkbox" onChange={() => onChangeSport('futbol')} checked={sports.futbol}/>
              <span className="text-white">Fútbol</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" disabled={false} type="checkbox" onChange={() => onChangeSport('baloncesto')} checked={sports.baloncesto}/>
              <span className="text-white">Baloncesto</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" disabled={false} type="checkbox" onChange={() => onChangeSport('voleibol')} checked={sports.voleibol}/>
              <span className="text-white">Voleibol</span>
            </label>


          </div>
            <button
              onClick={enablePush}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Activar Notificaciones Push
            </button>
        </div>
      </div>
      <div className="p-6 flex">
        {/* <button className="flex w-full w-auto cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30" type="submit" onClick={onSaveProfile}>
          <span className="material-symbols-outlined mr-2"> save </span>
          <span className="truncate">Guardar Perfil</span>
        </button> */}
      </div>
    </div>
  )
}