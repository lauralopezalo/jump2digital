import { animated, useTransition } from '@react-spring/web'
import React, { useEffect, useState } from 'react'

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
            { ...data, y: (height += data.height) - data.height }
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
                    <div className=''>
                        {/* monumento image */}
                        <h3>{item.name}</h3>
                        <div className='' style={{ backgroundImage: item.css }}>{item.description}</div>
                    </div>
                </animated.div>
            ))}
        </div>

    )
}

export default List