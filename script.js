// DEBUG LOG: script.js loaded successfully on 2025-05-29
// NOTE: This file contains loader, scroll, and chatbot logic for the portfolio.

// === Amrikyy Cyber Portfolio Main Script ===
// Loader animation, transitions, scroll, and chatbot logic
// --------------------------------------------------------
// - Loader: handles progress bar, hints, and hiding
// - Smooth scroll to CV card
// - Chatbot: open/close, keyboard, focus, messaging
// - Accessibility and minor enhancements

// --- Loader Animation & Hide Logic ---
(function() {
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  const progressBar = document.querySelector('.loader-bar-progress');
  const hintEl = document.getElementById('loader-hint');
  const dots = document.querySelectorAll('.loader-dots span');

  let dotStep = 0;
  setInterval(() => {
    dots.forEach((dot, i) => {
      dot.style.opacity = (i === dotStep % 3) ? '1' : '0.3';
    });
    dotStep++;
  }, 400);

  const loaderHints = [
    'يتم تجهيز تجربة AI الخاصة بك...',
    'تحميل عناصر السيبرانية...',
    'تفعيل واجهة المستخدم الذكية...',
    'توصيل الذكاء الاصطناعي...',
    'تجهيز بطاقة السيرة الذاتية...',
    'جارٍ الإقلاع...'
  ];
  let hintIdx = 0;
  let progress = 0;

  const loaderInterval = setInterval(() => {
    progress += Math.random() * 8 + 3;
    if (progress > 100) progress = 100;
    progressBar.style.width = progress + '%';
    if (progress > 20 && hintIdx === 0) { hintIdx++; hintEl.textContent = loaderHints[hintIdx]; console.log('Loader hint:', loaderHints[hintIdx]); }
    if (progress > 40 && hintIdx === 1) { hintIdx++; hintEl.textContent = loaderHints[hintIdx]; console.log('Loader hint:', loaderHints[hintIdx]); }
    if (progress > 60 && hintIdx === 2) { hintIdx++; hintEl.textContent = loaderHints[hintIdx]; console.log('Loader hint:', loaderHints[hintIdx]); }
    if (progress > 80 && hintIdx === 3) { hintIdx++; hintEl.textContent = loaderHints[hintIdx]; console.log('Loader hint:', loaderHints[hintIdx]); }
    if (progress >= 100) {
      clearInterval(loaderInterval);
      setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => {
          loader.style.display = 'none';
          document.body.classList.remove('loading');
          document.body.classList.add('loaded');
          if (mainContent) mainContent.style.display = 'flex';
          const cvCard = document.querySelector('.cv-card');
          if (cvCard) setTimeout(() => {cvCard.classList.add('visible'); console.log('CV card made visible');}, 350);
          const cvSection = document.getElementById('cv-card-page');
          if (cvSection) {
            setTimeout(() => {
              cvSection.scrollIntoView({ behavior: 'smooth' });
              cvSection.setAttribute('tabindex', '-1');
              cvSection.focus();
              console.log('Auto-scrolled to CV card');
            }, 700);
          }
        }, 700);
      }, 600);
    }
  }, 350);

  document.addEventListener('DOMContentLoaded', () => {
    const loaderCta = document.getElementById('loaderToCvBtn');
    if (loaderCta) {
      loaderCta.onclick = () => {
        loader.classList.add('hide');
        setTimeout(() => {
          loader.style.display = 'none';
          document.body.classList.remove('loading');
          document.body.classList.add('loaded');
          if (mainContent) mainContent.style.display = 'flex';
          const cvCard = document.querySelector('.cv-card');
          if (cvCard) setTimeout(() => {cvCard.classList.add('visible'); console.log('CV card made visible (CTA)');}, 350);
          const cvSection = document.getElementById('cv-card-page');
          if (cvSection) {
            setTimeout(() => {
              cvSection.scrollIntoView({ behavior: 'smooth' });
              cvSection.setAttribute('tabindex', '-1');
              cvSection.focus();
              console.log('CTA: Scrolled to CV card');
            }, 700);
          }
        }, 700);
      };
    }
  });
})();

// Smooth Scroll to CV Card
const scrollBtn = document.getElementById('scrollToCvBtn');
if (scrollBtn) {
  scrollBtn.onclick = () => {
    const cvSection = document.getElementById('cv-card-page');
    if (cvSection) {
      cvSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        cvSection.setAttribute('tabindex', '-1');
        cvSection.focus();
        console.log('Manual scroll to CV card');
      }, 700);
    }
  };
}

// --- Chatbot Open/Close, Keyboard, and Focus Logic ---
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const typingIndicator = document.getElementById('typing-indicator');
let lastActiveElement = null;

if (chatbotToggle) {
  chatbotToggle.onclick = () => {
    lastActiveElement = document.activeElement;
    chatbotWindow.classList.add('active');
    setTimeout(()=>{ chatbotInput && chatbotInput.focus(); }, 200);
  };
  chatbotToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chatbotToggle.click(); }
  });
}
if (chatbotClose) {
  chatbotClose.onclick = () => {
    chatbotWindow.classList.remove('active');
    if (lastActiveElement) lastActiveElement.focus();
  };
  chatbotClose.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chatbotClose.click(); }
  });
}
window.addEventListener('mousedown', function(e){
  if (chatbotWindow.classList.contains('active') && !chatbotWindow.contains(e.target) && e.target !== chatbotToggle) {
    chatbotWindow.classList.remove('active');
    if (lastActiveElement) lastActiveElement.focus();
  }
});
window.addEventListener('keydown', function(e){
  if(e.key === "Escape" && chatbotWindow.classList.contains('active')) {
    chatbotWindow.classList.remove('active');
    if (lastActiveElement) lastActiveElement.focus();
  }
});

// --- Chatbot Messaging, Typing, and Accessibility ---
if (chatbotForm) {
  chatbotForm.onsubmit = function(e){
    e.preventDefault();
    const msg = chatbotInput.value.trim();
    if(!msg) return;
    addMessage(msg, 'user');
    chatbotInput.value = "";
    chatbotInput.focus();
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    typingIndicator.classList.add('active');
    setTimeout(()=>{
      typingIndicator.classList.remove('active');
      addMessage('سأعود عليك بإجابة مميزة أو أرسل لي سؤالك التقني القادم!', 'ai');
    }, 1200 + Math.random()*900);
  };
}
// Add a message to the chatbot window
function addMessage(text, sender){
  const msgDiv = document.createElement('div');
  msgDiv.className = `chatbot-message ${sender}`;
  msgDiv.innerHTML = `
    <span class="avatar">
      ${
        sender === 'user'
        ? `<svg width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#fff" opacity="0.09"/><circle cx="12" cy="12" r="8" fill="#a0a0a0" opacity="0.33"/></svg>`
        : `<svg width="28" height="28" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#39FF14" opacity="0.14"/><circle cx="12" cy="12" r="8" fill="#39FF14" opacity="0.44"/></svg>`
      }
    </span>
    <div class="text">${text}</div>
  `;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// On DOM ready, show welcome message and animate CV card if loader is gone
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(()=>{
    addMessage('مرحباً! أنا Amrikyy AI، كيف يمكنني خدمتك اليوم؟', 'ai');
  }, 900);
  // Animate CV card in if loader is not present
  const cvCard = document.querySelector('.cv-card');
  if (cvCard && !document.body.classList.contains('loading')) {
    setTimeout(()=>cvCard.classList.add('visible'), 350);
  }
});
// تحسين صورة CV لاستخدام الصورة المحلية إذا وجدت
const cvAvatar = document.querySelector('.cv-avatar');
if (cvAvatar && cvAvatar.src && cvAvatar.src.includes('avatar.jpg')) {
  fetch('IMG_0073 2.PNG', {method:'HEAD'}).then(resp => {
    if (resp.ok) cvAvatar.src = 'IMG_0073 2.PNG';
  });
}