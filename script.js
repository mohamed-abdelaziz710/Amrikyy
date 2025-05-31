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
  // 3D Loader elements
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  const progressBarFill = document.getElementById('loading3dProgressBar');
  const loadingText = document.getElementById('loading3dText');
  const skipBtn = document.getElementById('skipLoaderBtn');

  // Progress bar logic
  let progress = 0;
  let progressInterval;
  function animateProgressBar() {
    progress += Math.random() * 7 + 2;
    if (progress > 100) progress = 100;
    if (progressBarFill) progressBarFill.style.width = progress + '%';
    if (progress < 100) {
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
      progress = 100;
      if (progressBarFill) progressBarFill.style.width = '100%';
      finishLoader();
    };
  }

  // Loader finish logic
  function finishLoader() {
    clearTimeout(progressInterval);
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
})();