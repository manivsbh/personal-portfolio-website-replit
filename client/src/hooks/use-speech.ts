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
    
    // Try to use a more natural voice
    if (options.voice) {
      utterance.voice = options.voice;
    } else {
      // Prefer English voices that sound more natural
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.includes('Google') || 
         voice.name.includes('Microsoft') ||
         voice.name.includes('Natural') ||
         voice.name.includes('Enhanced'))
      ) || voices.find(voice => voice.lang.includes('en'));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
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
    // Try to get the most natural-sounding male voice for professional presentation
    const maleVoices = voices.filter(voice => 
      voice.lang.includes('en') && 
      (voice.name.toLowerCase().includes('male') ||
       voice.name.toLowerCase().includes('david') ||
       voice.name.toLowerCase().includes('mark') ||
       voice.name.toLowerCase().includes('ryan'))
    );

    if (maleVoices.length > 0) {
      return maleVoices[0];
    }

    // Fallback to any good English voice
    return voices.find(voice => 
      voice.lang.includes('en') && 
      (voice.name.includes('Google') || 
       voice.name.includes('Microsoft'))
    ) || voices.find(voice => voice.lang.includes('en'));
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