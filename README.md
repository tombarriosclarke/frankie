# frankie.irish

Playful portfolio / link hub for **Frankie McNamara** (Meditations for the Anxious Mind).
Bubblegum Y2K cyber-scrapbook with a Windows-XP-ish desktop: spinning cutout loader, draggable
polaroids and windows, a face-shaped Start button, a Toxic Spirit Guide, sticker cursor trail,
scroll-driven toxicity meter, YouTube embeds, Substack essays and the book.

Built with Vite + vanilla JS, [GSAP](https://gsap.com) (Draggable, ScrollTrigger) and [Motion](https://motion.dev).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview
```

## Content
All copy, links and video IDs live in `src/data.js`. Edit that file to add videos, essays or
toxicity ratings. Imagery is hotlinked from Frankie's public YouTube thumbnails; nothing is copied
into the repo.

## Photos
Drop these into `public/assets/` (see `public/assets/README.md`): `frankie-cutout.png` (loader),
`frankie-face.png` (Start button + Spirit Guide), `book-cover.jpg`. Placeholders show until then.

## Easter eggs
Type `yup` anywhere. Close windows to minimise them to the taskbar; the recycle bin restores them.
Sound is off by default (speaker icon in the tray).

## Deploy
Static site: point Vercel/Netlify/Cloudflare Pages at the repo with build `npm run build`, output `dist`,
and attach the `frankie.irish` domain.
