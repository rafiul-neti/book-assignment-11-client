import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const Coverage = () => {
  const searchRef = useRef(null);
  const [serviceCenters, setServiceCenters] = useState([]);

  useEffect(() => {
    axios.get("/warehouses.json").then((data) => setServiceCenters(data.data));
  }, []);

//   console.log(serviceCenters);

  const position = [23.685, 90.3563];

  const handleSearch = (e) => {
    e.preventDefault();
    const searchedDist = e.target.search.value;
    const district = serviceCenters.find((cen) =>
      cen.district.toLowerCase().includes(searchedDist.toLowerCase())
    );

    if (district) {
      const coord = [district.latitude, district.longitude];
      searchRef.current.flyTo(coord, 12);
    }
  };

  return (
    <section className="my-10 bg-white min-h-screen max-w-7xl mx-auto p-1 md:p-3 lg:p-16 rounded-2xl z-0">
      <h1 className="text-2xl md:text-3xl lg:text-5xl text-[#62ab00] font-bold">
        We are available in 64 districts
      </h1>
      <div className="my-5">
        <form onSubmit={handleSearch}>
          <label className="input bg-[#FAFDF0]">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="search"
              required
              placeholder="Search here"
            />
          </label>
        </form>
      </div>

      <div className="">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[300px]"
          ref={searchRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, ind) => (
            <Marker key={ind} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>District: {center.district}</strong>
                <p>Service Area: {center.covered_area.join(", ")}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
