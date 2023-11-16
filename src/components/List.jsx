import { animated, useTransition } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import data from './data.json';

const List = (props) => {
    const [rows, set] = useState(data)


    // //   Calcular distancia entre puntos y número de personas próximas
    // useEffect(() => {
    //     // Función para calcular la distancia entre dos puntos
    //     const calculateDistance = (latlng1, latlng2) => {
    //         const R = 6371; // Radio de la Tierra en kilómetros
    //         const lat1 = latlng1.lat;
    //         const lon1 = latlng1.lng;
    //         const lat2 = latlng2.lat;
    //         const lon2 = latlng2.lng;

    //         const dLat = (lat2 - lat1) * (Math.PI / 180);
    //         const dLon = (lon2 - lon1) * (Math.PI / 180);

    //         const a =
    //             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //             Math.cos(lat1 * (Math.PI / 180)) *
    //             Math.cos(lat2 * (Math.PI / 180)) *
    //             Math.sin(dLon / 2) *
    //             Math.sin(dLon / 2);

    //         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //         const distance = R * c; // Distancia en kilómetros
    //         return distance;
    //     };

    //     const calculatePeopleNearby = () => {
    //         const newMonumentsData = [...monumentsData];

    //         monumentsData.forEach((monument) => {
    //             let peopleNearbyCount = 0;

    //             peopleData.forEach((person) => {
    //                 const distanceToPerson = calculateDistance(
    //                     { lat: monument.lat, lng: monument.lon },
    //                     { lat: person.lat, lng: person.lon }
    //                 );

    //                 if (distanceToPerson <= 0.4) {
    //                     peopleNearbyCount++;
    //                 }
    //             });

    //             monument.peopleNearby = peopleNearbyCount;
    //         });
    //         setMonumentsData(newMonumentsData);
    //     };

    //     calculatePeopleNearby();
    // }, [props]);


    const customShuffle = monumentData => {
        return monumentData.slice().sort((a, b) => a.peopleNearby - b.peopleNearby)
    }

    useEffect(() => {
        const t = setInterval(() => set(customShuffle), 3000)
        return () => clearInterval(t)
    }, [])

    let height = 0
    const transitions = useTransition(
        rows.map(data => (
            { ...data, y: (height += 100) - 100 }
        )),
        {
            key: (item) => item.name,
            from: { height: 0, opacity: 0 },
            leave: { height: 0, opacity: 0 },
            enter: ({ y, height }) => ({ y, height, opacity: 1 }),
            update: ({ y, height }) => ({ y, height }),
        }
    )
    return (
        <div className=''>
            {transitions((style, item, t, index) => (
                <animated.div className='' style={{ zIndex: data.length - index, ...style }}>
                    <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                        {/* monumento image */}
                        <div className='h-10 w-10' />
                        <h3>{item.name}</h3>
                        <div>{item.description}</div>
                    </div>
                </animated.div>
            ))}
        </div>
    )
}

export default List