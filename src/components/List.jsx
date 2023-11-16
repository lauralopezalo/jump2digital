import { animated, useTransition } from '@react-spring/web';
import React, { useEffect, useState } from 'react';

const List = ({ monumentsData }) => {
    const [rows, set] = useState(monumentsData)

    const customShuffle = monumentsData => {
        const count = monumentsData.slice().sort((a, b) => a.peopleNearby - b.peopleNearby)
        console.log(count)
        return count
    }

    useEffect(() => {
        const t = setInterval(() => set(customShuffle), 10000)
        return () => clearInterval(t)
    }, [])

    let height = 0
    const transitions = useTransition(
        rows.map(data => (
            { ...data, y: (height += 300) - 300 }
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
        <div className='overflow-y-auto h-screen'>
            {transitions((style, monumentsData, t, index) => (
                <animated.div className='' style={{ zIndex: monumentsData.length - index, ...style }}>
                    <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100'>
                        <img className="object-cover w-full rounded-t-lg h-auto md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={monumentsData.url} alt="" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{monumentsData.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{monumentsData.description}</p>
                        </div>
                    </div>
                </animated.div>
            ))}
        </div>
    )
}

export default List