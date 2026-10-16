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
Copy and links live in `src/data.js`.

Videos, Shorts and Substack posts update themselves. `scripts/fetch-feeds.mjs` reads the public
YouTube and Substack feeds and writes `src/feed.json`:

- it runs before every build (`npm run build`), and on its own with `npm run feeds`
- `.github/workflows/refresh-feeds.yml` runs it daily and commits `src/feed.json` when something
  is new, which redeploys the site on Vercel/Netlify/Cloudflare
- if a feed is unreachable the last good data is kept, and the hand-picked lists in `src/data.js`
  fill in behind the live ones

YouTube's feeds only list the 15 newest long videos and 15 newest Shorts, so older favourites stay
hand-picked. Instagram and TikTok have no public feed and stay manual.

## Photos
Drop these into `public/assets/` (see `public/assets/README.md`): `frankie-cutout.png` (loader),
`frankie-face.png` (Start button + Spirit Guide), `book-cover.jpg`. Placeholders show until then.

## Easter eggs
Type `yup` anywhere. Close windows to minimise them to the taskbar; the recycle bin restores them.
Sound is off by default (speaker icon in the tray).

## Deploy
Static site: point Vercel/Netlify/Cloudflare Pages at the repo with build `npm run build`, output `dist`,
and attach the `frankie.irish` domain.
