"use client";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Users, Globe, Tag } from "lucide-react";

const publications = [
  {
    title:
      "Real-Time Cattle Monitoring Using Low-Cost IoT Smart Collars with LoRa Communication in Sri Lanka's Dry Zones",
    authors: ["Yohan Shanuka, J.A.D", "et al."],
    venue: "Digital Research Repository — University of Vavuniya",
    venueShort: "DRR · VAU",
    url: "http://drr.vau.ac.lk/",
    year: "2024",
    type: "Research Paper",
    abstract:
      "Explores the design and deployment of a low-cost IoT smart collar system using LoRa communication for real-time cattle health monitoring across remote dry-zone environments in Sri Lanka. The system captures biometric and behavioural data — including temperature, motion, and heart rate — and transmits it over long-range low-power networks to an ML-backed prediction and alert pipeline.",
    keywords: ["IoT", "LoRa", "Cattle Monitoring", "Edge AI", "Real-Time Systems", "Sri Lanka", "Smart Agriculture"],
    color: "#0ea5e9",
  },
];

export default function Research() {
  return (
    <section id="research" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(14,165,233,0.04) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(99,102,241,0.03) 0%, transparent 50%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.25em] text-sky-600 uppercase mb-3">
            Academic Contribution
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Research &amp; Publications
          </h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            Peer-reviewed research at the intersection of IoT systems, edge AI, and real-world agricultural engineering challenges.
          </p>
        </motion.div>

        {/* Publication cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar */}
              <div
                className="h-[3px] w-full"
                style={{
                  background: `linear-gradient(to right, ${pub.color}, #6366f1)`,
                }}
              />

              <div className="p-8">
                {/* Type badge + year */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                    style={{
                      background: `${pub.color}10`,
                      color: pub.color,
                      borderColor: `${pub.color}30`,
                    }}
                  >
                    <BookOpen size={11} strokeWidth={2.5} />
                    {pub.type}
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-400">{pub.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-5">
                  {pub.title}
                </h3>

                {/* Authors row */}
                <div className="flex items-center gap-2 mb-3">
                  <Users size={14} className="text-slate-400 flex-shrink-0" />
                  <div className="flex flex-wrap gap-2">
                    {pub.authors.map((author) => (
                      <span
                        key={author}
                        className="text-sm font-semibold text-slate-700"
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-2 mb-6">
                  <Globe size={14} className="text-slate-400 flex-shrink-0" />
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sky-600 font-medium hover:text-sky-700 hover:underline transition-colors"
                  >
                    {pub.venue}
                  </a>
                  <span className="text-[10px] font-bold text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                    {pub.venueShort}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-6" />

                {/* Abstract */}
                <div className="mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Abstract
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{pub.abstract}</p>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                    <Tag size={11} /> Keywords
                  </span>
                  {pub.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-200 text-slate-600 bg-slate-50 hover:border-sky-200 hover:text-sky-700 transition-colors cursor-default"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border hover:shadow-md"
                  style={{
                    background: `${pub.color}10`,
                    color: pub.color,
                    borderColor: `${pub.color}30`,
                  }}
                >
                  <ExternalLink size={14} />
                  View Publication
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
