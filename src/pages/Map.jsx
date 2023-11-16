import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import List from '../components/List';
const Map = () => {


    const [sagradaFamilia, setSagradaFamilia] = useState({
        name: 'Sagrada Familia',
        coords: [41.4036, 2.1744],
        peopleNearby: 0,
    });

    const persona1Coords = [41.4093, 2.2144];
    const persona2Coords = [41.40380199996997, 2.1785917256505973];

    useEffect(() => {
        // Función para calcular la distancia entre dos puntos
        const calculateDistance = (latlng1, latlng2) => {
            const R = 6371; // Radio de la Tierra en kilómetros
            const lat1 = latlng1.lat;
            const lon1 = latlng1.lng;
            const lat2 = latlng2.lat;
            const lon2 = latlng2.lng;

            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);

            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) *
                Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const distance = R * c; // Distancia en kilómetros
            return distance;
        };

        // Calcula la distancia y el número de personas en un radio de 400 metros
        const calculatePeopleNearby = () => {
            let peopleNearby = 0;

            // Calcula la distancia entre Sagrada Familia y Persona 1
            const distanceToPersona1 = calculateDistance(
                { lat: sagradaFamilia.coords[0], lng: sagradaFamilia.coords[1] },
                { lat: persona1Coords[0], lng: persona1Coords[1] }
            );

            // Calcula la distancia entre Sagrada Familia y Persona 2
            const distanceToPersona2 = calculateDistance(
                { lat: sagradaFamilia.coords[0], lng: sagradaFamilia.coords[1] },
                { lat: persona2Coords[0], lng: persona2Coords[1] }
            );

            // Verifica si las personas están dentro de un radio de 400 metros
            if (distanceToPersona1 <= 0.4) {
                peopleNearby++;
            }

            if (distanceToPersona2 <= 0.4) {
                peopleNearby++;
            }

            return peopleNearby;
        };

        // Actualiza el número de personas en un radio de 200 metros
        const peopleNearby = calculatePeopleNearby();
        setSagradaFamilia((prev) => ({ ...prev, peopleNearby: peopleNearby }));
    }, []);

    return (
        <div className='w-screen h-screen block md:flex'>
            <MapContainer className='md:w-2/3 md:h-full' center={[41.3874, 2.1868]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Sagrada Familia */}
                <Marker position={[41.4036, 2.1744]}>
                    <Popup>
                        Sagrada familia <br /> Easily customizable.
                    </Popup>
                </Marker>

                {/* Persona 1 */}
                <Marker position={persona1Coords}>
                    <Popup>
                        Persona 1 <br /> Easily customizable.
                    </Popup>
                </Marker>

                {/* Persona 2 */}
                <Marker position={persona2Coords}>
                    <Popup>
                        Persona 2 <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>




            <div className="md:w-1/3">
                {/* <div>
                    <ul>Esta es mi lista de monumentos</ul>
                    <li>Sagrada Familia
                        <br />
                        Número de personas en un radio de 400 metros: {sagradaFamilia.peopleNearby}
                    </li>
                </div> */}
                <List />
            </div>
        </div>
    )
}

export default Map;