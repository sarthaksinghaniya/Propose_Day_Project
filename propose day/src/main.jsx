import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Handle background music autoplay
document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bgMusic');
  
  // Try to play music (browsers may block autoplay)
  const playMusic = () => {
    if (bgMusic) {
      bgMusic.play().catch(error => {
        console.log('Autoplay was prevented. User interaction required.');
        // Add click listener to start music on first user interaction
        document.addEventListener('click', () => {
          bgMusic.play().catch(e => console.log('Music play failed:', e));
        }, { once: true });
      });
    }
  };

  playMusic();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
