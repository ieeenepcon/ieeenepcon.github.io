/* ============================================================
   2026 IEEE NEPCON — shared header / footer / helpers
   Injects consistent chrome on every page (works over file:// — no fetch).
   Each page sets <body data-page="..."> to highlight the active nav item.
   ============================================================ */
(function () {
  var SUBMIT = 'https://app.confconnects.com/conference/m8BpmCrWuCTHCgJbGHs0';
  var REC = 'https://conferences.ieee.org/conferences_events/conferences/conferencedetails/71018';

  // Conference wordmark (the conference's own mark — NOT the IEEE logo).
  var LOGO_SVG =
    '<svg class="logo" width="36" height="36" viewBox="0 0 48 48" aria-hidden="true">' +
    '<rect width="48" height="48" rx="11" fill="#00629B"/>' +
    '<circle cx="31" cy="15" r="4" fill="#BA0C2F"/>' +
    '<path d="M4 38 L15 18 L22 28 L30 12 L37 24 L44 16 L44 38 Z" fill="#ffffff" opacity=".95"/>' +
    '<path d="M4 38 L44 38" stroke="#7fd4ff" stroke-width="2"/></svg>';

  // Nav items: [href, label, pageKey]
  var NAV = [
    ['index.html', 'Home', 'home'],
    ['call-for-papers.html', 'Call for Papers', 'cfp'],
    ['important-dates.html', 'Dates', 'dates'],
    ['committee.html', 'Committee', 'committee'],
    ['speakers.html', 'Speakers', 'speakers'],
    ['registration.html', 'Registration', 'registration'],
    ['venue.html', 'Venue', 'venue'],
    ['contact.html', 'Contact', 'contact']
  ];

  var active = document.body.getAttribute('data-page') || '';

  /* ---------- Official IEEE logo slot ----------
     Drop the OFFICIAL artwork at assets/ieee-logo.png (or .svg) and it appears
     automatically in the header, home sponsor section, and footer. Until then a
     compliant TEXT placeholder shows — this deliberately does NOT recreate the
     IEEE "kite" master brand (which must never be redrawn). Reproduce the official
     logo only in IEEE blue/black/white, keep at least ½-x clear space, min 100×33px. */
  var IEEE_SRC = 'assets/ieee-logo.svg';
  function ieeeLogo(showSub) {
    var sub = showSub ? '<span class="l2">Nepal Section</span>' : '';
    return '<img class="ieee-art" src="' + IEEE_SRC + '" alt="IEEE — technical co-sponsor" ' +
      'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">' +
      '<span class="logo-text" style="display:none"><span class="l1">IEEE</span>' + sub + '</span>';
  }

  /* ---------- Header ---------- */
  var navHtml = NAV.map(function (n) {
    return '<a href="' + n[0] + '"' + (n[2] === active ? ' class="active"' : '') + '>' + n[1] + '</a>';
  }).join('');

  var header =
    '<header class="site-header"><div class="container inner">' +
      '<a class="lockup" href="index.html">' + LOGO_SVG +
        '<span><span class="wm1">NEP<em>CON</em> 2026</span>' +
        '<span class="wm2">IEEE Nepal Section</span></span></a>' +
      '<span class="cobrand" title="Technically co-sponsored by IEEE">' + ieeeLogo(false) + '</span>' +
      '<button class="nav-toggle" aria-label="Menu">☰</button>' +
      '<nav class="nav">' + navHtml +
        '<a class="cta" href="' + SUBMIT + '" target="_blank" rel="noopener">Submit Paper</a>' +
      '</nav>' +
    '</div></header>';

  /* ---------- Footer ---------- */
  var year = 2026;
  var footer =
    '<footer class="site-footer"><div class="container">' +
      '<div class="foot-grid">' +
        '<div class="foot-brand">' +
          '<span class="wm1">NEP<em>CON</em> 2026</span>' +
          '<p>The international signature conference of the IEEE Nepal Section — ' +
          'advancing computing, communication and intelligent sensing. ' +
          'Kathmandu, Nepal · December 11–13, 2026.</p>' +
          '<div class="foot-sponsor"><div class="cap">Technically Co-Sponsored by</div>' +
            '<div class="foot-logo">' + ieeeLogo(false) + '</div>' +
            '<div class="foot-sec">Nepal Section</div>' +
            '<div class="foot-rec"><a href="' + REC + '" target="_blank" rel="noopener">IEEE Conference Record #71018</a></div></div>' +
        '</div>' +
        '<div><h4>Conference</h4><ul>' +
          '<li><a href="call-for-papers.html">Call for Papers</a></li>' +
          '<li><a href="important-dates.html">Important Dates</a></li>' +
          '<li><a href="committee.html">Committee</a></li>' +
          '<li><a href="registration.html">Registration</a></li>' +
          '<li><a href="ieee-policy.html">IEEE Policy</a></li>' +
        '</ul></div>' +
        '<div><h4>Attend</h4><ul>' +
          '<li><a href="venue.html">Venue &amp; Kathmandu</a></li>' +
          '<li><a href="speakers.html">Speakers</a></li>' +
          '<li><a href="contact.html">Contact</a></li>' +
          '<li><a href="' + SUBMIT + '" target="_blank" rel="noopener">Submit via ConfConnects</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="legal">' +
        '<div>© ' + year + ' IEEE NEPCON · IEEE Nepal Section. All rights reserved.</div>' +
        '<div class="links"><a href="privacy.html">Privacy</a>' +
          '<a href="terms.html">Terms</a><a href="refund.html">Refund Policy</a></div>' +
      '</div>' +
    '</div></footer>';

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle) toggle.addEventListener('click', function () { nav.classList.toggle('open'); });

  /* ---------- Countdown (#countdown) ---------- */
  var cd = document.getElementById('countdown');
  if (cd) {
    var TARGET = new Date('2026-12-11T09:00:00+05:45').getTime();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var cell = function (n, l) { return '<div class="cd__cell"><div class="cd__num">' + n + '</div><div class="cd__lbl">' + l + '</div></div>'; };
    var tick = function () {
      var diff = TARGET - Date.now();
      if (diff <= 0) { cd.innerHTML = '<div style="font-size:20px;font-weight:700;color:#7fd4ff;">🎉 Welcome to Kathmandu!</div>'; clearInterval(t); return; }
      var s = Math.floor(diff / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
      cd.innerHTML = cell(d, 'Days') + cell(pad(h), 'Hours') + cell(pad(m), 'Minutes') + cell(pad(sec), 'Seconds');
    };
    tick(); var t = setInterval(tick, 1000);
  }

  /* ---------- Accessibility: main id + skip link ---------- */
  var mainEl = document.querySelector('main');
  if (mainEl && !mainEl.id) mainEl.id = 'main';

  /* ---------- Submission-deadline banner ---------- */
  (function () {
    var DEADLINE = new Date('2026-08-15T23:59:59+05:45').getTime();
    var left = DEADLINE - Date.now();
    if (left <= 0) return;
    var hidden; try { hidden = sessionStorage.getItem('nepcon-deadline-hidden'); } catch (e) {}
    if (hidden) return;
    var days = Math.ceil(left / 86400000);
    var msg = days <= 1 ? 'Final day to submit' : days + ' days left to submit';
    var bar = document.createElement('div');
    bar.className = 'deadline-bar';
    bar.innerHTML = '⏳ <b>' + msg + '</b> — paper submission closes 15 August 2026. ' +
      '<a href="' + SUBMIT + '" target="_blank" rel="noopener">Submit via ConfConnects →</a>' +
      '<button class="x" aria-label="Dismiss">×</button>';
    document.body.insertAdjacentElement('afterbegin', bar);
    bar.querySelector('.x').addEventListener('click', function () {
      bar.remove(); try { sessionStorage.setItem('nepcon-deadline-hidden', '1'); } catch (e) {}
    });
  })();

  // Skip link goes first in the DOM for screen-reader / keyboard users.
  document.body.insertAdjacentHTML('afterbegin', '<a class="skip" href="#main">Skip to content</a>');

  /* ---------- Back to top ---------- */
  var toTop = document.createElement('button');
  toTop.className = 'to-top'; toTop.setAttribute('aria-label', 'Back to top'); toTop.innerHTML = '↑';
  document.body.appendChild(toTop);
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 500) toTop.classList.add('show'); else toTop.classList.remove('show');
  }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- Scroll reveal (skipped if reduced-motion) ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window && mainEl) {
    var parts = ['.card', '.track', '.fee', '.person', '.tpc .m', '.timeline .item', '.rows .row',
      '.tba', '.vcard', '.callout', '.faq details', '.quickfacts', 'h2.st', '.lead'];
    var sel = parts.map(function (p) { return 'main ' + p; }).join(', ');
    var els = document.querySelectorAll(sel);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(els, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min((i % 6) * 40, 200) + 'ms';
      io.observe(el);
    });
  }

  /* ---------- Timeline auto-status (.timeline .item[data-date]) ---------- */
  var items = document.querySelectorAll('.timeline .item');
  if (items.length) {
    var now = Date.now(), marked = false;
    Array.prototype.forEach.call(items, function (li) {
      var d = new Date(li.getAttribute('data-date') + 'T23:59:59+05:45').getTime();
      var ttl = li.querySelector('.ttl');
      if (d < now) { li.classList.add('done'); if (ttl) ttl.insertAdjacentHTML('beforeend', '<span class="tag tag--done">Done</span>'); }
      else if (!marked && !li.classList.contains('final')) { li.classList.add('next'); marked = true; if (ttl) ttl.insertAdjacentHTML('beforeend', '<span class="tag">Next</span>'); }
    });
  }
})();
