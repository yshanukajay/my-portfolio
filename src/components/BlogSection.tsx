"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ── Blog post data ────────────────────────────────────────────── */
const blogPosts = [
  {
    title:
      "Apache Kafka Architecture Explained: Producers, Brokers, Partitions, Replication & Consumer Groups",
    excerpt:
      "Modern applications generate an enormous amount of data. Every click, payment, sensor reading, transaction, log entry, order, and user interaction can become an event that needs to be processed in real time. This is where Apache Kafka comes in — a distributed event streaming platform designed to handle high-throughput, fault-tolerant, and horizontally scalable real-time data pipelines.",
    url: "https://medium.com/@yshanuka123/apache-kafka-architecture-explained-producers-brokers-partitions-replication-consumer-groups-280beb846367",
    date: "Aug 2026",
    readTime: "10 min read",
    tags: ["Apache Kafka", "Data Engineering", "Event Streaming", "Distributed Systems"],
    category: "System Architecture",
    accentFrom: "#0EA5E9",
    accentTo: "#6366F1",
    number: "01",
  },
  {
    title: "🎯 Number Guessing Game",
    excerpt:
      "A hands-on project walkthrough building an interactive number guessing game — exploring core programming concepts, game logic, and user input handling through a fun, practical implementation that strengthens algorithm design and debugging skills.",
    url: "https://medium.com/@yshanuka123/number-guessing-game-7813c02c3db6",
    date: "May 2025",
    readTime: "3 min read",
    tags: ["Python", "Game Development", "Beginner Projects"],
    category: "Project Walkthrough",
    accentFrom: "#F59E0B",
    accentTo: "#EF4444",
    number: "02",
  },
  {
    title: "Data Types in C++",
    excerpt:
      "C++ is one of the best languages to learn programming fundamentals. This article explores the essential data types in C++ — covering integers, floats, characters, booleans, and more — with practical examples, memory layout insights, and type-system mechanics.",
    url: "https://medium.com/@yshanuka123/data-types-in-c-d15eb4e28efb",
    date: "Nov 2023",
    readTime: "4 min read",
    tags: ["C++", "Programming Fundamentals", "Data Types"],
    category: "Programming Basics",
    accentFrom: "#10B981",
    accentTo: "#0EA5E9",
    number: "03",
  },
];

/* ── Medium SVG icon ───────────────────────────────────────────── */
function MediumIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42s-3.39-2.88-3.39-6.42 1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zm2.94 0c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75c.66 0 1.19 2.58 1.19 5.75z" />
    </svg>
  );
}

/* ── Blog Card Component ───────────────────────────────────────── */
function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex-shrink-0 w-[85vw] sm:w-[390px] md:w-[430px] snap-start flex flex-col select-none"
    >
      <div
        className={`relative rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between min-h-[480px] md:min-h-[520px] ${
          isHovered
            ? "border-sky-300/70 shadow-[0_20px_48px_-12px_rgba(14,165,233,0.18)] -translate-y-1.5"
            : "border-slate-200/80 shadow-[0_6px_24px_-8px_rgba(15,23,42,0.06)]"
        }`}
        style={{
          background: isHovered ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-[4px] w-full"
          style={{ background: `linear-gradient(to right, ${post.accentFrom}, ${post.accentTo})` }}
        />

        {/* Number watermark */}
        <div
          className="absolute -right-2 -top-2 text-[130px] font-black leading-none pointer-events-none select-none transition-opacity duration-500"
          style={{ color: post.accentFrom, opacity: isHovered ? 0.07 : 0.035 }}
        >
          {post.number}
        </div>

        <div className="relative z-10 p-7 md:p-8 flex flex-col flex-grow">
          {/* Category & Date/Time */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border"
              style={{
                background: `${post.accentFrom}12`,
                color: post.accentFrom,
                borderColor: `${post.accentFrom}30`,
              }}
            >
              <BookOpen size={12} strokeWidth={2.5} />
              {post.category}
            </span>
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug mb-4">
            {post.title}
          </h3>

          {/* Excerpt with extra vertical breathing room */}
          <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold border border-slate-200 text-slate-600 bg-slate-50/90"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ONLY ONE dedicated link area for this blog post */}
          <div className="pt-5 border-t border-slate-100 mt-auto">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-5 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm group/btn"
              style={{
                background: `linear-gradient(135deg, ${post.accentFrom}, ${post.accentTo})`,
                color: "#ffffff",
              }}
            >
              <MediumIcon size={15} className="text-white" />
              <span>Read on Medium</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Blog Section ─────────────────────────────────────────── */
export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = window.innerWidth < 640 ? window.innerWidth * 0.85 : 440;
    el.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="blogs" className="relative py-28 overflow-hidden bg-[#F4F8FC]">
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0EA5E9 1px, transparent 1px), linear-gradient(to bottom, #0EA5E9 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 80%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 right-10 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-24 -left-16 w-[450px] h-[450px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Centered Section Header (matching other topics on the page) ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-script text-3xl text-sky-500 mb-2">
            Thoughts &amp; Insights
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
                style={{ background: "linear-gradient(to right, #38bdf8, #818cf8)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </h2>

          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed mb-6">
            Articles and deep dives on distributed systems, streaming architectures, and software engineering — published on Medium.
          </p>

          {/* Navigation arrow buttons centered below description */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "border-slate-300 bg-white text-slate-700 hover:border-sky-400 hover:text-sky-600 shadow-sm cursor-pointer"
                  : "border-slate-200/60 bg-slate-100/60 text-slate-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? "border-slate-300 bg-white text-slate-700 hover:border-sky-400 hover:text-sky-600 shadow-sm cursor-pointer"
                  : "border-slate-200/60 bg-slate-100/60 text-slate-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* ── Horizontally Scrollable Cards Row ── */}
        <div className="relative -mx-6 px-6 lg:-mx-12 lg:px-12">
          {/* Left / Right soft fade indicators */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-8 md:w-16 z-20 pointer-events-none transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: "linear-gradient(to right, #F4F8FC, transparent)" }}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-8 md:w-16 z-20 pointer-events-none transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: "linear-gradient(to left, #F4F8FC, transparent)" }}
          />

          <div
            ref={scrollRef}
            className="flex gap-7 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.url}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full flex"
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
