"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";

const certifications = [
  {
    title: "AWS Certified Machine Learning – Specialty",
    issuer: "Amazon Web Services (AWS)",
    date: "2024",
    link: "#"
  },
  {
    title: "Data Engineering with Google Cloud",
    issuer: "Google Cloud / Coursera",
    date: "2023",
    link: "#"
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2023",
    link: "#"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-white relative border-y border-slate-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Professional credentials validating expertise in cloud architecture, machine learning, and data engineering.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center hover:border-emerald-200"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
