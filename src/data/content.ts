export type Difficulty = "Beginner" | "Easy" | "Medium" | "Intermediate";

export type WorldStage = {
  id: string;
  order: string;
  emoji: string;
  name: string;
  tagline: string;
  gradient: string;
  xp: number;
  items: { title: string; plain: string }[];
};

export const worlds: WorldStage[] = [
  {
    id: "tech-explorer",
    order: "01",
    emoji: "🌱",
    name: "Tech Explorer",
    tagline: "Understand the words everyone keeps using.",
    gradient: "bg-gradient-aqua",
    xp: 150,
    items: [
      { title: "What is programming?", plain: "Writing step-by-step instructions a computer can follow." },
      { title: "What is AI?", plain: "Software that learns patterns so it can answer, write or create." },
      { title: "What is Machine Learning?", plain: "Teaching a computer with examples instead of rules." },
      { title: "What is GitHub?", plain: "A cloud home for your code where you can save and share it." },
      { title: "What is an API?", plain: "A bridge that lets different applications talk to each other." },
      { title: "What is cloud computing?", plain: "Renting someone else's computer over the internet." },
      { title: "What are developer tools?", plain: "The everyday workshop tools that make building easier." },
    ],
  },
  {
    id: "coding-valley",
    order: "02",
    emoji: "🐍",
    name: "Coding Valley",
    tagline: "Meet the languages and pick your first one.",
    gradient: "bg-gradient-primary",
    xp: 250,
    items: [
      { title: "Python", plain: "The friendliest first language. Great for AI and automation." },
      { title: "JavaScript", plain: "The language that makes websites move and react." },
      { title: "Java", plain: "A sturdy language used in big apps and Android." },
      { title: "C", plain: "The classic that shows you how computers really think." },
      { title: "HTML", plain: "The skeleton of every web page." },
      { title: "CSS", plain: "The outfit that makes a page look good." },
    ],
  },
  {
    id: "ai-galaxy",
    order: "03",
    emoji: "🤖",
    name: "AI Galaxy",
    tagline: "Turn AI into a study partner, not a mystery.",
    gradient: "bg-gradient-sunrise",
    xp: 300,
    items: [
      { title: "ChatGPT, Gemini & Claude", plain: "Chat assistants that explain, brainstorm and review." },
      { title: "GitHub Copilot", plain: "An autocomplete buddy that writes code beside you." },
      { title: "Prompt engineering", plain: "Asking better questions so you get better answers." },
      { title: "Generative AI", plain: "AI that creates new text, images, audio or code." },
      { title: "Machine Learning basics", plain: "Data in, patterns out, predictions after." },
    ],
  },
  {
    id: "developer-city",
    order: "04",
    emoji: "💻",
    name: "Developer City",
    tagline: "Set up the workshop real developers live in.",
    gradient: "bg-gradient-aqua",
    xp: 350,
    items: [
      { title: "Git", plain: "A tool that remembers every change you make to your code." },
      { title: "GitHub", plain: "Where your projects live online and teams work together." },
      { title: "VS Code", plain: "Your workspace for writing, running and debugging code." },
      { title: "Replit", plain: "Code in the browser, no installing anything." },
      { title: "Stack Overflow", plain: "The place where someone already hit your error." },
      { title: "Postman & APIs", plain: "A remote control for testing those app-to-app bridges." },
      { title: "Docker", plain: "A lunchbox that carries your app plus everything it needs." },
    ],
  },
  {
    id: "project-planet",
    order: "05",
    emoji: "🚀",
    name: "Project Planet",
    tagline: "Stop watching tutorials. Start shipping.",
    gradient: "bg-gradient-primary",
    xp: 450,
    items: [
      { title: "Websites", plain: "Your first live link you can send to anyone." },
      { title: "Apps", plain: "Something people can actually tap and use." },
      { title: "Chatbots", plain: "A conversation you designed, powered by AI." },
      { title: "AI projects", plain: "Small models and smart tools that solve one problem." },
      { title: "Automation tools", plain: "Scripts that do your boring work for you." },
      { title: "Mini projects", plain: "Weekend-sized builds that grow your portfolio." },
    ],
  },
  {
    id: "career-launch",
    order: "06",
    emoji: "🏆",
    name: "Career Launch",
    tagline: "Turn what you built into opportunities.",
    gradient: "bg-gradient-sunrise",
    xp: 500,
    items: [
      { title: "Resume", plain: "One page that proves you build things." },
      { title: "GitHub portfolio", plain: "Your work, public and pinned." },
      { title: "LinkedIn", plain: "Where recruiters go looking for you." },
      { title: "Internships", plain: "Real experience while you are still learning." },
      { title: "Interview preparation", plain: "Practice explaining your thinking out loud." },
      { title: "Freelancing", plain: "Getting paid for small builds on your own terms." },
    ],
  },
];

export type AiTool = {
  name: string;
  emoji: string;
  what: string;
  bestFor: string[];
  difficulty: Difficulty;
  tip: string;
  url: string;
};

export const aiTools: AiTool[] = [
  { name: "ChatGPT", emoji: "🤖", what: "Your AI study & problem-solving buddy.", bestFor: ["Learning concepts", "Debugging code", "Brainstorming", "Writing documentation"], difficulty: "Beginner", tip: "Don't just ask for answers. Ask AI to explain why.", url: "https://chatgpt.com" },
  { name: "Gemini", emoji: "✨", what: "Google's assistant that's great with images, docs and search.", bestFor: ["Summarising notes", "Understanding images", "Research"], difficulty: "Beginner", tip: "Paste a screenshot of your error and ask what it means.", url: "https://gemini.google.com" },
  { name: "Claude", emoji: "📚", what: "A thoughtful writer that handles very long documents.", bestFor: ["Long explanations", "Reading PDFs", "Essay feedback"], difficulty: "Beginner", tip: "Give it your whole assignment brief before asking questions.", url: "https://claude.ai" },
  { name: "Microsoft Copilot", emoji: "🪟", what: "AI built into Windows, Word, Excel and PowerPoint.", bestFor: ["Slides", "Spreadsheets", "Everyday office work"], difficulty: "Beginner", tip: "Try 'make this slide simpler for a 5-minute talk'.", url: "https://copilot.microsoft.com" },
  { name: "GitHub Copilot", emoji: "🐙", what: "Autocomplete for code that finishes your sentences.", bestFor: ["Writing code faster", "Learning syntax", "Tests"], difficulty: "Easy", tip: "Write a comment describing what you want, then pause.", url: "https://github.com/features/copilot" },
  { name: "Perplexity", emoji: "🔍", what: "A search engine that answers with sources you can check.", bestFor: ["Research", "Comparing tools", "Fact checking"], difficulty: "Beginner", tip: "Always click a source link before trusting an answer.", url: "https://www.perplexity.ai" },
  { name: "Canva AI", emoji: "🎨", what: "Design posters, slides and thumbnails without design skills.", bestFor: ["Presentations", "Posters", "Social posts"], difficulty: "Beginner", tip: "Use Magic Design, then hand-tweak the colours.", url: "https://www.canva.com/ai-tools/" },
  { name: "Gamma", emoji: "📊", what: "Turns a few bullet points into a full presentation.", bestFor: ["Class presentations", "Project demos"], difficulty: "Beginner", tip: "Feed it your project README to get an instant deck.", url: "https://gamma.app" },
  { name: "Cursor", emoji: "⌨️", what: "A code editor with AI built into every keystroke.", bestFor: ["Editing whole projects", "Refactoring", "Explaining code"], difficulty: "Medium", tip: "Ask it to explain a file before you change anything.", url: "https://www.cursor.com" },
  { name: "Replit", emoji: "🧪", what: "Write and run code in your browser with AI help.", bestFor: ["First programs", "Sharing demos", "No-setup coding"], difficulty: "Beginner", tip: "Fork someone's project and change one line at a time.", url: "https://replit.com/" },
  { name: "NotebookLM", emoji: "🗒️", what: "Upload your notes and ask questions about them.", bestFor: ["Exam revision", "Summaries", "Audio overviews"], difficulty: "Beginner", tip: "Upload a full syllabus and ask for a 7-day study plan.", url: "https://notebooklm.google.com" },
  { name: "Lovable", emoji: "💖", what: "Describe your app idea and watch AI build it live.", bestFor: ["Building apps with no code", "Websites", "Prototypes"], difficulty: "Beginner", tip: "Start with one small feature, then keep adding with follow-up prompts.", url: "https://lovable.dev" },
  { name: "Google AI Studio", emoji: "🧠", what: "Google's playground to test AI models and build prompts.", bestFor: ["Trying Gemini models", "Prompt experiments", "AI prototypes"], difficulty: "Easy", tip: "Use the prompt gallery to learn how good prompts are structured.", url: "https://aistudio.google.com" },
];

export type Platform = {
  name: string;
  emoji: string;
  what: string;
  why: string;
  who: string;
  difficulty: Difficulty;
  firstTry: string;
  url: string;
};

export const platforms: Platform[] = [
  { name: "GitHub", emoji: "🐙", what: "An online home for your code projects.", why: "Recruiters and teammates can actually see your work.", who: "Everyone who writes code, from day one.", difficulty: "Beginner", firstTry: "Create a repository called 'hello-world' and add a README.", url: "https://github.com" },
  { name: "VS Code", emoji: "🧰", what: "Your workspace for writing, running and debugging code.", why: "It's free, fast and used by most developers.", who: "Anyone ready to move off notepad.", difficulty: "Beginner", firstTry: "Install the Python extension and run a one-line program.", url: "https://code.visualstudio.com" },
  { name: "Replit", emoji: "🧪", what: "Code that runs in your browser instantly.", why: "Zero setup, works even on a school laptop or phone.", who: "Absolute beginners.", difficulty: "Beginner", firstTry: "Print your name, then make it print 10 times.", url: "https://replit.com/" },
  { name: "Android Studio", emoji: "🤖", what: "The official IDE for building Android apps.", why: "It has everything you need to design, build and test Android apps.", who: "Anyone who wants to make real mobile apps.", difficulty: "Medium", firstTry: "Create a new empty project and run the default app on an emulator.", url: "https://developer.android.com/studio" },
  { name: "LeetCode", emoji: "🧩", what: "Practice problems that companies ask in interviews.", why: "Trains the thinking style interviews test.", who: "Students preparing for placements.", difficulty: "Medium", firstTry: "Solve 'Two Sum' with any language you like.", url: "https://leetcode.com/" },
  { name: "HackerRank", emoji: "🎯", what: "Guided coding challenges with skill certificates.", why: "Gentle difficulty curve with instant feedback.", who: "Beginners building confidence.", difficulty: "Easy", firstTry: "Finish the '10 Days of Python' first day.", url: "https://www.hackerrank.com" },
  { name: "CodeChef", emoji: "👨‍🍳", what: "Monthly coding contests and practice ladders.", why: "Contests make practice feel like a game.", who: "Learners who like competition.", difficulty: "Medium", firstTry: "Join a beginner Starters contest, solve one problem.", url: "https://www.codechef.com" },
  { name: "Codeforces", emoji: "⚡", what: "The serious competitive programming arena.", why: "Sharpens speed and algorithm skills.", who: "Learners after a few months of practice.", difficulty: "Intermediate", firstTry: "Attempt a Div. 3 problem A with no time pressure.", url: "https://codeforces.com" },
  { name: "Stack Overflow", emoji: "🧯", what: "A giant Q&A library of solved errors.", why: "Someone already had your exact bug.", who: "Anyone who has ever seen a red error.", difficulty: "Beginner", firstTry: "Paste your error message into the search bar.", url: "https://stackoverflow.com" },
  { name: "Kaggle", emoji: "📈", what: "Datasets, notebooks and machine learning competitions.", why: "Free GPUs and real data to practise AI on.", who: "Future data scientists.", difficulty: "Medium", firstTry: "Run the Titanic starter notebook and change one setting.", url: "https://www.kaggle.com" },
];

export type Project = {
  name: string;
  category: "Beginner" | "Intermediate" | "AI Projects";
  emoji: string;
  description: string;
  tech: string[];
  time: string;
  skills: string[];
  xp: number;
};

export const projects: Project[] = [
  { name: "Calculator", category: "Beginner", emoji: "🧮", description: "A working calculator you can use every day.", tech: ["HTML", "CSS", "JavaScript"], time: "3 hours", skills: ["Buttons & events", "Functions"], xp: 100 },
  { name: "To-Do App", category: "Beginner", emoji: "✅", description: "Add, tick off and delete tasks that stay after refresh.", tech: ["JavaScript", "LocalStorage"], time: "5 hours", skills: ["State", "Saving data"], xp: 150 },
  { name: "Quiz App", category: "Beginner", emoji: "❓", description: "A timed quiz with score and answer explanations.", tech: ["React", "TypeScript"], time: "6 hours", skills: ["Arrays", "Components"], xp: 180 },
  { name: "Portfolio Website", category: "Beginner", emoji: "🪪", description: "Your own site with projects, skills and contact.", tech: ["HTML", "CSS", "Deploy"], time: "1 weekend", skills: ["Layout", "Hosting"], xp: 200 },
  { name: "Weather App", category: "Intermediate", emoji: "🌤️", description: "Live weather for any city using a public API.", tech: ["React", "REST API"], time: "8 hours", skills: ["APIs", "Async code"], xp: 250 },
  { name: "Expense Tracker", category: "Intermediate", emoji: "💸", description: "Track spending with charts and monthly totals.", tech: ["React", "Charts", "Database"], time: "2 days", skills: ["CRUD", "Data viz"], xp: 300 },
  { name: "Chat Application", category: "Intermediate", emoji: "💬", description: "Real-time messaging between two users.", tech: ["Node.js", "WebSockets"], time: "3 days", skills: ["Realtime", "Auth"], xp: 350 },
  { name: "Student Management System", category: "Intermediate", emoji: "🎓", description: "Records, attendance and grades in one dashboard.", tech: ["Python", "SQL"], time: "1 week", skills: ["Databases", "Reports"], xp: 380 },
  { name: "AI Chatbot", category: "AI Projects", emoji: "🤖", description: "A chatbot that answers in your own style.", tech: ["Python", "LLM API"], time: "1 day", skills: ["Prompts", "API keys"], xp: 320 },
  { name: "Resume Analyzer", category: "AI Projects", emoji: "📄", description: "Upload a resume, get instant AI feedback.", tech: ["Python", "NLP"], time: "2 days", skills: ["Text parsing", "Scoring"], xp: 360 },
  { name: "AI Study Assistant", category: "AI Projects", emoji: "🧠", description: "Turns your notes into flashcards and summaries.", tech: ["React", "LLM API"], time: "3 days", skills: ["Prompt design", "UI"], xp: 400 },
  { name: "Image Classifier", category: "AI Projects", emoji: "🖼️", description: "Teach a model to tell cats from dogs.", tech: ["Python", "TensorFlow"], time: "2 days", skills: ["Training", "Datasets"], xp: 420 },
  { name: "AI Question Generator", category: "AI Projects", emoji: "🎲", description: "Generate practice questions from any chapter.", tech: ["Python", "LLM API"], time: "1 day", skills: ["Prompts", "Evaluation"], xp: 340 },
];

export const levels = [
  { level: 1, name: "Curious Explorer", emoji: "🌱", min: 0 },
  { level: 2, name: "Code Explorer", emoji: "💻", min: 400 },
  { level: 3, name: "AI Adventurer", emoji: "🤖", min: 900 },
  { level: 4, name: "Tech Builder", emoji: "🛠️", min: 1600 },
  { level: 5, name: "Innovation Master", emoji: "🚀", min: 2600 },
];

export const badges = [
  { id: "first-code", name: "First Code", emoji: "🏅", how: "Run your very first program." },
  { id: "ai-explorer", name: "AI Explorer", emoji: "🤖", how: "Explore 3 AI tools." },
  { id: "github-starter", name: "GitHub Starter", emoji: "🐙", how: "Create your first repository." },
  { id: "python-pioneer", name: "Python Pioneer", emoji: "🐍", how: "Finish Coding Valley." },
  { id: "api-explorer", name: "API Explorer", emoji: "🔌", how: "Call your first API." },
  { id: "project-builder", name: "Project Builder", emoji: "🚀", how: "Ship one project." },
  { id: "open-source-rookie", name: "Open Source Rookie", emoji: "🌍", how: "Make your first pull request." },
  { id: "ai-master", name: "AI Master", emoji: "🧠", how: "Complete AI Galaxy." },
];

export type Quest = {
  id: string;
  no: string;
  title: string;
  detail: string;
  xp: number;
  tag: string;
};

export const quests: Quest[] = [
  { id: "q7", no: "Mission #07", title: "Create your first GitHub repository", detail: "Name it hello-world, add a README that says who you are.", xp: 100, tag: "Developer City" },
  { id: "q8", no: "Mission #08", title: "Ask AI to explain one confusing topic", detail: "Pick something you nodded along to but didn't get. Ask for a 10-year-old version.", xp: 50, tag: "AI Galaxy" },
  { id: "q9", no: "Mission #09", title: "Write 10 lines of Python", detail: "A program that greets you and tells you today's date.", xp: 80, tag: "Coding Valley" },
  { id: "q10", no: "Mission #10", title: "Call a public API", detail: "Fetch a random joke API and print the result.", xp: 120, tag: "Developer City" },
  { id: "q11", no: "Mission #11", title: "Sketch your portfolio", detail: "Three sections: who you are, what you built, how to reach you.", xp: 90, tag: "Career Launch" },
];

export type QuizQuestion = {
  q: string;
  options: string[];
  answer: number;
  why: string;
  xp: number;
};

export const quiz: QuizQuestion[] = [
  { q: "What is GitHub mainly used for?", options: ["Watching videos", "Storing and collaborating on code", "Editing photos", "Creating presentations"], answer: 1, why: "GitHub is a cloud home for code where teams save versions and work together.", xp: 30 },
  { q: "In simple words, what is an API?", options: ["A programming language", "A bridge that lets apps talk to each other", "A type of laptop", "A database"], answer: 1, why: "An API is a bridge: your app asks, another app answers, in an agreed format.", xp: 30 },
  { q: "Which language is usually easiest to start with?", options: ["C++", "Assembly", "Python", "Rust"], answer: 2, why: "Python reads almost like English, so you focus on ideas instead of syntax.", xp: 30 },
  { q: "What does Machine Learning need most?", options: ["Examples (data)", "A faster mouse", "More browser tabs", "A big monitor"], answer: 0, why: "ML learns patterns from examples, so data quality matters more than anything.", xp: 30 },
  { q: "What is Git remembering for you?", options: ["Your passwords", "Every change you make to your code", "Your browser history", "Your emails"], answer: 1, why: "Git is a time machine for code: every change is saved and reversible.", xp: 30 },
];

export type StartingPath = {
  emoji: string;
  label: string;
  steps: string[];
  tools?: string[];
  platforms?: string[];
  projects?: string[];
};

export const startingPaths: Record<string, StartingPath> = {
  ai: {
    emoji: "🤖", label: "AI",
    steps: ["What AI actually is", "Prompting basics", "Python basics", "Use ChatGPT + Copilot daily", "Build an AI chatbot", "Publish it on GitHub", "Share it on LinkedIn"],
    tools: ["ChatGPT", "Gemini", "Claude", "Perplexity", "NotebookLM", "Lovable", "Google AI Studio"],
    platforms: ["GitHub", "Kaggle"],
    projects: ["AI Chatbot", "AI Study Assistant", "AI Question Generator"],
  },
  coding: {
    emoji: "💻", label: "Coding",
    steps: ["Programming basics", "Python", "Problem solving on HackerRank", "GitHub", "Build a mini project", "Create a portfolio", "Prepare for opportunities"],
    tools: ["ChatGPT", "GitHub Copilot", "Cursor", "Replit", "Lovable"],
    platforms: ["VS Code", "Replit", "HackerRank", "GitHub", "Android Studio"],
    projects: ["Calculator", "To-Do App", "Quiz App"],
  },
  web: {
    emoji: "🌐", label: "Web Development",
    steps: ["HTML", "CSS", "JavaScript", "Build a portfolio site", "React basics", "Deploy it live", "Add 2 projects to GitHub"],
    tools: ["ChatGPT", "Cursor", "Canva AI", "Gamma", "Lovable"],
    platforms: ["VS Code", "GitHub", "Replit"],
    projects: ["Portfolio Website", "Weather App"],
  },
  app: {
    emoji: "📱", label: "App Development",
    steps: ["Programming basics", "JavaScript or Kotlin", "UI fundamentals", "Build a to-do app", "Connect an API", "Publish a demo build", "Showcase it"],
    tools: ["Cursor", "ChatGPT", "Lovable"],
    platforms: ["VS Code", "GitHub", "Android Studio"],
    projects: ["To-Do App", "Chat Application"],
  },
  data: {
    emoji: "📊", label: "Data Science",
    steps: ["Python", "Pandas & spreadsheets", "Statistics basics", "Kaggle Titanic notebook", "Data visualisation", "One end-to-end analysis", "Portfolio write-up"],
    tools: ["ChatGPT", "NotebookLM", "Google AI Studio"],
    platforms: ["Kaggle", "GitHub"],
    projects: ["Expense Tracker", "Student Management System", "Image Classifier"],
  },
  cyber: {
    emoji: "🔐", label: "Cybersecurity",
    steps: ["How the internet works", "Linux basics", "Networking fundamentals", "TryHackMe beginner rooms", "Python scripting", "Capture-the-flag practice", "Security certifications"],
    tools: ["Perplexity", "ChatGPT"],
    platforms: ["Stack Overflow", "GitHub", "VS Code"],
    projects: ["Student Management System"],
  },
  cloud: {
    emoji: "☁️", label: "Cloud",
    steps: ["What cloud computing is", "Linux basics", "One provider (AWS or Azure)", "Deploy a static site", "Docker basics", "CI/CD with GitHub Actions", "Cloud fundamentals certificate"],
    tools: ["ChatGPT", "Perplexity"],
    platforms: ["GitHub", "Replit"],
    projects: ["Portfolio Website", "Weather App"],
  },
  design: {
    emoji: "🎨", label: "UI/UX",
    steps: ["Design principles", "Figma basics", "Colour & typography", "Redesign one app screen", "Build a case study", "HTML + CSS basics", "Portfolio on Behance"],
    tools: ["Canva AI", "Gamma", "ChatGPT", "Lovable"],
    platforms: ["GitHub"],
    projects: ["Portfolio Website"],
  },
  projects: {
    emoji: "🚀", label: "Building Projects",
    steps: ["Pick one small idea", "Learn only what it needs", "Build the ugly version", "Make it work end to end", "Push to GitHub", "Write a README", "Demo it publicly"],
    tools: ["ChatGPT", "GitHub Copilot", "Cursor", "Lovable"],
    platforms: ["GitHub", "VS Code", "Replit", "Android Studio"],
    projects: ["Calculator", "To-Do App", "Portfolio Website"],
  },
  new: {
    emoji: "🤷", label: "I'm Completely New",
    steps: ["Programming basics", "Python", "GitHub", "AI tools", "Build a mini project", "Create portfolio", "Prepare for opportunities"],
    tools: ["ChatGPT", "Gemini", "Replit", "Lovable"],
    platforms: ["GitHub", "VS Code", "Replit", "Android Studio"],
    projects: ["Calculator", "To-Do App"],
  },
  tools: {
    emoji: "🧰", label: "Explore Tools",
    steps: ["Pick one tool below", "Open it and try the beginner tip", "Ask it to explain a topic you find hard", "Use it daily for a week", "Add it to your study workflow"],
  },
};

export const careerTracks = [
  { emoji: "📄", title: "Resume building", desc: "One page, project-first, no fluff. We give you the structure." },
  { emoji: "🐙", title: "GitHub portfolio", desc: "Pin 4 repos with real READMEs and screenshots." },
  { emoji: "💼", title: "LinkedIn optimization", desc: "A headline that says what you build, not what you study." },
  { emoji: "🎯", title: "Internship preparation", desc: "Where to apply, when to apply, and what to send." },
  { emoji: "🗣️", title: "Interview preparation", desc: "Practise explaining your project in 90 seconds." },
  { emoji: "🧩", title: "Coding practice", desc: "A 30-day pattern-based practice plan." },
  { emoji: "🖼️", title: "Project showcase", desc: "Turn a repo into a demo people remember." },
  { emoji: "💰", title: "Freelancing basics", desc: "First client, fair pricing, safe payments." },
  { emoji: "🌍", title: "Open-source contribution", desc: "Find good-first-issues and land your first PR." },
];

export const showcase = [
  { creator: "Aarav S.", project: "StudyPal AI", tech: ["React", "OpenAI"], desc: "Turns lecture PDFs into flashcards and a revision plan.", emoji: "🧠" },
  { creator: "Meera K.", project: "CampusEats", tech: ["Next.js", "Supabase"], desc: "Pre-order canteen food and skip the queue.", emoji: "🍜" },
  { creator: "Daniel O.", project: "LeafCheck", tech: ["Python", "TensorFlow"], desc: "Photograph a plant leaf and detect disease early.", emoji: "🌿" },
  { creator: "Priya R.", project: "DevJournal", tech: ["Vue", "Firebase"], desc: "A daily log that turns commits into a learning diary.", emoji: "📓" },
  { creator: "Kenji T.", project: "BusETA", tech: ["React Native", "APIs"], desc: "Live campus shuttle tracking for 2,000 students.", emoji: "🚌" },
  { creator: "Zara N.", project: "PitchDeck AI", tech: ["Gamma", "Claude"], desc: "Generates startup decks from a one-line idea.", emoji: "📊" },
];
