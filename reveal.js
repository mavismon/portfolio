/* ============================================================
   Portfolio motion layer — one file, applied on every page.
   - Scroll reveals (fade-up + stagger)
   - Count-up for metric numbers
   - Hover micro-interactions (card lift, image zoom)
   - Nav elevates on scroll
   Fails safe: if JS is off / no IntersectionObserver, nothing
   is hidden. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- injected styles (only added when we can animate) ---- */
  function injectStyle(css) {
    var s = document.createElement("style");
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* Hover polish works for everyone (user-initiated, not auto motion) */
  injectStyle(
    "html{scroll-behavior:smooth}" +
      ".project-card,.feature,.gitem,.ns-ncard,.ns-key,.dec,.route,.wf-shot,.sw,.ds-sw{transition:transform .35s cubic-bezier(.16,.7,.3,1),box-shadow .35s ease}" +
      ".project-card:hover,.feature:hover,.gitem:hover,.ns-ncard:hover,.ns-key:hover,.dec:hover,.route:hover{transform:translateY(-5px);box-shadow:0 16px 38px rgba(40,25,40,.10)}" +
      ".gitem figure,.ns-shot,.wf-shot{overflow:hidden}" +
      ".gitem img,.ns-shot img,.wf-shot img{transition:transform .6s cubic-bezier(.16,.7,.3,1)}" +
      ".gitem:hover img,.ns-shot:hover img,.wf-shot:hover img{transform:scale(1.045)}" +
      "nav,.nav{transition:box-shadow .3s ease}" +
      "nav.is-scrolled,.nav.is-scrolled{box-shadow:0 6px 22px rgba(40,25,40,.07)}"
  );

  /* ---- nav shadow on scroll ---- */
  var navEl = document.querySelector("nav, .nav");
  if (navEl) {
    var onScroll = function () {
      navEl.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- count-up for metric numbers ---- */
  function countUp(el) {
    var raw = el.getAttribute("data-count") || el.textContent.trim();
    var m = raw.match(/^(\D*)(\d+(?:\.\d+)?)([^\d]*)$/); // suffix must have no digit
    if (!m) return;
    el.setAttribute("data-count", raw);
    var prefix = m[1],
      numStr = m[2],
      suffix = m[3];
    var target = parseFloat(numStr);
    var dec = (numStr.split(".")[1] || "").length;
    if (reduce) {
      el.textContent = prefix + target.toFixed(dec) + suffix;
      return;
    }
    var start = null,
      dur = 1200;
    el.textContent = prefix + (0).toFixed(dec) + suffix;
    function tick(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = prefix + (target * e).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(dec) + suffix;
    }
    requestAnimationFrame(tick);
  }

  function boot() {
    var numbers = Array.prototype.slice.call(
      document.querySelectorAll(".stat .big, .stat-band .big")
    );

    var revealSel = [
      "section", ".hero", ".db-hero", ".g-hero", ".ns-hero",
      ".project-card", ".card", ".feature", ".gitem", ".phone",
      ".stat", ".persona", ".journey", ".stat-band", ".bars", ".quad",
      ".ia", ".ds-card", ".swatches", ".type-scale", ".phases", ".tl",
      ".pills", ".cmp", ".routes", ".callout", ".finding",
      ".ns-ncard", ".ns-shot", ".ns-persona", ".ns-journey",
      ".g-facts", ".g-sec", ".g-quote", ".g-note", ".g-next",
      ".now-strip", ".logo-row", ".cta-banner", ".contact-band",
      ".closer", ".nextnav", ".wf-shot", ".sig-wrap"
    ].join(",");
    var nodes = Array.prototype.slice.call(
      document.querySelectorAll(revealSel)
    );

    /* No animation path: leave everything visible, but still count up
       (instantly) so numbers read correctly. */
    if (reduce || !("IntersectionObserver" in window)) {
      numbers.forEach(countUp);
      return;
    }

    injectStyle(
      ".reveal{opacity:0;transform:translateY(22px);will-change:opacity,transform;" +
        "transition:opacity .7s cubic-bezier(.16,.7,.3,1),transform .7s cubic-bezier(.16,.7,.3,1)}" +
        ".reveal.in{opacity:1;transform:none}"
    );

    nodes.forEach(function (n) {
      n.classList.add("reveal");
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          var i = 0;
          if (el.parentNode) {
            var sibs = Array.prototype.filter.call(
              el.parentNode.children,
              function (c) {
                return c.classList && c.classList.contains("reveal");
              }
            );
            i = sibs.indexOf(el);
          }
          el.style.transitionDelay = Math.min(i * 70, 350) + "ms";
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });

    /* count-up when a number scrolls into view */
    var nio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          countUp(e.target);
          nio.unobserve(e.target);
        });
      },
      { threshold: 0.6 }
    );
    numbers.forEach(function (n) {
      nio.observe(n);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
