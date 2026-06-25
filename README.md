# Competitive Intelligence Agent

An AI-powered tool that generates structured competitive briefs for any company in seconds.

**Live demo:** https://austrihub.github.io/competitive-intel-agent

---

## What it does

Enter any company name and the agent returns a full competitive brief covering:

- **Positioning** — how the company positions itself and what category they own
- **Target Buyer** — ICP job titles, company sizes, and industries
- **Messaging Themes** — the dominant content and emotional angles across their marketing
- **Channel Presence** — where they're active and how strong each channel is
- **Content Strategy** — what type of content they produce and why
- **Competitive Gaps** — where they're weak and where a competitor can win
- **Analyst Verdict** — one sharp paragraph on the single biggest opportunity against them

---

## How it works

1. User enters a company name
2. The app sends the query + a structured system prompt to the Groq API
3. Llama 3.3 70B analyzes the company based on its training data (company websites, news, G2 reviews, press releases, LinkedIn, and more)
4. The model returns a strict JSON object following the analyst brief format
5. The app parses the JSON and renders the result as a visual card

---

## Tech stack

- **Frontend:** Vanilla HTML, CSS, JavaScript — no frameworks
- **AI Model:** Llama 3.3 70B via Groq API (free tier)
- **Hosting:** GitHub Pages
- **Version control:** Git

---

## Why I built this

This tool solves a real problem for growth marketing teams: knowing where to compete before spending a dollar on media. Instead of spending hours manually researching a competitor, this agent produces a structured brief in under 10 seconds.

It's directly relevant to competitive intelligence workflows — mapping buyer signals, identifying content gaps, and surfacing positioning opportunities.

---

## Run locally

```bash
git clone https://github.com/austrihub/competitive-intel-agent.git
cd competitive-intel-agent
```

Add your Groq API key to `app.js` line 1:

```javascript
const API_KEY = "your-groq-key-here";
```

Then open with a local server:

```bash
npx serve .
```

Go to `http://localhost:3000`

---

## Roadmap

- [ ] Add real-time web search via Groq search tool
- [ ] Side-by-side company comparison
- [ ] Export brief as PDF
- [ ] Company logo fetching via Clearbit API
- [ ] Search history and saved briefs

---

Built by Juan Carlos Garcia — [github.com/austrihub](https://github.com/austrihub)