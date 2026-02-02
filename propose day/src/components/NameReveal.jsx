import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingLetters from './FloatingLetters';

const NameReveal = ({ name, setName, onSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    floating: {
      y: [0, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handwrittenLetters = ['A', 'B', 'C', 'L', 'O', 'V', 'E'];

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f14] via-[#15151f] to-[#1a1a2e] relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating letters background */}
      <FloatingLetters />

      {/* Floating handwritten letters */}
      <div className="absolute inset-0 pointer-events-none">
        {handwrittenLetters.map((letter, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-300/20 text-2xl floating-letter"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              fontFamily: "'Dancing Script', cursive",
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            {letter}
          </motion.div>
        ))}
      </div>

      {/* Gentle heart particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/10 text-lg"
            style={{
              left: `${15 + i * 18}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-5, 5, -5],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <div className="max-w-md w-full space-y-8 z-10">
        {/* Floating letter in foreground */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 text-5xl text-center floating-letter"
        >
          💌
        </motion.div>

        {/* Floating input container */}
        <motion.div
          className="relative"
          variants={inputVariants}
          animate="floating"
        >
          <motion.input
            type="text"
            placeholder="Type their name…"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`
              bg-transparent
              border-b border-purple-400
              text-center
              text-lg
              text-purple-200
              placeholder-purple-400
              focus:outline-none
              px-4 py-2
              w-full
              ${isFocused ? 'shadow-lg shadow-purple-400/20' : ''}
              transition-all duration-300
            `}
          />
          
          {/* Blinking heart cursor */}
          <motion.div
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-purple-300"
            animate={{
              opacity: isFocused ? [1, 0, 1] : 0,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💜
          </motion.div>
        </motion.div>

        {/* Submit button - only shows when there's text */}
        {name.trim() && (
          <motion.div
            className="flex justify-center"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-full text-purple-200 font-light tracking-wide hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 pulse-soft"
            >
              Continue
            </button>
          </motion.div>
        )}

        {/* "Someone is waiting" text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute bottom-10 text-xs text-purple-300 tracking-widest"
        >
          Someone has been waiting for you…
        </motion.p>

        {/* Ambient glow with parallax */}
        <motion.div
          className="absolute inset-0 pointer-events-none parallax-slow"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

export default NameReveal;
