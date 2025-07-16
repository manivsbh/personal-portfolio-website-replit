import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSpeech } from '@/hooks/use-speech';

export default function VoiceIntroduction() {
  const [showIntro, setShowIntro] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const { speak, isSupported } = useSpeech();

  useEffect(() => {
    // Show intro after a short delay when page loads
    const timer = setTimeout(() => {
      if (isSupported && !hasBeenShown) {
        setShowIntro(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSupported, hasBeenShown]);

  const handleEnableVoice = () => {
    setHasBeenShown(true);
    setShowIntro(false);
    
    // Start with welcome message
    speak("Welcome to my portfolio! I'll guide you through my professional journey as you scroll. You can control the narration using the voice button at the bottom right.", {
      rate: 0.9,
      pitch: 1,
      volume: 0.8
    });
  };

  const handleDecline = () => {
    setHasBeenShown(true);
    setShowIntro(false);
  };

  if (!isSupported || hasBeenShown) {
    return null;
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glassmorphism-dark rounded-2xl p-8 max-w-md w-full text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </motion.div>

            <h3 className="text-2xl font-bold mb-4 gradient-text">
              🎤 Voice-Guided Portfolio
            </h3>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              Hi! I'm Manish. Would you like me to personally guide you through my portfolio with voice narration as you scroll?
            </p>

            <div className="space-y-3">
              <Button
                onClick={handleEnableVoice}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                </svg>
                Yes, Enable Voice Guide
              </Button>
              
              <Button
                onClick={handleDecline}
                variant="outline"
                className="w-full border-slate-600 hover:bg-slate-700"
              >
                No Thanks, Browse Silently
              </Button>
            </div>

            <div className="mt-4 text-xs text-slate-400">
              💡 You can toggle voice controls anytime using the button at bottom-right
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}