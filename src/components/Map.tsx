import React, { FC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useQuery } from "@tanstack/react-query";
import CovidApi from "api/covidApi";

const markerIcon = L.icon({
  iconUrl: "marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export interface IMapProps {}

const Map: FC<IMapProps> = () => {
  const countryWise = useQuery({
    queryKey: ["countryWise"],
    queryFn: CovidApi.countries,
  });

  if (countryWise.isLoading) return <p>Loading</p>;

  if (countryWise.isError) return <p>Error</p>;
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "600px", width: "100%", zIndex: 2 }}
    >
      <TileLayer
        noWrap
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {countryWise.data.map(country => (
        <Marker
          key={country.countryInfo._id}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          icon={markerIcon}
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>Active Cases: {country.active}</p>
              <p>Recovered Cases: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default Map;
