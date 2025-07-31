import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import logo from '../../assets/City.png'
import { useDirection } from '../context/DirectionContext';

export default function CustomNavBar() {
  const navigate = useNavigate();
  const location = useLocation()
  const { isSignedIn, user } = useUser();
   const { direction, toggleDirection } = useDirection();

  return (
    <AppBar position="fixed" sx={{ px: 4, backgroundColor: '#fff', color: '#000', height: '64px', borderBottom: '1px solid #eee', boxShadow: 'none' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1, justifyContent: 'space-between', paddingLeft: 2, paddingRight: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pointerEvents: 'cursor' }} onClick={() => navigate('/events')}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#cb6ce6' }}>City Pulse</span>
        </Box>
        {location.pathname === '/events' && (<SearchBox />)}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => navigate("/favorites")}>
            <FavoriteIcon color="primary" />
          </IconButton>
          <Button variant='text' onClick={toggleDirection} sx={{ color: 'text.primary', textTransform: 'none' }}>
            {direction === 'ltr' ? 'RTL' : 'LTR'}
          </Button>
          <Box ml={2}>
            {isSignedIn ? ( 
              <IconButton onClick={() => navigate('/profile')}>
                <Avatar src={user?.imageUrl} />
              </IconButton>
            ) : (
              <SignInButton>
                <Button color="inherit" variant='contained' >Sign In</Button>
              </SignInButton>
            )}
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
