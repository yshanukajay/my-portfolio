"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Tag,
} from "lucide-react";
import { useRef, useState } from "react";

/* ── Blog post data ────────────────────────────────────────────── */
const blogPosts = [
  {
    title:
      "Apache Kafka Architecture Explained: Producers, Brokers, Partitions, Replication & Consumer Groups",
    excerpt:
      "Modern applications generate an enormous amount of data. Every click, payment, sensor reading, transaction, log entry, order, and user interaction can become an event that needs to be processed in real time. This is where Apache Kafka comes in.",
    url: "https://medium.com/@yshanuka123/apache-kafka-architecture-explained-producers-brokers-partitions-replication-consumer-groups-280beb846367",
    date: "Aug 2026",
    readTime: "10 min read",
    tags: ["Apache Kafka", "Data Engineering", "Big Data", "Event Streaming", "Distributed Systems"],
    category: "System Architecture",
    accentFrom: "#0EA5E9",
    accentTo: "#6366F1",
  },
  {
    title: "🎯 Number Guessing Game",
    excerpt:
      "A hands-on project walkthrough building an interactive number guessing game — exploring core programming concepts, game logic, and user input handling through a fun, practical implementation.",
    url: "https://medium.com/@yshanuka123/number-guessing-game-7813c02c3db6",
    date: "May 2025",
    readTime: "3 min read",
    tags: ["Python", "Game Development", "Beginner Projects"],
    category: "Project Walkthrough",
    accentFrom: "#F59E0B",
    accentTo: "#EF4444",
  },
  {
    title: "Data Types in C++",
    excerpt:
      "C++ is one of the best languages to learn programming fundamentals. This article explores the essential data types in C++ — covering integers, floats, characters, booleans, and more — with practical examples.",
    url: "https://medium.com/@yshanuka123/data-types-in-c-d15eb4e28efb",
    date: "Nov 2023",
    readTime: "4 min read",
    tags: ["C++", "Programming Fundamentals", "Data Types"],
    category: "Programming Basics",
    accentFrom: "#10B981",
    accentTo: "#0EA5E9",
  },
];

/* ── Medium SVG icon ───────────────────────────────────────────── */
function MediumIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42s-3.39-2.88-3.39-6.42 1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm2.94 0c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75c.66 0 1.19 2.58 1.19 5.75z" />
    </svg>
  );
}

/* ── Blog card tilt hook ───────────────────────────────────────── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 300,
    damping: 30,
  });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ── Blog card component ───────────────────────────────────────── */
function BlogCard({
  post,
  index,
}: {
  post: (typeof blogPosts)[number];
  index: number;
}) {
  const tilt = useTilt();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={() => {
          tilt.onMouseLeave();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        className="relative rounded-2xl overflow-hidden group cursor-pointer h-full"
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${post.accentFrom}30, ${post.accentTo}30, transparent)`,
            opacity: isHovered ? 1 : 0.5,
          }}
        />

        {/* Card body */}
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] h-full transition-all duration-300 group-hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
        >
          {/* Top accent bar */}
          <div
            className="h-[3px] w-full"
            style={{
              background: `linear-gradient(to right, ${post.accentFrom}, ${post.accentTo})`,
            }}
          />

          {/* Inner glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at top left, ${post.accentFrom}10 0%, transparent 60%)`,
            }}
          />

          <div className="p-7 md:p-8 relative z-10 flex flex-col h-full">
            {/* Top row: category badge + date */}
            <div className="flex items-center justify-between mb-5">
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                style={{
                  background: `${post.accentFrom}12`,
                  color: post.accentFrom,
                  borderColor: `${post.accentFrom}30`,
                }}
              >
                <BookOpen size={11} strokeWidth={2.5} />
                {post.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-sky-600 transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>

            {/* Divider */}
            <div
              className="h-px mb-5"
              style={{
                background: `linear-gradient(to right, ${post.accentFrom}25, transparent)`,
              }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold border border-slate-200 text-slate-500 bg-slate-50 group-hover:border-sky-200/60 transition-colors"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold text-slate-400">
                  +{post.tags.length - 4}
                </span>
              )}
            </div>

            {/* Read on Medium CTA */}
            <div className="flex items-center justify-between mt-auto">
              <span
                className="flex items-center gap-2 text-sm font-bold transition-all duration-300"
                style={{ color: post.accentFrom }}
              >
                <MediumIcon size={16} />
                Read on Medium
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                />
              </span>

              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300"
                style={{
                  borderColor: `${post.accentFrom}40`,
                  background: isHovered ? `${post.accentFrom}15` : "transparent",
                }}
              >
                <ExternalLink
                  size={13}
                  style={{ color: post.accentFrom }}
                />
              </motion.div>
            </div>
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Blog Section ─────────────────────────────────────────── */
export default function BlogSection() {
  return (
    <section id="blogs" className="relative py-28 overflow-hidden">
      {/* ── Animated mesh background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "#F4F8FC" }} />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(14,165,233,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(14,165,233,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black 30%, transparent 80%)",
          }}
        />

        {/* Glow orbs */}
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 right-20 w-[520px] h-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.06, 0.14, 0.06],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
              opacity: 0.2,
              background: i % 2 === 0 ? "#0EA5E9" : "#6366F1",
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.12, 0.3, 0.12],
            }}
            transition={{
              duration: 3.5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-script text-3xl text-sky-500 mb-2">
            Thoughts & Insights
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            Blog{" "}
            <span className="relative inline-block">
              <span className="text-gradient bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Posts
              </span>
              {/* Underline glow */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                style={{
                  background: "linear-gradient(to right, #38bdf8, #818cf8)",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </h2>

          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
            Deep dives into distributed systems, software engineering, and
            hands-on project walkthroughs — published on Medium.
          </p>
        </motion.div>

        {/* ── Medium profile badge ── */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <a
            href="https://medium.com/@yshanuka123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <MediumIcon size={18} className="text-slate-800" />
            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
              @yshanuka123
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
              {blogPosts.length} Articles
            </span>
          </a>
        </motion.div>

        {/* ── Blog cards grid ── */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.url} post={post} index={i} />
          ))}
        </div>

        {/* ── View All CTA ── */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://medium.com/@yshanuka123"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg group/btn"
            style={{
              background: "linear-gradient(135deg, #0EA5E9, #6366F1)",
              color: "#fff",
              boxShadow: "0 0 24px rgba(14,165,233,0.35)",
            }}
          >
            <MediumIcon size={16} />
            View All on Medium
            <ArrowUpRight
              size={14}
              className="opacity-0 group-hover/btn:opacity-100 -translate-x-1 group-hover/btn:translate-x-0 transition-all"
            />
          </motion.a>
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.p
          className="text-center text-slate-500 text-xs mt-8 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          More articles coming soon — follow on Medium for the latest posts.
        </motion.p>
      </div>
    </section>
  );
}
