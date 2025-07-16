import { motion } from "framer-motion";
import { projects } from "@/lib/data";

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case "High Impact":
      return "bg-warning/20 text-warning";
    case "Cost Saving":
      return "bg-accent/20 text-accent";
    case "Performance":
      return "bg-primary/20 text-primary";
    case "Automation":
      return "bg-secondary/20 text-secondary";
    default:
      return "bg-slate-600 text-slate-300";
  }
};

const getButtonColor = (index: number) => {
  const colors = ["primary", "secondary", "accent", "warning"];
  return colors[index % colors.length];
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Featured</span> Projects
          </h2>
          <p className="text-xl text-slate-400">Impactful solutions that drive business value</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glassmorphism-dark rounded-2xl p-8 transition-transform duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="rounded-xl mb-6 w-full h-48 object-cover"
              />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
                <span className={`${getBadgeColor(project.badge)} px-3 py-1 rounded-full text-sm`}>
                  {project.badge}
                </span>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`bg-${getButtonColor(techIndex)}/20 text-${getButtonColor(techIndex)} px-3 py-1 rounded-full text-sm`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 bg-${getButtonColor(index)} hover:bg-${getButtonColor(index)}/80 px-4 py-2 rounded-lg transition-colors duration-300`}
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border border-slate-600 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
