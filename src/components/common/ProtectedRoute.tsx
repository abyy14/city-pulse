// components/ProtectedRoute.tsx
import { useUser } from "@clerk/clerk-react";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // Optional: add a loader here
  return isSignedIn ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
