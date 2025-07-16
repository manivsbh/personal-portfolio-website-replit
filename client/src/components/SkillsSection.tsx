import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/data";

const SkillBar = ({ skill, index }: { skill: { name: string; level: number }; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => {
            setWidth(skill.level);
          }, index * 200);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [skill.level, index, isVisible]);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-semibold">{skill.name}</span>
        <span className="text-slate-400">{skill.level}%</span>
      </div>
      <div className="skill-bar bg-slate-700 rounded-full h-3">
        <div
          className="skill-progress"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Technical</span> Skills
          </h2>
          <p className="text-xl text-slate-400">Technologies and tools I work with daily</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism-dark rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Programming Languages</h3>
            <div className="space-y-6">
              {skills.programming.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Frameworks & Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism-dark rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-secondary">Frameworks & Tools</h3>
            <div className="space-y-6">
              {skills.frameworks.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technology Icons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-accent">Technologies & Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="glassmorphism-dark rounded-xl p-6 text-center transition-transform duration-300"
              >
                <i className={`${tech.icon} text-3xl mb-2 text-primary`}></i>
                <div className="text-sm font-semibold">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
