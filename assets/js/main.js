document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('lang');

  function showLang(lang) {
    // Set <html lang>
    document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : 'en';
    localStorage.setItem('site_lang', lang);

    // Toggle visibility
    const showPt = (lang === 'pt');
    document.querySelectorAll('[data-pt]').forEach(el => { el.style.display = showPt ? 'block' : 'none'; });
    document.querySelectorAll('[data-en]').forEach(el => { el.style.display = showPt ? 'none' : 'block'; });

    // Optional: tiny fade for elements that have .fade
    document.querySelectorAll('.fade').forEach(el => {
      el.classList.add('hidden');
      requestAnimationFrame(() => { el.classList.remove('hidden'); });
    });

    // Keep selector in sync
    if (switcher) switcher.value = lang;

    // Update aria-current on nav links
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(a => {
      const samePage = a.getAttribute('href') === path;
      // only keep aria-current on visible language links
      const isVisible = a.style.display !== 'none';
      if (samePage && isVisible) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  const saved = localStorage.getItem('site_lang') || 'pt';
  showLang(saved);
  if (switcher) {
    switcher.addEventListener('change', (e) => showLang(e.target.value));
  }

  // Contact form UX (inline status instead of alert)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name')?.value?.trim() || '';
      const status = document.getElementById('form-status');

      const isPt = document.documentElement.lang === 'pt-BR';
      const okMsg = isPt
        ? `Obrigado${name ? `, ${name}` : ''}! Sua mensagem foi recebida.`
        : `Thanks${name ? `, ${name}` : ''}! Your message was received.`;

      if (status) {
        status.textContent = okMsg;
      } else {
        // fallback if the span is missing
        const span = document.createElement('span');
        span.id = 'form-status';
        span.className = 'form-status';
        span.setAttribute('role', 'status');
        span.textContent = okMsg;
        form.appendChild(span);
      }

      form.reset();
    });
  }
});