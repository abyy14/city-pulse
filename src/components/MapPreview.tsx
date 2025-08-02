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

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={openGoogleMaps}
      style={{
        height: '300px',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        marginTop: '1rem',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        style={{ height: '100%', width: '100%', pointerEvents: 'none' }} // prevent internal interaction
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
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
