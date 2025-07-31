import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Event } from '../../store/useEventStore';
import { formatDateFn } from '../../utils/helper';
import { Link } from 'react-router-dom';

type Props = {
  event: Event;
  liked?: boolean;
  onToggleLike: (event: Event) => void;
};

const EventCard = ({ event, liked = false, onToggleLike }: Props) => {
  const dateTimeStr =
    event?.dates?.start?.localTime && event?.dates?.start?.localDate
      ? `${event.dates.start.localDate}T${event.dates.start.localTime}`
      : event?.dates?.start?.localDate
      ? `${event.dates.start.localDate}T00:00:00`
      : '';

  const formattedDate = formatDateFn(dateTimeStr || '00:00:00');

  return (
    <Link to={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        boxShadow: 'none',
        transition: '0.3s',
        position: 'relative',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-4px)',
          '& .fav-icon': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Image + Icon */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={event.images?.[0]?.url || 'https://via.placeholder.com/140'}
          alt={event.name}
        />
        <IconButton
          className="fav-icon"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'white',
            borderRadius: '50%',
            opacity: 0,
            transition: 'opacity 0.3s',
            zIndex: 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(event);
          }}
        >
          {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon color="error" />}
        </IconButton>
      </Box>

      {/* Content */}
      <CardContent>
        <Typography variant="h6" fontWeight="bold" noWrap>
          {event.name}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
          {formattedDate}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {event._embedded?.venues?.[0]?.name || 'Unknown Venue'}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" noWrap>
          From €0.00
        </Typography>
        {event.promoter && (
          <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
            {event.promoter.name}
          </Typography>
        )}
      </CardContent>
    </Card>
    </Link>
  );
};

export default EventCard;
