import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./pages/Map";
import { fetchMonuments } from "./services/fetchMonuments.js";
import { fetchPeople } from "./services/fetchPeople.js";

function App() {
  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useQuery({
    queryKey: ["fetchPeople"],
    queryFn: fetchPeople,
    refetchInterval: 10000,
  });
  const {
    data: monumentsData,
    isLoading: monumentsIsLoading,
    isError: monumentsIsError,
  } = useQuery({
    queryKey: ["fetchMonuments"],
    queryFn: fetchMonuments,
    refetchInterval: 10000,
  });

<<<<<<< HEAD
  // </div>
  <Map />
  )
=======
  if (userIsLoading || monumentsIsLoading) {
    return <p>Loading...</p>;
  }

  if (userIsError || monumentsIsError) {
    return <p>Error fetching data</p>;
  }
  console.log(userData);
  console.log(monumentsData);
  return (
    <>
      <Map peopleData={userData} monumentsData={monumentsData}/>
      {userData.map((item) => (
        <li key={item.id}>
          {item.id}
          {item.lat}
          {item.lon}
        </li>
      ))}
      {monumentsData.map((item) => (
        <li key={item.id}>
          {item.id}
          {item.lat}
          {item.lon}
          {item.title}
          {item.description}
          {item.url}
        </li>
      ))}
    </>
  );
>>>>>>> main
}

export default App;
