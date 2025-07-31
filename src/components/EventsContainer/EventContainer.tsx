import { useEffect, useState } from 'react';
import { Event, useEventStore } from '../../store/useEventStore';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
} from '@mui/material';
import EventCard from '../common/EventCard';
import { useUser } from '@clerk/clerk-react';
import { db } from '../../utils/firebaseConfig';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

const TM_API_KEY = 'tOJkYrJE6WO7fxOAgwZjGboLhWY0Jb5n';

const EventContainer = () => {
  const {
    events,
    filteredEvents,
    setEvents,
    initialFetchDone,
    setInitialFetchDone,
  } = useEventStore();

  const { user } = useUser();
  const [likedEventIds, setLikedEventIds] = useState<string[]>([]);

  // Fetch events from Ticketmaster
  useEffect(() => {
    const fetchDubaiEvents = async () => {
      try {
        const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
          params: { apikey: TM_API_KEY, city: 'Dubai', size: 20 },
        });
        const events = response.data._embedded?.events || [];
        setEvents(events);
        setInitialFetchDone(true);
      } catch (error) {
        console.error('Error fetching Dubai events:', error);
      }
    };

    if (!initialFetchDone) {
      fetchDubaiEvents();
    }
  }, [initialFetchDone, setEvents, setInitialFetchDone]);

  // Fetch liked events from Firestore
  useEffect(() => {
    const fetchLikedEvents = async () => {
      if (!user) return;

      const snapshot = await getDocs(collection(db, 'users', user.id, 'likedEvents'));
      const ids = snapshot.docs.map(doc => doc.id);
      setLikedEventIds(ids);
    };

    fetchLikedEvents();
  }, [user]);

  // Handle like/unlike
  const handleToggleLike = async (event : Event) => {
    if (!user) {
      alert('Please sign in to like events');
      return;
    }

    const eventRef = doc(db, 'users', user.id, 'likedEvents', event.id);
    const isLiked = likedEventIds.includes(event.id);

    if (isLiked) {
      await deleteDoc(eventRef);
      setLikedEventIds(prev => prev.filter(id => id !== event.id));
    } else {
      await setDoc(eventRef, event);
      setLikedEventIds(prev => [...prev, event.id]);
    }
  };

  const toRender = filteredEvents.length > 0 ? filteredEvents : events;

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 12, maxWidth: '1400px', mx: 'auto' }}>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight="bold"
        fontSize={{ xs: '1.5rem', sm: '2rem' }}
      >
        Events in Dubai
      </Typography>

      {!initialFetchDone ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : toRender.length === 0 ? (
        <Typography>No events found</Typography>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {toRender.map((event) => (
            <Grid  size={{ xs: 12, md: 4, sm: 6, lg: 3 }} key={event.id} component="div">
              <EventCard
                event={event}
                liked={likedEventIds.includes(event.id)}
                onToggleLike={handleToggleLike}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default EventContainer;
