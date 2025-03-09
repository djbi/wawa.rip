# wawa.rip

A personal web project with neon effects, social redirects, and interactive elements.

## Features
- Splash screen with rainbow visit counter and click-to-enter prompt
- Glowing social logos with color-changing effects (pink/violet/red loop, rainbow on hover)
- Particle background effects
- Custom mouse cursor
- Notes feature (triple-click "Faith" to open)
- Discord webhook integration for visits and notes
- Dynamic browser title animation ("meow meow" -> "meow" -> "<3")

## Setup
1. Clone the repo: `git clone https://github.com/djbi/wawa.rip.git`
2. Serve locally: `python -m http.server 8000`
3. Deploy to GitHub Pages via Settings > Pages

## Technologies
- HTML
- CSS (with SVG filters)
- JavaScript
- Markdown (README)

## Notes
- Replace `YOUR_DISCORD_WEBHOOK_URL_HERE` in `scripts/utils/webhook.js` with your Discord webhook URL.
