# prompt.gallery

A curated collection of prompts that actually work. Think [reallygoodemails.com](https://reallygoodemails.com) but for AI prompts.

## Features

- **One-click copy** — Click anywhere on a prompt card to copy it instantly
- **Filter by category** — Coding, Writing, Analysis, Creative, System prompts
- **Keyboard shortcuts** — `Cmd/Ctrl + 1-9` to copy the nth visible prompt
- **Beautiful dark UI** — Editorial aesthetic with monospace prompts

## Running locally

```bash
# Simple Python server
python3 -m http.server 8080

# Then open http://localhost:8080
```

## Stack

- Pure HTML/CSS/JS — no build step, no dependencies
- IBM Plex Mono for prompts
- Instrument Sans for UI

## Adding prompts

Edit `index.html` and add a new `<article class="prompt-card">` following the existing pattern. Categories: `coding`, `writing`, `analysis`, `creative`, `system`.

---

Built for people who use AI daily.
