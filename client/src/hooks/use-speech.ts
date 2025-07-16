import { useState, useEffect, useRef } from 'react';

interface SpeechOptions {
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function useSpeech() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      speechSynthesis.addEventListener('voiceschanged', loadVoices);

      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  const speak = (text: string, options: SpeechOptions = {}) => {
    if (!isSupported) return;

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice options
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 0.8;
    
    // Use the best male voice available
    if (options.voice) {
      utterance.voice = options.voice;
    } else {
      const bestVoice = getBestVoice();
      if (bestVoice) {
        utterance.voice = bestVoice;
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (isSpeaking && !isPaused) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (isSpeaking && isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const getBestVoice = () => {
    // Prioritize male voices that sound professional and authoritative
    const preferredMaleNames = [
      'david', 'mark', 'ryan', 'alex', 'daniel', 'microsoft david',
      'google uk english male', 'en-us-male', 'male', 'masculine'
    ];

    // First try to find specifically named male voices
    for (const maleName of preferredMaleNames) {
      const voice = voices.find(v => 
        v.lang.includes('en') && 
        v.name.toLowerCase().includes(maleName)
      );
      if (voice) return voice;
    }

    // Look for any voice that explicitly mentions male in the name
    const explicitMaleVoice = voices.find(voice => 
      voice.lang.includes('en') && 
      voice.name.toLowerCase().includes('male')
    );
    if (explicitMaleVoice) return explicitMaleVoice;

    // Filter out obviously female voices and pick from remaining
    const nonFemaleVoices = voices.filter(voice => 
      voice.lang.includes('en') && 
      !voice.name.toLowerCase().includes('female') &&
      !voice.name.toLowerCase().includes('woman') &&
      !voice.name.toLowerCase().includes('girl') &&
      !voice.name.toLowerCase().includes('sarah') &&
      !voice.name.toLowerCase().includes('susan') &&
      !voice.name.toLowerCase().includes('karen') &&
      !voice.name.toLowerCase().includes('emma') &&
      !voice.name.toLowerCase().includes('samantha')
    );

    // Prefer Google or Microsoft voices from the filtered list
    const qualityVoice = nonFemaleVoices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.name.includes('Enhanced')
    );

    return qualityVoice || nonFemaleVoices[0] || voices.find(voice => voice.lang.includes('en'));
  };

  return {
    isSupported,
    isSpeaking,
    isPaused,
    voices,
    speak,
    pause,
    resume,
    stop,
    getBestVoice
  };
}