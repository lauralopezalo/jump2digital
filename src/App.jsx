import { useState } from "react";
import "./App.css";
import Map from "./pages/Map";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"

function App() {
  return (
    // <div style={{width: 300, height:200}} id="map">
    //   <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
    //     <TileLayer
    //       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     />
    //     <Marker position={[51.505, -0.09]}>
    //       <Popup>
    //         A pretty CSS3 popup. <br /> Easily customizable.
    //       </Popup>
    //     </Marker>
    //   </MapContainer>

    // </div>
    <Map/>
    )
}

export default App;
