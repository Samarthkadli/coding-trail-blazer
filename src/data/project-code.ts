export type CodeFile = { name: string; lang: "html" | "css" | "js" | "jsx" | "python" | "sql"; code: string };

export type ProjectGuide = {
  slug: string;
  runnable: boolean; // true = live preview in an iframe
  intro: string;
  steps: string[];
  files: CodeFile[];
  output?: string; // console output shown for non-web projects
  stretch: string[];
};

export const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const calculator: CodeFile[] = [
  {
    name: "index.html",
    lang: "html",
    code: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Calculator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="calc">
      <input id="screen" readonly value="0" />
      <div class="keys">
        <button data-k="7">7</button><button data-k="8">8</button>
        <button data-k="9">9</button><button data-k="/">/</button>
        <button data-k="4">4</button><button data-k="5">5</button>
        <button data-k="6">6</button><button data-k="*">*</button>
        <button data-k="1">1</button><button data-k="2">2</button>
        <button data-k="3">3</button><button data-k="-">-</button>
        <button data-k="0">0</button><button data-k=".">.</button>
        <button id="clear">C</button><button data-k="+">+</button>
        <button id="equals" class="wide">=</button>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>`,
  },
  {
    name: "style.css",
    lang: "css",
    code: `body { font-family: system-ui; display: grid; place-items: center; height: 100vh; margin: 0; background: #0f172a; }
.calc { background: #1e293b; padding: 16px; border-radius: 18px; width: 260px; }
#screen { width: 100%; box-sizing: border-box; font-size: 28px; text-align: right;
  padding: 12px; border: 0; border-radius: 12px; background: #0f172a; color: #e2e8f0; }
.keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 12px; }
button { padding: 14px; font-size: 16px; border: 0; border-radius: 12px;
  background: #334155; color: white; cursor: pointer; }
button:hover { background: #475569; }
.wide { grid-column: span 4; background: #7c3aed; }`,
  },
  {
    name: "script.js",
    lang: "js",
    code: `const screen = document.getElementById("screen");
let current = "";

document.querySelectorAll("[data-k]").forEach((btn) => {
  btn.addEventListener("click", () => {
    current += btn.dataset.k;
    screen.value = current;
  });
});

document.getElementById("clear").onclick = () => {
  current = "";
  screen.value = "0";
};

document.getElementById("equals").onclick = () => {
  try {
    // Function() is a safer alternative to eval for simple maths
    current = String(Function("return (" + current + ")")());
    screen.value = current;
  } catch {
    screen.value = "Error";
    current = "";
  }
};`,
  },
];

const todo: CodeFile[] = [
  {
    name: "index.html",
    lang: "html",
    code: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>To-Do App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main>
      <h1>My Tasks</h1>
      <form id="form">
        <input id="input" placeholder="What needs doing?" autocomplete="off" />
        <button>Add</button>
      </form>
      <ul id="list"></ul>
    </main>
    <script src="script.js"></script>
  </body>
</html>`,
  },
  {
    name: "style.css",
    lang: "css",
    code: `body { font-family: system-ui; background: #0f172a; color: #e2e8f0; display: grid; place-items: start center; height: 100vh; margin: 0; padding-top: 40px; }
main { width: 320px; }
form { display: flex; gap: 8px; }
input { flex: 1; padding: 10px; border-radius: 10px; border: 1px solid #334155; background: #1e293b; color: inherit; }
button { padding: 10px 14px; border: 0; border-radius: 10px; background: #7c3aed; color: white; cursor: pointer; }
ul { list-style: none; padding: 0; margin-top: 16px; }
li { display: flex; gap: 8px; align-items: center; background: #1e293b; padding: 10px; border-radius: 10px; margin-bottom: 8px; }
li.done span { text-decoration: line-through; opacity: .5; }
li span { flex: 1; }
.del { background: transparent; color: #f87171; }`,
  },
  {
    name: "script.js",
    lang: "js",
    code: `const KEY = "todos";
let todos = JSON.parse(localStorage.getItem(KEY) || "[]");

const list = document.getElementById("list");
const form = document.getElementById("form");
const input = document.getElementById("input");

function save() {
  localStorage.setItem(KEY, JSON.stringify(todos));
  render();
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";
    li.innerHTML =
      '<input type="checkbox" ' + (todo.done ? "checked" : "") + " />" +
      "<span>" + todo.text + "</span>" +
      '<button class="del">x</button>';
    li.querySelector("input").onchange = () => { todos[i].done = !todos[i].done; save(); };
    li.querySelector(".del").onclick = () => { todos.splice(i, 1); save(); };
    list.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  if (!input.value.trim()) return;
  todos.push({ text: input.value.trim(), done: false });
  input.value = "";
  save();
};

render();`,
  },
];

const quizApp: CodeFile[] = [
  {
    name: "index.html",
    lang: "html",
    code: `<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>Quiz</title><link rel="stylesheet" href="style.css" /></head>
  <body>
    <div id="app"></div>
    <script src="script.js"></script>
  </body>
</html>`,
  },
  {
    name: "style.css",
    lang: "css",
    code: `body { font-family: system-ui; background: #0f172a; color: #e2e8f0; display: grid; place-items: center; height: 100vh; margin: 0; }
#app { width: 340px; background: #1e293b; padding: 20px; border-radius: 16px; }
button { display: block; width: 100%; margin: 8px 0; padding: 12px; border: 0; border-radius: 10px; background: #334155; color: white; cursor: pointer; text-align: left; }
button:hover { background: #475569; }
.right { background: #16a34a !important; }
.wrong { background: #dc2626 !important; }
small { opacity: .6; }`,
  },
  {
    name: "script.js",
    lang: "js",
    code: `const questions = [
  { q: "What does HTML stand for?", a: ["Hyper Text Markup Language", "Hot Mail", "How To Make Links"], correct: 0 },
  { q: "Which language runs in the browser?", a: ["Python", "JavaScript", "C++"], correct: 1 },
  { q: "What is an API?", a: ["A database", "A bridge between apps", "A design tool"], correct: 1 },
];

let index = 0, score = 0;
const app = document.getElementById("app");

function render() {
  if (index >= questions.length) {
    app.innerHTML = "<h2>Score: " + score + "/" + questions.length + "</h2>";
    return;
  }
  const item = questions[index];
  app.innerHTML = "<small>Question " + (index + 1) + "</small><h3>" + item.q + "</h3>";
  item.a.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.onclick = () => {
      btn.className = i === item.correct ? "right" : "wrong";
      if (i === item.correct) score++;
      setTimeout(() => { index++; render(); }, 600);
    };
    app.appendChild(btn);
  });
}

render();`,
  },
];

const portfolio: CodeFile[] = [
  {
    name: "index.html",
    lang: "html",
    code: `<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>Aisha — Developer</title><link rel="stylesheet" href="style.css" /></head>
  <body>
    <header>
      <h1>Hi, I'm Aisha 👋</h1>
      <p>Student developer building small things that solve real problems.</p>
      <a class="cta" href="#projects">See my work</a>
    </header>
    <section id="projects">
      <h2>Projects</h2>
      <div class="grid">
        <article><h3>🧮 Calculator</h3><p>Vanilla JS, no libraries.</p></article>
        <article><h3>✅ To-Do App</h3><p>Saves tasks in the browser.</p></article>
        <article><h3>🤖 AI Chatbot</h3><p>Python + an LLM API.</p></article>
      </div>
    </section>
    <footer><p>aisha@example.com · github.com/aisha</p></footer>
  </body>
</html>`,
  },
  {
    name: "style.css",
    lang: "css",
    code: `* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui; background: #0f172a; color: #e2e8f0; }
header { padding: 60px 24px; text-align: center; background: linear-gradient(135deg, #7c3aed, #06b6d4); }
h1 { margin: 0 0 8px; font-size: 34px; }
.cta { display: inline-block; margin-top: 16px; padding: 12px 20px; background: #0f172a; color: white; border-radius: 999px; text-decoration: none; }
section { padding: 40px 24px; max-width: 900px; margin: auto; }
.grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
article { background: #1e293b; padding: 18px; border-radius: 14px; }
footer { padding: 24px; text-align: center; opacity: .6; }`,
  },
];

const weather: CodeFile[] = [
  {
    name: "App.jsx",
    lang: "jsx",
    code: `import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("London");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function search(e) {
    e.preventDefault();
    setLoading(true);
    // Open-Meteo needs no API key — great for learning
    const geo = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + city
    ).then((r) => r.json());
    const place = geo.results?.[0];
    if (!place) { setData(null); setLoading(false); return; }
    const weather = await fetch(
      \`https://api.open-meteo.com/v1/forecast?latitude=\${place.latitude}&longitude=\${place.longitude}&current_weather=true\`
    ).then((r) => r.json());
    setData({ place: place.name, ...weather.current_weather });
    setLoading(false);
  }

  return (
    <div className="app">
      <form onSubmit={search}>
        <input value={city} onChange={(e) => setCity(e.target.value)} />
        <button>Search</button>
      </form>
      {loading && <p>Loading…</p>}
      {data && (
        <div className="card">
          <h2>{data.place}</h2>
          <p className="temp">{data.temperature}°C</p>
          <p>Wind {data.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}`,
  },
  {
    name: "styles.css",
    lang: "css",
    code: `.app { font-family: system-ui; max-width: 360px; margin: 60px auto; text-align: center; }
form { display: flex; gap: 8px; }
input { flex: 1; padding: 10px; border-radius: 10px; border: 1px solid #cbd5e1; }
button { padding: 10px 16px; border: 0; border-radius: 10px; background: #7c3aed; color: white; }
.card { margin-top: 20px; padding: 20px; border-radius: 16px; background: #f1f5f9; }
.temp { font-size: 42px; margin: 4px 0; }`,
  },
];

const expense: CodeFile[] = [
  {
    name: "App.jsx",
    lang: "jsx",
    code: `import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Books", "Fun"];

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ label: "", amount: "", category: "Food" });

  const total = items.reduce((sum, i) => sum + i.amount, 0);
  const byCategory = CATEGORIES.map((c) => ({
    category: c,
    total: items.filter((i) => i.category === c).reduce((s, i) => s + i.amount, 0),
  }));

  function add(e) {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.label || Number.isNaN(amount)) return;
    setItems([...items, { ...form, amount, id: Date.now() }]);
    setForm({ label: "", amount: "", category: form.category });
  }

  return (
    <div>
      <h1>Spent this month: ₹{total.toFixed(2)}</h1>
      <form onSubmit={add}>
        <input placeholder="What?" value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })} />
        <input placeholder="0.00" value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <select value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button>Add</button>
      </form>

      {byCategory.map((row) => (
        <div key={row.category} className="bar">
          <span>{row.category}</span>
          <div style={{ width: (total ? (row.total / total) * 100 : 0) + "%" }} />
          <b>₹{row.total.toFixed(2)}</b>
        </div>
      ))}
    </div>
  );
}`,
  },
];

const chatApp: CodeFile[] = [
  {
    name: "server.js",
    lang: "js",
    code: `import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on("connection", (socket) => {
  clients.add(socket);
  console.log("A user joined. Online:", clients.size);

  socket.on("message", (raw) => {
    const msg = JSON.parse(raw.toString());
    const payload = JSON.stringify({ ...msg, at: Date.now() });
    for (const client of clients) {
      if (client.readyState === 1) client.send(payload);
    }
  });

  socket.on("close", () => clients.delete(socket));
});

console.log("Chat server running on ws://localhost:8080");`,
  },
  {
    name: "client.js",
    lang: "js",
    code: `const socket = new WebSocket("ws://localhost:8080");
const name = prompt("Your name?") || "Anonymous";

socket.onmessage = (event) => {
  const { user, text } = JSON.parse(event.data);
  const li = document.createElement("li");
  li.textContent = user + ": " + text;
  document.getElementById("messages").appendChild(li);
};

document.getElementById("form").onsubmit = (e) => {
  e.preventDefault();
  const input = document.getElementById("input");
  socket.send(JSON.stringify({ user: name, text: input.value }));
  input.value = "";
};`,
  },
];

const sms: CodeFile[] = [
  {
    name: "schema.sql",
    lang: "sql",
    code: `CREATE TABLE students (
  id        INTEGER PRIMARY KEY,
  name      TEXT NOT NULL,
  roll_no   TEXT UNIQUE NOT NULL,
  class     TEXT NOT NULL
);

CREATE TABLE grades (
  id         INTEGER PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  subject    TEXT NOT NULL,
  marks      INTEGER CHECK (marks BETWEEN 0 AND 100)
);`,
  },
  {
    name: "main.py",
    lang: "python",
    code: `import sqlite3

conn = sqlite3.connect("school.db")
conn.executescript(open("schema.sql").read())

def add_student(name, roll_no, klass):
    conn.execute(
        "INSERT INTO students (name, roll_no, class) VALUES (?, ?, ?)",
        (name, roll_no, klass),
    )
    conn.commit()

def add_grade(roll_no, subject, marks):
    student = conn.execute(
        "SELECT id FROM students WHERE roll_no = ?", (roll_no,)
    ).fetchone()
    conn.execute(
        "INSERT INTO grades (student_id, subject, marks) VALUES (?, ?, ?)",
        (student[0], subject, marks),
    )
    conn.commit()

def report_card(roll_no):
    rows = conn.execute(
        """SELECT s.name, g.subject, g.marks
           FROM grades g JOIN students s ON s.id = g.student_id
           WHERE s.roll_no = ?""",
        (roll_no,),
    ).fetchall()
    print(f"Report card for {rows[0][0]}")
    for _, subject, marks in rows:
        print(f"  {subject:<10} {marks}/100")
    average = sum(r[2] for r in rows) / len(rows)
    print(f"  Average    {average:.1f}")

add_student("Aisha Khan", "22CS101", "12-A")
add_grade("22CS101", "Maths", 92)
add_grade("22CS101", "Physics", 84)
report_card("22CS101")`,
  },
];

const chatbot: CodeFile[] = [
  {
    name: "chatbot.py",
    lang: "python",
    code: `import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

SYSTEM_PROMPT = """You are QuestBot, a friendly coding mentor for absolute beginners.
Explain things in plain language, use short sentences and always end with one next step."""

history = [{"role": "system", "content": SYSTEM_PROMPT}]

print("QuestBot ready. Type 'quit' to leave.\\n")

while True:
    user_input = input("You: ")
    if user_input.lower() in {"quit", "exit"}:
        break

    history.append({"role": "user", "content": user_input})
    reply = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=history,
    ).choices[0].message.content

    history.append({"role": "assistant", "content": reply})
    print("Bot:", reply, "\\n")`,
  },
];

const resume: CodeFile[] = [
  {
    name: "analyzer.py",
    lang: "python",
    code: `import re
from pypdf import PdfReader

SKILLS = ["python", "javascript", "react", "sql", "git", "docker", "api"]
ACTION_WORDS = ["built", "designed", "led", "improved", "shipped", "automated"]

def read_resume(path):
    return " ".join(page.extract_text() or "" for page in PdfReader(path).pages).lower()

def analyze(text):
    found = [s for s in SKILLS if s in text]
    missing = [s for s in SKILLS if s not in text]
    actions = sum(text.count(w) for w in ACTION_WORDS)
    numbers = len(re.findall(r"\\d+%|\\d+\\+", text))

    score = min(100, len(found) * 8 + actions * 4 + numbers * 5)
    return {"score": score, "found": found, "missing": missing,
            "action_words": actions, "measurable_results": numbers}

report = analyze(read_resume("resume.pdf"))
print(f"Resume score: {report['score']}/100")
print("Skills found:", ", ".join(report["found"]))
print("Consider adding:", ", ".join(report["missing"][:3]))
print("Action verbs used:", report["action_words"])
print("Measurable results:", report["measurable_results"])`,
  },
];

const studyAssistant: CodeFile[] = [
  {
    name: "App.jsx",
    lang: "jsx",
    code: `import { useState } from "react";

export default function App() {
  const [notes, setNotes] = useState("");
  const [cards, setCards] = useState([]);
  const [busy, setBusy] = useState(false);

  async function generate() {
    setBusy(true);
    const res = await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    });
    setCards(await res.json());
    setBusy(false);
  }

  return (
    <div className="app">
      <textarea value={notes} rows={10}
        placeholder="Paste your chapter notes here…"
        onChange={(e) => setNotes(e.target.value)} />
      <button onClick={generate} disabled={busy || !notes}>
        {busy ? "Thinking…" : "Make flashcards ✨"}
      </button>
      {cards.map((card, i) => (
        <Flashcard key={i} question={card.question} answer={card.answer} />
      ))}
    </div>
  );
}

function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="card" onClick={() => setFlipped(!flipped)}>
      {flipped ? answer : question}
    </div>
  );
}`,
  },
  {
    name: "api/flashcards.js",
    lang: "js",
    code: `export async function POST(request) {
  const { notes } = await request.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Return JSON: { cards: [{question, answer}] }. Max 8 cards." },
        { role: "user", content: notes },
      ],
    }),
  }).then((r) => r.json());

  const { cards } = JSON.parse(response.choices[0].message.content);
  return Response.json(cards);
}`,
  },
];

const classifier: CodeFile[] = [
  {
    name: "train.py",
    lang: "python",
    code: `import tensorflow as tf
from tensorflow.keras import layers

IMG_SIZE = (160, 160)

train_ds = tf.keras.utils.image_dataset_from_directory(
    "data", validation_split=0.2, subset="training", seed=42,
    image_size=IMG_SIZE, batch_size=32)
val_ds = tf.keras.utils.image_dataset_from_directory(
    "data", validation_split=0.2, subset="validation", seed=42,
    image_size=IMG_SIZE, batch_size=32)

base = tf.keras.applications.MobileNetV2(
    input_shape=IMG_SIZE + (3,), include_top=False, weights="imagenet")
base.trainable = False  # reuse what the model already knows

model = tf.keras.Sequential([
    layers.Rescaling(1.0 / 127.5, offset=-1),
    base,
    layers.GlobalAveragePooling2D(),
    layers.Dropout(0.2),
    layers.Dense(1, activation="sigmoid"),
])

model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
model.fit(train_ds, validation_data=val_ds, epochs=5)
model.save("cats_vs_dogs.keras")`,
  },
  {
    name: "predict.py",
    lang: "python",
    code: `import tensorflow as tf
import numpy as np

model = tf.keras.models.load_model("cats_vs_dogs.keras")

img = tf.keras.utils.load_img("test.jpg", target_size=(160, 160))
array = np.expand_dims(tf.keras.utils.img_to_array(img), axis=0)

score = float(model.predict(array)[0][0])
label = "dog" if score > 0.5 else "cat"
confidence = score if score > 0.5 else 1 - score
print(f"It's a {label} ({confidence:.0%} confident)")`,
  },
];

const questionGen: CodeFile[] = [
  {
    name: "generate.py",
    lang: "python",
    code: `import os, json
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

PROMPT = """Create {n} multiple-choice questions from the chapter below.
Return JSON: {{"questions": [{{"q": "...", "options": ["..."], "answer": 0}}]}}
Mix easy and hard. No question should repeat an idea.

CHAPTER:
{chapter}"""

def generate(chapter, n=5):
    reply = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[{"role": "user", "content": PROMPT.format(n=n, chapter=chapter)}],
    ).choices[0].message.content
    return json.loads(reply)["questions"]

chapter = open("chapter.txt").read()
for i, item in enumerate(generate(chapter), 1):
    print(f"{i}. {item['q']}")
    for j, option in enumerate(item["options"]):
        mark = "*" if j == item["answer"] else " "
        print(f"   {mark} {chr(97 + j)}) {option}")`,
  },
];

export const projectGuides: ProjectGuide[] = [
  {
    slug: "calculator",
    runnable: true,
    intro: "Three files, one working calculator. This is the classic first build because it teaches you the whole loop: markup, styling, and reacting to clicks.",
    steps: [
      "Lay out the screen and buttons in index.html using a CSS grid.",
      "Style it in style.css — dark panel, rounded keys.",
      "In script.js, listen for clicks and build up the expression string.",
      "Evaluate on '=' and reset on 'C'. Wrap it in try/catch so bad input shows 'Error'.",
    ],
    files: calculator,
    stretch: ["Add keyboard support", "Add a history panel", "Add % and √ keys"],
  },
  {
    slug: "to-do-app",
    runnable: true,
    intro: "Your first app with memory. Tasks survive a refresh because they live in localStorage.",
    steps: [
      "Build the form and empty list.",
      "Keep tasks in a JavaScript array.",
      "Write render() so the screen always mirrors the array.",
      "Save to localStorage after every change and load it on start.",
    ],
    files: todo,
    stretch: ["Add a filter for done/pending", "Add due dates", "Drag to reorder"],
  },
  {
    slug: "quiz-app",
    runnable: true,
    intro: "A timed quiz that scores you. Written in plain JS here so you can see the logic — port it to React components once it works.",
    steps: [
      "Put your questions in an array of objects.",
      "Render one question at a time from an index.",
      "Colour the clicked answer green or red, then advance.",
      "Show the final score when you run out of questions.",
    ],
    files: quizApp,
    stretch: ["Add a 30-second timer", "Show explanations after each answer", "Save high scores"],
  },
  {
    slug: "portfolio-website",
    runnable: true,
    intro: "The one project every recruiter will actually open. Keep it honest, keep it short, deploy it free on GitHub Pages or Netlify.",
    steps: [
      "Write a hero with your name and one clear sentence.",
      "Add a projects grid — three real builds beat ten fake ones.",
      "Make it responsive with a CSS auto-fit grid.",
      "Push to GitHub and enable Pages.",
    ],
    files: portfolio,
    stretch: ["Add a dark/light toggle", "Add a contact form via Formspree", "Buy a custom domain"],
  },
  {
    slug: "weather-app",
    runnable: false,
    intro: "Your first real API call. Open-Meteo is free and needs no key, so you can focus on async/await instead of paperwork.",
    steps: [
      "Create a React app (Vite).",
      "Turn the city name into coordinates with the geocoding endpoint.",
      "Fetch the current weather for those coordinates.",
      "Handle loading, empty and error states — that's what makes it feel real.",
    ],
    files: weather,
    output: `$ npm run dev
  VITE ready in 320 ms
  ➜  Local: http://localhost:5173/

> Searching "London"…
  London — 14.2°C, wind 11.5 km/h`,
    stretch: ["Add a 7-day forecast", "Detect the user's location", "Cache the last search"],
  },
  {
    slug: "expense-tracker",
    runnable: false,
    intro: "CRUD plus charts — the pattern behind most real business apps.",
    steps: [
      "Model one expense: label, amount, category, date.",
      "Add items to state and compute totals with reduce().",
      "Draw a simple bar per category using percentage widths.",
      "Swap state for a database when you're ready to persist.",
    ],
    files: expense,
    output: `Spent this month: ₹1,240.00
Food       ████████████░░░░  ₹620.00
Transport  ██████░░░░░░░░░░  ₹310.00
Books      ████░░░░░░░░░░░░  ₹210.00
Fun        ██░░░░░░░░░░░░░░  ₹100.00`,
    stretch: ["Add monthly filtering", "Export to CSV", "Set a budget with alerts"],
  },
  {
    slug: "chat-application",
    runnable: false,
    intro: "Real-time messaging with WebSockets. One tiny server, one tiny client, instant messages.",
    steps: [
      "npm install ws and start a WebSocket server.",
      "Keep every connected socket in a Set.",
      "Broadcast each incoming message to everyone.",
      "Connect from the browser and render messages as they arrive.",
    ],
    files: chatApp,
    output: `$ node server.js
Chat server running on ws://localhost:8080
A user joined. Online: 1
A user joined. Online: 2
> aisha: hey!
> rahul: it works 🎉`,
    stretch: ["Add usernames with login", "Show typing indicators", "Store history in a database"],
  },
  {
    slug: "student-management-system",
    runnable: false,
    intro: "Python plus SQL — the combo that runs an enormous amount of the working world.",
    steps: [
      "Design the tables first: students and grades, linked by id.",
      "Use parameterised queries (?) — never string concatenation.",
      "Write small functions: add_student, add_grade, report_card.",
      "Join the tables to print a report card.",
    ],
    files: sms,
    output: `Report card for Aisha Khan
  Maths      92/100
  Physics    84/100
  Average    88.0`,
    stretch: ["Add attendance tracking", "Add a Flask web UI", "Export report cards as PDF"],
  },
  {
    slug: "ai-chatbot",
    runnable: false,
    intro: "Under 30 lines and it genuinely talks back. The magic is the system prompt plus keeping the history.",
    steps: [
      "pip install openai and set OPENAI_API_KEY as an environment variable — never in the code.",
      "Write a system prompt that defines your bot's personality.",
      "Append every user and assistant message to history so it remembers.",
      "Loop until the user types quit.",
    ],
    files: chatbot,
    output: `QuestBot ready. Type 'quit' to leave.

You: what is an API?
Bot: An API is a menu one program gives another. You order something,
it brings it back. Next step: open a free weather API and read one response.`,
    stretch: ["Stream the reply token by token", "Give it a web UI", "Add memory that survives restarts"],
  },
  {
    slug: "resume-analyzer",
    runnable: false,
    intro: "Read a PDF, score it, suggest fixes. Start with rules — add an LLM later once the basics work.",
    steps: [
      "pip install pypdf and pull the text out of the PDF.",
      "Match against a skills list and a list of action verbs.",
      "Count measurable results (percentages, +numbers).",
      "Turn all of it into a score plus concrete suggestions.",
    ],
    files: resume,
    output: `Resume score: 76/100
Skills found: python, javascript, react, git
Consider adding: sql, docker, api
Action verbs used: 6
Measurable results: 2`,
    stretch: ["Match the resume against a job description", "Add an LLM rewrite suggestion", "Build a drag-and-drop web UI"],
  },
  {
    slug: "ai-study-assistant",
    runnable: false,
    intro: "Paste notes, get flashcards. The frontend is easy — the interesting part is prompt design and keeping your key on the server.",
    steps: [
      "Build the textarea and generate button.",
      "Send the notes to your own backend route, never straight to OpenAI from the browser.",
      "Ask for strict JSON so parsing is reliable.",
      "Render flippable flashcards from the response.",
    ],
    files: studyAssistant,
    output: `POST /api/flashcards  200  1.4s
→ 6 cards generated
  Q: What is photosynthesis?
  A: How plants turn light, water and CO2 into food.`,
    stretch: ["Add spaced repetition", "Support PDF upload", "Generate a quiz from the same notes"],
  },
  {
    slug: "image-classifier",
    runnable: false,
    intro: "Transfer learning: borrow a trained model's eyes and only teach it your final decision. Trains in minutes, not days.",
    steps: [
      "Put images into data/cats and data/dogs folders.",
      "Load them as a dataset with an automatic validation split.",
      "Freeze MobileNetV2 and add your own classification head.",
      "Train for 5 epochs, then predict on a new photo.",
    ],
    files: classifier,
    output: `Found 2000 files belonging to 2 classes.
Epoch 1/5  loss: 0.412  accuracy: 0.83  val_accuracy: 0.91
Epoch 5/5  loss: 0.106  accuracy: 0.97  val_accuracy: 0.96

$ python predict.py
It's a dog (94% confident)`,
    stretch: ["Add a third class", "Unfreeze the base for fine-tuning", "Deploy it with Gradio"],
  },
  {
    slug: "ai-question-generator",
    runnable: false,
    intro: "Feed it a chapter, get practice questions. A masterclass in prompt engineering and structured output.",
    steps: [
      "Write a prompt template that demands strict JSON.",
      "Ask for a mix of difficulties and no repeated ideas.",
      "Parse the JSON and pretty-print the questions.",
      "Mark the correct option so you can self-check.",
    ],
    files: questionGen,
    output: `1. What does an API let two programs do?
     a) Share a database
   * b) Talk to each other
     c) Run faster
2. Which HTTP method creates a new resource?
     a) GET
   * b) POST
     c) DELETE`,
    stretch: ["Export to a printable PDF", "Grade the student's answers", "Wire it into the Quiz App you built"],
  },
];

export const getGuide = (slug: string) => projectGuides.find((g) => g.slug === slug);
