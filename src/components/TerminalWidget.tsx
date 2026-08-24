"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Terminal } from "lucide-react";
import { useLenis } from "lenis/react";

// ── Types ────────────────────────────────────────────────────────────────────
interface HistoryLine {
  type: "input" | "output" | "error" | "success" | "info";
  text: string;
  id: number;
}

// ── Command definitions ──────────────────────────────────────────────────────
const COMMANDS: Record<
  string,
  { description: string; action: () => { lines: HistoryLine[]; scrollTo?: string } }
> = {
  help: {
    description: "List available commands",
    action: () => ({
      lines: [
        line("info", "┌─────────────────────────────────────────┐"),
        line("info", "│         Available commands               │"),
        line("info", "├─────────────────────────────────────────┤"),
        line("success", "│  about       → About me                 │"),
        line("success", "│  projects    → View projects            │"),
        line("success", "│  skills      → Tech stack               │"),
        line("success", "│  publications → Research publications    │"),
        line("success", "│  contact     → Get in touch             │"),
        line("success", "│  certifications → Certifications        │"),
        line("success", "│  linkedin    → Open LinkedIn profile    │"),
        line("info", "├─────────────────────────────────────────┤"),
        line("output", "│  clear       → Clear terminal           │"),
        line("output", "│  whoami      → Who am I?                │"),
        line("output", "│  help        → Show this menu           │"),
        line("info", "└─────────────────────────────────────────┘"),
        line("info", "  Tip: Press ` (backtick) to toggle."),
      ],
    }),
  },
  about: {
    description: "Navigate to About section",
    action: () => ({
      lines: [
        line("success", "→ Navigating to /about"),
        line("output", "  Loading profile data..."),
        line("output", "  Name   : Yohan Shanuka"),
        line("output", "  Role   : MLOps & Data Engineer"),
        line("output", "  Status : Open to opportunities"),
      ],
      scrollTo: "about",
    }),
  },
  projects: {
    description: "Navigate to Projects section",
    action: () => ({
      lines: [
        line("success", "→ Navigating to /projects"),
        line("output", "  Fetching project manifest..."),
        line("output", "  [✓] ML Pipeline orchestration"),
        line("output", "  [✓] Real-time data streaming"),
        line("output", "  [✓] Model serving infrastructure"),
      ],
      scrollTo: "projects",
    }),
  },
  skills: {
    description: "Navigate to Skills / Tech Stack",
    action: () => ({
      lines: [
        line("success", "→ Navigating to /skills"),
        line("output", "  Loading tech stack..."),
        line("output", "  Python · PyTorch · Spark · Kafka"),
        line("output", "  MLflow · Docker · Kubernetes · AWS"),
      ],
      scrollTo: "stack",
    }),
  },
  publications: {
    description: "Navigate to Publications section",
    action: () => ({
      lines: [
        line("success", "→ Navigating to /publications"),
        line("output", "  Fetching publication data..."),
        line("output", "  [✓] Real-Time Cattle Monitoring IoT collar research paper"),
      ],
      scrollTo: "publications",
    }),
  },
  research: {
    description: "Navigate to Publications section",
    action: () => ({
      lines: [
        line("success", "→ Navigating to /publications"),
        line("output", "  Fetching publication data..."),
        line("output", "  [✓] Real-Time Cattle Monitoring IoT collar research paper"),
      ],
      scrollTo: "publications",
    }),
  },
  contact: {
    description: "Navigate to Contact section",
    action: () => ({
      lines: [
        line("success", "→ Navigating to /contact"),
        line("output", "  Initialising handshake..."),
        line("output", "  Ready to connect!"),
      ],
      scrollTo: "contact",
    }),
  },
  certifications: {
    description: "Navigate to Certifications section",
    action: () => ({
      lines: [
        line("success", "→ Navigating to /certifications"),
        line("output", "  Loading credentials..."),
      ],
      scrollTo: "certifications",
    }),
  },
  linkedin: {
    description: "Open LinkedIn profile",
    action: () => {
      if (typeof window !== "undefined") {
        window.open("https://www.linkedin.com/in/yohanshanukajay/", "_blank", "noopener,noreferrer");
      }
      return {
        lines: [
          line("success", "→ Opening LinkedIn profile in a new tab..."),
          line("output", "  https://www.linkedin.com/in/yohanshanukajay/"),
        ],
      };
    },
  },
  whoami: {
    description: "Who is this?",
    action: () => ({
      lines: [
        line("output", "  yohan_shanuka@portfolio:~$"),
        line("output", "  UID=1000 (developer) GID=1000 (ml-engineer)"),
        line("output", "  Groups: mlops, data-engineering, open-source"),
      ],
    }),
  },
  clear: {
    description: "Clear the terminal",
    action: () => ({ lines: [] }),
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
let lineId = 0;
function line(
  type: HistoryLine["type"],
  text: string
): HistoryLine {
  return { type, text, id: lineId++ };
}

const BOOT_LINES: HistoryLine[] = [
  line("info", "╔══════════════════════════════════════════╗"),
  line("info", "║   yohan.sh  —  portfolio terminal v1.0   ║"),
  line("info", "╚══════════════════════════════════════════╝"),
  line("output", "  Type  help  to see available commands."),
  line("output", "  Press  `  (backtick) to toggle this terminal."),
];

// ── Component ────────────────────────────────────────────────────────────────
export default function TerminalWidget() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>(BOOT_LINES);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Toggle with backtick
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) setMinimised(false);
          return !prev;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Autofocus input when opened
  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimised]);

  // Scroll to bottom whenever history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const scrollToSection = useCallback((id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element && lenis) {
        lenis.scrollTo(element, { offset: -80, duration: 1.2 });
      } else {
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  }, [lenis]);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;

      // Record to command history
      setCmdHistory((prev) => [cmd, ...prev]);
      setCmdIndex(-1);

      const inputLine = line("input", `$ ${cmd}`);

      if (cmd === "clear") {
        setHistory(BOOT_LINES);
        return;
      }

      const def = COMMANDS[cmd];
      if (!def) {
        setHistory((prev) => [
          ...prev,
          inputLine,
          line("error", `  command not found: ${cmd}`),
          line("output", "  Type  help  to see available commands."),
        ]);
        return;
      }

      const result = def.action();
      setHistory((prev) => [...prev, inputLine, ...result.lines]);

      if (result.scrollTo) {
        scrollToSection(result.scrollTo);
      }
    },
    [scrollToSection]
  );

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCmdIndex((prev) => {
        const next = Math.min(prev + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? "");
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCmdIndex((prev) => {
        const next = Math.max(prev - 1, -1);
        setInput(next === -1 ? "" : cmdHistory[next] ?? "");
        return next;
      });
    }
  };

  const lineColor: Record<HistoryLine["type"], string> = {
    input: "text-sky-400",
    output: "text-slate-300",
    error: "text-rose-400",
    success: "text-emerald-400",
    info: "text-indigo-400",
  };

  return (
    <>
      {/* ── Floating toggle button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="toggle-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => { setOpen(true); setMinimised(false); }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D1117] border border-slate-700 text-emerald-400 font-mono text-sm shadow-xl hover:border-emerald-500 hover:shadow-emerald-500/20 transition-all duration-200 group"
            aria-label="Open terminal"
          >
            <Terminal size={15} className="group-hover:animate-pulse" />
            <span className="hidden sm:inline">terminal</span>
            <span className="text-slate-600 text-xs hidden sm:inline ml-1">[ ` ]</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Terminal window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={minimised
              ? { opacity: 1, y: 0, scale: 1, height: "auto" }
              : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 w-[min(90vw,520px)] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 flex flex-col"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-700/60 select-none">
              <div className="flex items-center gap-2">
                {/* Traffic lights */}
                <button
                  onClick={() => setOpen(false)}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                  aria-label="Close"
                />
                <button
                  onClick={() => setMinimised((m) => !m)}
                  className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors"
                  aria-label="Minimise"
                />
                <span className="w-3 h-3 rounded-full bg-emerald-500 opacity-50 cursor-default" />
              </div>
              <span className="text-slate-400 text-xs tracking-wider flex items-center gap-1.5">
                <Terminal size={11} />
                yohan.sh — portfolio
              </span>
              <button onClick={() => setOpen(false)} className="text-slate-600 hover:text-slate-300 transition-colors">
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <AnimatePresence>
              {!minimised && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 320 }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="flex flex-col bg-[#0D1117] overflow-hidden"
                  onClick={() => inputRef.current?.focus()}
                >
                  {/* Output */}
                  <div className="flex-1 overflow-y-auto px-4 pt-3 pb-1 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-700">
                    {history.map((h) => (
                      <div key={h.id} className={`text-xs leading-5 whitespace-pre ${lineColor[h.type]}`}>
                        {h.text}
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>

                  {/* Input row */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-t border-slate-800 bg-[#0D1117]">
                    <span className="text-emerald-400 text-xs select-none">$</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      className="flex-1 bg-transparent text-sky-300 text-xs outline-none caret-emerald-400 placeholder-slate-600"
                      placeholder="type a command…"
                      autoComplete="off"
                      spellCheck={false}
                    />
                    {/* Blinking cursor block */}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-3.5 bg-emerald-400 rounded-[1px]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
