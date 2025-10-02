import React, { useState } from 'react'
import ProfileItem from './ProfileItem'
import History from './History'
import axios from 'axios';

export default function Profile() {
  const [tab, setTab] = useState('profile');
  const [history, setHistory] = useState<any[] | null>(null);

  React.useEffect(() => {
    if (tab == 'profile') return;
    axios.get(`https://api.alacancha.online/api/spot/historial?usuarioId=${import.meta.env.VITE_USER_ID}`)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setHistory(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [tab]);


  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden items-center justify-center">
      <div className="flex flex-1 items-center overflow-hidden flex-col max-w-md">
        <div className="flex flex-row w-full px-4 border-b-2 border-gray-600 justify-between">
          <div onClick={() => setTab('profile')} className={`bg-[var(--primary-backgroun-color)] whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors ${tab == 'profile' ? 'border-[var(--primary-color)] text-white' : 'border-transparent'} hover:text-white hover:border-[var(--primary-color)]`}>
            Mi Perfil
          </div>
          <div onClick={() => setTab('history')} className={`bg-[var(--primary-backgroun-color)] whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors ${tab == 'history' ? 'border-[var(--primary-color)] text-white' : 'border-transparent'} hover:text-white hover:border-[var(--primary-color)]`}>
            Historial de Participaciones
          </div>
        </div>
        <div className="flex flex-1 w-full overflow-auto">
          {tab == 'profile'  ? <ProfileItem /> : (history !== null ? <History historyItem={history}/>: <ProfileItem />) }
        </div>

      </div>
    </div>
  )
}