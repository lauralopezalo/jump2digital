import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Map from "./pages/Map";
import { fetchMonuments } from "./services/fetchMonuments.js";
import { fetchPeople } from "./services/fetchPeople.js";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  const aboutUsRef = useRef(null);
  const mapRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToAboutUsSection = () => {
    aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMapSection = () => {
    mapRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFooterSection = () => {
    footerRef.current.scrollIntoView({ behavior: 'smooth' });
  };



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
  });

  if (userIsLoading || monumentsIsLoading) {
    return <p>Loading...</p>;
  }

  if (userIsError || monumentsIsError) {
    return <p>Error fetching data</p>;
  }




  return (
    <>
      <Home scrollToAboutUsSection={scrollToAboutUsSection}
        scrollToMapSection={scrollToMapSection}
        scrollToFooterSection={scrollToFooterSection} />
      <div ref={aboutUsRef} id="aboutUs-section">
        <About />
      </div>
      <div ref={mapRef} id="map-section" >
        <Map peopleData={userData} monumentsData={monumentsData} />
      </div>
      <div ref={footerRef} id="footer-section" >
        <Footer />
      </div>
    </>
  );
}

export default App;
