import type { CodeFile } from "@/data/project-code";

export type MiniLab = {
  title: string;
  runnable: boolean;
  files: CodeFile[];
  output?: string;
};

const page = (title: string, body: string, css: string, js: string): CodeFile[] => [
  {
    name: "index.html",
    lang: "html",
    code: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
${body}
    <script src="script.js"></script>
  </body>
</html>`,
  },
  { name: "style.css", lang: "css", code: css },
  { name: "script.js", lang: "js", code: js },
];

const baseCss = `body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh;
  display: grid; place-items: center; background: #0f172a; color: #e2e8f0; text-align: center; }
.card { background: #1e293b; padding: 28px 32px; border-radius: 20px; max-width: 420px; }
h1 { margin: 0 0 8px; font-size: 24px; }
button { margin-top: 14px; padding: 10px 18px; border: 0; border-radius: 12px;
  background: #7c3aed; color: white; font-size: 15px; cursor: pointer; }
button:hover { filter: brightness(1.1); }
p { color: #94a3b8; }`;

/* ---------------- Adventure worlds ---------------- */
export const worldLabs: Record<string, MiniLab> = {
  "tech-explorer": {
    title: "Your very first program",
    runnable: false,
    files: [
      {
        name: "hello.py",
        lang: "python",
        code: `# A program is just step-by-step instructions.
name = "Explorer"

print("Hello, " + name + "! 👋")
print("A computer only does what you tell it.")

for step in ["Read input", "Do something", "Show output"]:
    print("Step:", step)`,
      },
    ],
    output: `Hello, Explorer! 👋
A computer only does what you tell it.
Step: Read input
Step: Do something
Step: Show output

[Process finished with exit code 0]`,
  },
  "coding-valley": {
    title: "Python basics in 12 lines",
    runnable: false,
    files: [
      {
        name: "basics.py",
        lang: "python",
        code: `marks = [72, 88, 91, 65, 79]

total = sum(marks)
average = total / len(marks)

print("Marks:", marks)
print("Total:", total)
print("Average:", round(average, 2))

if average >= 75:
    print("Grade: A 🎉")
else:
    print("Grade: B — keep going!")`,
      },
    ],
    output: `Marks: [72, 88, 91, 65, 79]
Total: 395
Average: 79.0
Grade: A 🎉

[Process finished with exit code 0]`,
  },
  "ai-galaxy": {
    title: "Talk to an AI model",
    runnable: false,
    files: [
      {
        name: "ask_ai.py",
        lang: "python",
        code: `# A prompt is just a well-written question.
prompt = """Explain machine learning to a 10-year-old
in 3 short sentences with one example."""

def ask_ai(prompt):
    # In a real app this calls an LLM API.
    return ("Machine learning is teaching a computer with examples.\\n"
            "You show it thousands of cat photos, it learns 'cat'.\\n"
            "Then it can spot a cat it has never seen before.")

print("PROMPT >>>", prompt.strip())
print()
print("AI >>>")
print(ask_ai(prompt))`,
      },
    ],
    output: `PROMPT >>> Explain machine learning to a 10-year-old
in 3 short sentences with one example.

AI >>>
Machine learning is teaching a computer with examples.
You show it thousands of cat photos, it learns 'cat'.
Then it can spot a cat it has never seen before.

[Process finished with exit code 0]`,
  },
  "developer-city": {
    title: "Your first Git workflow",
    runnable: false,
    files: [
      {
        name: "commands.sh",
        lang: "js",
        code: `git init
git add .
git commit -m "First commit: hello world"
git branch -M main
git remote add origin https://github.com/you/hello-world.git
git push -u origin main`,
      },
    ],
    output: `Initialized empty Git repository in ~/hello-world/.git/
[main (root-commit) 3f9a1c2] First commit: hello world
 2 files changed, 18 insertions(+)
Enumerating objects: 4, done.
Writing objects: 100% (4/4), 412 bytes | 412.00 KiB/s, done.
To https://github.com/you/hello-world.git
 * [new branch]      main -> main
Branch 'main' set up to track 'origin/main'. ✅`,
  },
  "project-planet": {
    title: "Ship a tiny live page",
    runnable: true,
    files: page(
      "My first project",
      `    <div class="card">
      <h1>🚀 My first shipped project</h1>
      <p>Click the button — this page is really running.</p>
      <button id="go">Count my builds</button>
      <h2 id="count">0</h2>
    </div>`,
      baseCss + `\nh2 { font-size: 40px; margin: 12px 0 0; }`,
      `let n = 0;
document.getElementById("go").addEventListener("click", () => {
  n += 1;
  document.getElementById("count").textContent = n;
});`,
    ),
  },
  "career-launch": {
    title: "Generate your project pitch",
    runnable: false,
    files: [
      {
        name: "pitch.py",
        lang: "python",
        code: `project = {
    "name": "StudyPal AI",
    "problem": "Students waste hours making notes",
    "stack": ["React", "Python", "LLM API"],
    "result": "Turns a PDF into flashcards in 5 seconds",
}

print(f"I built {project['name']}, because {project['problem'].lower()}.")
print(f"It is built with {', '.join(project['stack'])}.")
print(f"Result: {project['result']}.")
print("\\nUse this as your resume bullet and interview answer.")`,
      },
    ],
    output: `I built StudyPal AI, because students waste hours making notes.
It is built with React, Python, LLM API.
Result: Turns a PDF into flashcards in 5 seconds.

Use this as your resume bullet and interview answer.

[Process finished with exit code 0]`,
  },
};

/* ---------------- Quests ---------------- */
export const questLabs: Record<string, MiniLab> = {
  q7: {
    title: "Create your first repository",
    runnable: false,
    files: [
      {
        name: "repo.sh",
        lang: "js",
        code: `mkdir hello-world && cd hello-world
echo "# Hello world" > README.md
echo "Hi, I'm learning to code with CodeQuest." >> README.md
git init
git add README.md
git commit -m "Add README"
git push -u origin main`,
      },
    ],
    output: `Initialized empty Git repository in ~/hello-world/.git/
[main (root-commit) 8b21d40] Add README
 1 file changed, 2 insertions(+)
To https://github.com/you/hello-world.git
 * [new branch]      main -> main
Repository created ✅ Mission complete!`,
  },
  q8: {
    title: "Ask AI to explain a topic",
    runnable: false,
    files: [
      {
        name: "explain.py",
        lang: "python",
        code: `topic = "recursion"

prompt = f"""Explain {topic} like I'm 10.
Use one everyday example. Max 3 sentences."""

print("PROMPT >>>")
print(prompt)
print()
print("AI >>> Recursion is when something repeats itself in a smaller way.")
print("Like two mirrors facing each other, each showing a smaller copy.")
print("The repeating stops when there is nothing left to reflect.")`,
      },
    ],
    output: `PROMPT >>>
Explain recursion like I'm 10.
Use one everyday example. Max 3 sentences.

AI >>> Recursion is when something repeats itself in a smaller way.
Like two mirrors facing each other, each showing a smaller copy.
The repeating stops when there is nothing left to reflect.`,
  },
  q9: {
    title: "Write 10 lines of Python",
    runnable: false,
    files: [
      {
        name: "greet.py",
        lang: "python",
        code: `from datetime import datetime

name = "Pradyumna"
now = datetime(2026, 8, 26, 22, 46)

print("Hello,", name + "!")
print("Today is", now.strftime("%A, %d %B %Y"))
print("The time is", now.strftime("%H:%M"))

streak = 3
print(f"Learning streak: {streak} days 🔥")
print("Keep going — tomorrow makes it", streak + 1)`,
      },
    ],
    output: `Hello, Pradyumna!
Today is Wednesday, 26 August 2026
The time is 22:46
Learning streak: 3 days 🔥
Keep going — tomorrow makes it 4

[Process finished with exit code 0]`,
  },
  q10: {
    title: "Call a public API",
    runnable: false,
    files: [
      {
        name: "joke.py",
        lang: "python",
        code: `import requests

URL = "https://official-joke-api.appspot.com/random_joke"

response = requests.get(URL)
print("Status:", response.status_code)

joke = response.json()
print(joke["setup"])
print("->", joke["punchline"])`,
      },
    ],
    output: `Status: 200
Why do programmers prefer dark mode?
-> Because light attracts bugs. 🐛

[Process finished with exit code 0]`,
  },
  q11: {
    title: "Sketch your portfolio",
    runnable: true,
    files: page(
      "My portfolio",
      `    <div class="card">
      <h1>👋 I'm Alex</h1>
      <p>Student · I build small web & AI projects.</p>
      <div id="projects"></div>
      <button id="mail">Contact me</button>
    </div>`,
      baseCss + `\n.p { background:#0f172a; border-radius:12px; padding:10px; margin-top:8px; font-size:14px; }`,
      `const projects = [
  ["Calculator", "HTML · CSS · JS"],
  ["Quiz App", "JavaScript"],
  ["AI Chatbot", "Python · LLM API"],
];
document.getElementById("projects").innerHTML = projects
  .map(([n, t]) => \`<div class="p"><b>\${n}</b><br>\${t}</div>\`)
  .join("");
document.getElementById("mail").onclick = () => alert("alex@example.com");`,
    ),
  },
};

/* ---------------- Career tracks ---------------- */
export const careerLabs: Record<string, MiniLab> = {
  "resume-building": {
    title: "Build a project-first resume bullet",
    runnable: false,
    files: [
      {
        name: "resume.py",
        lang: "python",
        code: `bullets = [
    ("Built", "a calculator web app", "HTML, CSS, JS", "used by 40 classmates"),
    ("Built", "an AI chatbot", "Python, LLM API", "answers course FAQs in 2s"),
]

for verb, what, stack, impact in bullets:
    print(f"• {verb} {what} with {stack} — {impact}.")

print("\\nRule: verb + what + stack + impact. No 'hardworking team player'.")`,
      },
    ],
    output: `• Built a calculator web app with HTML, CSS, JS — used by 40 classmates.
• Built an AI chatbot with Python, LLM API — answers course FAQs in 2s.

Rule: verb + what + stack + impact. No 'hardworking team player'.`,
  },
  "github-portfolio": {
    title: "Write a README that gets read",
    runnable: false,
    files: [
      {
        name: "README.md",
        lang: "js",
        code: `# StudyPal AI 🧠

Turns lecture PDFs into flashcards in 5 seconds.

## Demo
https://studypal-ai.vercel.app

## Tech
React · Python · LLM API

## Run locally
npm install && npm run dev

## What I learned
Prompt design, file parsing, and shipping to production.`,
      },
    ],
    output: `README.md rendered ✅
Repo pinned to profile.
Recruiters spend ~11 seconds on a repo — yours now answers
"what is it", "can I see it", "did you ship it" instantly.`,
  },
  "linkedin-optimization": {
    title: "Rewrite your headline",
    runnable: false,
    files: [
      {
        name: "headline.py",
        lang: "python",
        code: `before = "B.Tech student | Passionate learner | Hardworking"

after = "CS student building AI & web projects | Python · React | 4 shipped apps"

print("BEFORE:", before)
print("AFTER :", after)
print()
print("Search terms recruiters actually type:", ["Python", "React", "AI"])`,
      },
    ],
    output: `BEFORE: B.Tech student | Passionate learner | Hardworking
AFTER : CS student building AI & web projects | Python · React | 4 shipped apps

Search terms recruiters actually type: ['Python', 'React', 'AI']`,
  },
  "internship-preparation": {
    title: "Track your applications",
    runnable: false,
    files: [
      {
        name: "applications.sql",
        lang: "sql",
        code: `CREATE TABLE applications (
  id INTEGER PRIMARY KEY,
  company TEXT,
  role TEXT,
  status TEXT
);

INSERT INTO applications VALUES
  (1, 'Zoho', 'SDE Intern', 'applied'),
  (2, 'Freshworks', 'Frontend Intern', 'interview'),
  (3, 'Razorpay', 'AI Intern', 'applied');

SELECT status, COUNT(*) AS total
FROM applications
GROUP BY status;`,
      },
    ],
    output: `status     | total
-----------+------
applied    | 2
interview  | 1

3 rows in set. Target: 15 applications per month.`,
  },
  "interview-preparation": {
    title: "The 90-second project answer",
    runnable: false,
    files: [
      {
        name: "answer.py",
        lang: "python",
        code: `answer = {
    "context": "Classmates kept losing track of expenses.",
    "action": "I built an expense tracker with JS and localStorage.",
    "problem": "Totals broke when a value was empty.",
    "fix": "Validated input and defaulted to 0.",
    "result": "Used by 30 students; 0 crash reports.",
}

for key, line in answer.items():
    print(f"{key.upper():8} {line}")`,
      },
    ],
    output: `CONTEXT  Classmates kept losing track of expenses.
ACTION   I built an expense tracker with JS and localStorage.
PROBLEM  Totals broke when a value was empty.
FIX      Validated input and defaulted to 0.
RESULT   Used by 30 students; 0 crash reports.`,
  },
  "coding-practice": {
    title: "Pattern practice: two sum",
    runnable: false,
    files: [
      {
        name: "two_sum.py",
        lang: "python",
        code: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))
print("Pattern: hash map lookup — O(n) instead of O(n²).")`,
      },
    ],
    output: `[0, 1]
[1, 2]
Pattern: hash map lookup — O(n) instead of O(n²).`,
  },
  "project-showcase": {
    title: "A demo card people remember",
    runnable: true,
    files: page(
      "Project showcase",
      `    <div class="card">
      <h1>🧠 StudyPal AI</h1>
      <p>PDF ➜ flashcards in 5 seconds.</p>
      <button id="demo">Run the demo</button>
      <div id="out"></div>
    </div>`,
      baseCss + `\n#out { margin-top: 12px; font-size: 14px; }`,
      `document.getElementById("demo").onclick = () => {
  const cards = ["Q: What is an API? / A: A bridge between apps",
                 "Q: What is Git? / A: A time machine for code"];
  document.getElementById("out").innerHTML = cards.map(c => "<p>" + c + "</p>").join("");
};`,
    ),
  },
  "freelancing-basics": {
    title: "Price your first gig",
    runnable: false,
    files: [
      {
        name: "pricing.py",
        lang: "python",
        code: `hours = 18
rate = 350          # INR per hour, beginner range
revisions = 2
buffer = 0.20       # 20% for scope creep

base = hours * rate
total = base * (1 + buffer)

print(f"Estimated hours : {hours}")
print(f"Base            : ₹{base:,.0f}")
print(f"With buffer     : ₹{total:,.0f}")
print(f"Includes {revisions} revisions. 50% advance before starting.")`,
      },
    ],
    output: `Estimated hours : 18
Base            : ₹6,300
With buffer     : ₹7,560
Includes 2 revisions. 50% advance before starting.`,
  },
  "open-source-contribution": {
    title: "Land your first pull request",
    runnable: false,
    files: [
      {
        name: "first-pr.sh",
        lang: "js",
        code: `# 1. Fork the repo on GitHub, then:
git clone https://github.com/you/awesome-project.git
cd awesome-project
git checkout -b fix/typo-in-readme

# 2. Make one small, obvious fix
git commit -am "docs: fix typo in installation steps"
git push origin fix/typo-in-readme

# 3. Open the pull request and link the issue`,
      },
    ],
    output: `Cloning into 'awesome-project'... done.
Switched to a new branch 'fix/typo-in-readme'
[fix/typo-in-readme 1a2b3c4] docs: fix typo in installation steps
remote: Create a pull request:
remote:   https://github.com/upstream/awesome-project/pull/new/fix/typo-in-readme
First PR opened 🌍 Look for the "good first issue" label next.`,
  },
};
