# Career Development Hub

## Experience and design
- Replace the Career section completely. Keep AIVORA’s intro and all other CodeQuest sections unchanged.
- Use an emerald-and-graphite learning dashboard, Sora headings, Manrope lesson text, subtle glass surfaces, restrained animations, and light/dark themes.
- Show nine searchable track cards, career progress, recommendations, recent achievements, and a clear next activity. Adapt navigation and learning content to small screens.
- Remove every Career code editor, terminal, Python file, and source-code window. Coding Practice uses challenge briefs, guided reasoning, quizzes, and links to practice platforms—not an embedded editor.

## Nine guided tracks
Resume Building, GitHub Portfolio, LinkedIn Optimization, Internship Preparation, Interview Preparation, Coding Practice, Project Showcase, Freelancing Basics, and Open Source Contribution.

Every **Start Track** opens its own learning dashboard with:
- A track hero, overview, roadmap, beginner-to-advanced modules, recommended resources, notes, and bookmarks.
- Interactive lessons, actionable tasks, practice exercises, quizzes, and a final assessment.
- Visible progress, earned XP, achievements, and a certificate and completion badge unlocked only after required work and assessments are passed.

## Track-specific activities
- **Resume:** guided builder, templates, editable preview, PDF/DOCX export, transparent ATS-style checks, and improvement suggestions. Scores are guidance, not guarantees from hiring systems.
- **GitHub:** profile and repository checklists, README and portfolio builders, public GitHub profile/repository import, and an explained portfolio score. No source-code viewer.
- **LinkedIn:** profile strength checklist, AI-assisted headline/About drafting, networking activities, and job-search guidance. No automatic posting or unsupported account access.
- **Internships:** readiness checklist, application tracker, company research worksheet, and email templates.
- **Interviews:** HR/technical question practice, project explanation exercises, text-based AI mock interviews, rubric-based performance history, and communication training.
- **Coding Practice:** daily/weekly challenges, difficulty filters, roadmaps, completion streaks, and a leaderboard of participating users—not invented rankings.
- **Showcase:** project gallery, demo links, screenshot uploads, imported GitHub repository details, and opt-in published portfolio pages.
- **Freelancing:** Fiverr/Upwork guides, profile builder, AI-assisted proposal drafts, configurable pricing calculator, and client communication templates.
- **Open Source:** Git workflow lessons, contribution roadmap, beginner-friendly issue discovery, pull-request guidance, and contribution tracking.

## Career-wide features
- Add a Career dashboard, learning analytics, progress percentages, daily streaks, badges, in-app notifications, search, and personalized next-step recommendations.
- Add a Career XP and level system capped at **100**, separate from the existing adventure levels so the rest of CodeQuest does not change.
- Add a goal-based career roadmap generator and an AI Career Mentor grounded in the learner’s selected goals and progress.
- Define and display assessment passing thresholds and reward amounts consistently; prevent repeat completions from awarding XP again.

## Persistence, AI, and integrations
- Enable Lovable Cloud for user sign-in, saved progress, notes, bookmarks, application/contribution records, uploaded screenshots, and opt-in portfolios.
- Provide a browsable public track library; require sign-in when saving personal work or publishing a portfolio.
- Use server-side Lovable AI for the mentor, drafting assistance, mock interviews, and personalized roadmaps. Show real failures clearly, support stopping requests, and do not substitute canned answers for AI results. AI usage may require paid credits beyond the workspace allowance.
- Use GitHub’s public data for imports and issue discovery; keep any required credentials private. Uploading repositories, private repository access, LinkedIn posting, and submission of job applications are not implied by these features.
- Certificates are downloadable platform completion certificates, not accredited qualifications. Public portfolio sharing is explicit; personal notes, resumes, and application records stay private.

## Technical details
- Preserve React, TypeScript, TanStack Start routing, and the existing design-system controls. Add dedicated Career hub, track, and public portfolio routes with page-specific metadata.
- Keep Career lessons, tools, scoring, and persistence in focused modules rather than a single oversized page.
- Use authenticated server functions and per-user access policies for private records; expose only explicitly published portfolio data publicly.
- Store lesson completion and reward events atomically so refreshes or duplicate clicks cannot inflate XP. Track streak dates consistently and explain the scoring formulas in the relevant activities.
- Add tests for the level-100 cap, one-time XP, assessment/certificate gating, progress calculations, and access boundaries. Verify lessons, exports, saved data, uploads, AI responses, and narrow-screen layouts before completion.