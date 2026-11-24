"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Loader2, 
  Bot, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Wand2,
  Palette,
  FileText,
  Rocket
} from "lucide-react";

interface ActionItem {
  label: string;
  url?: string;
  actionType?: "navigate" | "switch_tab" | "copy_text";
  tab?: "learnhouse" | "shivam" | "kenji" | "randy" | "alsa";
  payload?: string;
  primary?: boolean;
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isAction?: boolean;
  actions?: ActionItem[];
}

interface AiAgentWidgetProps {
  portfolioContext?: any;
  onUpdate?: (updates: any) => void;
}

export function AiAgentWidget({ portfolioContext, onUpdate }: AiAgentWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hi! I'm **PortBot**, your AI copilot for FolioIn.\n\nI can execute real tasks right here! Try tapping any action below or ask me to build, tailor, or customize your portfolio:",
      timestamp: new Date(),
      actions: [
        { label: "🚀 Build My Portfolio", url: "/onboarding", primary: true },
        { label: "📄 Open 14+ FlowCV Resumes", url: "/resume" },
        { label: "🎨 Show Shivam 3D Clay Theme", actionType: "switch_tab", tab: "shivam" },
        { label: "💡 Clone an Inspiration Website", url: "/inspiration" },
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleActionClick = (action: ActionItem) => {
    if (action.actionType === "switch_tab" && action.tab) {
      if (onUpdate) {
        onUpdate({ themeTab: action.tab });
        setActionNotice(`🎨 Switched showcase to ${action.tab.toUpperCase()}!`);
        setTimeout(() => setActionNotice(null), 3500);
      }
      const el = document.getElementById("showcase");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (action.url) {
      window.location.href = action.url;
      return;
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          portfolioContext,
        }),
      });

      const data = await res.json();
      const botReply =
        data.reply ||
        "I'm ready to execute your requests. You can build a portfolio, switch themes, or tailor resumes!";

      // If actionable updates are returned, apply them live!
      if (data.updates && Object.keys(data.updates).length > 0 && onUpdate) {
        onUpdate(data.updates);
        setActionNotice("✨ Changes applied live!");
        setTimeout(() => setActionNotice(null), 3500);

        if (data.updates.themeTab) {
          const el = document.getElementById("showcase");
          el?.scrollIntoView({ behavior: "smooth" });
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botReply,
          timestamp: new Date(),
          isAction: !!data.updates,
          actions: data.actions || [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "I encountered an error connecting to the AI brain. Please try asking again!",
          timestamp: new Date(),
          actions: [
            { label: "🚀 Launch Portfolio Builder", url: "/onboarding", primary: true },
            { label: "📄 Open Resume Studio", url: "/resume" },
          ]
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    { label: "🚀 Build Portfolio", text: "Build a portfolio for me" },
    { label: "📄 FlowCV Resumes", text: "Open FlowCV resume templates" },
    { label: "🎨 Shivam 3D Clay", text: "Switch to Shivam Kaushal 3D clay" },
    { label: "🎨 Kenji 3D Mascot", text: "Switch to Kenji Sato 3D character" },
    { label: "🎨 Learn@House", text: "Switch to Learn@House platform" },
    { label: "💡 Clone Website", text: "Clone a website portfolio" },
    { label: "⚡ Punch Up Bio", text: "Rewrite my bio to be punchy" },
    { label: "🚀 Deploy Pages", text: "How do I deploy to GitHub Pages?" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-700 via-teal-600 to-[#173f32] hover:from-emerald-600 hover:to-[#122e25] text-white font-semibold rounded-full shadow-[0_0_30px_rgba(16,185,129,0.35)] border border-emerald-400/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open AI Portfolio Assistant"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Bot className="w-5 h-5 text-white" />
          <span className="text-sm font-medium tracking-wide">PortBot AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl w-[92vw] max-w-[430px] h-[600px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  PortBot AI
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Copilot
                  </span>
                </h3>
                <p className="text-xs text-slate-400">FolioIn Active Action Engine</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action applied banner */}
          {actionNotice && (
            <div className="px-4 py-2 bg-emerald-950/70 border-b border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`flex gap-2.5 max-w-[90%] ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  {msg.sender === "user" && (
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-emerald-700 text-white rounded-br-sm"
                        : "bg-slate-900/90 text-slate-200 border border-slate-800/80 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Interactive Action Buttons attached to Bot Message */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-2.5 ml-9 flex flex-wrap gap-1.5 max-w-[85%]">
                    {msg.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleActionClick(act)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer ${
                          act.primary
                            ? "bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                        }`}
                      >
                        <span>{act.label}</span>
                        <ArrowRight size={12} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse delay-300"></span>
                  <span className="ml-1 text-[11px] text-slate-300">Executing task...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Tasks Strip */}
          <div className="px-3 py-2 border-t border-slate-900 bg-slate-950/80 overflow-x-auto custom-scrollbar flex gap-1.5">
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.text)}
                disabled={isTyping}
                className="whitespace-nowrap text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-800 bg-slate-900/50 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask PortBot to build, switch style, or tailor resume..."
              disabled={isTyping}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-800 text-white disabled:text-slate-600 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
            >
              {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
