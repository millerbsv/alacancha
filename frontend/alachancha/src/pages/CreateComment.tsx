import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CreateCommentProps {
  commentItem: any;
  handleClickClose: () => void;   // ✅ nueva prop de tipo función sin parámetros
}

export default function CreateComment({ commentItem, handleClickClose }: CreateCommentProps) {
  debugger;
  const [calification, setCalification] = useState('');
  const [comment, setComment] = useState('');

  const onChangeCalification = (e: any) => {
    setCalification(e.target.value) // Actualiza el state cada vez que cambia el input
  }

  const onChangeComment = (e: any) => {
    setComment(e.target.value) // Actualiza el state cada vez que cambia el input
  }



  const handleClick = () => {

    axios.post('https://api.alacancha.online/api/calification/calificar', { evaluador_id: commentItem.evaluador_id, evaluado_id: commentItem.evaluado_id, cupo_id:commentItem.cupo_id, puntaje:calification, comentario: comment },)
      .then((response) => {
        console.log(response)
        toast.success('Calificación realizada con éxito!', { position: 'top-center' });
        handleClickClose();
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
            <h2 className="px-6 text-2xl font-bold text-white tracking-tight">Califica</h2>
            <p className="px-6 py-4 text-base text-gray-400 border-b-2 border-gray-600">Califica al otro jugardor y dejale un comentario.</p>
            <div className='p-6 flex flex-1 overflow-auto flex-col gap-6'>
              <div className="col-span-2 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> star </span>
                <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Calificación" type="number" onChange={onChangeCalification} value={calification} />
              </div>
              <div className="col-span-2 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> comment </span>
                <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Comentario" type="text" onChange={onChangeComment} value={comment} />
              </div>
            </div>
            <div className="px-6 py-2 border-t-2 border-gray-600 gap-2 flex flex-col">
              <button
                onClick={handleClick}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30"
              >
                <span className="material-symbols-outlined mr-2">check</span>
                <span className="truncate">Comentar</span>
              </button>
              <button
                onClick={handleClickClose}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-[var(--secundary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30"
              >
                <span className="material-symbols-outlined mr-2">close</span>
                <span className="truncate">Cerrar</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}