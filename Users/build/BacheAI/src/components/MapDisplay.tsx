'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { PotholeReport } from '@/lib/types';
import L from 'leaflet';
import 'leaflet.heat';
import { useEffect, useRef } from 'react';


// Fix for default icon issues with webpack
const defaultIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;


interface HeatmapLayerProps {
  points: [number, number, number][];
}

const HeatmapLayer = ({ points }: HeatmapLayerProps) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;

    // The 'heat' property is added by the leaflet.heat plugin
    const heatLayer = (L as any).heatLayer(points, {
        radius: 25,
        blur: 15,
        maxZoom: 18,
        max: 1.0, 
        gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'}
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};


interface MapDisplayProps {
  reports: PotholeReport[];
}

export default function MapDisplay({ reports }: MapDisplayProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const bahiaBlancaCoords: [number, number] = [-38.7183, -62.2661];

    useEffect(() => {
        if (mapContainerRef.current && !mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current).setView(bahiaBlancaCoords, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            mapInstanceRef.current = map;
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        map.eachLayer((layer) => {
            if (layer instanceof L.Marker || (layer as any)._heat) {
                map.removeLayer(layer);
            }
        });

        const parseLocation = (location: string): [number, number] | null => {
            try {
                const [lat, lng] = location.split(',').map(coord => parseFloat(coord.trim()));
                return !isNaN(lat) && !isNaN(lng) ? [lat, lng] : null;
            } catch (e) {
                return null;
            }
        };

        const validPoints = reports
            .map(report => {
                const coords = parseLocation(report.location);
                return coords ? { ...report, coords } : null;
            })
            .filter((point): point is PotholeReport & { coords: [number, number] } => point !== null);

        validPoints.forEach(point => {
            L.marker(point.coords)
                .addTo(map)
                .bindPopup(`<b>Puntaje: ${point.score}</b><br />Reportado por: ${point.alias}<br />Fecha: ${new Date(point.timestamp).toLocaleString()}`);
        });

        const heatPoints: [number, number, number][] = validPoints.map(p => [p.coords[0], p.coords[1], p.score / 100]); // Normalize score for intensity
        if (heatPoints.length > 0) {
            (L as any).heatLayer(heatPoints, {
                radius: 20,
                blur: 30,
                maxZoom: 18,
                max: 1.0,
                gradient: {0.1: 'blue', 0.4: 'green', 0.7: 'yellow', 1: 'red'}
            }).addTo(map);
        }

    }, [reports]);

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
}
