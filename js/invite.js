(function() {
  "use strict";
  var CONFIG = {
    "meta": {
        "version": "1.1",
        "private": false,
        "simpleMode": false,
        "showSimpleModeToggle": true,
        "countdown": true
    },
    "sections": {
        "hero": true,
        "eventDetails": true,
        "schedule-section": true,
        "quotes-section": true,
        "location-section": true,
        "design-section": true,
        "music-section": true,
        "rsvp": false,
        "footer": true
    },
    "quotes": [
        {
            "text": "Grow old along with me! The best is yet to be..",
            "author": "Robert Browning"
        }
    ],
    "social": {
        "instagram": "https://www.instagram.com/udit_seven/"
    },
    "event": {
        "title": "Udit weds Jagriti",
        "subtitle": "Two Hearts, One Journey, Infinite Blessings",
        "description": "With the infinite blessings of Lord Shiva, we cordially invite you to grace the auspicious occasion of our wedding and bless the bride and groom."
    },
    "datetime": {
        "date": "2026-12-03",
        "startTime": "06:00 PM",
        "endTime": "",
        "timezone": "local",
        "allDay": false
    },
    "location": {
        "name": "Bari Maidan Clubhouse",
        "address": "Gandak Road, Sakchi",
        "mapsLink": "https://maps.app.goo.gl/zE3unFEuXVQGDQE19"
    },
    "schedule": [],
    "rsvp": {
        "enabled": false,
        "url": ""
    },
    "calendar": {
        "enabled": true,
        "providers": {
            "google": true
        }
    },
    "design": {
        "theme": "light",
        "accentColor": "#6366f1",
        "heroImages": [
            "https://lh3.googleusercontent.com/pw/AP1GczOAWBFfxhI5ZioQdjKh11fwCFwt6eCjBoe6hKXhKjaqvVsNZxgDl8r1_es1qrzLe9jYMOQqh9lHofszfdSX-VbJjhmrUbJwL6XWb4POYJxEwrS2r9YVzAUByAiY9Q6UHiXLFDE8EkXJOMulw-sWg1JY=w651-h869-s-no-gm?authuser=0"
        ],
        "sectionBackgrounds": [
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F053%2F808%2F762%2Fsmall_2x%2Fwedding-party-decoration-scene-background-free-photo.jpeg&f=1&nofb=1&ipt=af392c7a7c1d3515ae11ce9705286aee834e87c7aac963eb4d28ae5f3bf3dd2b&ipo=images"
        ]
    },
    "music": {
        "enabled": true,
        "loop": true,
        "volume": 0.3,
        "audioUrl": "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf756.mp3?filename=romantic-acoustic-guitar-112142.mp3](https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf756.mp3?filename=romantic-acoustic-guitar-112142.mp3"
    },
    "footer": {
        "text": "Your presence and blessings mean the world to us as we begin this new chapter of our lives. We look forward to celebrating together!",
        "credits": {
            "designByLabel": "Created & Designed by",
            "copyrightYear": "2026",
            "authorName": "Udit & Jagriti"
        }
    }
};
  var ev = CONFIG.event || {};
  var dt = CONFIG.datetime || {};
  var loc = CONFIG.location || {};
  var sched = CONFIG.schedule || [];
  var rsvp = CONFIG.rsvp || {};
  var design = CONFIG.design || {};
  var music = CONFIG.music || {};
  var footer = CONFIG.footer || {};
  var meta = CONFIG.meta || {};
  var sections = CONFIG.sections || {};
  var quotes = CONFIG.quotes || [];
  var social = CONFIG.social || {};
  function st(id, val) { var el = document.getElementById(id); if (el) el.textContent = val || ""; }
  function sh(id) { var el = document.getElementById(id); if (el) el.hidden = false; }
  function hi(id) { var el = document.getElementById(id); if (el) el.hidden = true; }
  function rm(id) { var el = document.getElementById(id); if (el) el.remove(); }
  function showSec(id, def) { if (sections[id] === false || (sections[id] === undefined && def === false)) rm(id); }
  st("event-title", ev.title);
  st("event-subtitle", ev.subtitle);
  st("event-description", ev.description);
  st("event-date", dt.date);
  st("event-time", [dt.startTime, dt.endTime].filter(Boolean).join(" - "));
  st("venue-name", loc.name);
  st("venue-address", loc.address);
  if (loc.mapsLink) { var ml = document.getElementById("maps-link"); if (ml) ml.href = loc.mapsLink; }
  showSec("schedule-section", sched.length > 0);
  showSec("quotes-section", false);
  if (sections.eventDetails === false) { var ed = document.querySelector(".event-details"); if (ed) ed.remove(); }
  if (sections["location-section"] === false) { var la = document.querySelector(".location"); if (la) la.remove(); }
  if (sections["design-section"] === false) { var si = document.getElementById("simple-mode-toggle"); if (si) si.remove(); }
  if (sections["music-section"] === false) { var ac = document.getElementById("audio-control"); if (ac) ac.remove(); }
  if (sections.footer === false) { var ft = document.querySelector("footer"); if (ft) ft.remove(); }
  if (sections.rsvp === false) { rm("rsvp"); }
  if (sched.length) { sh("schedule-section"); var sl = document.getElementById("schedule-list"); if (sl) { sched.forEach(function(it) { var li = document.createElement("li"); li.innerHTML = "<span>" + (it.time || "") + "</span><span>" + (it.label || "") + "</span>"; sl.appendChild(li); }); } }
  var qc = document.getElementById("quotes-container");
  if (quotes.length && qc) { sh("quotes-section"); quotes.forEach(function(q) { if (!q.text) return; var d = document.createElement("div"); d.className = "quote-item"; var pt = document.createElement("p"); pt.className = "quote-text"; pt.textContent = q.text; d.appendChild(pt); if (q.author) { var pa = document.createElement("p"); pa.className = "quote-author"; pa.textContent = q.author; d.appendChild(pa); } qc.appendChild(d); }); }
  if (rsvp.enabled && rsvp.url) { var emb = document.querySelector(".form-embed"); if (emb) { var ifr = document.createElement("iframe"); ifr.src = rsvp.url; ifr.style.width = "100%"; ifr.style.border = "none"; ifr.style.minHeight = "400px"; emb.appendChild(ifr); } } else { if (sections.rsvp !== false) rm("rsvp"); }
  if (meta.countdown && dt.date) { sh("countdown"); var ed = new Date(dt.date + "T" + (dt.startTime || "00:00:00")); if (!isNaN(ed.getTime())) { setInterval(function() { var now = new Date(); var diff = ed - now; if (diff <= 0) { hi("countdown"); return; } st("cd-days", Math.floor(diff / 86400000)); st("cd-hours", String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0")); st("cd-minutes", String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0")); st("cd-seconds", String(Math.floor((diff % 60000) / 1000)).padStart(2, "0")); }, 1000); } }
  if (dt.date) { sh("calendar-actions"); var cl = document.getElementById("google-calendar-link"); if (cl) { var sd = dt.date.replace(/-/g, ""); var ed2 = sd; var stt = (dt.startTime || "00:00").replace(/ /g, "").replace(":", ""); var ett = (dt.endTime || dt.startTime || "00:00").replace(/ /g, "").replace(":", ""); cl.href = "https://www.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title || "") + "&dates=" + sd + "T" + stt + "00/" + ed2 + "T" + ett + "00&details=" + encodeURIComponent(ev.description || "") + "&location=" + encodeURIComponent((loc.name || "") + ", " + (loc.address || "")); } }
  if (music.enabled && music.audioUrl) { sh("audio-control"); var ae = new Audio(music.audioUrl); ae.loop = music.loop !== false; ae.volume = music.volume || 0.3; var playing = false; document.getElementById("audio-control").addEventListener("click", function() { if (playing) { ae.pause(); } else { ae.play(); } playing = !playing; }); }
  if (social.instagram) { sh("social-links"); var ig = document.getElementById("instagram-link"); if (ig) { ig.href = social.instagram; var lbl = document.getElementById("instagram-label"); if (lbl) { lbl.textContent = social.instagram.replace(/https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "") || "Follow on Instagram"; } } }
  st("footer-text", footer.text);
  if (footer.branding) { var logo = document.getElementById("footer-logo"); if (logo && footer.branding.logoUrl) { logo.src = footer.branding.logoUrl; logo.alt = footer.branding.logoAlt || "Logo"; } var bl = document.getElementById("footer-branding-link"); if (bl && footer.branding.link) { bl.href = footer.branding.link; } }
  if (footer.credits) { st("footer-credits-label", footer.credits.designByLabel ? footer.credits.designByLabel + " " + footer.credits.authorName : ""); st("footer-copyright", "© " + (footer.credits.copyrightYear || new Date().getFullYear())); st("footer-template-label", footer.credits.templateLabel); var tl = document.getElementById("footer-template-link"); if (tl) { tl.textContent = footer.credits.templateAuthor || ""; tl.href = footer.credits.templateLink || "#"; } var rl = document.getElementById("footer-repo-link"); if (rl) { rl.textContent = footer.credits.repoLabel || ""; rl.href = footer.credits.repoLink || "#"; } if (footer.credits.repoLink) sh("footer-repo-container"); }
  var simpleToggle = document.getElementById("simple-mode-toggle");
  if (simpleToggle && meta.showSimpleModeToggle !== false) { simpleToggle.hidden = false; simpleToggle.addEventListener("click", function() { document.body.classList.toggle("simple"); }); }
  var images = design.heroImages || [];
  if (images.length) { var hero = document.querySelector(".hero"); if (hero) { var sw = document.createElement("div"); sw.className = "hero-slideshow"; images.forEach(function(url, i) { var slide = document.createElement("div"); slide.className = "hero-slide" + (i === 0 ? " active" : ""); slide.style.backgroundImage = "url(" + url + ")"; sw.appendChild(slide); }); hero.insertBefore(sw, hero.firstChild); if (images.length > 1) { var idx = 0; setInterval(function() { var slides = sw.querySelectorAll(".hero-slide"); slides[idx].classList.remove("active"); idx = (idx + 1) % slides.length; slides[idx].classList.add("active"); }, 5000); } } }
})();
