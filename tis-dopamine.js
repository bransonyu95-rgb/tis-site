/* TIS dopamine layer */
(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. reading progress bar (article pages only) ---------- */
  var articleWrap = document.querySelector('.article-wrap');
  if (articleWrap) {
    var bar = document.createElement('div');
    bar.id = 'tis-progress';
    document.body.appendChild(bar);
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 2. scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    '.card, .article-card, .chain-box2, .pain, .insider-band, .pstep, ' +
    '.mindset-box, .viz-compare, .checklist-box, .data-point-box, .stat-block, ' +
    '.phase-box, .takeaway-box, .pillar-card, .related-card, .cnc-strip img, ' +
    '.inline-sub, .stat, .chain-box, .before-after, .nature'
  );
  if ('IntersectionObserver' in window && !reduced && revealTargets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('tis-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { el.classList.add('tis-reveal'); io.observe(el); });
  }

  /* ---------- 3. viz bars grow in ---------- */
  var bars = document.querySelectorAll('.viz-bar');
  if ('IntersectionObserver' in window && !reduced && bars.length) {
    bars.forEach(function (b) {
      var target = b.style.width;
      if (!target) return;
      b.dataset.tisW = target;
      b.style.width = '0%';
      b.classList.add('tis-grow');
    });
    var iob = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          setTimeout(function () { el.style.width = el.dataset.tisW; }, 120);
          iob.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { if (b.dataset.tisW) iob.observe(b); });
  }

  /* ---------- 4. completion reward toast (articles only) ---------- */
  var related = document.querySelector('.related-section');
  if (related && articleWrap && 'IntersectionObserver' in window) {
    var NEXT = [
      ['article-not-from-the-field.html', 'the TIS manifesto'],
      ['article-factory-intelligence.html', 'the 334,000-row story'],
      ['article-ai-negotiation.html', 'the negotiation that took one afternoon'],
      ['article-sop-writing.html', 'the 30-minute SOP method'],
      ['article-rca-report.html', 'the RCA your customer accepts first time'],
      ['article-production-report.html', 'the 12 numbers that matter'],
      ['article-ai-to-outlook.html', 'AI inside your Outlook in 60 minutes'],
      ['article-what-is-llm.html', 'what an LLM actually is']
    ];
    var here = location.pathname.split('/').pop();
    var pool = NEXT.filter(function (n) { return n[0] !== here; });
    var pick = pool[Math.floor(Math.random() * pool.length)];

    var count = 1;
    try {
      count = parseInt(localStorage.getItem('tis-read') || '0', 10) + 1;
      var last = localStorage.getItem('tis-read-last');
      if (last !== here) {
        localStorage.setItem('tis-read', String(count));
        localStorage.setItem('tis-read-last', here);
      } else { count = parseInt(localStorage.getItem('tis-read'), 10); }
    } catch (e) { count = 0; }

    var shown = false;
    var iof = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !shown) {
          shown = true;
          var t = document.createElement('div');
          t.id = 'tis-finish';
          t.innerHTML =
            '<img src="assets/insider-thumbs-up.png" alt="">' +
            '<div><div class="tf-head">You finished. Most readers don\'t.</div>' +
            (count > 1 ? '<div class="tf-count">That\'s article #' + count + ' for you.</div>' : '') +
            (pick ? '<div>Next: <a href="' + pick[0] + '">' + pick[1] + ' →</a></div>' : '') +
            '</div><button class="tf-close" aria-label="close">✕</button>';
          document.body.appendChild(t);
          requestAnimationFrame(function () { t.classList.add('tis-show'); });
          t.querySelector('.tf-close').addEventListener('click', function () { t.remove(); });
          setTimeout(function () { if (t.parentNode) { t.classList.remove('tis-show'); setTimeout(function(){ t.remove(); }, 500); } }, 12000);
          iof.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    iof.observe(related);
  }
})();
