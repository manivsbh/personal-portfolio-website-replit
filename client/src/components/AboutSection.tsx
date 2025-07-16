import { motion } from "framer-motion";
import { personalInfo, achievements, education } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="section-bg py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">About</span> Me
          </h2>
          <p className="text-xl text-slate-400">
            Passionate about building scalable solutions and leading high-performing teams
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism-dark rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Professional Journey</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              {personalInfo.summary}
            </p>
            <p className="text-slate-300 mb-6 leading-relaxed">
              With 6+ years of IT experience, I've worked with different integration platforms and the Hadoop
              ecosystem. I have a strong understanding of relational databases, business data, and storage concepts.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">Team Leadership</span>
              <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm">Data Engineering</span>
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Cloud Architecture</span>
              <span className="bg-warning/20 text-warning px-3 py-1 rounded-full text-sm">Machine Learning</span>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="glassmorphism-dark rounded-xl p-6 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-warning mr-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 14l5.5-5.5L17 17l-12-1zm11.5-13L21 2l1 1-1.25 1.25L21 10l-1 1-6.5-6.5z"/>
                </svg>
                <h4 className="text-xl font-semibold">Key Achievements</h4>
              </div>
              <ul className="space-y-2 text-slate-300">
                {achievements.map((achievement, index) => (
                  <li key={index}>• {achievement}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="glassmorphism-dark rounded-xl p-6 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-primary mr-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
                <h4 className="text-xl font-semibold">Education</h4>
              </div>
              <div className="space-y-3 text-slate-300">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-sm text-slate-400">{edu.institution} • {edu.year}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
