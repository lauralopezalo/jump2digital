import { useEffect, useState } from "react";
import { animated, useTransition } from "@react-spring/web";

const List = ({ monumentsData }) => {
    const [sortedMonuments, setSortedMonuments] = useState([...monumentsData]);

    useEffect(() => {
        const sortedData = sortedMonuments
            .slice()
            .sort((a, b) => a.peopleNearby - b.peopleNearby);
        setSortedMonuments(sortedData);
    }, []);


    let height = 0;
    const isSmallScreen = window.innerWidth <= 640;
    const transitions = useTransition(
        sortedMonuments.map(sortedMonuments => ({ ...sortedMonuments, y: isSmallScreen ? (height += 400) - 400 : (height += 200) - 200 })),
        {
            key: (monument) => monument.id,
            from: { height: 0, opacity: 0 },
            leave: { height: 0, opacity: 0 },
            enter: ({ y, height }) => ({ y, height, opacity: 1 }),
            update: ({ y, height }) => ({ y, height }),
        }
    )


    return (
        <div className="relative p-4 h-full w-full lg:overflow-y-auto bg-stone-200">
            {transitions((style, monument) => (
                <animated.div
                    key={monument.id}
                    className="card w-full"
                    style={{ ...style }}>
                    <div className="flex flex-col lg:flex-row rounded-lg overflow-hidden bg-white">
                        <img
                            className="object-cover h-48 lg:w-1/3 "
                            src={monument.url}
                            alt={monument.title}
                        />
                        <div className="flex flex-col max-h-48 justify-between p-4 leading-normal lg:w-2/3 flex-grow">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                {monument.title}
                            </h5>
                            <p className="mb-3 font-normal overflow-y-auto text-gray-700 dark:text-gray-400">
                                {monument.description}
                            </p>
                            {/* <p >{`People Nearby: ${monument.peopleNearby}`}</p> */}
                        </div></div>
                </animated.div>
            ))}
        </div>
    );
};

export default List;
