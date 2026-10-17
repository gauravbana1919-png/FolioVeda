"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Wand2, Check } from "lucide-react";

interface ChatEditorProps {
  onUpdate: (data: any) => void;
  currentProfile?: any;
  templateId?: string;
}

export function ChatEditor({ onUpdate, currentProfile, templateId }: ChatEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    {
      role: 'ai',
      text: 'Hi! I am your AI Design Partner. Tell me what you want to change: rewrite your bio, switch themes, change accent colors, or alter layouts.'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "⚡ Punch up my bio",
    "🎨 Emerald accent",
    "🌙 Dark mode",
    "💻 Developer template",
    "💼 Business template",
    "🎨 Designer template",
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);
    setLastAction(null);

    try {
      const response = await fetch('/api/chat/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          currentProfile: currentProfile || {},
          templateId: templateId || "template1",
        }),
      });

      const data = await response.json();

      if (data.updates && Object.keys(data.updates).length > 0) {
        onUpdate(data.updates);
        setLastAction("Changes applied to preview!");
        setTimeout(() => setLastAction(null), 4000);
      }

      setMessages(prev => [
        ...prev,
        { role: 'ai', text: data.reply || 'Your portfolio has been updated!' }
      ]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: 'Sorry, I ran into an error making that update.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 px-5 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-2xl flex items-center gap-2.5 z-50 font-medium text-sm transition-all border border-white/20 ${isOpen ? 'hidden' : ''}`}
      >
        <Sparkles size={18} className="animate-spin-slow text-yellow-300" />
        <span>Ask AI to Edit</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[90vw] sm:w-[420px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col max-h-[85vh] h-[540px]"
          >
            {/* Header */}
            <div className="p-4 bg-muted/60 border-b border-border flex justify-between items-center backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                  <Wand2 size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                    Portfolio AI Editor
                    <span className="text-[10px] font-normal px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400">Live</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">Type instructions to update in real-time</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close editor"
              >
                <X size={18} />
              </button>
            </div>

            {/* Notification Badge */}
            {lastAction && (
              <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Check size={14} />
                <span>{lastAction}</span>
              </div>
            )}

            {/* Quick Action Suggestions */}
            <div className="px-3 py-2 bg-muted/30 border-b border-border/50 flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-background border border-border/70 hover:border-primary text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-background/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-xs'
                        : 'bg-muted text-foreground border border-border/60 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-2 border border-border/60">
                    <span className="text-xs text-muted-foreground">AI is designing...</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-border bg-card flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="E.g. Make bio concise, use emerald theme..."
                disabled={loading}
                className="flex-1 bg-muted border border-border/70 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-muted-foreground/70"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity shrink-0"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
