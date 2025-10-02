import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APIProvider, Map, Marker, useMap  } from '@vis.gl/react-google-maps';
import Reserve from './Reserve';
import { useLocation } from 'react-router-dom';

function FitBounds({ markers }: { markers: { lat:number, lon:number }[] }) {
  const map = useMap(); // obtiene el objeto google.maps.Map

  React.useEffect(() => {
    if (!map || markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    markers.forEach(m => bounds.extend({ lat: m.lat, lng: m.lon }));

    // Ajusta el mapa a los marcadores
    map.fitBounds(bounds);
  }, [map, markers]);

  return null; // no renderiza nada, solo ejecuta la lógica
}

export interface MarkerStruct {
  id: number
  lat: number
  lon: number
  lugar: string
  fecha: string
  hora: string
  valor: string
  duracion: { hours: number; minutes: number}
  deporte: string
}

export default function Results() {
  const navigate = useNavigate()

  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const location = useLocation();
  const markers = location.state;

  const handleClickClose = () => {
    setSelectedMarker(null);
  }

  const returnToSearch = () => {
    navigate('/');
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      <div className="flex flex-1 flex-col">
        <div className="w-full h-100 flex flex-col p-6 ">
          <h2 className="text-2xl font-bold text-white tracking-tight">Resultados</h2>
          <p className="mt-1 text-base text-gray-400">Selecciona un marcado para ir al detalle</p>
        </div>

        <div className="w-full flex-1 shrink-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
              defaultZoom={3}
              defaultCenter={{ lat: 22.54992, lng: 0 }}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              {
              markers.map(({id, lat, lon, lugar}:MarkerStruct, index: number) => {
                console.log({ lat: lat, lng: lon })
                return (
                  <Marker
                    key={id}
                    position={{ lat: lat, lng: lon }}
                    clickable={true}
                    onClick={() => setSelectedMarker(index)}
                    title={lugar}
                  />
                )
              })}
              <FitBounds markers={markers} />
            </Map>
          </APIProvider>
        </div>
        <div className='p-6'>
          <button
            onClick={returnToSearch}
            className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-[var(--secundary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--secundary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--secundary-color)]/30"
          >
            <span className="material-symbols-outlined mr-2">search</span>
            <span className="truncate">Realizar otra buscar</span>
          </button>

        </div>

        

      </div>
      {/* Modal */}
      {selectedMarker !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Reserve item={markers[selectedMarker]} handleClickClose={handleClickClose}/>
        </div>
      )}

    </div>
  )
}