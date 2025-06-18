/**
 * Loader related functions and particle generation
 */
function initLoading() {
  const loader = document.getElementById('loader-container');
  const app = document.getElementById('app');
  const progressBar = document.getElementById('progressBar');
  const progressPercentage = document.getElementById('progressPercentage');
  const statusMessage = document.getElementById('statusMessage');

  generateParticles('loader-particles', 30);
  generateParticles('hero-particles', 20);

  const statusMessages = {
    ar: [
      'جاري تحميل الموارد...',
      'تهيئة الواجهة...',
      'تحميل البيانات...',
      'إعداد التجربة التفاعلية...',
      'اكتمال التحميل...'
    ],
    en: [
      'Loading resources...',
      'Initializing interface...',
      'Loading data...',
      'Setting up interactive experience...',
      'Loading complete...'
    ]
  };

  const currentLang = document.documentElement.lang || 'ar';
  const messages = statusMessages[currentLang] || statusMessages.ar;

  let progress = 0;
  const interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.classList.add('hidden');
          app.classList.remove('hidden');
        }, 500);
      }, 500);
      return;
    }

    progress += Math.random() * 10;
    progress = Math.min(progress, 100);
    progressBar.style.width = `${progress}%`;
    progressPercentage.textContent = `${Math.round(progress)}%`;
    const messageIndex = Math.min(Math.floor(progress / 25), messages.length - 1);
    statusMessage.textContent = messages[messageIndex];
  }, 300);
}

function generateParticles(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 10 + Math.random() * 20;
    particle.style.top = `${top}%`;
    particle.style.left = `${left}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    container.appendChild(particle);
  }
}
