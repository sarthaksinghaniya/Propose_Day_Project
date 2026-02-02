import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment, Text } from '@react-three/drei';
import { useState, useRef, Suspense } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const Letter = ({ name, onUnfold, isUnfolded }) => {
  const letterRef = useRef();
  const { displayedText } = useTypewriter(
    `Dear ${name},\n\nIn this quiet moment,\nmy heart finds its voice.\n\nEvery beat whispers your name,\nevery breath wishes for you.\n\nForever yours...`,
    30
  );
  
  return (
    <group ref={letterRef}>
      {/* Envelope/Letter base */}
      <mesh
        rotation={isUnfolded ? [0, Math.PI, 0] : [0, 0, 0]}
        onClick={onUnfold}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[3, 4, 0.1]} />
        <meshStandardMaterial 
          color="#f8f4e6" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Letter content (appears when unfolded) */}
      {isUnfolded && (
        <group>
          <Text
            position={[0, 0, 0.1]}
            fontSize={0.15}
            color="#8b4513"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.5}
            textAlign="center"
          >
            {displayedText}
          </Text>
        </group>
      )}
    </group>
  );
};

const Letter3D = ({ name, onComplete }) => {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const handleUnfold = () => {
    if (!isUnfolded) {
      setIsUnfolded(true);
      setTimeout(() => setShowContinue(true), 3000);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 relative">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <pointLight position={[-10, -10, -5]} intensity={0.4} />
            
            <Center>
              <Letter 
                name={name} 
                onUnfold={handleUnfold} 
                isUnfolded={isUnfolded}
              />
            </Center>
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              enableRotate={!isUnfolded}
              autoRotate={!isUnfolded}
              autoRotateSpeed={1}
            />
            
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>

      {/* Instructions */}
      {!isUnfolded && (
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-amber-900/60 text-sm font-light tracking-wide">
            Click the letter to open
          </p>
        </div>
      )}

      {/* Continue button */}
      {showContinue && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <button
            onClick={handleContinue}
            className="px-6 py-2 bg-amber-900/20 border border-amber-900/30 rounded-full text-amber-900 font-light tracking-wide hover:bg-amber-900/30 transition-all duration-300"
          >
            Continue
          </button>
        </div>
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
              fontSize: `${16 + Math.random() * 20}px`,
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Letter3D;
