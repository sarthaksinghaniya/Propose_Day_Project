import { motion } from "framer-motion";

const letters = ["✉️", "💌", "📜"];

export default function FloatingLetters() {
  return (
    <>
      {letters.map((letter, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-20"
          initial={{
            y: Math.random() * 200,
            x: Math.random() * window.innerWidth,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {letter}
        </motion.div>
      ))}
    </>
  );
}
