/**
 * TIS Email Gate — soft email-login for article pages
 * First read: ask for email, save, unlock article forever (this browser)
 * Returning visit: instant access, no gate
 * Pre-revenue: trust-builder, not a paywall
 */
(function () {
  'use strict';

  var STORAGE_KEY  = 'tis_member_email';
  var STORAGE_TIME = 'tis_member_since';
  var DELAY_MS     = 6000; // give them ~6s of reading before the gate

  // If user already entered email → no gate
  if (localStorage.getItem(STORAGE_KEY)) {
    addMemberBadge();
    return;
  }

  // Build the gate overlay
  var overlay = document.createElement('div');
  overlay.className = 'tis-gate-overlay';
  overlay.id = 'tisGateOverlay';
  overlay.innerHTML =
    '<div class="tis-gate-modal">' +
      '<div class="tis-gate-mesh">' +
        '<span class="m1"></span><span class="m2"></span><span class="m3"></span>' +
      '</div>' +
      '<div class="tis-gate-inner">' +
        '<span class="tis-gate-kicker">▌ The Industrial Scribe</span>' +
        '<h2>Keep reading.<br><span class="tis-gate-grad">Free, with email.</span></h2>' +
        '<p class="tis-gate-sub">Drop your email — we\'ll unlock every article on TIS, plus send you the free templates &amp; playbooks. No paywall, no spam, unsubscribe anytime.</p>' +
        '<form class="tis-gate-form" id="tisGateForm">' +
          '<input type="email" id="tisGateEmail" placeholder="your@email.com" required autocomplete="email">' +
          '<button type="submit">Unlock article →</button>' +
        '</form>' +
        '<ul class="tis-gate-list">' +
          '<li>Unlimited access to every article</li>' +
          '<li>Free templates &amp; shop-floor playbooks</li>' +
          '<li>First access when AI workflows ship</li>' +
        '</ul>' +
        '<p class="tis-gate-note">No payment. No credit card. One email gets you in for good.</p>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  // Show gate after delay
  var timer = setTimeout(function () {
    var articleBody = document.querySelector('.article-body');
    if (articleBody) articleBody.classList.add('tis-gate-blurred');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, DELAY_MS);

  // Submit handler — save email, unlock
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.id === 'tisGateForm') {
      e.preventDefault();
      var email = document.getElementById('tisGateEmail').value.trim().toLowerCase();
      if (!email || email.indexOf('@') === -1) return;

      // Save to localStorage (acts as login session)
      localStorage.setItem(STORAGE_KEY, email);
      localStorage.setItem(STORAGE_TIME, new Date().toISOString());

      // POST to FormSubmit (free, no signup — verify once via email link)
      try {
        fetch('https://formsubmit.co/ajax/theindustrialscribe@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            email: email,
            source: location.href,
            requested: 'Article gate · ' + (document.title || location.pathname),
            _subject: 'TIS — article unlock: ' + email,
            _template: 'table'
          })
        }).catch(function () {});
      } catch (err) {}

      // Unlock UI
      overlay.classList.add('unlocked');
      setTimeout(function () {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        var articleBody = document.querySelector('.article-body');
        if (articleBody) articleBody.classList.remove('tis-gate-blurred');
        addMemberBadge();
        setTimeout(function () { overlay.remove(); }, 400);
      }, 1200);
    }
  });

  // Disable Esc dismiss while active
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active') && !overlay.classList.contains('unlocked')) {
      e.preventDefault();
    }
  });

  // ── Member badge in nav ──
  function addMemberBadge() {
    var nav = document.querySelector('nav .nav-inner') || document.querySelector('nav');
    if (!nav || document.getElementById('tisMemberBadge')) return;
    var email = localStorage.getItem(STORAGE_KEY) || '';
    var masked = email.replace(/^(.{2}).*(@.*)$/, '$1•••$2');
    var badge = document.createElement('div');
    badge.id = 'tisMemberBadge';
    badge.className = 'tis-member-badge';
    badge.innerHTML =
      '<span class="tis-member-dot"></span>' +
      '<span class="tis-member-text">' + masked + '</span>' +
      '<button class="tis-member-out" id="tisMemberOut" title="Sign out">×</button>';
    nav.appendChild(badge);
    document.getElementById('tisMemberOut').addEventListener('click', function () {
      if (confirm('Sign out? You\'ll need your email to read articles again.')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_TIME);
        location.reload();
      }
    });
  }
})();
