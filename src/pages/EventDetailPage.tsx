import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Stack,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import EventCarousel from '../components/EventCarousel';
import { formatDateFn } from '../utils/helper';
import { ExpandMore } from '@mui/icons-material';
import MapPreview from '../components/MapPreview';

const TM_API_KEY = process.env.REACT_APP_PUBLIC_TM_API_KEY;

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hideMapPreview, setHideMapPreview] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events/${id}.json`,
          { params: { apikey: TM_API_KEY } }
        );
        setEvent(response.data);
      } catch (error) {
        console.error('Error loading event:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Typography variant="h6" textAlign="center" mt={5}>
        Event not found.
      </Typography>
    );
  }

  const {
    name,
    dates,
    info,
    images,
    _embedded,
  } = event;

  const venue = _embedded?.venues?.[0];
 // const location = `${venue?.city?.name}, ${venue?.country?.name}${venue?.address?.line1 ? ` - ${venue.address.line1}` : ''}`;
  const eventDate = dates?.start?.localDate;
  const eventTime = dates?.start?.localTime;
  const attractionImages = _embedded?.attractions?.[0]?.images || images || [];

  const dateTimeStr =
      eventDate && eventTime
        ? `${eventDate}T${eventTime}`
        : eventDate
        ? `${eventDate}T00:00:00`
        : '';
  
    const formattedDate = formatDateFn(dateTimeStr || '00:00:00');

  console.log('Event Detail:', {
    name,
    eventDate,
    eventTime,
    info,
    images,
    venue,
    event,
    attractionImages,
  });

  return (
    <Container maxWidth="md" sx={{ pb: 4, pt: 12 }}>
      {/* Carousel */}
      {attractionImages?.length > 0 && (
        <EventCarousel images={attractionImages} />
      )}

      {/* Date and Time */}
     <Typography variant="subtitle2" fontWeight="bold" mt={2} color='text.secondary'>
        {formattedDate}
      </Typography>

      {/* Event Name */}
      <Typography variant="h4" fontWeight="bold" mt={2} fontFamily="'Roboto', sans-serif">
        {name}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* About Section */}
      <Typography variant="h6" gutterBottom>
        About
      </Typography>
      <Paper elevation={1} sx={{ p: 2, mb: 4 }}>
        <Typography variant="body1">
          {info || 'No additional details provided.'}
        </Typography>
      </Paper>

      {/* Location */}
      <Typography variant="h6" gutterBottom>
        Location
      </Typography>
      <Box sx={{ p: 0, display: 'flex', gap: '4px' }}>
        <div style={{ paddingTop: '3px' }}>
          <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' , gap: '2px' }}>
 <Typography variant="body1" fontWeight="bold">
          {venue?.name || 'Venue information not available'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${venue?.address?.line1}  - ${venue?.address?.line2 || ''}` || 'Address not available'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {venue?.city?.name || 'City information not available'}
        </Typography>
        {hideMapPreview  &&
        <Typography variant="body2" color="#3659e3" sx={{ cursor: 'pointer' }} onClick={() => setHideMapPreview(false)}>
          Get me directions 
          <ExpandMore fontSize="small" sx={{ verticalAlign: 'middle', marginLeft: '4px' }} />
        </Typography> } 
        {!hideMapPreview && (
          <Typography variant="body2" color="#3659e3" sx={{ cursor: 'pointer' }} onClick={() => setHideMapPreview(true)}>
            Hide Map Preview
            <ExpandMore fontSize="small" sx={{ verticalAlign: 'middle', marginLeft: '4px' }} />
          </Typography>
        )}
        </div>
       
      </Box>
      {!hideMapPreview && (
        <MapPreview
          latitude={venue?.location?.latitude || 0}
          longitude={venue?.location?.longitude || 0}
          locationName={venue?.name}
        />
      )}
    </Container>
  );
};

export default EventDetailPage;
