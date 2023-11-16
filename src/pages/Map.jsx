import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import getMonuments from "../services/getMonuments";
import L from "leaflet";
import List from "../components/List";
const Map = (props) => {
    const [monumentsData, setMonumentsData] = useState(props.monumentsData);
    const [peopleData, setPeopleData] = useState(props.peopleData);

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
            const newMonumentsData = [...monumentsData];

            monumentsData.forEach((monument) => {
                let peopleNearbyCount = 0;

                peopleData.forEach((person) => {
                    const distanceToPerson = calculateDistance(
                        { lat: monument.lat, lng: monument.lon },
                        { lat: person.lat, lng: person.lon }
                    );

                    if (distanceToPerson <= 0.4) {
                        peopleNearbyCount++;
                    }
                });

                monument.peopleNearby = peopleNearbyCount;
            });

            setMonumentsData(newMonumentsData);
        };

        calculatePeopleNearby();
    }, [props]);

    const getCustomIcon = (url) => {
        if (!url) {
            return new L.Icon({
                iconUrl: "https://iili.io/JndefMg.png",
                iconSize: [16, 16],
            });
        }

        return new L.Icon({
            iconUrl: url,
            iconSize: [42, 42],
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
                    <Marker
                        key={monument.id}
                        position={[monument.lat, monument.lon]}
                        icon={getCustomIcon(monument.url)}
                    >
                        <Popup>
                            <div>
                                <h3>{monument.title}</h3>
                                <p>{monument.description}</p>
                                <p>
                                    Número de personas en un radio de 400 metros:{" "}
                                    {monument.peopleNearby}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Marcadores para las personas obtenidas de la API */}
                {peopleData.map((person, index) => (
                    <Marker
                        key={index}
                        position={[person.lat, person.lon]}
                        icon={getCustomIcon()}
                    ></Marker>
                ))}
            </MapContainer>

            <div className="md:w-1/3">
                <div>
                    <List monumentsData={monumentsData} />
                </div>
            </div>
        </div>
    );
};

export default Map;