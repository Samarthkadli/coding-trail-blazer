import { useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "me"; text: string };

const suggestions = [
  "What should I learn first?",
  "What is GitHub?",
  "Which programming language should I learn?",
  "What AI tools can help me study?",
  "Give me a project idea.",
  "Explain APIs simply.",
];

function answer(q: string): string {
  const t = q.toLowerCase();
  if (t.includes("first") && !t.includes("language"))
    return "Start tiny: 1) Python basics for two weeks, 2) make a calculator, 3) put it on GitHub. That's it. Everything else builds on those three wins. 🌱";
  if (t.includes("github"))
    return "GitHub is a cloud home for your code. It remembers every change, lets others see your work, and acts as your public portfolio. Your first mission: create a repo called hello-world. 🐙";
  if (t.includes("language"))
    return "Python if you like AI, data or automation. JavaScript if you want to see things on a screen fast. Either is a great first choice — the concepts transfer. 🐍";
  if (t.includes("api"))
    return "An API is a bridge that lets different applications talk to each other. Your app asks a question, another app answers in a format you can use. Try a free joke API to see it work. 🔌";
  if (t.includes("study") || t.includes("tool"))
    return "For studying: NotebookLM for your notes, ChatGPT to explain confusing topics, Perplexity for research with sources. Tip: ask AI to explain WHY, not just the answer. 📚";
  if (t.includes("project") || t.includes("idea"))
    return "Try an AI Study Assistant: paste notes in, get flashcards out. React + one AI API, about 3 days, and it looks great in a portfolio. 🚀";
  if (t.includes("ai") || t.includes("machine"))
    return "AI is software that learns patterns from lots of examples, then uses them to answer or create. Machine Learning is the part where it learns. Start by using AI tools daily, then learn how they work. 🤖";
  return "Great question, Explorer! Here's my rule: pick one small thing, build it badly, then improve it. Tell me your interest (AI, web, data, career) and I'll point at the next step. ✨";
}

export function QuestBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Hey Explorer! 👋 Stuck somewhere? Ask me anything about AI, coding or technology." },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "me", text }, { from: "bot", text: answer(text) }]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open QuestBot"
        className="animate-pulse-glow fixed right-4 bottom-4 z-[60] flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-3 font-black text-primary-foreground shadow-lift sm:right-6 sm:bottom-6"
      >
        {open ? <X className="size-5" /> : <Bot className="size-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "QuestBot 🤖"}</span>
      </button>

      {open && (
        <div className="animate-pop fixed right-3 bottom-20 z-[60] flex h-[30rem] w-[min(24rem,92vw)] flex-col overflow-hidden rounded-3xl bg-card shadow-lift sm:right-6 sm:bottom-24">
          <div className="bg-gradient-hero px-4 py-3 text-primary-foreground">
            <p className="font-display text-lg">QuestBot 🤖</p>
            <p className="text-xs opacity-90">Your friendly tech mentor</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                  m.from === "bot"
                    ? "bg-secondary text-secondary-foreground"
                    : "ml-auto bg-gradient-primary text-primary-foreground",
                )}
              >
                {m.text}
              </div>
            ))}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 rounded-full bg-secondary px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" aria-label="Send" className="rounded-full bg-gradient-primary p-2.5 text-primary-foreground">
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
