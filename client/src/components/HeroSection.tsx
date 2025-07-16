import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { useState } from "react";
import PhotoUpload from "./PhotoUpload";

export default function HeroSection() {
  const [profilePhoto, setProfilePhoto] = useState<string>("/uploads/profile-photo.jpg");

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const downloadResume = () => {
    // Create a download link for the resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This would be the actual resume file
    link.download = 'Manish_Cheepa_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="hero-bg min-h-screen flex items-center relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-60 right-20 w-48 h-48 bg-secondary rounded-full"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-40 w-24 h-24 bg-accent rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">
              <span className="gradient-text">Manish</span>
              <br />
              <span className="text-white">Cheepa</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl text-slate-300 mb-6">
              {personalInfo.title}
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              6+ years of expertise in data engineering, cloud technologies, and full-stack development.
              Leading teams to deliver innovative solutions that save millions and drive digital transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-lg font-semibold transition-transform duration-300 text-center"
              >
                Get In Touch
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadResume}
                className="border border-slate-600 px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-300 text-center"
              >
                Download Resume
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <PhotoUpload 
              currentPhotoUrl={profilePhoto}
              onPhotoUploaded={(url) => setProfilePhoto(url)}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -right-4 glassmorphism rounded-lg p-4"
            >
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
              </svg>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -top-4 -left-4 glassmorphism rounded-lg p-4"
            >
              <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.5 6v12h15V6h-15zM6 16.5v-1.5h3v1.5H6zm0-3v-1.5h3v1.5H6zm0-3v-1.5h3v1.5H6zm4.5 6v-1.5h3v1.5h-3zm0-3v-1.5h3v1.5h-3zm0-3v-1.5h3v1.5h-3zm4.5 6v-1.5h3v1.5H15zm0-3v-1.5h3v1.5H15zm0-3v-1.5h3v1.5H15z"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
