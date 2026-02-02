import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const LetterCard = ({ name, onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isAging, setIsAging] = useState(false);

  const letterContent = `Hey ${name},

I tried to write something clever.
Something perfect.

But the truth is…
you already make everything feel enough.

Some people arrive like noise,
you arrived like calm.

And somewhere between small smiles
and quiet thoughts,
my heart chose you —
without asking permission.

So this isn't a grand confession.
Just a gentle truth.

I like you.
More than yesterday.
Less than tomorrow.`;

  const { displayedText } = useTypewriter(letterContent, 40);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowText(true), 800);
    setTimeout(() => setIsAging(true), 1000);
  };

  const handleContinue = () => {
    onComplete();
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const letterVariants = {
    closed: {
      rotateX: 15,
      rotateY: 0,
      scale: 1,
    },
    open: {
      rotateX: 0,
      rotateY: 5,
      scale: 1.05,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.3
      }
    }
  };

  const agingVariants = {
    initial: {
      backgroundColor: "#f8f1e7",
      color: "#2e2e2e",
    },
    aged: {
      backgroundColor: "#f5e8d8",
      color: "#2a2a2a",
      transition: {
        duration: 8,
        ease: "easeInOut"
      }
    }
  };

  if (!isOpen) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 flex items-center justify-center p-4 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating ambient hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-purple-200 text-2xl"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              💜
            </motion.div>
          ))}
        </div>

        {/* Sealed letter */}
        <motion.div
          variants={letterVariants}
          initial="closed"
          whileHover={{ 
            scale: 1.02, 
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpen}
          className="
            bg-[#f8f1e7]
            bg-[radial-gradient(circle_at_1px_1px,#e5dccc_1px,transparent_0)]
            bg-[size:6px_6px]
            rounded-xl p-8 shadow-xl cursor-pointer
            max-w-md w-full
            relative
          "
        >
          {/* Seal */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-lg">💜</span>
          </div>

          {/* Letter preview text */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-light text-gray-700">For {name}</h2>
            <p className="text-sm italic text-gray-500">
              Tap gently… it's fragile 💌
            </p>
            <div className="text-xs text-gray-400 mt-6">
              From someone who cares...
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 flex items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating ambient hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-200 text-2xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            💜
          </motion.div>
        ))}
      </div>

      {/* Open letter */}
      <motion.div
        variants={isAging ? agingVariants : letterVariants}
        animate={isAging ? "aged" : "open"}
        className="
          bg-[#f8f1e7]
          bg-[radial-gradient(circle_at_1px_1px,#e5dccc_1px,transparent_0)]
          bg-[size:6px_6px]
          rounded-xl p-8 shadow-xl
          max-w-md w-full
          relative
        "
      >
        {/* Letter content */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={showText ? "visible" : "hidden"}
          className="space-y-4"
        >
          <div className="text-center">
            <h2 className="text-xl font-light text-gray-700 mb-6">For {name}</h2>
            <div 
              className="text-gray-600 whitespace-pre-line font-light leading-relaxed text-sm ink-bleed"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem' }}
            >
              {displayedText}
            </div>
          </div>
        </motion.div>

        {/* Continue button */}
        {showText && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleContinue}
            className="mt-6 w-full text-sm text-purple-600 underline underline-offset-4 font-light transition-all duration-300 hover:text-purple-700"
          >
            Turn the page…
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LetterCard;
