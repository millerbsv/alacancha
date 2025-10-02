import { formatFecha, formatHora } from './Reserve'  // ajusta la ruta según tu proyecto
export default function History({ historyItem = [] }: { historyItem?: any[] }) {


  return (
    <div className='flex flex-1 w-full h-full gap-6 flex-col overflow-auto p-6'>
      {historyItem.map(({id, deporte, rol, hora, fecha, lugar}) => {
                      return (
                        <div key={id} className="bg-gray-800/50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <div className="md:col-span-2">
                            <p className="text-lg font-bold text-white">{deporte}</p>
                            <p className="text-sm text-gray-400">{rol}</p>
                          </div>
                          <div className="text-sm text-gray-300">
                            <p><span className="font-semibold">Fecha:</span> {formatFecha(fecha)}</p>
                            <p><span className="font-semibold">Hora:</span> {formatHora(hora)}</p>
                            <p><span className="font-semibold">Lugar:</span> {lugar}</p>
                          </div>
                          <div className="flex items-center gap-2 justify-center">
                            <span className="material-symbols-outlined text-yellow-400">star</span>
                            <span className="text-white font-bold text-lg">{"-"} / 5</span>
                          </div>
                        </div>
                      )
                    })}


    </div>
  )
}