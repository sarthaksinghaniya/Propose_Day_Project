import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingHearts from './FloatingHearts';

const FinalReveal = ({ name, onRestart }) => {
  const [response, setResponse] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        staggerChildren: 0.3,
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.04,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  const handleResponse = (answer) => {
    setResponse(answer);
  };

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => {
      onRestart();
    }, 1500);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#fde6f2] via-[#f3dcff] to-[#fde6f2] flex items-center justify-center p-4 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isRestarting ? "hidden" : "visible"}
      transition={{ duration: 1 }}
    >
      {/* Candle flicker lighting effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(255, 248, 220, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 48% 52%, rgba(255, 248, 220, 0.15) 0%, transparent 70%)",
            "radial-gradient(circle at 52% 48%, rgba(255, 248, 220, 0.08) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(255, 248, 220, 0.1) 0%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating hearts background */}
      <FloatingHearts />

      {/* Very slow floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
              opacity: 0.08 + (i % 3) * 0.02,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-3, 3, -3],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-2xl mx-auto">
        <motion.div
          variants={textVariants}
          className="space-y-6"
        >
          {/* Greeting */}
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-light text-[#7a4fbf] tracking-wide"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {name}…
          </h1>

          {/* Main proposal text */}
          <motion.div
            variants={textVariants}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl font-light text-[#7a4fbf] leading-loose tracking-wide">
              Today is Propose Day.
            </p>
            <p className="text-lg md:text-xl font-light text-[#7a4fbf] leading-loose tracking-wide">
              So I won't ask loudly.
              <br />
              I won't rush you.
            </p>
            <p className="text-lg md:text-xl font-light text-[#7a4fbf] leading-loose tracking-wide">
              Some feelings deserve patience,
              <br />
              and some moments deserve silence.
            </p>
            <p className="text-lg md:text-xl font-light text-[#7a4fbf] leading-loose tracking-wide">
              But if your heart felt warm
              <br />
              reading this…
            </p>
            
            {/* Final question with heartbeat */}
            <motion.p 
              className="text-xl md:text-2xl font-light text-[#7a4fbf] leading-loose tracking-wide"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: 1,
                ease: "easeInOut",
                delay: 2,
              }}
            >
              Will you walk with me —
              <br />
              today,
              <br />
              and in all the quiet tomorrows?
            </motion.p>

            {/* Tiny sparkles near question */}
            <div className="absolute -right-8 top-0">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-300 text-xs"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: `${i * 10}px`,
                    top: `${i * 5}px`,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Response buttons - only show if no response yet */}
        {!response && !isRestarting && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={() => handleResponse('yes')}
              className="px-8 py-4 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-full font-light tracking-wide shadow-lg hover:shadow-xl hover:shadow-pink-300/40 transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Yes, I'd love to
            </motion.button>

            <motion.button
              onClick={() => handleResponse('maybe')}
              className="px-8 py-4 bg-white/80 text-[#7a4fbf] border border-purple-300 rounded-full font-light tracking-wide shadow-lg hover:shadow-xl hover:shadow-purple-300/40 transition-all duration-300"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Let me smile first
            </motion.button>
          </motion.div>
        )}

        {/* Response message */}
        {response && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-12"
          >
            {response === 'yes' ? (
              <div className="space-y-4">
                {/* Gentle confetti effect */}
                <div className="relative">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: `${-50 + (i % 6) * 20}px`,
                        top: `${-30 + Math.floor(i / 6) * 15}px`,
                      }}
                      animate={{
                        y: [0, -100, -200],
                        opacity: [1, 0.8, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      {['🌸', '💕', '✨', '🌺'][i % 4]}
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="text-6xl"
                  >
                    💕
                  </motion.div>
                </div>
                <p 
                  className="text-2xl md:text-3xl font-light text-[#7a4fbf] tracking-wide"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Then this moment
                  <br />
                  belongs to us now.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-6xl"
                >
                  😊
                </motion.div>
                <p 
                  className="text-2xl md:text-3xl font-light text-[#7a4fbf] tracking-wide"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  That's okay.
                  <br />
                  Some smiles take time.
                </p>
              </div>
            )}

            {/* Restart journey button */}
            <motion.div className="mt-8 space-y-2">
              <motion.button
                onClick={handleRestart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  text-sm
                  text-[#7a4fbf]
                  underline
                  underline-offset-4
                  opacity-60
                  hover:opacity-100
                  transition-all duration-300
                  floating-letter
                "
              >
                Relive this moment 💞
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Restart message */}
        {isRestarting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center space-y-4"
          >
            <p className="text-lg text-[#7a4fbf] font-light">
              some feelings like to be revisited…
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FinalReveal;
