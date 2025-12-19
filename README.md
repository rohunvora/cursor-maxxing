<div align="center">
  <h1>cursorhabits</h1>
  <p><strong>Your chat history writes your rules.</strong></p>
  <p>Extract patterns from your Cursor conversations and generate personalized .cursorrules automatically.</p>
  
  <p>
    <a href="https://prmpt-hstry.vercel.app"><strong>🌐 Website</strong></a> ·
    <a href="#quick-start"><strong>⚡ Quick Start</strong></a> ·
    <a href="cursor-habits/"><strong>📁 CLI Tool</strong></a>
  </p>
</div>

---

## The Problem

You use Cursor daily. You've said things like this **dozens** of times:

> "Push to GitHub when you're done"  
> "Don't test locally, deploy to Vercel"  
> "Always check mobile"  
> "Add that key to .env"

But you never formalize these into rules because:
- You can't remember them all in the moment
- Writing rules from scratch feels arbitrary
- You don't know what you *actually* repeat vs. what you *think* you repeat

**Your chat history already knows.** This tool extracts it.

---

## Quick Start

```bash
# Clone
git clone https://github.com/rohunvora/prmpt-hstry.git
cd prmpt-hstry/cursor-habits

# Run
python cursor_habits.py
```

That's it. No API keys, no accounts, no data uploaded anywhere.

**Output:**
```
🔍 Scanning Cursor chat history...
   Found 847 messages across 23 conversations

✓ Detected 12 recurring patterns:

→ "push to GitHub" appeared 127 times
→ "deploy to Vercel" appeared 89 times
→ "check mobile" appeared 56 times
→ "add to .env" appeared 34 times

📄 Generated: suggested_rules.md

Done! Copy these into your .cursorrules file.
```

---

## What You Get

The tool generates a `suggested_rules.md` file with rules extracted from your actual habits:

```markdown
# Deployment Workflow

## When This Applies
- Any time you make code changes that should go live

## GitHub Flow
- Push to GitHub after EVERY meaningful change
- Don't wait to be asked
- Commit from the rohunvora account

## Vercel Flow
- Do NOT test locally
- Push to Vercel and test on production URL
- After deploying, share the live link immediately
```

Copy these into:
- **Cursor Settings → Rules for AI** (global)
- **`.cursor/rules/`** in your project (per-project)

---

## Privacy First

| Concern | How We Handle It |
|---------|------------------|
| Where does my data go? | **Nowhere.** 100% local processing. |
| What data is accessed? | Only Cursor's local SQLite database. |
| Is anything uploaded? | **No.** No network calls. No telemetry. |
| Can I verify this? | Yes — it's ~200 lines of Python. [Read it](cursor-habits/cursor_habits.py). |

---

## Repository Structure

```
.
├── cursor-habits/          ← The CLI tool (main attraction)
│   ├── cursor_habits.py    ← Run this
│   ├── suggested_rules.md  ← Example output
│   └── README.md           ← Detailed docs
│
├── nextjs-app/             ← Landing page website
│   └── ...                 ← https://prmpt-hstry.vercel.app
│
└── README.md               ← You are here
```

---

## Links

- **Website:** [prmpt-hstry.vercel.app](https://prmpt-hstry.vercel.app)
- **CLI Tool:** [cursor-habits/](cursor-habits/)
- **Twitter:** [@rohunvora](https://twitter.com/rohunvora)

---

## License

MIT — do whatever you want with it.

---

<div align="center">
  <strong>Stop repeating yourself. Let your history write your rules.</strong>
</div>
