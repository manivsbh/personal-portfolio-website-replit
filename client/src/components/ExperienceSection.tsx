import { motion } from "framer-motion";
import { experience } from "@/lib/data";

const getIconColor = (type: string) => {
  switch (type) {
    case "current":
      return "bg-primary";
    case "previous":
      return "bg-secondary";
    default:
      return "bg-accent";
  }
};

const getBadgeColor = (type: string) => {
  switch (type) {
    case "current":
      return "bg-accent/20 text-accent";
    default:
      return "bg-slate-600 text-slate-300";
  }
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-bg py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Work</span> Experience
          </h2>
          <p className="text-xl text-slate-400">6+ years of professional journey in software development</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-secondary"></div>

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-start"
              >
                <div className={`absolute left-6 w-4 h-4 ${getIconColor(exp.type)} rounded-full border-4 border-slate-900`}></div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="ml-20 glassmorphism-dark rounded-2xl p-8 transition-transform duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{exp.title}</h3>
                      <h4 className="text-xl text-slate-300 mb-2">{exp.company}</h4>
                      <p className="text-slate-400">{exp.period} • {exp.location}</p>
                    </div>
                    <span className={`${getBadgeColor(exp.type)} px-3 py-1 rounded-full text-sm mt-2 lg:mt-0`}>
                      {exp.duration}
                    </span>
                  </div>
                  <ul className="space-y-2 text-slate-300">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex}>• {achievement}</li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
