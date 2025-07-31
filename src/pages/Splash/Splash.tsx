import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Splash.css";
import logo from '../../logo.svg'

const Splash = () => {
  const navigate = useNavigate();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Navigate after fade-out completes
  useEffect(() => {
    if (isFadingOut) {
      const fadeTimer = setTimeout(() => {
        navigate("/events");
      }, 1000);
      return () => clearTimeout(fadeTimer);
    }
  }, [isFadingOut, navigate]);

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          className="splash-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            src={logo}
            alt="Logo"
            className="splash-logo"
          />
          <h1 className="splash-title">City Pulse</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Splash;
