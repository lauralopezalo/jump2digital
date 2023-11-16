import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import "./App.css";
import List from "./components/List.jsx";
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

  if (userIsLoading || monumentsIsLoading) {
    return <p>Loading...</p>;
  }

  if (userIsError || monumentsIsError) {
    return <p>Error fetching data</p>;
  }

  return (
    <>
      <Map peopleData={userData} monumentsData={monumentsData} />
    </>
  );
}

export default App;
