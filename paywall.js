/**
 * TIS Paywall — soft gate for article pages
 * Shows a subscribe modal after a short reading delay.
 * Subscribers (flagged via localStorage) bypass the gate.
 */
(function () {
  'use strict';

  var STRIPE_LINK = 'https://buy.stripe.com/test_eVqdR97xi4po55z0JZgnK00';
  var DELAY_MS = 2000; // 2 seconds before popup appears
  var STORAGE_KEY = 'tis_subscribed';

  // If user is already a subscriber, do nothing
  if (localStorage.getItem(STORAGE_KEY) === 'true') return;

  // Build the paywall overlay
  var overlay = document.createElement('div');
  overlay.className = 'paywall-overlay';
  overlay.id = 'paywallOverlay';
  overlay.innerHTML =
    '<div class="paywall-modal">' +
      '<div class="paywall-badge">Founding Member Offer</div>' +
      '<h2>Keep reading with<br>The Industrial Scribe</h2>' +
      '<p class="paywall-subtitle">Get unlimited access to AI automation insights built for SEA manufacturing professionals.</p>' +
      '<div class="paywall-price">' +
        '<span class="amount">$1.99</span>' +
        '<span class="period">/month</span>' +
      '</div>' +
      '<ul class="paywall-features">' +
        '<li>Unlimited access to all articles</li>' +
        '<li>New guides &amp; case studies weekly</li>' +
        '<li>AI trend reports for manufacturing</li>' +
        '<li>Cancel anytime — no commitment</li>' +
      '</ul>' +
      '<a href="' + STRIPE_LINK + '" class="paywall-cta">Subscribe — USD 1.99/month</a>' +
      '<a href="index.html" class="paywall-free-link">Browse free articles instead</a>' +
      '<button class="paywall-dismiss" id="paywallDismiss">Maybe later</button>' +
    '</div>';

  document.body.appendChild(overlay);

  // Show after delay
  var timer = setTimeout(function () {
    // Blur the article content
    var articleBody = document.querySelector('.article-body');
    if (articleBody) {
      articleBody.classList.add('blurred');
    }

    // Show overlay
    overlay.classList.add('active');

    // Prevent scrolling
    document.body.style.overflow = 'hidden';
  }, DELAY_MS);

  // Dismiss handler — hides modal but content stays blurred
  // User gets a 30-second grace period before it reappears
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'paywallDismiss') {
      overlay.classList.remove('active');
      document.body.style.overflow = '';

      // Remove blur temporarily
      var articleBody = document.querySelector('.article-body');
      if (articleBody) {
        articleBody.classList.remove('blurred');
      }

      // Re-trigger after 30 seconds if still on page
      setTimeout(function () {
        if (!localStorage.getItem(STORAGE_KEY)) {
          if (articleBody) articleBody.classList.add('blurred');
          overlay.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }, 30000);
    }
  });

  // Close overlay if clicking outside modal
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      // Don't close — force interaction with the modal
    }
  });

  // Escape key does nothing — force engagement
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      e.preventDefault();
    }
  });

})();
