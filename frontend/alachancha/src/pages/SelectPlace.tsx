import React, { useState } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import type { MapMouseEvent } from '@vis.gl/react-google-maps';
import { toast } from 'react-toastify';

export interface MarkerStruct {
  id: number
  lat: number
  lon: number
  lugar: string
  fecha: string
  hora: string
  valor: string
  duracion: { hours: number; minutes: number }
  deporte: string
}

interface SelectPlaceProps {
  handleClickClose: () => void;
  handleUpdatePlace: (namePlace: string, location: { lat: number; lng: number } | null) => void;
}

export default function SelectPlace({ handleClickClose, handleUpdatePlace }: SelectPlaceProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [namePlace, setNamePlace] = useState('');


  const onChangeNamePlace = (e: any) => {
    setNamePlace(e.target.value) // Actualiza el state cada vez que cambia el input
  }
  React.useEffect(() => {
    debugger
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
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 } // Optional options
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  }, []);


  const handleMapClick = (event: MapMouseEvent) => {
    const latLng = event.detail?.latLng;
    if (latLng) {
      const coords = {
        lat: latLng.lat,
        lng: latLng.lng,
      };
      setMarker(coords);
      console.log("Marcador agregado en:", coords);
    }
  };

  return (


    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      <div className="flex flex-1 items-center p-4 overflow-hidden">
        <div className="w-full h-full p-4 flex overflow-hidden justify-center">
          <div className="pt-3 rounded-xl bg-[var(--primary-backgroun-color)] shadow-2xl backdrop-blur-lg border border-gray-700 flex flex-col overflow-hidden">
            <h2 className="px-6 text-2xl font-bold text-white tracking-tight">Selecionar Lugar</h2>
            <p className="px-6 py-4 text-base text-gray-400 border-b-2 border-gray-600">Mueva el mapa y selecionar un punto en el mapa para la ubicación del cupo.</p>
            <div className='p-6 flex flex-1 overflow-auto flex-col gap-6'>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"> place </span>
                <input className="form-input w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-12 pr-4 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50" placeholder="Lugar" type="text" onChange={onChangeNamePlace} value={namePlace} />
              </div>
              {location &&
              <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map
                  defaultZoom={15}
                  defaultCenter={location}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  onClick={handleMapClick}
                >
                  {marker && (
                    <Marker position={marker} />
                  )}
                </Map>
              </APIProvider>
              }

            </div>
            <div className="px-6 py-2 border-t-2 border-gray-600 gap-2 flex flex-col">
              <button
                onClick={()=>{handleUpdatePlace(namePlace, marker)}}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-[var(--primary-color)] text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-[var(--primary-color)]/20 transition-all hover:bg-opacity-90 hover:shadow-xl hover:shadow-[var(--secundary-color)]/30"
              >
                <span className="material-symbols-outlined mr-2">check</span>
                <span className="truncate">Seleccionar</span>
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