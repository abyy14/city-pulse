import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useDirection } from "../context/DirectionContext";
import { useState } from "react";

export default function CustomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const { direction, toggleDirection } = useDirection();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleSearchToggle = () => setSearchOpen(!searchOpen);

  return (
    <>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          px: isMobile ? 1 : 4,
          backgroundColor: "#fff",
          color: "#000",
          height: "64px",
          borderBottom: "1px solid #eee",
          boxShadow: "none",
          paddingTop: "3px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          {/* Left: Logo */}
          <Typography
            variant="h6"
            onClick={() => navigate("/events")}
            sx={{
              fontWeight: "bold",
              color: "#cb6ce6",
              cursor: "pointer",
            }}
          >
            City Pulse
          </Typography>

          <Box
            sx={{
              ...{
                flex: 1,
                display: "flex",
                px: 2,
              },
              ...(isMobile
                ? { justifyContent: "flex-end" }
                : { justifyContent: "center" }),
            }}
          >
            {location.pathname === "/events" &&
              (isMobile ? (
                <IconButton onClick={handleSearchToggle}>
                  <SearchIcon />
                </IconButton>
              ) : (
                <Box sx={{ width: "100%", maxWidth: 500 }}>
                  <SearchBox />
                </Box>
              ))}
          </Box>

          {/* Drawer Toggle for Mobile */}
          {isMobile ? (
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            // Right Actions on Desktop
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <IconButton onClick={() => navigate("/favorites")}>
                <FavoriteIcon sx={{ color: "#cb6ce6" }} />
              </IconButton>
              <Button
                size="small"
                onClick={toggleDirection}
                sx={{
                  color: "#cb6ce6",
                  backgroundColor: "white",
                  border: "1px solid #cb6ce6",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  textTransform: "none",
                }}
              >
                {direction === "ltr" ? "Switch to RTL" : "Switch to LTR"}
              </Button>
              {isSignedIn ? (
                <IconButton onClick={() => navigate("/profile")}>
                  <Avatar src={user?.imageUrl} />
                </IconButton>
              ) : (
                <SignInButton>
                  <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    sx={{
                      color: "#cb6ce6",
                      backgroundColor: "white",
                      border: "1px solid #cb6ce6",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      textTransform: "none",
                    }}
                  >
                    Sign In
                  </Button>
                </SignInButton>
              )}
            </Box>
          )}
        </Box>
      </AppBar>

      {/* Search Modal */}
      <Dialog
        open={searchOpen}
        onClose={handleSearchToggle}
        fullWidth
        maxWidth="sm"
      >
        <Box sx={{ p: 2 }}>
          <SearchBox />
        </Box>
      </Dialog>

      {/* Drawer for Mobile Right Actions */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            <ListItem>
              <Button
                size="small"
                fullWidth
                variant="contained"
                sx={{
                  color: "#cb6ce6",
                  backgroundColor: "white",
                  border: "1px solid #cb6ce6",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  textTransform: "none",
                }}
                onClick={() => {
                  navigate("/favorites");
                  setDrawerOpen(false);
                }}
              >
                <FavoriteIcon sx={{ mr: 1, color: "#cb6ce6" }} />
                <ListItemText primary="Favorites" />
              </Button>
            </ListItem>
            <ListItem>
              <Button
                size="small"
                fullWidth
                variant="contained"
                sx={{
                  color: "#cb6ce6",
                  backgroundColor: "white",
                  border: "1px solid #cb6ce6",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  textTransform: "none",
                }}
                onClick={() => {
                  toggleDirection();
                  setDrawerOpen(false);
                }}
              >
                <ListItemText
                  primary={
                    direction === "ltr" ? "Switch to RTL" : "Switch to LTR"
                  }
                />
              </Button>
            </ListItem>

            {isSignedIn ? (
              <ListItem>
              <Button
                size="small"
                fullWidth
                variant="contained"
                sx={{
                  color: "#cb6ce6",
                  backgroundColor: "white",
                  border: "1px solid #cb6ce6",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  textTransform: "none",
                }}
                onClick={() => {
                   navigate("/profile");
                  setDrawerOpen(false);
                }}
              >
                <Avatar src={user?.imageUrl} sx={{ mr: 1 }} />
                <ListItemText primary="Profile" />
              </Button>
            </ListItem>
            ) : (
              <ListItem>
                <SignInButton>
                  <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    sx={{
                      color: "#cb6ce6",
                      backgroundColor: "white",
                      border: "1px solid #cb6ce6",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      textTransform: "none",
                    }}
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
