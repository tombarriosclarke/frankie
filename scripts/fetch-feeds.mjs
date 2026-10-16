// Pulls Frankie's latest YouTube videos, Shorts and Substack posts into src/feed.json.
// Runs before every build (npm run build) and daily from GitHub Actions.
// If a feed can't be reached, the previous data for that feed is kept, so a build never fails or empties out.
import { readFile, writeFile } from 'node:fs/promises'

const CHANNEL = 'U98JVxJf-VQXbPQPNbkbQQ' // YouTube channel id without the leading "UC"
const FEEDS = {
  videos: `https://www.youtube.com/feeds/videos.xml?playlist_id=UULF${CHANNEL}`, // long-form uploads
  shorts: `https://www.youtube.com/feeds/videos.xml?playlist_id=UUSH${CHANNEL}`, // Shorts
  essays: 'https://meditationsfortheanxiousmind.substack.com/feed',
}
const OUT = new URL('../src/feed.json', import.meta.url)

const decode = s => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .trim()
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)); return m ? decode(m[1]) : '' }
const cleanTitle = t => t.replace(/\s*#\S+/g, '').replace(/\s{2,}/g, ' ').trim()
const views = n => n >= 1e6 ? `${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n)

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'frankie.irish feed refresh' }, signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

function parseYouTube(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    id: tag(e, 'yt:videoId'),
    title: cleanTitle(tag(e, 'title')),
    date: tag(e, 'published').slice(0, 10),
    views: views(Number(e.match(/views="(\d+)"/)?.[1] || 0)),
  })).filter(v => v.id && v.title)
}

function parseSubstack(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => {
    const d = new Date(tag(it, 'pubDate'))
    return {
      title: tag(it, 'title'),
      sub: tag(it, 'description'),
      date: d.toLocaleDateString('en-IE', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
      iso: d.toISOString().slice(0, 10),
      url: tag(it, 'link'),
      img: it.match(/<enclosure url="([^"]+)"/)?.[1] || '',
    }
  }).filter(p => p.title && p.url)
}

let prev = {}
try { prev = JSON.parse(await readFile(OUT, 'utf8')) } catch { /* first run */ }

const out = { ...prev }
const parsers = { videos: parseYouTube, shorts: parseYouTube, essays: parseSubstack }
for (const [key, url] of Object.entries(FEEDS)) {
  try {
    const items = parsers[key](await get(url))
    if (!items.length) throw new Error('feed came back empty')
    out[key] = items
    console.log(`feeds: ${key} ${items.length} items`)
  } catch (err) {
    console.warn(`feeds: kept previous ${key} (${err.message})`)
  }
}

// only touch the file when the content changed, so the daily job doesn't commit noise
const strip = o => JSON.stringify({ ...o, updated: undefined })
if (strip(out) !== strip(prev)) {
  out.updated = new Date().toISOString()
  await writeFile(OUT, JSON.stringify(out, null, 2) + '\n')
  console.log('feeds: src/feed.json updated')
} else {
  console.log('feeds: no changes')
}
