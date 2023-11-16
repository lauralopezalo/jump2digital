import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import getPeople from "../services/getPeople";
import getMonuments from "../services/getMonuments";
import L from 'leaflet';
const Map = () => {
    const [monumentsData, setMonumentsData] = useState([]);
    const [peopleData, setPeopleData] = useState([]);
    const [peopleNearby, setPeopleNearby] = useState({});

    useEffect(() => {
        const fetchMonuments = async () => {
            try {
                const response = await getMonuments();
                setMonumentsData(response.data);
                console.log("monumentsData=> " + monumentsData)
            } catch (error) {
                console.error("Error al obtener datos de la API:", error);
            }
        };

        const fetchPeople = async () => {
            try {
                const response = await getPeople();
                setPeopleData(response.data);
            } catch (error) {
                console.error("Error al obtener datos de la API:", error);
            }
        };
        fetchMonuments();
        fetchPeople();
    }, []);

    //   Calcular distancia entre puntos y número de personas próximas
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

        const calculatePeopleNearby = () => {
            const newPeopleNearby = {};

            monumentsData.forEach((monument) => {
                let peopleNearbyCount = 0;

                peopleData.forEach((person) => {
                    const distanceToPerson = calculateDistance(
                        { lat: monument.lat, lng: monument.lon },
                        { lat: person.lat, lng: person.lon }
                    );

                    if (distanceToPerson <= 0.8) {
                        peopleNearbyCount++;
                    }
                });

                newPeopleNearby[monument.id] = peopleNearbyCount;
                console.log("newPeopleNearby.10=> " + newPeopleNearby)
            });

            setPeopleNearby(newPeopleNearby);
        };

        calculatePeopleNearby();
    }, [monumentsData, peopleData]); // Dependencias actualizadas para re-calcular cuando cambian los datos

    const getCustomIcon = (url) => {
        console.log(url)
        if (!url) {
            // Si la URL es nula o vacía, utiliza un icono por defecto o maneja la situación según tus necesidades
            return new L.Icon.Default();
          }
        
          return new L.Icon({
            iconUrl: url,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });
      };

    return (
        <div className="w-screen h-screen block md:flex">
            <MapContainer
                className="md:w-2/3 md:h-full"
                center={[41.3874, 2.1868]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Marcadores para los monumentos obtenidos de la API  */}
                {monumentsData.map((monument) => (
                    <Marker key={monument.id} position={[monument.lat, monument.lon]} icon={getCustomIcon(monument.url)}>
                        <Popup>
                            <div>
                                <h3>{monument.title}</h3>
                                <p>{monument.description}</p>
                                <p>
                                    Número de personas en un radio de 400 metros:{" "}
                                    {peopleNearby[monument.id]}
                                </p>
                            </div>
                        </Popup>
                        {/* {console.log("id =>" + monument.title + " lat =>" + monument.lat + " lon =>" + monument.lon)} */}
                    </Marker>
                ))}

                {/* Marcadores para las personas obtenidas de la API */}
                {peopleData.map((person, index) => (
                    <Marker key={index} position={[person.lat, person.lon]}>
                        <Popup>
                            Persona {index + 1} <br /> Easily customizable.
                        </Popup>
                        {console.log("id =>" + person.id + " lat =>" + person.lat + " lon =>" + person.lon)}
                    </Marker>
                ))}
            </MapContainer>

            <div className="md:w-1/3">
                <div>
                    <ul>Esta es mi lista de monumentos</ul>
                    {monumentsData.map((monument) => (
                        <li key={monument.id}>
                            {monument.title}
                            <br />
                            Número de personas en un radio de 800 metros:{" "}
                            {peopleNearby[monument.id]}
                        </li>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Map;
