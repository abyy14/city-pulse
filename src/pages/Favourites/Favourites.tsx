// pages/Favorites.tsx
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import { Grid, Typography, Container } from '@mui/material';
import EventCard from '../../components/common/EventCard';
import { Event } from '../../store/useEventStore'; // Your existing type

const Favorites = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Event[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      const favRef = collection(db, `users/${user.id}/likedEvents`);
      const snapshot = await getDocs(favRef);
      const favs: Event[] = snapshot.docs.map(doc => doc.data() as Event);
      setFavorites(favs);
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h6" align="center">
          Please sign in to view your favorite events.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Your Favorite Events
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorites yet.</Typography>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {favorites.map(event => (
            <Grid  size={{ xs: 12, md: 4, sm: 6, lg: 3 }} key={event.id} component="div">
              <EventCard event={event} liked={true} onToggleLike={() => {}} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
