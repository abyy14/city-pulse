import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, Variant, Variants } from "framer-motion";
import "./Splash.css";
import logo from '../../logo.svg'
import LogoIcon from "../../assets/logo";

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

 const logoVariants : Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: [0, 10, -10, 0], // shake effect
    transition: {
      duration: 1.2,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 4
    }
  },
};

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
          <motion.div
  variants={logoVariants}
  initial="hidden"
  animate="visible"
>
          <LogoIcon width="50" height="50" />
          </motion.div>
          <h1 className="splash-title">City Pulse</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Splash;
