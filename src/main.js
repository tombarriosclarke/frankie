import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { animate, inView, stagger, hover, press } from 'motion'
import { bio, book, essays, quickLinks, shorts, spiritTips, videos } from './data.js'

gsap.registerPlugin(Draggable, ScrollTrigger)
try { gsap.registerPlugin(InertiaPlugin) } catch { /* inertia is a Club plugin in some builds; fine without it */ }

const $ = (s, el = document) => el.querySelector(s)
const $$ = (s, el = document) => [...el.querySelectorAll(s)]
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches
const rand = (a, b) => a + Math.random() * (b - a)

/* ---------------- sound (off by default, XP-style bloops via WebAudio) ---------------- */
let soundOn = false
let ctx
function bloop(freq = 660, dur = 0.08, type = 'square') {
  if (!soundOn) return
  try {
    ctx ||= new (window.AudioContext || window.webkitAudioContext)()
    const o = ctx.createOscillator(); const g = ctx.createGain()
    o.type = type; o.frequency.value = freq
    g.gain.setValueAtTime(0.06, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur)
    o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + dur)
  } catch { /* no audio, no bother */ }
}
function startupChime() { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => bloop(f, 0.18, 'triangle'), i * 110)) }
$('#sound-btn').addEventListener('click', e => {
  soundOn = !soundOn
  e.currentTarget.textContent = soundOn ? '🔊' : '🔇'
  e.currentTarget.setAttribute('aria-pressed', String(soundOn))
  if (soundOn) startupChime()
})

/* ---------------- split text ---------------- */
function splitChars(el) {
  if (el.dataset.splitDone) return $$('.char', el)
  const text = el.textContent
  el.textContent = ''
  const frag = document.createDocumentFragment()
  for (const ch of text) {
    const s = document.createElement('span'); s.className = 'char'; s.textContent = ch; frag.appendChild(s)
  }
  el.appendChild(frag); el.dataset.splitDone = '1'
  return $$('.char', el)
}

/* ---------------- content fill ---------------- */
function fill() {
  $('#year').textContent = new Date().getFullYear()
  $('#bio-short').textContent = bio.short
  $('#quick-links').innerHTML = quickLinks.map((l, i) => `
    <a class="ql${l.wide ? ' wide' : ''}${l.face ? ' face' : ''}" href="${l.url}" ${l.internal ? '' : 'target="_blank" rel="noopener"'} style="--r:${(i % 2 ? 1 : -1) * rand(0.6, 2.2)}deg" data-tilt>
      <i class="tape"></i>
      <span class="ql-img"><img src="${l.img}" alt="" loading="lazy" ${l.fallback ? `onerror="this.onerror=null;this.src='${l.fallback}'"` : ''} /></span>
      <span class="ql-type pixel">${l.type}</span>
      <span class="ql-title">${l.title}</span>
      <span class="ql-go" aria-hidden="true">↗</span>
    </a>`).join('')
  $('#book-blurb').textContent = book.blurb
  $('#book-meta').innerHTML = [
    ['publisher', book.publisher], ['pages', book.pages], ['isbn', book.isbn], ['subtitle', book.subtitle],
  ].map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')

  // ticker: Frankie's face on repeat (three identical sets so the -33.333% loop is seamless)
  $('#marquee-track').innerHTML = Array.from({ length: 3 * 14 }, (_, i) => `<img src="/assets/frankie-face.png" alt="" style="--r:${i % 2 ? 8 : -8}deg" />`).join('')

  $('#video-grid').innerHTML = videos.map((v, i) => `
    <button class="vid" type="button" data-id="${v.id}" data-title="${v.title.replace(/"/g, '&quot;')}" style="--r:${(i % 2 ? 1 : -1) * rand(0.5, 2)}deg">
      <div class="xp-window">
        <div class="xp-titlebar"><span>Frankie Media Player</span><span class="xp-btns"><i></i><i></i><i class="close"></i></span></div>
        <div class="thumb"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" /><span class="play">▶</span></div>
        <div class="title">${v.title}</div>
        <div class="meta"><span>${v.date}</span><span>${v.views} views</span></div>
      </div>
    </button>`).join('')

  $('#shorts-rail').innerHTML = shorts.map((s, i) => `
    <button class="short" type="button" data-id="${s.id}" data-vertical="1" data-title="${s.title.replace(/"/g, '&quot;')}" style="--r:${(i % 2 ? 1 : -1) * rand(1, 4)}deg">
      <i class="tape"></i><img src="https://i.ytimg.com/vi/${s.id}/oardefault.jpg" data-id="${s.id}" alt="" loading="lazy" />
      <span>${s.title}</span><b>${s.views}</b>
    </button>`).join('')


  $('#essay-stack').innerHTML = essays.map((e, i) => `
    <a class="essay" href="${e.url}" target="_blank" rel="noopener" style="--r:${(i % 2 ? 1 : -1) * rand(0.2, 1)}deg">
      <span class="date">${e.date}</span><div><h3>${e.title}</h3><p>${e.sub}</p></div><span class="arrow">↗</span>
    </a>`).join('')
}

/* shorts thumbnails: YouTube serves a grey 120px placeholder when the portrait
   thumbnail is missing, so step down to the landscape one, then to Frankie's face */
const FACE = '/assets/frankie-face.png'
function shortThumbFallbacks() {
  $$('#shorts-rail img[data-id]').forEach(img => {
    const step = () => {
      if (img.src.includes('oardefault')) img.src = `https://i.ytimg.com/vi/${img.dataset.id}/hqdefault.jpg`
      else if (!img.src.endsWith(FACE)) { img.src = FACE; img.classList.add('face') }
    }
    const check = () => { if (img.naturalWidth && img.naturalWidth <= 120) step() }
    img.addEventListener('load', check)
    img.addEventListener('error', step)
    if (img.complete) check()
  })
}

/* ---------------- loader ---------------- */
function runLoader() {
  const loader = $('#loader'), bar = $('#loader-bar'), text = $('#loader-text'), cutout = $('#spin-cutout')
  const lines = ['Loading…', 'Loading the yup bros…', 'Nearly there…', 'Ready.']
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
  if (!reduced) {
    gsap.to(cutout, { rotationY: 360, duration: 1.4, repeat: -1, ease: 'none', transformPerspective: 600 })
    gsap.to($('.spin-ring'), { rotation: 360, duration: 6, repeat: -1, ease: 'none' })
    $$('.spin-sticker').forEach((s, i) => gsap.to(s, { y: -10, rotation: i % 2 ? 15 : -15, duration: 0.8 + i * 0.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
  }
  const steps = [12, 38, 61, 87, 100]
  steps.forEach((p, i) => {
    tl.to(bar, { width: `${p}%`, duration: 0.35 + Math.random() * 0.3 }, i * 0.45)
    tl.call(() => { text.textContent = lines[i] }, null, i * 0.45)
  })
  tl.to(loader, { yPercent: -100, duration: 0.7, ease: 'expo.inOut', delay: 0.25 })
  tl.set(loader, { display: 'none' })
  tl.call(heroIn, null, '-=0.3')
  if (reduced) { tl.timeScale(4) }
  return tl
}

/* ---------------- hero entrance ---------------- */
function heroIn() {
  const chars = $$('#hero .logo .line').flatMap(splitChars)
  if (reduced) return
  gsap.from(chars, { y: 60, rotation: () => rand(-20, 20), opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: { each: 0.025, from: 'random' } })
  gsap.from('#hero .logo .oval', { scale: 0.2, opacity: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)', delay: 0.3 })
  gsap.from('#hero .cover-sub, #hero .cover-cta, #hero .cover-kicker', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.5 })
  gsap.from('#hero .drag', { scale: 0, rotation: () => rand(-40, 40), opacity: 0, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.08, delay: 0.4, clearProps: 'scale,opacity' })
  gsap.from('.desk-icon', { x: -40, opacity: 0, duration: 0.5, stagger: 0.06, delay: 0.6 })
  gsap.to('.hearts span', { y: () => rand(-18, 18), x: () => rand(-10, 10), rotation: () => rand(-15, 15), duration: () => rand(2, 4), yoyo: true, repeat: -1, ease: 'sine.inOut' })
  countUp()
}

function countUp() {
  $$('[data-count]').forEach(el => {
    const target = +el.dataset.count
    gsap.fromTo(el, { innerText: 0 }, { innerText: target, duration: 1.6, ease: 'power3.out', snap: { innerText: 1 }, delay: 0.8 })
  })
}

/* ---------------- draggable windows / polaroids ---------------- */
const taskItems = $('#task-items')
function makeDraggables() {
  if (isTouch && innerWidth < 700) return
  $$('.drag').forEach(el => {
    const title = $('.xp-titlebar span', el)?.textContent || $('span', el)?.textContent || 'thing'
    Draggable.create(el, {
      type: 'x,y', bounds: '#hero', edgeResistance: 0.7,
      trigger: $('.handle', el) || el,
      inertia: !!gsap.plugins?.inertia,
      onPress() { bringToFront(el); bloop(440, 0.05); el.classList.add('dragging') },
      onRelease() { el.classList.remove('dragging'); bloop(330, 0.05) },
    })
    // close buttons minimise to taskbar
    $('.close', el)?.addEventListener('click', e => {
      e.stopPropagation()
      bloop(220, 0.1)
      gsap.to(el, { scale: 0.1, opacity: 0, y: 300, duration: 0.35, ease: 'power2.in', onComplete: () => { el.style.visibility = 'hidden' } })
      const b = document.createElement('button')
      b.textContent = `▣ ${title}`
      b.addEventListener('click', () => {
        b.remove(); el.style.visibility = ''
        gsap.to(el, { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)' })
        bloop(660, 0.08)
      })
      taskItems.appendChild(b)
    })
  })
}
let z = 10
function bringToFront(el) { el.style.zIndex = ++z }

/* ---------------- shorts rail drag ---------------- */
function makeRail() {
  const rail = $('#shorts-rail'), wrap = $('.shorts-rail-wrap')
  const setBounds = () => ({ minX: Math.min(0, wrap.clientWidth - rail.scrollWidth), maxX: 0 })
  const d = Draggable.create(rail, { type: 'x', bounds: setBounds(), edgeResistance: 0.8, inertia: !!gsap.plugins?.inertia, dragClickables: true,
    onPress() { bloop(500, 0.03) } })[0]
  addEventListener('resize', () => d.applyBounds(setBounds()))
  // ambient drift until user touches it
  if (!reduced) {
    const drift = gsap.to(rail, { x: () => setBounds().minX, duration: 60, ease: 'none', repeat: -1, yoyo: true })
    wrap.addEventListener('pointerdown', () => drift.kill(), { once: true })
  }
}

/* ---------------- modal player ---------------- */
function makeModal() {
  const modal = $('#modal'), frame = $('#modal-frame'), title = $('#modal-title')
  const open = (id, t, vertical) => {
    title.textContent = `${t} - Frankie Media Player`
    frame.classList.toggle('vertical', !!vertical)
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${t}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
    modal.hidden = false
    bloop(880, 0.1)
    gsap.fromTo('.modal-window', { scale: 0.6, rotation: -4, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' })
  }
  const close = () => {
    gsap.to('.modal-window', { scale: 0.7, opacity: 0, duration: 0.25, onComplete: () => { modal.hidden = true; frame.innerHTML = '' } })
    bloop(300, 0.1)
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('.vid, .short')
    if (b) open(b.dataset.id, b.dataset.title, b.dataset.vertical)
  })
  $('#modal-close').addEventListener('click', close)
  modal.addEventListener('click', e => { if (e.target === modal) close() })
  addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close() })
}

/* ---------------- scroll reveals (Motion inView) + GSAP scroll ---------------- */
function scrollStuff() {
  // headline chars pop in
  $$('section [data-split], footer [data-split]').forEach(el => {
    const chars = splitChars(el)
    if (reduced) return
    inView(el, () => {
      animate(chars, { y: [40, 0], rotate: [() => rand(-12, 12), 0], opacity: [0, 1] }, { delay: stagger(0.03, { from: 'first' }), duration: 0.5, type: 'spring', bounce: 0.45 })
    }, { amount: 0.4 })
  })
  // cards slide in
  if (!reduced) {
    $$('.vid, .essay, .ql, .polaroid.tilt, .quote-card').forEach((el, i) => {
      inView(el, () => {
        animate(el, { opacity: [0, 1], y: [40, 0], scale: [0.9, 1] }, { duration: 0.5, delay: (i % 6) * 0.05, type: 'spring', bounce: 0.3 })
      }, { amount: 0.2 })
    })
  }
  // hero parallax out
  if (!reduced) {
    gsap.to('#hero .cover', { yPercent: 30, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to('#hero .hearts', { yPercent: -40, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } })
    gsap.to('.marquee-track', { xPercent: -33.333, duration: 30, ease: 'none', repeat: -1 })
    // book rotates on scroll
    gsap.fromTo('#book-3d', { rotationY: -60, rotationX: 8 }, { rotationY: 10, rotationX: 2, ease: 'none', scrollTrigger: { trigger: '#book', start: 'top bottom', end: 'bottom top', scrub: 1 } })
  }
}

/* ---------------- tilt + hover micro-interactions (Motion) ---------------- */
function microInteractions() {
  if (isTouch) return
  $$('[data-tilt]').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5
      animate(el, { rotateX: -dy * 14, rotateY: dx * 14, scale: 1.04 }, { duration: 0.2 })
    })
    el.addEventListener('pointerleave', () => animate(el, { rotateX: 0, rotateY: 0, scale: 1 }, { duration: 0.4, type: 'spring' }))
  })
  hover('.btn, .desk-icon, .chip', el => {
    animate(el, { rotate: rand(-3, 3) }, { duration: 0.15 })
    bloop(1200, 0.02, 'sine')
    return () => animate(el, { rotate: 0 }, { duration: 0.3, type: 'spring' })
  })
  press('.btn, .desk-icon, #start-btn, .vid, .short', el => {
    animate(el, { scale: 0.94 }, { duration: 0.1 })
    return () => animate(el, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 12 })
  })
  const book = $('#book-3d-wrap')
  book?.addEventListener('pointermove', e => {
    const r = book.getBoundingClientRect(); const dx = (e.clientX - r.left) / r.width - 0.5
    gsap.to('#book-3d', { rotationY: dx * 60, duration: 0.4, overwrite: 'auto' })
  })
}

/* ---------------- custom cursor + sticker trail ---------------- */
const DRAG_SEL = '.polaroid.drag, .chip.drag, .xp-titlebar.handle, .shorts-rail-wrap'
const LINK_SEL = 'a, button, .vid, .short, .spirit-face, .xp-btns i.close, [data-tilt]'
function cursorTrail() {
  if (isTouch) return
  const cur = $('#cursor'), trail = $('#trail')
  const stickers = ['💗', '★', '💿', '🌸', '🍀', '♡', '☆']
  const xTo = gsap.quickTo(cur, 'x', { duration: 0.08 }), yTo = gsap.quickTo(cur, 'y', { duration: 0.08 })
  let last = 0, pressing = false
  // grab hand only over things that can actually be dragged (and only while dragging is enabled)
  const canDrag = () => !(isTouch && innerWidth < 700)
  const setState = (target) => {
    if (pressing && cur.dataset.state === 'grabbing') return
    if (canDrag() && target.closest?.(DRAG_SEL) && !target.closest('.xp-btns')) cur.dataset.state = 'grab'
    else if (target.closest?.(LINK_SEL)) cur.dataset.state = 'link'
    else delete cur.dataset.state
  }
  addEventListener('pointerover', e => setState(e.target))
  addEventListener('pointerdown', e => { pressing = true; if (cur.dataset.state === 'grab') cur.dataset.state = 'grabbing' })
  addEventListener('pointerup', e => { pressing = false; if (cur.dataset.state === 'grabbing') delete cur.dataset.state; setState(e.target) })
  addEventListener('pointermove', e => {
    xTo(e.clientX); yTo(e.clientY)
    const now = performance.now()
    if (now - last < 70 || reduced) return
    last = now
    const s = document.createElement('span')
    s.textContent = stickers[(Math.random() * stickers.length) | 0]
    // anchor with left/top: Motion owns transform for x/y/rotate/scale, so an inline translate would be overwritten
    s.style.left = `${e.clientX}px`
    s.style.top = `${e.clientY}px`
    trail.appendChild(s)
    animate(s, { x: [0, rand(-40, 40)], y: [0, rand(20, 80)], rotate: [0, rand(-180, 180)], opacity: [1, 0], scale: [1, 0.3] }, { duration: 0.9, ease: 'easeOut' }).then(() => s.remove())
  })
  document.addEventListener('mouseleave', () => gsap.to(cur, { opacity: 0 }))
  document.addEventListener('mouseenter', () => gsap.to(cur, { opacity: 1 }))
}

/* ---------------- spirit guide (clippy) ---------------- */
function spiritGuide() {
  const el = $('#spirit'), bubble = $('.spirit-bubble'), text = $('#spirit-text'), face = $('.spirit-face')
  let i = 0, hidden = false, timer
  const say = (t) => {
    text.textContent = t
    bubble.hidden = false
    animate(bubble, { scale: [0.5, 1], opacity: [0, 1], rotate: [-6, 0] }, { type: 'spring', bounce: 0.5, duration: 0.6 })
    animate(face, { rotate: [0, -10, 10, 0] }, { duration: 0.5 })
    bloop(1000, 0.06, 'triangle')
  }
  const next = () => { say(spiritTips[i++ % spiritTips.length]) }
  gsap.from(face, { y: 120, duration: 0.8, ease: 'back.out(1.5)', delay: 3 })
  bubble.hidden = true
  timer = setTimeout(() => { if (!hidden) next() }, 4500)
  // on small screens the bubble auto-tucks away so it never sits on content
  if (isTouch || innerWidth < 700) setInterval(() => { if (!bubble.hidden) animate(bubble, { scale: 0.5, opacity: 0 }, { duration: 0.2 }).then(() => { bubble.hidden = true }) }, 7000)
  face.addEventListener('click', () => { hidden = false; next() })
  $('#spirit-close').addEventListener('click', () => {
    hidden = true; clearTimeout(timer)
    animate(bubble, { scale: 0.5, opacity: 0 }, { duration: 0.2 }).then(() => { bubble.hidden = true })
  })
  setInterval(() => { if (!hidden && document.visibilityState === 'visible' && Math.random() < 0.5) next() }, 22000)
}

/* ---------------- start menu, bin, shutdown, clock ---------------- */
function desktopChrome() {
  const btn = $('#start-btn'), menu = $('#start-menu')
  const toggle = (open) => {
    const o = open ?? menu.hidden
    btn.setAttribute('aria-expanded', String(o))
    if (o) { menu.hidden = false; animate(menu, { scaleY: [0.2, 1], opacity: [0, 1] }, { duration: 0.2 }); bloop(700, 0.05) }
    else { animate(menu, { opacity: 0, scaleY: 0.5 }, { duration: 0.15 }).then(() => { menu.hidden = true }) }
  }
  btn.addEventListener('click', () => toggle())
  document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) toggle(false) })
  menu.addEventListener('click', e => { if (e.target.closest('a')) toggle(false) })
  $('#shutdown').addEventListener('click', () => {
    toggle(false); bloop(200, 0.3, 'sawtooth')
    const loader = $('#loader')
    gsap.set(loader, { display: 'grid', yPercent: 100 })
    gsap.to(loader, { yPercent: 0, duration: 0.5, ease: 'expo.inOut', onComplete: () => location.reload() })
  })
  $('#bin-btn').addEventListener('click', () => {
    bloop(150, 0.2)
    const hidden = $$('#hero .drag').filter(d => d.style.visibility === 'hidden')
    if (!hidden.length) { gsap.fromTo('#bin-btn .ico', { rotation: 0 }, { rotation: 360, duration: 0.6, ease: 'back.out(2)' }); return }
    $$('#task-items button').forEach(b => b.click())
  })
  const clock = $('#clock')
  const tick = () => { const d = new Date(); clock.textContent = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) }
  tick(); setInterval(tick, 10000)

  // quote card
  const q = $('#quote-card .q'), who = $('#quote-card .who')
  let qi = 0
  const showQ = () => { const it = bio.quotes[qi++ % bio.quotes.length]; q.textContent = `“${it.q}”`; who.textContent = it.who }
  showQ()
  $('#next-quote').addEventListener('click', () => {
    bloop(900, 0.05)
    animate('#quote-card', { rotate: [2, -3, 2], scale: [1, 1.05, 1] }, { duration: 0.35 })
    showQ()
  })

  // konami-ish: type "yup" anywhere → chaos mode
  let buf = ''
  addEventListener('keydown', e => {
    buf = (buf + e.key).slice(-3)
    if (buf === 'yup') { chaos() }
  })
}

function chaos() {
  bloop(100, 0.5, 'sawtooth')
  const all = $$('.polaroid, .chip, .xp-window.drag, .vid, .essay, .btn')
  gsap.to(all, { rotation: () => rand(-25, 25), x: () => rand(-30, 30), duration: 0.6, ease: 'elastic.out(1, 0.3)', stagger: 0.01 })
  $('#spirit-text').textContent = 'The yup bro who yups the loudest is the most frightened.'
  $('.spirit-bubble').hidden = false
}

/* ---------------- go ---------------- */
fill()
shortThumbFallbacks()
runLoader()
makeDraggables()
makeRail()
makeModal()
scrollStuff()
microInteractions()
cursorTrail()
spiritGuide()
desktopChrome()
