"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

/* ─── LinkedIn icon ───────────────────────────────────────────────────────── */
const LinkedinIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl overflow-hidden shadow-xl border-slate-200/60">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Contact Info (Left) */}
            <div className="md:col-span-2 bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-bl-full translate-x-10 -translate-y-10 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-tr-full -translate-x-10 translate-y-10 blur-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Get In Touch</h3>
                <p className="text-slate-400 text-sm mb-8">
                  Looking for an MLOps or Data Engineer to build scalable systems? Let's connect.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-sky-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email</p>
                      <a href="mailto:hello@example.com" className="text-sm font-medium hover:text-sky-400 transition-colors">hello@example.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Location</p>
                      <p className="text-sm font-medium">Available Worldwide (Remote)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                      <LinkedinIcon size={18} className="text-sky-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">LinkedIn</p>
                      <a href="https://www.linkedin.com/in/yohanshanukajay/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-sky-400 transition-colors">yohanshanukajay</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (Right) */}
            <div className="md:col-span-3 p-10 bg-white">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input type="email" placeholder="john@company.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-sm" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Subject</label>
                  <input type="text" placeholder="Engineering Role / Project Inquiry" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea rows={4} placeholder="How can I help you build scalable systems?" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-sm resize-none"></textarea>
                </div>

                <button type="submit" className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
