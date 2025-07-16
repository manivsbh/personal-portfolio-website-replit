import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSpeech } from '@/hooks/use-speech';

export default function VoicePreview() {
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const { voices, speak, getBestVoice, isSupported } = useSpeech();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (voices.length > 0) {
      const bestVoice = getBestVoice();
      setSelectedVoice(bestVoice);
    }
  }, [voices, getBestVoice]);

  const previewText = "Hello, I'm Manish Cheepa. This is how I'll sound as I guide you through my professional portfolio.";

  const handleVoiceTest = (voice?: SpeechSynthesisVoice) => {
    speak(previewText, {
      voice: voice || selectedVoice || undefined,
      rate: 0.85,
      pitch: 0.9,
      volume: 0.8
    });
  };

  if (!isSupported) return null;

  const maleVoices = voices.filter(voice => 
    voice.lang.includes('en') && 
    (!voice.name.toLowerCase().includes('female') &&
     !voice.name.toLowerCase().includes('woman') &&
     !voice.name.toLowerCase().includes('sarah') &&
     !voice.name.toLowerCase().includes('susan') &&
     !voice.name.toLowerCase().includes('karen') &&
     !voice.name.toLowerCase().includes('emma') &&
     !voice.name.toLowerCase().includes('samantha'))
  );

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        onClick={() => setShowPreview(!showPreview)}
        variant="outline"
        className="glassmorphism-dark border-slate-600"
      >
        🎤 Voice Settings
      </Button>

      {showPreview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-12 left-0 glassmorphism-dark rounded-lg p-4 w-80 max-h-96 overflow-y-auto"
        >
          <h3 className="font-semibold mb-3">Choose Voice</h3>
          
          <div className="space-y-2 mb-4">
            <Button
              onClick={() => handleVoiceTest()}
              className="w-full text-sm"
              variant="default"
            >
              Test Best Male Voice
            </Button>
            
            <div className="text-xs text-slate-400">
              Current: {selectedVoice?.name || 'Default'}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Available Male Voices:</div>
            {maleVoices.slice(0, 8).map((voice, index) => (
              <Button
                key={index}
                onClick={() => handleVoiceTest(voice)}
                variant="outline"
                className="w-full text-xs justify-start"
              >
                {voice.name}
              </Button>
            ))}
          </div>

          <div className="mt-4 text-xs text-slate-400">
            💡 The system automatically selects the most masculine-sounding voice available on your device.
          </div>
        </motion.div>
      )}
    </div>
  );
}