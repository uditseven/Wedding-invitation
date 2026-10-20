(function() {
  "use strict";

  function initApp(CONFIG) {
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

    if (sched.length) { 
      sh("schedule-section"); 
      var sl = document.getElementById("schedule-list"); 
      if (sl) { 
        sl.innerHTML = "";
        sched.forEach(function(it) { 
          var li = document.createElement("li"); 
          var dateBadge = it.date ? '<span class="schedule-date" style="display:block; font-size:0.85em; opacity:0.8; margin-bottom:0.2rem;">' + it.date + '</span>' : '';
          li.innerHTML = '<div class="schedule-time-box">' + dateBadge + '<span><strong>' + (it.time || "") + '</strong></span></div><div class="schedule-label-box"><span>' + (it.label || "") + '</span></div>'; 
          sl.appendChild(li); 
        }); 
      } 
    }

    var qc = document.getElementById("quotes-container");
    if (quotes.length && qc) { 
      sh("quotes-section"); 
      quotes.forEach(function(q) { 
        if (!q.text) return; 
        var d = document.createElement("div"); 
        d.className = "quote-item"; 
        var pt = document.createElement("p"); 
        pt.className = "quote-text"; 
        pt.textContent = q.text; 
        d.appendChild(pt); 
        if (q.author) { 
          var pa = document.createElement("p"); 
          pa.className = "quote-author"; 
          pa.textContent = q.author; 
          d.appendChild(pa); 
        } 
        qc.appendChild(d); 
      }); 
    }

    if (meta.countdown && dt.date) { 
      sh("countdown"); 
      var targetDate = new Date(dt.date + "T" + (dt.startTime || "00:00:00")); 
      if (!isNaN(targetDate.getTime())) { 
        setInterval(function() { 
          var now = new Date(); 
          var diff = targetDate - now; 
          if (diff <= 0) { hi("countdown"); return; } 
          st("cd-days", Math.floor(diff / 86400000)); 
          st("cd-hours", String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0")); 
          st("cd-minutes", String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0")); 
          st("cd-seconds", String(Math.floor((diff % 60000) / 1000)).padStart(2, "0")); 
        }, 1000); 
      } 
    }

    if (dt.date) { 
      sh("calendar-actions"); 
      var cl = document.getElementById("google-calendar-link"); 
      if (cl) { 
        var sd = dt.date.replace(/-/g, ""); 
        var ed2 = sd; 
        var stt = (dt.startTime || "00:00").replace(/ /g, "").replace(":", ""); 
        var ett = (dt.endTime || dt.startTime || "00:00").replace(/ /g, "").replace(":", ""); 
        cl.href = "https://www.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title || "") + "&dates=" + sd + "T" + stt + "00/" + ed2 + "T" + ett + "00&details=" + encodeURIComponent(ev.description || "") + "&location=" + encodeURIComponent((loc.name || "") + ", " + (loc.address || "")); 
      } 
    }

    if (music.enabled && music.audioUrl) { 
      sh("audio-control"); 
      var ae = new Audio(music.audioUrl); 
      ae.loop = music.loop !== false; 
      ae.volume = music.volume || 0.3; 
      var playing = false; 
      var btn = document.getElementById("audio-control");
      
      btn.addEventListener("click", function() { 
        if (playing) { 
          ae.pause(); 
          playing = false;
          btn.style.opacity = "0.6";
        } else { 
          ae.play().then(function() {
            playing = true;
            btn.style.opacity = "1";
          }).catch(function(error) {
            console.log("Audio playback blocked:", error);
          }); 
        } 
      }); 
    }

    if (social.instagram) { 
      sh("social-links"); 
      var ig = document.getElementById("instagram-link"); 
      if (ig) { 
        ig.href = social.instagram; 
        var lbl = document.getElementById("instagram-label"); 
        if (lbl) { 
          lbl.textContent = social.instagram.replace(/https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "") || "Follow on Instagram"; 
        } 
      } 
    }

    st("footer-text", footer.text);

    if (footer.credits) { 
      st("footer-credits-label", footer.credits.designByLabel ? footer.credits.designByLabel + " " + footer.credits.authorName : ""); 
      st("footer-copyright", "© " + (footer.credits.copyrightYear || new Date().getFullYear())); 
      
      if (footer.credits.templateAuthor || footer.credits.templateLabel) {
        sh("footer-template-container");
        st("footer-template-label", footer.credits.templateLabel); 
        var tl = document.getElementById("footer-template-link"); 
        if (tl) { 
          tl.textContent = footer.credits.templateAuthor || ""; 
          tl.href = footer.credits.templateLink || "#"; 
        }
      }
    }

    var simpleToggle = document.getElementById("simple-mode-toggle");
    if (simpleToggle && meta.showSimpleModeToggle !== false) { 
      simpleToggle.hidden = false; 
      simpleToggle.addEventListener("click", function() { 
        document.body.classList.toggle("simple"); 
      }); 
    }

    var images = design.heroImages || [];
    if (images.length) { 
      var hero = document.querySelector(".hero"); 
      if (hero) { 
        var sw = document.createElement("div"); 
        sw.className = "hero-slideshow"; 
        images.forEach(function(url, i) { 
          var slide = document.createElement("div"); 
          slide.className = "hero-slide" + (i === 0 ? " active" : ""); 
          slide.style.backgroundImage = "url(" + url + ")"; 
          sw.appendChild(slide); 
        }); 
        hero.insertBefore(sw, hero.firstChild); 
        if (images.length > 1) { 
          var idx = 0; 
          setInterval(function() { 
            var slides = sw.querySelectorAll(".hero-slide"); 
            slides[idx].classList.remove("active"); 
            idx = (idx + 1) % slides.length; 
            slides[idx].classList.add("active"); 
          }, 5000); 
        } 
      } 
    }
  }

  // Fetch JSON config properly
  fetch("data/event.json")
    .then(function(res) { return res.json(); })
    .then(function(data) { initApp(data); })
    .catch(function(err) { console.error("Could not load event.json config:", err); });
})();
