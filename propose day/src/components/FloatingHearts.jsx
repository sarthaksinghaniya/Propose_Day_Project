import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [...Array(12)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDuration: 8 + Math.random() * 4,
        animationDelay: Math.random() * 5,
        size: 16 + Math.random() * 20,
      }));
      setHearts(newHearts);
    };

    generateHearts();
    const interval = setInterval(generateHearts, 10000);
    return () => clearInterval(interval);
  }, []);

  const heartVariants = {
    floating: {
      y: [100, -100],
      opacity: [0, 0.8, 0],
      scale: [0.8, 1, 0.8],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/30"
          style={{
            left: `${heart.left}%`,
            bottom: 0,
            fontSize: `${heart.size}px`,
          }}
          variants={heartVariants}
          animate="floating"
          transition={{
            duration: heart.animationDuration,
            delay: heart.animationDelay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
