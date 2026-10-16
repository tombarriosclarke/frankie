import feed from './feed.json'

// All public links + content for frankie.irish.
// Media is embedded/hotlinked from official platforms; nothing is copied into the repo.

export const links = {
  youtube: 'https://www.youtube.com/@meditationsfortheanxiousmind',
  instagram: 'https://www.instagram.com/meditationsfortheanxiousmind/',
  tiktok: 'https://www.tiktok.com/@meditationsfortheanxious',
  substack: 'https://meditationsfortheanxiousmind.substack.com/',
  substackSubscribe: 'https://meditationsfortheanxiousmind.substack.com/subscribe',
  book: 'https://www.harpercollins.co.uk/products/the-toxic-travel-guide-frankie-mcnamara',
  bookAmazon: 'https://www.amazon.co.uk/Toxic-Travel-Guide-Ireland-Before/dp/0008527075',
  email: 'mailto:meditationsfortheanxiousmind@gmail.com',
  emailText: 'meditationsfortheanxiousmind@gmail.com',
}

// Follower counts per platform. Refreshed by scripts/fetch-feeds.mjs; these are the
// last hand-checked numbers (16 Oct 2026) in case a lookup fails. Instagram blocks lookups,
// so its number is set by hand here.
const checkedFollowers = { TikTok: 564800, Instagram: 523000, YouTube: 326000, Substack: 7100 }
export const followers = { ...checkedFollowers, ...(feed.followers || {}) }

export const bio = {
  name: 'Frankie McNamara',
  aka: 'Meditations for the Anxious Mind',
  tagline: 'Toxic Spirit Guide. Writer. Published author. Makes videos on the internet.',
  short:
    'Frankie started making comedy meditations in the first lockdown, parodying the guided meditations he’d been watching on YouTube. The page grew into a YouTube channel with over 300,000 subscribers, a book with HarperCollins, a podcast and a weekly Substack about culture and modern life.',
  quotes: [
    { q: 'I hate bosses. But not as much as they hated me.', who: 'About me, Substack' },
    { q: 'I’m very sensitive, which may come as a shock to some of you.', who: 'About me, Substack' },
    { q: 'I’m like a family of cats; I don’t have nine lives, I have 81.', who: 'Frankie, RTÉ' },
    { q: 'They have to be some of the most unspiritual people, those spirit guides.', who: 'Frankie, RTÉ' },
    { q: 'I’d rather be rejected for my character, than for my character.', who: 'About me, Substack' },
    { q: 'Oh God, what have I done?', who: 'On the page taking off, RTÉ' },
  ],
}


// Hand-picked fallbacks. The live lists come from src/feed.json (see scripts/fetch-feeds.mjs).
const pickedVideos = [
  { id: '97H5meZRzBo', title: 'why everyone wants to be Irish now', date: '2026-10-07', views: '86K' },
  { id: 'BYxcylXzPnU', title: 'Ireland vs Israel: a case study in sportswashing', date: '2026-09-27', views: '140K' },
  { id: 'TsyMXroqFiw', title: 'Cultural observations: avoidants', date: '2026-08-30', views: '201K' },
  { id: 'pMkn3FYFkQU', title: 'why no one drinks anymore', date: '2026-05-17', views: '146K' },
  { id: 'im3gqUQ1k1g', title: 'Ed Sheeran and the tyranny of the centrist dad', date: '2026-09-17', views: '111K' },
  { id: 'dagJ16KD5v0', title: 'east london gentrifiers', date: '2026-09-20', views: '98K' },
  { id: 'ZkfelRxpfrI', title: 'meta raybans: why everyone is a perv*rt now', date: '2026-09-25', views: '77K' },
  { id: 'yrF_gt3cYRY', title: 'why we call everyone a narcissist now', date: '2026-07-13', views: '47K' },
  { id: 'cNkZBGw-Eps', title: 'LONDON CREATIVES', date: '2026-04-20', views: '65K' },
  { id: 'ZDHkW8w9dRw', title: 'why life doesn’t feel real anymore', date: '2026-04-12', views: '35K' },
  { id: 'Utfolpx-fJU', title: 'why all men need to be gay', date: '2026-06-16', views: '55K' },
  { id: 'AKfUqZpNcRs', title: 'Black bananas: a short film by me', date: '2026-06-21', views: '4K' },
]

const pickedShorts = [
  { id: 'CdxvG8AVxTI', title: 'Straight men: a critique', views: '691K' },
  { id: 'c_DJfCBQGyA', title: 'POV: that friend who thinks food has to be a spiritual experience', views: '186K' },
  { id: 'wNONZCGdPvw', title: 'The most American American that ever American’ed', views: '171K' },
  { id: 'e7LCg8-MjzI', title: 'me vs a goth', views: '140K' },
  { id: 'oHL7I6k99wc', title: 'CANCELLING BONO', views: '131K' },
  { id: 'uwfLf-TvCaQ', title: 'A critique of Harvard Referencing', views: '123K' },
  { id: 'BFAWenteW4A', title: 'When you buy big skins in SPAR', views: '94K' },
  { id: 'tluq_iHuJbs', title: 'New York isn’t actually new', views: '85K' },
  { id: 'drivers', yt: 'SUHB6H5WC00', title: 'drivers that want you to drive just because they drive', views: '81K' },
  { id: 'XIImqAA55MI', title: 'the rise of the far-right', views: '78K' },
  { id: 'u6enL3eEqnQ', title: 'shortest therapy session ever', views: '76K' },
  { id: 'NNINWP2wJh0', title: 'RAGE AGAINST THE VOICE NOTES', views: '64K' },
  { id: 'yX8amMqBTOU', title: 'Bundoran girl thinks she’s from Poland', views: '61K' },
  { id: '4Zkw3RSkAkc', title: '5G hippies', views: '43K' },
  { id: 'k6heJC02e6I', title: 'Psychoanalysis of the Irish Deli Counter Items', views: '42K' },
  { id: 'pnaWcdiczwU', title: 'MAYNOOTH', views: '29K' },
  { id: 'dB1ubmVCVyE', title: 'Personality of Pringles flavours', views: '35K' },
  { id: 'CPFBPB1If0U', title: 'If Brexit was a soap opera', views: '36K' },
].map(s => ({ ...s, id: s.yt || s.id }))

const pickedEssays = [
  { title: 'Is Everyone Really A Narcissist Now?', sub: 'why people think everyone is a narcissist now', date: 'Oct 11', url: 'https://meditationsfortheanxiousmind.substack.com/p/is-everyone-really-a-narcissist-now' },
  { title: 'Ed Sheeran & The Tyranny of the Centrist Dad', sub: 'Thinking out loud, and saying nothing at all.', date: 'Sep 21', url: 'https://meditationsfortheanxiousmind.substack.com/p/ed-sheeran-and-the-tyranny-of-the' },
  { title: 'Brat, a pub in Portlaoise and a VHS filter', sub: 'a ramble on melancholia, the future and the nostalgia of sticky floors', date: 'Sep 18', url: 'https://meditationsfortheanxiousmind.substack.com/p/brat-a-pub-in-portlaoise-and-a-vhs' },
  { title: 'Why We All Hate Avoidants', sub: 'On attachment theory, Big Self-Love™ and the rejection industrial complex', date: 'Sep 1', url: 'https://meditationsfortheanxiousmind.substack.com/p/why-we-all-hate-avoidants' },
  { title: 'Nostalgia and addiction', sub: 'The past had better drugs', date: 'Aug 28', url: 'https://meditationsfortheanxiousmind.substack.com/p/nostalgia-and-addiction' },
  { title: 'Perez Hilton and the end stage of the attention economy', sub: 'outrage, irony and the tyranny of the upload button', date: 'Aug 17', url: 'https://meditationsfortheanxiousmind.substack.com/p/perez-hilton-and-the-end-stage-of' },
  { title: 'Vapes: the soothers of the millennial generation', sub: 'delayed adulthood and the yearning for utero', date: 'Aug 9', url: 'https://meditationsfortheanxiousmind.substack.com/p/vapes-the-soothers-of-the-millennial' },
  { title: 'About me', sub: 'how I got into holding a microphone', date: 'Aug 4', url: 'https://meditationsfortheanxiousmind.substack.com/p/about-me' },
  { title: 'Why we fall in love with AI', sub: 'the loneliness industrial complex', date: 'Jul 31', url: 'https://meditationsfortheanxiousmind.substack.com/p/why-we-fall-in-love-with-ai' },
  { title: 'Love Island: Why we need a universal basic income.', sub: 'what reality TV reveals about exhaustion', date: 'Jul 24', url: 'https://meditationsfortheanxiousmind.substack.com/p/love-island-why-we-need-a-universal' },
]

export const book = {
  title: 'The Toxic Travel Guide',
  subtitle: 'Ireland As You’ve Never Seen It Before',
  publisher: 'HarperCollins',
  pages: 271,
  isbn: '9780008527075',
  blurb:
    'Every county and selected towns, each with a toxicity rating out of ten. Frankie wrote it at 500 words a day over six to nine months.',
}

// Spirit Guide lines: things Frankie has said or written (GCN 2023, RTÉ 2022, the book), plus the site's own sign-off
export const spiritTips = [
  'Please resist any spiritual feelings.',
  'I’m a Toxic Spirit Guide.',
  'Nobody talks like that in real life.',
  'They have to be some of the most unspiritual people, those spirit guides.',
  'I’m like a family of cats; I don’t have nine lives, I have 81.',
]

// About section quick links: one card per platform
export const quickLinks = [
  { type: 'YouTube', title: 'Ireland vs Israel: a case study in sportswashing', img: 'https://i.ytimg.com/vi/BYxcylXzPnU/hqdefault.jpg', url: 'https://www.youtube.com/watch?v=BYxcylXzPnU', wide: true },
  { type: 'Shorts', title: 'Straight men: a critique', img: 'https://i.ytimg.com/vi/CdxvG8AVxTI/hqdefault.jpg', url: 'https://www.youtube.com/shorts/CdxvG8AVxTI' },
  { type: 'TikTok', title: 'The most American American that ever American’ed', img: 'https://i.ytimg.com/vi/wNONZCGdPvw/hqdefault.jpg', url: 'https://www.tiktok.com/@meditationsfortheanxious' },
  { type: 'Instagram', title: 'CANCELLING BONO', img: 'https://i.ytimg.com/vi/oHL7I6k99wc/hqdefault.jpg', url: 'https://www.instagram.com/meditationsfortheanxiousmind/' },
  { type: 'Substack', title: 'Ed Sheeran & The Tyranny of the Centrist Dad', img: 'https://substack-post-media.s3.amazonaws.com/public/images/75a6f281-655c-4e40-accf-9e5f4be18460_1179x664.jpeg', url: 'https://meditationsfortheanxiousmind.substack.com/p/ed-sheeran-and-the-tyranny-of-the' },
  { type: 'Book', title: 'The Toxic Travel Guide', img: '/assets/book-cover.jpg', fallback: '/assets/placeholder-book.svg', url: '#book', internal: true },
]

// ---------- live lists: newest from the feeds first, hand-picked ones after ----------
const dedupe = (list, key = 'id') => list.filter((x, i, a) => a.findIndex(y => y[key] === x[key]) === i)

export const videos = dedupe([...(feed.videos || []), ...pickedVideos]).slice(0, 12)
// newest few Shorts, then the most-watched picks
export const shorts = dedupe([...(feed.shorts || []).slice(0, 6), ...pickedShorts]).slice(0, 18)
export const essays = (feed.essays?.length ? feed.essays : pickedEssays).slice(0, 10)

// the Substack quick-link card follows the latest post that has a web-friendly cover image
const latestWithImage = (feed.essays || []).find(e => /\.(jpe?g|png|webp|gif)(\?|$)/i.test(e.img))
if (latestWithImage) {
  const card = quickLinks.find(q => q.type === 'Substack')
  Object.assign(card, { title: latestWithImage.title, img: latestWithImage.img, url: latestWithImage.url })
}

// Stickers: groups from his videos. Clicking one plays that video.
// where: 'hero' or a section id; x/y: position as % of that area; r: tilt.
const ACOUSTIC_GUITAR = `<svg viewBox="0 0 64 64" width="1em" height="1em" aria-hidden="true"><g transform="rotate(-35 32 32)">
  <rect x="29" y="3" width="6" height="10" rx="2" fill="#5a3418"/><rect x="30" y="10" width="4" height="22" fill="#7a4a24"/>
  <path d="M32 30c-7 0-10 4-9 9-5 2-7 6-6 11 1 7 8 11 15 11s14-4 15-11c1-5-1-9-6-11 1-5-2-9-9-9z" fill="#e0a25a" stroke="#7a4a24" stroke-width="2"/>
  <circle cx="32" cy="41" r="4.5" fill="#3b2412"/><rect x="27" y="51" width="10" height="3" rx="1" fill="#5a3418"/>
  <path d="M31 6v46M33 6v46" stroke="#f5e6c8" stroke-width=".6"/></g></svg>`

export const stickers = [
  // hero
  { label: 'straight men', art: '🍺', id: 'CdxvG8AVxTI', vertical: true, where: 'hero', x: 14, y: 56, r: -10, c: 'butter' },
  { label: 'avoidants', art: '👻', id: 'TsyMXroqFiw', where: 'hero', x: 87, y: 50, r: -6, c: 'lilac' },
  { label: 'goths', art: '🦇', id: 'e7LCg8-MjzI', vertical: true, where: 'hero', x: 50, y: 82, r: 6, c: 'white' },
  { label: 'centrist dads', art: ACOUSTIC_GUITAR, id: 'im3gqUQ1k1g', where: 'hero', x: 84, y: 84, r: 8, c: 'pink' },
  { label: 'tech bros', art: '💻', id: '9OfrpH4dTnY', where: 'hero', x: 25, y: 3, r: 9, c: 'butter' },
  { label: 'corporate girlies', art: '📈', id: 'GgMot4KPQ-o', where: 'hero', x: 1.5, y: 49, r: -7, c: 'white' },
  // around the page
  { label: 'introverts', art: '🎧', id: 'psbCjizBNr8', where: 'about', x: 46, y: 3, r: -8, c: 'lilac' },
  { label: 'therapy culture', art: '🛋️', id: 'qFpQPNQcbbc', where: 'about', x: 90, y: 62, r: 7, c: 'butter' },
  { label: 'run clubs', art: '🏃', id: 'YAgIvD_nKfw', where: 'videos', x: 7, y: 2, r: -9, c: 'butter' },
  { label: 'men holding flowers', art: '💐', id: 'a7YsB7Bj6Go', where: 'book', x: 4, y: 8, r: 6, c: 'white' },
  { label: 'reading on the tube', art: '📖', id: 'vN6ufdjsVCQ', where: 'videos', x: 88, y: 4, r: -5, c: 'lilac' },
  { label: 'short kings', art: '👑', id: 'hyfdVDAiFlo', where: 'essays', x: 8, y: 4, r: 8, c: 'pink' },
  { label: 'gen x', art: '📼', id: '8nFofXyjdfc', where: 'essays', x: 87, y: 6, r: -7, c: 'butter' },
]

// Frankie's music on SoundCloud (soundcloud.com/frankiemcnmaramusic), most played first
const sc = (slug, title, year, art) => ({ title, year, url: `https://soundcloud.com/frankiemcnmaramusic/${slug}`, art: `https://i1.sndcdn.com/${art}-t500x500.jpg` })
export const tracks = [
  sc('whitewash', 'Whitewash', 2019, 'artworks-000499882395-yuiqht'),
  sc('drain-bamage', 'Drain bamage', 2018, 'artworks-000280361723-0cigbz'),
  sc('depresso', 'Depresso', 2018, 'artworks-000417947874-gfhr0p'),
  sc('unsettled-static', 'Unsettled static', 2019, 'artworks-000470608350-qqajnu'),
  sc('spectre', 'Spectre', 2018, 'artworks-000433822683-fpe1jr'),
  sc('gaunt', 'Gaunt', 2019, 'artworks-000514594434-18sfln'),
  sc('melatone-3', 'Melatone', 2018, 'artworks-000390572388-qn4bnc'),
  sc('set-it-out', 'Set it out', 2018, 'artworks-000362766561-94u8a7'),
  sc('sparkle-1', 'Sparkle', 2019, 'artworks-000496945707-tg0o44'),
  sc('these-four-walls', 'Four Walls', 2017, 'artworks-000280360043-dtgaqa'),
  sc('fools', 'Fools', 2019, 'artworks-000502884564-5phyji'),
  sc('my-song-17', 'Winter blue', 2019, 'artworks-000468839043-zdufag'),
  sc('pollyanna-parasite', 'Pollyanna parasite', 2018, 'artworks-000284886911-gmunhy'),
  sc('post-traumatic-strings', 'Post-traumatic strings', 2018, 'artworks-000282324488-d7jj09'),
]
