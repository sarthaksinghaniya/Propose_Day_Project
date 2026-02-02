import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Intro from '../components/Intro';
import NameReveal from '../components/NameReveal';
import LetterCard from '../components/LetterCard';
import FinalReveal from '../components/FinalReveal';

const Home = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('proposeDayName');
    if (savedName) {
      setName(savedName);
      setShowWelcomeBack(true);
      setTimeout(() => {
        setShowWelcomeBack(false);
      }, 3000);
    }
  }, []);

  const handleIntroComplete = () => {
    setStep(1);
  };

  const handleNameSubmit = () => {
    if (name.trim()) {
      localStorage.setItem('proposeDayName', name.trim());
      setStep(2);
    }
  };

  const handleLetterComplete = () => {
    setStep(3);
  };

  const restartJourney = () => {
    setStep(0);
    setName("");
  };

  return (
    <div className="relative">
      {/* Welcome back message */}
      {showWelcomeBack && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.6, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed top-8 left-0 right-0 text-center z-50 pointer-events-none"
        >
          <p className="text-purple-300 text-sm font-light tracking-wide">
            Welcome back, {name}.
          </p>
        </motion.div>
      )}

      {step === 0 && <Intro onComplete={handleIntroComplete} />}
      {step === 1 && (
        <NameReveal
          name={name}
          setName={setName}
          onSubmit={handleNameSubmit}
        />
      )}
      {step === 2 && (
        <LetterCard
          name={name}
          onComplete={handleLetterComplete}
        />
      )}
      {step === 3 && <FinalReveal name={name} onRestart={restartJourney} />}
    </div>
  );
};

export default Home;
