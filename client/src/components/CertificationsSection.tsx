import { motion } from "framer-motion";
import { certifications } from "@/lib/data";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-bg py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Professional</span> Certifications
          </h2>
          <p className="text-xl text-slate-400">Industry-recognized expertise and continuous learning</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glassmorphism-dark rounded-2xl p-8 text-center transition-transform duration-300"
            >
              <div className={`w-16 h-16 bg-${cert.color}/20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <i className={`${cert.icon} text-${cert.color} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
              <p className="text-slate-400 mb-4">{cert.subtitle}</p>
              <div className={`bg-${cert.color}/10 rounded-lg p-4`}>
                <p className="text-sm text-slate-300">{cert.description}</p>
              </div>
              <div className="mt-4 text-sm text-slate-400">
                <svg className="w-4 h-4 mr-2 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                {cert.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
