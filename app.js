const API_KEY = "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";

const SYSTEM_PROMPT = `You are a senior competitive intelligence analyst. When given a company name, return ONLY a valid JSON object with these exact keys — no markdown, no backticks, no explanation:

{
  "company": "string",
  "tagline": "their actual tagline or positioning statement",
  "positioning": "2-3 sentences on how they position themselves",
  "targetBuyer": {
    "titles": ["job title 1", "job title 2"],
    "companySizes": "description of company sizes they target",
    "industries": ["industry 1", "industry 2"]
  },
  "messagingThemes": [{"theme": "theme name", "description": "one sentence"}],
  "channelPresence": [{"channel": "channel name", "strength": "high or medium or low", "note": "one sentence"}],
  "contentStrategy": "2-3 sentences",
  "competitiveGaps": ["gap 1", "gap 2", "gap 3"],
  "verdict": "one sharp paragraph on where a competitor can win against them",
  "confidence": "high or medium or low",
  "sources_note": "brief note on what signals informed this"
}`;

async function analyze() {
  const query = document.getElementById("query").value.trim();
  if (!query) return;

  const btn = document.getElementById("runBtn");
  const status = document.getElementById("status");
  const error = document.getElementById("error");
  const result = document.getElementById("result");

  btn.disabled = true;
  btn.textContent = "Analyzing...";
  status.textContent = "Analyzing company...";
  status.classList.remove("hidden");
  error.classList.add("hidden");
  result.innerHTML = "";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1500,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Analyze this company for competitive intelligence: ${query}` }
        ]
      })
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));

    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error("No response from agent. Try again.");

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    renderResult(parsed);

  } catch (err) {
    error.textContent = "⚠ " + (err.message || "Something went wrong. Try again.");
    error.classList.remove("hidden");
  } finally {
    btn.disabled = false;
    btn.textContent = "Run Agent →";
    status.classList.add("hidden");
  }
}

function renderResult(d) {
  const result = document.getElementById("result");

  result.innerHTML = `
    <div class="result-card">
      <div class="card-header">
        <div>
          <div class="company-name">${d.company}</div>
          <div class="tagline">"${d.tagline}"</div>
        </div>
        <div class="confidence">● ${d.confidence} confidence</div>
      </div>

      <div class="section">
        <div class="section-title">Positioning</div>
        <p class="body-text">${d.positioning}</p>
      </div>

      <div class="section">
        <div class="section-title">Target Buyer</div>
        <div class="tags">
          ${d.targetBuyer.titles.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <p class="body-text" style="font-size:11px; color:#64748b; margin: 4px 0">${d.targetBuyer.companySizes}</p>
        <div class="tags">
          ${d.targetBuyer.industries.map(i => `<span class="tag">${i}</span>`).join("")}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Messaging Themes</div>
        <div class="theme-grid">
          ${d.messagingThemes.map(t => `
            <div class="theme-card">
              <div class="theme-name">${t.theme}</div>
              <div class="theme-desc">${t.description}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="section">
        <div class="section-title">Channel Presence</div>
        ${d.channelPresence.map(c => `
          <div class="channel-row">
            <div>
              <span class="channel-name">${c.channel}</span>
              <span style="font-size:10px; font-weight:700; margin-left:8px;">● ${c.strength}</span>
            </div>
            <span class="channel-note">${c.note}</span>
          </div>
        `).join("")}
      </div>

      <div class="section">
        <div class="section-title">Content Strategy</div>
        <p class="body-text">${d.contentStrategy}</p>
      </div>

      <div class="section">
        <div class="section-title">Competitive Gaps — Where to Win</div>
        ${d.competitiveGaps.map(g => `
          <div class="gap-row">
            <span class="gap-arrow">→</span>
            <span class="gap-text">${g}</span>
          </div>
        `).join("")}
      </div>

      <div class="verdict-box">
        <div class="verdict-label">ANALYST VERDICT</div>
        <p class="verdict-text">${d.verdict}</p>
      </div>
    </div>
  `;
}

document.getElementById("query").addEventListener("keydown", function(e) {
  if (e.key === "Enter") analyze();
});