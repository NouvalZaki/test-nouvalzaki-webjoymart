// src/components/StoreMap.tsx
'use client';

import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet'; 

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


interface StoreLocation {
    name: string;
    address: string;
    lat: number;
    lng: number;
}

interface StoreMapProps {
    locations: StoreLocation[];
}


export default function StoreMap({ locations }: StoreMapProps) {
  
  const centerPosition = useMemo(() => {
    if (locations.length === 0) return { lat: -0.501170, lng: 117.153722 };
    
    const totalLat = locations.reduce((sum, loc) => sum + loc.lat, 0);
    const totalLng = locations.reduce((sum, loc) => sum + loc.lng, 0);
    
    return {
      lat: totalLat / locations.length,
      lng: totalLng / locations.length,
    };
  }, [locations]);

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={[centerPosition.lat, centerPosition.lng]} 
        zoom={13} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location, index) => (
          <Marker 
            key={index} 
            position={[location.lat, location.lng]}
            icon={icon} 
          >
            <Popup>
              <span className="font-bold">{location.name}</span><br />
              {location.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}