import { useNavigate } from 'react-router-dom'
import type { MarkerStruct } from './Results'  // ajusta la ruta según tu proyecto
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppStore } from '../store/useAppStore';

interface ReserveProps {
  item?: MarkerStruct;
  handleClickClose: () => void;   // ✅ nueva prop de tipo función sin parámetros
}
export function formatFecha (fechaISO: string): string {
    return moment(fechaISO).format('D [de] MMMM [de] YYYY');
}

export function formatHora (hora: string): string {
  return moment(hora, 'HH:mm:ss').format('hh:mm A');
}

export default function Reserve({ item, handleClickClose }: ReserveProps) {
  const navigate = useNavigate()
  const {userId} = useAppStore();

  const formatDuration = (duracion:{ hours: number; minutes: number}) => {
    const { hours, minutes } = duracion;
    const h = hours > 0 ? `${hours} ${hours === 1 ? 'hora' : 'horas'}` : '';
    const m = minutes > 0 ? `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}` : '';
    return [h, m].filter(Boolean).join(' ');
  }

  const formatFecha = (fechaISO?: string): string => {
    if(!fechaISO) return '';
    return moment(fechaISO).format('D [de] MMMM [de] YYYY');
  }

  const formatHora = (hora?: string): string => {
    if(!hora) return '';
    return moment(hora, 'HH:mm:ss').format('hh:mm A');
  }

  const handleClick = () => {
    debugger

    if(!userId){
      navigate('/login', { replace: true });
      return; // evita seguir con la ejecución del axios
    }
    axios.post('https://api.alacancha.online/api/spot/participarcupo', { cupoId: item?.id, usuarioId: userId },)
      .then((response) => {
        console.log(response)
        toast.success('Reserva realizada con éxito!', { position: 'top-center' });
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      <div className="flex flex-1 items-center p-4 overflow-hidden">
        <div className="w-full h-full p-4 flex overflow-hidden justify-center">
          <div className="pt-3 rounded-xl bg-[var(--primary-backgroun-color)] shadow-2xl backdrop-blur-lg border border-gray-700 flex flex-col overflow-hidden">
            <h2 className="px-6 text-2xl font-bold text-white tracking-tight">Detalle de partido</h2>
            <p className="px-6 py-4 text-base text-gray-400 border-b-2 border-gray-600">Información sobre el partido, si te gusta reserva.</p>
            <div className='p-6 flex flex-1 overflow-auto flex-col gap-6'>
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-3xl">sports_soccer</span>
                  <div className='flex-1'>
                    <p className="text-sm text-gray-400">Deporte</p>
                    <p className="font-semibold text-white">{item?.deporte}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-3xl">schedule</span>
                  <div className='flex-1'>
                    <p className="text-sm text-gray-400">Duración</p>
                    {item?.duracion && (
                      <p className="font-semibold text-white">{formatDuration(item.duracion)}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-3xl">payments</span>
                  <div className='flex-1'>
                    <p className="text-sm text-gray-400">Valor Inscripción</p>
                    <p className="font-semibold text-white">${item?.valor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-3xl">place</span>
                  <div className='flex-1'>
                    <p className="text-sm text-gray-400">Lugar</p>
                    <p className="font-semibold text-white">{item?.lugar}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-3xl">calendar_today</span>
                  <div className='flex-1'>
                    <p className="text-sm text-gray-400">Fecha</p>
                    <p className="font-semibold text-white">{formatFecha(item?.fecha?? '')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-3xl">access_time</span>
                  <div className='flex-1'>
                    <p className="text-sm text-gray-400">Hora de Inicio</p>
                    <p className="font-semibold text-white">{formatHora(item?.hora ?? '')}</p>
                  </div>
                </div>

            </div>
            <div className="px-6 py-2 border-t-2 border-gray-600 gap-2 flex flex-col">
              <button
                onClick={handleClick}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30"
              >
                <span className="material-symbols-outlined mr-2">check</span>
                <span className="truncate">Reservar</span>
              </button>
              <button
                onClick={handleClickClose}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-[var(--secundary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30"
              >
                <span className="material-symbols-outlined mr-2">close</span>
                <span className="truncate">Mirar otro cupo</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}