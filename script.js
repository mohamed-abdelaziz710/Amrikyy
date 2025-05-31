// DEBUG LOG: script.js loaded successfully on 2025-05-29
// NOTE: This file contains loader, scroll, and chatbot logic for the portfolio.

// === Amrikyy Cyber Portfolio Main Script ===
// Loader animation, transitions, scroll, and chatbot logic
// --------------------------------------------------------
// - Loader: handles progress bar, hints, and hiding
// - Smooth scroll to CV card
// - Chatbot: open/close, keyboard, focus, messaging
// - Accessibility and minor enhancements

// --- Unified Enhanced Loader Logic ---
(function() {
  // Loader elements
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  // New loader elements
  const starfield = document.getElementById('loadingStarfield');
  const loadingText = document.getElementById('loadingText');
  const progressBarFill = document.getElementById('progressBarFill');
  const skipBtn = document.getElementById('skipLoaderBtn');
  // Fallback loader elements
  const progressBar = document.querySelector('.loader-bar-progress');
  const hintEl = document.getElementById('loader-hint');
  const dots = document.querySelectorAll('.loader-dots span');

  // Starfield
  if (starfield) {
    const numStars = 60;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() * 2.2 + 1.2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      starfield.appendChild(star);
    }
  }

  // Typing effect for loading text
  const loadingPhrases = [
    'يتم تجهيز تجربة الذكاء السيبراني...',
    'تحميل عناصر الواجهة الذكية...',
    'تفعيل الأنظمة المتقدمة...',
    'جارٍ الإقلاع...'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let typingInterval;
  function typeNextChar() {
    if (!loadingText) return;
    loadingText.classList.add('typing-effect');
    if (charIdx < loadingPhrases[phraseIdx].length) {
      loadingText.textContent += loadingPhrases[phraseIdx][charIdx++];
      typingInterval = setTimeout(typeNextChar, 55 + Math.random()*45);
    } else {
      setTimeout(() => {
        loadingText.classList.remove('typing-effect');
        setTimeout(() => {
          loadingText.textContent = '';
          charIdx = 0;
          phraseIdx = (phraseIdx + 1) % loadingPhrases.length;
          typeNextChar();
        }, 900);
      }, 1200);
    }
  }
  if (loadingText) {
    loadingText.textContent = '';
    typeNextChar();
  }

  // Progress bar logic
  let progress2 = 0;
  let progressInterval;
  function animateProgressBar() {
    progress2 += Math.random() * 7 + 2;
    if (progress2 > 100) progress2 = 100;
    if (progressBarFill) progressBarFill.style.width = progress2 + '%';
    if (progress2 < 100) {
      progressInterval = setTimeout(animateProgressBar, 320);
    } else {
      finishLoader();
    }
  }
  if (progressBarFill) {
    progressBarFill.style.width = '0%';
    animateProgressBar();
  }

  // Skip button logic
  if (skipBtn) {
    setTimeout(() => {
      skipBtn.classList.add('show');
    }, 2200);
    skipBtn.onclick = () => {
      progress2 = 100;
      if (progressBarFill) progressBarFill.style.width = '100%';
      finishLoader();
    };
  }

  // Fallback loader-card3d logic (dots, hints, progress)
  if (dots && dots.length) {
    let dotStep = 0;
    setInterval(() => {
      dots.forEach((dot, i) => {
        dot.style.opacity = (i === dotStep % 3) ? '1' : '0.3';
      });
      dotStep++;
    }, 400);
  }
  if (progressBar) progressBar.style.width = '0%';
  let progress = 0;
  let hintIdx = 0;
  const loaderHints = [
    'يتم تجهيز تجربة AI الخاصة بك...',
    'تحميل عناصر السيبرانية...',
    'تفعيل واجهة المستخدم الذكية...',
    'توصيل الذكاء الاصطناعي...',
    'تجهيز بطاقة السيرة الذاتية...',
    'جارٍ الإقلاع...'
  ];
  const loaderInterval = setInterval(() => {
    progress += Math.random() * 8 + 3;
    if (progress > 100) progress = 100;
    if (progressBar) progressBar.style.width = progress + '%';
    if (progress > 20 && hintIdx === 0 && hintEl) { hintIdx++; hintEl.textContent = loaderHints[hintIdx]; }
    if (progress > 40 && hintIdx === 1 && hintEl) { hintIdx++; hintEl.textContent = loaderHints[hintIdx]; }
    if (progress > 60 && hintIdx === 2 && hintEl) { hintIdx++; hintEl.textContent = loaderHints[hintIdx]; }
    if (progress > 80 && hintIdx === 3 && hintEl) { hintIdx++; hintEl.textContent = loaderHints[hintIdx]; }
    if (progress >= 100) {
      finishLoader();
    }
  }, 350);

  // Loader finish logic
  function finishLoader() {
    clearTimeout(progressInterval);
    clearInterval(loaderInterval);
    loader.classList.add('hide');
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
      if (mainContent) mainContent.style.display = 'flex';
      const cvCard = document.querySelector('.cv-card');
      if (cvCard) setTimeout(() => {cvCard.classList.add('visible');}, 350);
      const cvSection = document.getElementById('cv-card-page');
      if (cvSection) {
        setTimeout(() => {
          cvSection.scrollIntoView({ behavior: 'smooth' });
          cvSection.setAttribute('tabindex', '-1');
          cvSection.focus();
          console.log('CV page ready');
        }, 700);
      }
    }, 700);
  }

  // LoaderToCvBtn (CTA) logic
  document.addEventListener('DOMContentLoaded', () => {
    const loaderCta = document.getElementById('loaderToCvBtn');
    if (loaderCta) {
      loaderCta.onclick = () => {
        finishLoader();
      };
    }
  });
})();