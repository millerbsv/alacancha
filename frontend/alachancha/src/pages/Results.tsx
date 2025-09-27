import React, { useState } from 'react'
import { APIProvider, Map, Marker, useMap  } from '@vis.gl/react-google-maps';
import Reserve from './Reserve';

function FitBounds({ markers }: { markers: { position: google.maps.LatLngLiteral }[] }) {
  const map = useMap(); // obtiene el objeto google.maps.Map

  React.useEffect(() => {
    if (!map || markers.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    markers.forEach(m => bounds.extend(m.position));

    // Ajusta el mapa a los marcadores
    map.fitBounds(bounds);
  }, [map, markers]);

  return null; // no renderiza nada, solo ejecuta la lógica
}

export default function Results() {
  const [selectedMarker, setSelectedMarker] = useState<null | {
    id: number
    title: string
    reserva : string
  }>(null);

  // Marcadores de ejemplo
  const markers = [
    { id: 1, position: { lat: 6.252, lng: -75.56 }, title: 'Cancha 1', reserva: 'Reserva de 8:00 a 9:00 AM' },
    { id: 2, position: { lat: 6.255, lng: -74.565 }, title: 'Cancha 2', reserva: 'Reserva de 10:00 a 11:00 AM' },
  ]

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
              markers.map(({id, position, title, reserva }) => {
                return (
                  <Marker
                    position={position}
                    clickable={true}
                    onClick={() => setSelectedMarker({ id, title, reserva  })}
                    title={title}
                  />
                )
              })}
              <FitBounds markers={markers} />
            </Map>
          </APIProvider>
        </div>

        

      </div>
      {/* Modal */}
      {selectedMarker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Reserve/>
        </div>
      )}

    </div>
  )
}