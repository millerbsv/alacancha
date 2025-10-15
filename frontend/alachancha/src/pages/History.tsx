import { useAppStore } from '../store/useAppStore';
import { useState } from 'react'
import { formatFecha, formatHora } from './Reserve'  // ajusta la ruta según tu proyecto
import CreateComment from './CreateComment';


interface CommentData {
  evaluador_id: number | null;
  evaluado_id: number;
  cupo_id: number;
}

export default function History({ historyItem = [] }: { historyItem?: any[] }) {
  const {userId} = useAppStore();
  const [comment, setComment] = useState<CommentData | null>(null);
  

  const handleClickClose = () => {
    setComment(null);
  }

  return (
    <>
    <div className='flex flex-1 w-full h-full gap-6 flex-col overflow-auto p-6'>
      {historyItem.map(({participacion_id, deporte, rol, hora, fecha, lugar, cupo_estado, creador_id, calificaciones, cupo_id}) => {
        const filtradas = calificaciones.filter((c: any) => c.evaluado_id === userId);
        const filtradas2 = calificaciones.filter((c: any) => c.evaluado_id !== userId);
                      return (
                        <div key={participacion_id} className="bg-gray-800/50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <div className='flex items-center text-lg justify-between text-white'>
                            <div>{creador_id === userId ? 'Creador':'Participante'}</div>
                            <div className={`size-[16px] rounded-full ${cupo_estado === 'finalizado' ? 'bg-green-600': 'bg-yellow-600'} border b-1`}></div>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-lg font-bold text-white">{deporte}</p>
                            <p className="text-sm text-gray-400">{rol}</p>
                          </div>
                          <div className="text-sm text-gray-300">
                            <p><span className="font-semibold">Fecha:</span> {formatFecha(fecha)}</p>
                            <p><span className="font-semibold">Hora:</span> {formatHora(hora)}</p>
                            <p><span className="font-semibold">Lugar:</span> {lugar}</p>
                          </div>
                          <span className="text-white text-md">Tú calificación</span>
                          <div className="flex items-center gap-2 justify-center">
                            <span className="material-symbols-outlined text-yellow-400">star</span>
                            <span className="text-white font-bold text-lg">{filtradas.length > 0 ? filtradas[0].puntaje : '-'} / 5</span>
                          </div>
                          <div className="flex items-center gap-2 justify-center">
                            <span className="material-symbols-outlined text-white">comment</span>
                            <span className="text-white text-md">{filtradas.length > 0 ? filtradas[0].comentario : '-'}</span>
                          </div>
                          <span className="text-white text-md">Como calificaste</span>
                          {filtradas2.length > 0 ? <>
                            <div className="flex items-center gap-2 justify-center">
                              <span className="material-symbols-outlined text-yellow-400">star</span>
                              <span className="text-white font-bold text-lg">{filtradas2.length > 0 ? filtradas2[0].puntaje : '-'} / 5</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <span className="material-symbols-outlined text-white">comment</span>
                              <span className="text-white text-md">{filtradas2.length > 0 ? filtradas2[0].comentario : '-'}</span>
                            </div>
                          </> : <button
                                onClick={()=>{setComment({'evaluador_id':userId,'evaluado_id':creador_id,'cupo_id':cupo_id})}}
                                className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30"
                              >
                                <span className="material-symbols-outlined mr-2">check</span>
                                <span className="truncate">Calificar</span>
                              </button>
                          }
                        </div>
                      )
                    })}


    </div>
    {comment? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <CreateComment commentItem={comment} handleClickClose={handleClickClose}/>
    </div> : ''}
    
    </>
  )
}