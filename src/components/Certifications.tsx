"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";

const certifications = [
  {
    title: "Google AI Essentials",
    issuer: "Google",
    date: "2025",
    link: "https://www.coursera.org/account/accomplishments/specialization/053YJ99QAQ4T"
  },
  {
    title: "IBM Machine Learning Specialization",
    issuer: "IBM",
    date: "2025",
    link: "https://www.coursera.org/account/accomplishments/specialization/9Y7SAIDIVF34"
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford University & DeepLearning.AI",
    date: "2025",
    link: "https://www.coursera.org/account/accomplishments/specialization/NXFHSRS4O6K1"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden border-y border-slate-100"
      style={{ background: "linear-gradient(135deg, #f8faff 0%, #f0fdf8 50%, #f8faff 100%)" }}>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #94a3b820 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

      {/* Soft emerald radial glow top-right */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)" }} />

      {/* Soft sky glow bottom-left */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Professional credentials validating expertise in cloud architecture, machine learning, and data engineering.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.link !== "#" ? cert.link : undefined}
              target={cert.link !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white/80 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center text-center border border-slate-100 shadow-sm transition-all duration-200 ${cert.link !== "#" ? "cursor-pointer hover:shadow-md hover:-translate-y-1 hover:border-emerald-200" : "cursor-default"}`}
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600 border border-emerald-100">
                <Award size={28} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 leading-tight">{cert.title}</h3>
              <div className="flex items-center justify-center gap-1 text-slate-500 text-sm mb-4">
                <BadgeCheck size={14} className="text-sky-500" />
                <span>{cert.issuer}</span>
              </div>
              <span className="mt-auto px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                {cert.date}
              </span>
              {cert.link !== "#" && (
                <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                  <BadgeCheck size={10} /> View Certificate ↗
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

