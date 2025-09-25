import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Reserve() {
  const navigate = useNavigate()

  const handleClick = () => {
    // Aquí podrías enviar datos de búsqueda a un estado global o API si quieres
    navigate('/') // 👈 navega a la otra pantalla
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      <div className="flex flex-1">
        <aside className="w-full max-w-sm shrink-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
          <div className="rounded-xl bg-gray-900/80 p-6 shadow-2xl backdrop-blur-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white tracking-tight">Detalle de partido</h2>
            <p className="mt-1 text-base text-gray-400">Información sobre el partido, si te gusta reserva.</p>
            <form className="mt-6 space-y-4">
              <button
                onClick={handleClick}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--primary-color)]/30"
              >
                <span className="material-symbols-outlined mr-2">check</span>
                <span className="truncate">Reservar</span>
              </button>
            </form>
          </div>

        </aside>
        <main className="relative flex-1">
          <div className="absolute inset-0 z-0 h-full w-full">
            <img alt="Mapa de una ciudad con marcadores de ubicación en modo noche" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ4F74w98f80uC2mK44WqD_00U4wQy7K0o4Z6f1t8s0uJ7f0l8Z9q8q0k8l8j8f0w0o0c4e4d4g4i4j4k4l4m4n4o4p4q4r4s4t4u4v4w4x4y4z5051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100" />
          </div>
        </main>
      </div>
    </div>
  )
}