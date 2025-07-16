import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you soon.",
      });
      reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Get In</span> Touch
          </h2>
          <p className="text-xl text-slate-400">Let's discuss opportunities and collaborations</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism-dark rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-primary">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-slate-400">{personalInfo.email}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-slate-400">{personalInfo.phone}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-slate-400">{personalInfo.location}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-warning" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-warning transition-colors duration-300"
                  >
                    linkedin.com/in/manishcheepa
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-600">
              <h4 className="font-semibold mb-4">Available For</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">Full-time Opportunities</span>
                <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm">Consulting Projects</span>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Technical Mentoring</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism-dark rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-secondary">Send Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Full Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors duration-300"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject
                </Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors duration-300"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  rows={5}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-secondary px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
