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
    if (sections["music-section"] === false) { var ac = document.getElementById("audio-control"); if (ac) ac.remove(); }
    if (sections.footer === false) { var ft = document.querySelector("footer"); if (ft) ft.remove(); }
    if (sections.rsvp === false) { rm("rsvp"); }

    if (sched.length) {
      sh("schedule-section");
      var container = document.getElementById("schedule-container");
      if (container) {
        container.innerHTML = "";
        sched.forEach(function(it) {
          var itemDiv = document.createElement("div");
          itemDiv.className = "schedule-item-card";
          if (it.bg) {
            itemDiv.style.backgroundImage = "url('" + it.bg + "')";
          }
          var locationHtml = it.location ? '<p class="schedule-location" style="margin-top:0.4rem; font-size:0.95rem; opacity:0.85;">📍 ' + it.location + '</p>' : '';
          itemDiv.innerHTML = '<div class="schedule-content">' +
                              '<span class="schedule-date-badge">' + (it.date || "") + '</span>' +
                              '<h3 class="schedule-title">' + (it.label || "") + '</h3>' +
                              '<p class="schedule-time">' + (it.time || "") + '</p>' +
                              locationHtml +
                              '</div>';
          container.appendChild(itemDiv);
        });
      }
    }

    if (meta.countdown) {
      sh("countdown");
      var targetDate = new Date("2026-11-30T16:00:00");

      setInterval(function() {
        var now = new Date();
        var diff = targetDate - now;
        if (diff <= 0) {
          hi("countdown");
          return;
        }
        st("cd-days", Math.floor(diff / 86400000));
        st("cd-hours", String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"));
        st("cd-minutes", String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"));
        st("cd-seconds", String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"));
      }, 1000);
    }

    if (dt.date) { 
      sh("calendar-actions"); 
      var cl = document.getElementById("google-calendar-link"); 
      if (cl) { 
        var sd = "20261130"; 
        var ed2 = sd; 
        var stt = (dt.startTime || "04:00").replace(/ /g, "").replace(":", ""); 
        var ett = (dt.endTime || dt.startTime || "04:00").replace(/ /g, "").replace(":", ""); 
        cl.href = "https://www.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title || "") + "&dates=" + sd + "T" + stt + "00/" + ed2 + "T" + ett + "00&details=" + encodeURIComponent(ev.description || "") + "&location=" + encodeURIComponent((loc.name || "") + ", " + (loc.address || "")); 
      } 
    }

    if (music.enabled && music.audioUrl) { 
      sh("audio-control"); 
      var ae = new Audio(music.audioUrl); 
      ae.loop = music.loop !== false; 
      ae.volume = music.volume || 0.3; 
      var playing = false; 
      var audioBtn = document.getElementById("audio-control");
      var overlay = document.getElementById("audio-overlay");
      var openBtn = document.getElementById("open-invite-btn");

      function unlockAudio(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }

        ae.play().then(function() {
          playing = true;
          audioBtn.style.opacity = "1";
        }).catch(function(err) {
          console.log("Audio autoplay restricted:", err);
        });

        if (overlay) {
          overlay.style.opacity = "0";
          setTimeout(function() { 
            overlay.remove(); 
          }, 500);
        }
      }

      if (openBtn) {
        openBtn.addEventListener("click", unlockAudio);
        openBtn.addEventListener("touchend", unlockAudio);
      }
      if (overlay) {
        overlay.addEventListener("click", unlockAudio);
      }

      audioBtn.addEventListener("click", function(e) { 
        e.stopPropagation();
        if (playing) { 
          ae.pause(); 
          playing = false;
          audioBtn.style.opacity = "0.5";
        } else { 
          ae.play().then(function() {
            playing = true;
            audioBtn.style.opacity = "1";
          }).catch(function(err) { console.log(err); }); 
        } 
      }); 
    } else {
      var ov = document.getElementById("audio-overlay");
      if (ov) ov.remove();
    }

    if (social.instagram) { 
      sh("social-links"); 
      var ig = document.getElementById("instagram-link"); 
      if (ig) { 
        ig.href = social.instagram; 
      } 
    }

    st("footer-text", footer.text);

    if (footer.credits) { 
      st("footer-credits-label", footer.credits.designByLabel ? footer.credits.designByLabel + " " + footer.credits.authorName : ""); 
      st("footer-copyright", "© " + (footer.credits.copyrightYear || new Date().getFullYear())); 
    }

    if (footer.background) {
      var footerSec = document.querySelector("footer");
      if (footerSec) {
        footerSec.style.backgroundImage = "url('" + footer.background + "')";
        footerSec.style.backgroundSize = "cover";
        footerSec.style.backgroundPosition = "center";
      }
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
          slide.style.backgroundImage = "url('" + url + "')"; 
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

    var secBackgrounds = design.sectionBackgrounds || [];
    if (secBackgrounds.length > 0) {
      var detailsSec = document.querySelector(".event-details");
      if (detailsSec && secBackgrounds[0]) {
        detailsSec.style.backgroundImage = "url('" + secBackgrounds[0] + "')";
        detailsSec.style.backgroundSize = "cover";
        detailsSec.style.backgroundPosition = "center";
      }
    }
  }

  fetch("data/event.json")
    .then(function(res) { return res.json(); })
    .then(function(data) { initApp(data); })
    .catch(function(err) { console.error("Error loading event config:", err); });
})();
