// src/pages/Profile/Profile.tsx
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (isSignedIn && user) {
        const docRef = doc(db, "users", user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.primaryEmailAddress?.emailAddress,
          });
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, [isSignedIn, user]);

  if (!isSignedIn || loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/events");
    
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, marginTop: 12, marginBottom: 4, maxWidth: 600, mx: "auto" }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Avatar src={user.imageUrl} sx={{ width: 80, height: 80 }} />
        <Typography variant="h5">
          {userData.firstName} {userData.lastName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {userData.email}
        </Typography>
        <Typography variant="caption">ID: {userData.id}</Typography>
      </Box>
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSignOut}
        >
          Log Out
        </Button>
      </Box>
    </Paper>
  );
}
