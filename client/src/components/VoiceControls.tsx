import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useScrollNarration } from '@/hooks/use-scroll-narration';

export default function VoiceControls() {
  const [isNarrationEnabled, setIsNarrationEnabled] = useState(true);
  const [showControls, setShowControls] = useState(false);
  
  const { 
    isSpeaking, 
    isSupported, 
    resetNarration, 
    skipCurrent,
    currentSection 
  } = useScrollNarration(isNarrationEnabled);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-8 z-50">
      {/* Voice Status Indicator */}
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 glassmorphism-dark rounded-lg p-3 text-center"
          >
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [4, 12, 4],
                      backgroundColor: ['hsl(239, 84%, 67%)', 'hsl(263, 70%, 50%)', 'hsl(239, 84%, 67%)']
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.2, 
                      delay: i * 0.1 
                    }}
                    className="w-1 bg-primary rounded-full"
                  />
                ))}
              </div>
              <span className="text-sm text-slate-300">Speaking...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Control Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowControls(!showControls)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
          isNarrationEnabled 
            ? 'bg-gradient-to-r from-primary to-secondary' 
            : 'bg-slate-600'
        }`}
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          {isNarrationEnabled ? (
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          ) : (
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          )}
        </svg>
      </motion.button>

      {/* Expanded Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 glassmorphism-dark rounded-lg p-4 w-64"
          >
            <div className="space-y-3">
              <div className="text-sm font-semibold text-slate-300 text-center">
                Voice Narration Controls
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={() => setIsNarrationEnabled(!isNarrationEnabled)}
                  variant={isNarrationEnabled ? "default" : "outline"}
                  className="w-full text-sm"
                >
                  {isNarrationEnabled ? 'Disable' : 'Enable'} Narration
                </Button>

                {isNarrationEnabled && (
                  <>
                    <Button
                      onClick={skipCurrent}
                      disabled={!isSpeaking}
                      variant="outline"
                      className="w-full text-sm"
                    >
                      Skip Current
                    </Button>

                    <Button
                      onClick={resetNarration}
                      variant="outline"
                      className="w-full text-sm"
                    >
                      Reset All
                    </Button>
                  </>
                )}
              </div>

              {currentSection && (
                <div className="text-xs text-slate-400 text-center pt-2 border-t border-slate-600">
                  Current: {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility Text */}
      <div className="sr-only">
        Voice narration controls. 
        {isNarrationEnabled ? 'Narration is enabled' : 'Narration is disabled'}.
        {isSpeaking ? 'Currently speaking' : 'Not speaking'}.
      </div>
    </div>
  );
}