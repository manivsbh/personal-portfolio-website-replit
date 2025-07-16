import { useState, useEffect, useRef } from 'react';
import { useSpeech } from './use-speech';

interface NarrationSection {
  id: string;
  text: string;
  element?: Element;
  hasBeenNarrated?: boolean;
}

const narrationTexts: Record<string, string> = {
  home: "Hello! I'm Manish Cheepa, a Software Developer with over 6 years of experience in data engineering and cloud technologies. Welcome to my portfolio!",
  about: "Let me tell you about my journey. I currently work as a Software Developer IV at Astreya in Dublin, where I lead teams and design cutting-edge data solutions. I hold a Master's in Computer Science and have achieved remarkable results like winning a 10 million dollar project.",
  skills: "Here are my technical capabilities. I'm highly proficient in Python, SQL, and modern frameworks like Django and Flask. I specialize in cloud platforms including AWS and Azure, and I'm expert in big data technologies like Apache Spark and Kafka.",
  experience: "My professional experience spans multiple renowned companies. At Astreya, I've saved 78% in licensing costs and led innovative projects. Previously at InfoObjects, I built data engineering platforms that saved hundreds of development hours. My journey began at Infosys, where I developed serverless solutions and automated systems.",
  projects: "These are some of my most impactful projects. I developed a Vega dashboard solution that won a 10 million dollar contract, built Flask-Angular applications that reduced costs by 60%, and created real-time data pipelines with millisecond latency. Each project demonstrates my ability to deliver business value through technology.",
  certifications: "I continuously expand my expertise through professional certifications. I'm AWS Certified Solutions Architect Associate, Microsoft Azure certified, and Google Cloud certified. I also hold specialized certifications in RPA development and artificial intelligence, keeping me at the forefront of technology trends.",
  contact: "I'm always excited to discuss new opportunities and collaborations. Whether you're looking for a senior developer, technical leader, or consultant, I'm available for full-time positions, consulting projects, and technical mentoring. Feel free to reach out through the contact form or connect with me directly."
};

export function useScrollNarration(isEnabled: boolean = true) {
  const [currentSection, setCurrentSection] = useState<string>('');
  const [sectionsNarrated, setSectionsNarrated] = useState<Set<string>>(new Set());
  const { speak, stop, isSpeaking, isSupported } = useSpeech();
  const sectionsRef = useRef<NarrationSection[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!isEnabled || !isSupported) return;

    // Initialize sections
    sectionsRef.current = Object.keys(narrationTexts).map(id => ({
      id,
      text: narrationTexts[id],
      hasBeenNarrated: false
    }));

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            setCurrentSection(sectionId);
            
            // Narrate if not already narrated
            if (!sectionsNarrated.has(sectionId) && narrationTexts[sectionId]) {
              setSectionsNarrated(prev => new Set([...prev, sectionId]));
              
              // Small delay to ensure smooth scrolling completes
              setTimeout(() => {
                speak(narrationTexts[sectionId], {
                  rate: 0.9,
                  pitch: 1,
                  volume: 0.7
                });
              }, 500);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    // Observe all sections
    Object.keys(narrationTexts).forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isEnabled, isSupported, sectionsNarrated, speak]);

  const resetNarration = () => {
    setSectionsNarrated(new Set());
    stop();
  };

  const narrate = (sectionId: string) => {
    if (narrationTexts[sectionId]) {
      speak(narrationTexts[sectionId]);
    }
  };

  const skipCurrent = () => {
    stop();
  };

  return {
    currentSection,
    isSpeaking,
    isSupported,
    resetNarration,
    narrate,
    skipCurrent,
    sectionsNarrated
  };
}