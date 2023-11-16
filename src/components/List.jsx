import { animated, useTransition } from '@react-spring/web'
import React, { useEffect, useState } from 'react'
import data from './data.json'

const List = () => {
    const [rows, set] = useState(data)

    const customShuffle = data => {
        return data.slice().sort((a, b) => a.population - b.population)
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
            enter: ({ y, height }) => ({ y, height: 100, opacity: 1 }),
            update: ({ y, height }) => ({ y, height: 100 }),
        }
    )
    return (
        <div className=''>
            {transitions((style, item, t, index) => (
                <animated.div className='bg-red-400' style={{ zIndex: data.length - index, ...style }}>
                    <div className='flex'>
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