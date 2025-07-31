// components/MapPreview.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  latitude: number;
  longitude: number;
  locationName?: string;
};

const MapPreview = ({ latitude, longitude, locationName }: Props) => {
  // Fix default marker icon issue
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });

  return (
    <div style={{ height: '300px', width: '100%', borderRadius: '12px', overflow: 'hidden', marginTop: '1rem' }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{locationName || 'Event Location'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapPreview;
