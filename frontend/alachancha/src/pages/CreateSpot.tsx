import { useState } from 'react'
import SelectPlace from './SelectPlace';
import { toast } from 'react-toastify';
import { useAppStore } from '../store/useAppStore';
import { useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios';


interface PlaceData {
  name: string;
  lat: number;
  lon: number;
}


export default function CreateSpot() {
  const { userId } = useAppStore();
  const navigate = useNavigate();
  if(!userId) {
    return <Navigate to="/login" replace />;
  }

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // HH:MM
  };

  const [onPickPlace, setonPickPlace] = useState(false);
  const [sport, setSport] = useState('fútbol');
  const [amount, setAmount] = useState(1);
  const [rol, setRol] = useState();
  const [onPlace, setPickPlace] = useState<PlaceData | null>(null);
  const [date, setDate] = useState(getTodayDate())
  const [hour, setHour] = useState(getCurrentTime())
  const [durationVal, setDurationVal] = useState()
  const [price, setPrice] = useState()

  const onClickMap = () => {
    setonPickPlace(!onPickPlace)
  }

  const onChangeRol = (e: any) => {
    setRol(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangeDate = (e: any) => {
    setDate(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangeHour = (e: any) => {
    setHour(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangeSport = (e: any) => {
    setSport(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangeAmount = (e: any) => {
    setAmount(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangeDuration = (e: any) => {
    setDurationVal(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangePrice = (e: any) => {
    setPrice(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onCreateSpot = () => {

    axios.post('https://api.alacancha.online/api/spot/crearcupos',
      {
        creador_id: userId,
        deporte: sport,
        valor: price,
        duracion: durationVal,
        lugar: onPlace?.name,
        fecha: date,
        hora: hour,
        lat: onPlace?.lat,
        lon: onPlace?.lon,
        roles: JSON.parse(`{"${rol}": 1}`),
        cantidad: amount
      },)
      .then((response) => {
        console.log(response)
        toast.success('Cupo creado!', { position: 'top-center' });
        setSport('fútbol');
        setAmount(1);
        setRol('');
        setPickPlace(null);
        setDate(getTodayDate());
        setHour(getCurrentTime());
        setDurationVal('');
        setPrice('');
        navigate('/createSpot')
      })
      .catch((error) => {
        toast.error(error.response.data.detalle ?? error.response.data.error, { position: 'top-center' });
        console.log(error);
      });
  }

  onCreateSpot



  const onUpdatePlace = (namePlace: string, location: { lat: number; lng: number }) => {
    debugger
    if (namePlace == '' || !location) {
      toast.error('Es obligatorio el nombre y localizacin del lugar', { position: 'top-center' });
    } else {
      setonPickPlace(false);
      setPickPlace({
        name: namePlace,
        lat: location.lat,
        lon: location.lng
      })
    }
  }

  return (
    <div className="relative flex flex-1 w-full flex-col overflow-hidden">
      <div className="w-full h-100 flex flex-col p-6 ">
        <h2 className="text-2xl font-bold text-white tracking-tight">Cupos</h2>
        <p className="mt-1 text-base text-gray-400">Crea un cupo para informar a los demás que los necesitas</p>
      </div>
      <div className="grid p-6 grid-cols-1 lg:grid-cols-3 gap-8 overflow-auto">
        <div className="lg:col-span-1 flex flex-col items-center">

        </div>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> sports </span>
            <select className="form-select w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-10 text-base text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" value={sport} onChange={onChangeSport}>
              <option>Fútbol</option>
              <option>Baloncesto</option>
              <option>Voleibol</option>
            </select>
          </div>
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> person </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Rol" type="text" value={rol} onChange={onChangeRol} />
          </div>
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> calendar_today </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Fecha" type="date" value={date} onChange={onChangeDate} />
          </div>
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> schedule </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Hora" type="time" value={hour} onChange={onChangeHour} />
          </div>
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> schedule </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Duración" type="number" value={durationVal} onChange={onChangeDuration} />
          </div>
          <div className="sm:col-span-2 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> payments </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Valor inscripción" type="number" value={price} onChange={onChangePrice} />
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> place </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" disabled={true} placeholder="Lugar" type="text" value={onPlace != null ? onPlace.name : ''} />
          </div>
          <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-[var(--secundary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--secundary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30" type="submit" onClick={onClickMap}>
            <span className="material-symbols-outlined mr-2"> place </span>
            <span className="truncate">Selecionar ubicación</span>
          </button>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> Accessibility </span>
            <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Cantidad de cupos" type="number" min="1" max="10" value={amount} onChange={onChangeAmount} />
          </div>
        </div>
      </div>
      <div className="p-6 flex border-t-2 border-gray-600">
        <button className="flex w-full sm:w-auto cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30" type="submit" onClick={onCreateSpot}>
          <span className="material-symbols-outlined mr-2"> check </span>
          <span className="truncate">Crear cupo</span>
        </button>
      </div>
      {onPickPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <SelectPlace handleClickClose={onClickMap} handleUpdatePlace={onUpdatePlace} />
        </div>
      )}
    </div>
  )
}