document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const loaderContainer = document.getElementById('loader-container');
  const progressBar = document.getElementById('progressBar');
  let loadingCompleted = false;

  function completeLoading() {
    if (loadingCompleted) return;
    loadingCompleted = true;
    progressBar.style.width = '100%'; 
    // Add class to hide loader
    loaderContainer.classList.add('hidden');
    // Delay changing body class to allow loader fade-out transition
    setTimeout(() => {
      body.classList.remove('loading');
      body.classList.add('loaded');
    }, 500); // Match this duration with #loader-container transition
  }

  // Start progress bar animation immediately
  requestAnimationFrame(() => {
    progressBar.style.width = '100%';
  });
  
  // Complete loading after progress bar animation finishes (2.5s) + buffer
  const loadingTimeout = setTimeout(completeLoading, 3000); 

  // --- Language Toggle & Translation ---
  const langToggleBtn = document.getElementById('langToggleBtn');
  const htmlTag = document.documentElement;
  let currentLang = htmlTag.lang || 'ar';

  const translations = {
    en: {
      loaderMessage: 'Initializing TECH & CRYPTO experience...',
      langToggle: 'AR',
      cvName: 'Mohamed Abdelaziz', // Improved English translation
      cvRole: 'Cybersecurity Engineering Student | Junior Web Developer & AI Enthusiast',
      summaryTitle: 'Professional Summary',
      summaryText: 'Highly motivated cybersecurity engineering student with international mindset and diverse experience in financial trading, travel services, and customer-facing roles. Skilled in risk management and Amadeus platform, rapidly developing expertise in AI agents, web development, and cloud technologies. Eager to leverage a blend of technical know-how, adaptability, and strong customer acumen to contribute to innovative projects and growth opportunities.',
      educationTitle: 'Education',
      eduKSUDegree: 'B.Sc. in Cybersecurity Engineering',
      eduKSUDetail: 'Kennesaw State University | Kennesaw, GA, USA (Expected: May 2026)',
      eduCTCDegree: 'Associate Diploma in Computer Science',
      eduCTCDetail: 'Chattahoochee Technical College | Marietta, GA, USA (Graduated: May 2021)',
      skillsTitle: 'Key Skills',
      skillCybersecurity: 'Cybersecurity',
      skillReact: 'React & Next.js',
      skillWebDev: 'HTML, CSS, JS',
      skillPython: 'Python',
      skillNode: 'Node.js',
      skillAI: 'Artificial Intelligence',
      skillCloud: 'Cloud Computing',
      skillUIUX: 'UI/UX Design',
      skillTrading: 'Crypto Trading',
      skillAmadeus: 'Amadeus Platform',
      skillFirebase: 'Firebase',
      skillGitHub: 'GitHub',
      projectsTitle: 'Featured Projects',
      projectCharityTitle: 'Landing Page Design (Charity: Water)',
      projectCharityDesc: 'Using HTML, CSS, and AI assistance to raise awareness and encourage donations.',
      projectPortfolioTitle: 'Personal CV Website',
      projectPortfolioDesc: 'Comprehensive showcase of skills, projects, and professional background.',
      downloadCV: 'Download CV',
      chatbotHeader: 'Virtual Assistant',
      chatbotSend: 'Send',
      chatbotToggleTitle: 'Open Chatbot',
      chatbotCloseTitle: 'Close Chatbot',
      chatbotInputPlaceholder: 'Type your message here...',
      personalInfoTitle: 'Personal Information',
      birthDateLabel: 'Birthdate:',
      birthDateValue: 'July 10, 1999',
      ageLabel: 'Age:',
      ageValue: '26 years old',
      birthPlaceLabel: 'Born in:',
      birthPlaceValue: 'Syria',
      residencyLabel: 'Residency:',
      residencyValue: '18 years in Kuwait, 7 years in Atlanta (IUS), 1 year in Cairo, Egypt',
      chatbotTitle: "Amrikyy AI"
    },
    ar: {
      loaderMessage: 'يتم تهيئة تجربة TECH & CRYPTO...',
      langToggle: 'EN',
      cvName: 'محمد عبدالعزيز', // Removed H from Arabic translation
      cvRole: 'طالب هندسة أمن سيبراني | مطور ويب ناشئ ومتحمس للذكاء الاصطناعي',
      summaryTitle: 'الملخص المهني',
      summaryText: 'طالب هندسة أمن سيبراني متحفز للغاية وذو عقلية دولية، يتمتع بخبرة متنوعة في التداول المالي وخدمات السفر والأدوار التي تتطلب التعامل المباشر مع العملاء. يتقن إدارة المخاطر ومنصة أماديوس للبيع، ويطور مهاراته بسرعة في وكلاء الذكاء الاصطناعي وتطوير الويب وتقنيات الحوسبة السحابية. يتوق إلى الاستفادة من مزيج من الخبرة التقنية والقدرة على التكيف والفطنة القوية في خدمة العملاء للمساهمة في المشاريع المبتكرة وفرص النمو.',
      educationTitle: 'التعليم',
      eduKSUDegree: 'بكالوريوس العلوم في هندسة الأمن السيبراني',
      eduKSUDetail: 'جامعة ولاية كينيساو | كينيساو، جورجيا، الولايات المتحدة الأمريكية (المتوقع: مايو 2026)',
      eduCTCDegree: 'دبلوم مشارك في علوم الحاسب الآلي',
      eduCTCDetail: 'كلية تشاتاهوتشي التقنية | ماريتا، جورجيا، الولايات المتحدة الأمريكية (تخرج: مايو 2021)',
      skillsTitle: 'المهارات الرئيسية',
      skillCybersecurity: 'الأمن السيبراني',
      skillReact: 'React & Next.js',
      skillWebDev: 'HTML, CSS, JS',
      skillPython: 'Python',
      skillNode: 'Node.js',
      skillAI: 'الذكاء الاصطناعي',
      skillCloud: 'الحوسبة السحابية',
      skillUIUX: 'تصميم واجهات',
      skillTrading: 'تداول العملات',
      skillAmadeus: 'منصة أماديوس',
      skillFirebase: 'Firebase',
      skillGitHub: 'GitHub',
      projectsTitle: 'أبرز المشاريع',
      projectCharityTitle: 'تصميم صفحة هبوط (Charity: Water)',
      projectCharityDesc: 'استخدام HTML, CSS ومساعدة الذكاء الاصطناعي لتعزيز الوعي وتشجيع التبرعات.',
      projectPortfolioTitle: 'موقع السيرة الذاتية الشخصي',
      projectPortfolioDesc: 'عرض شامل للمهارات والمشاريع والخلفية المهنية.',
      downloadCV: 'تحميل السيرة الذاتية',
      chatbotHeader: 'مساعد افتراضي',
      chatbotSend: 'إرسال',
      chatbotToggleTitle: 'فتح المساعد',
      chatbotCloseTitle: 'إغلاق المساعد',
      chatbotInputPlaceholder: 'اكتب رسالتك هنا...',
      personalInfoTitle: 'المعلومات الشخصية',
      birthDateLabel: 'تاريخ الميلاد:',
      birthDateValue: '10 يوليو 1999',
      ageLabel: 'العمر:',
      ageValue: '26 سنة',
      birthPlaceLabel: 'مكان الميلاد:',
      birthPlaceValue: 'سوريا',
      residencyLabel: 'الإقامة:',
      residencyValue: '18 سنة في الكويت، 7 سنوات في أتلانتا (IUS)، سنة واحدة في القاهرة',
      chatbotTitle: "أمريكي AI"
    }
  };

  function applyTranslations(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-translate-title]').forEach(el => {
      const key = el.getAttribute('data-translate-title');
      if (translations[lang][key]) el.title = translations[lang][key];
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
      const key = el.getAttribute('data-translate-placeholder');
      if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
    // Update direction and lang
    htmlTag.lang = lang;
    htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      langToggleBtn.textContent = translations[currentLang].langToggle;
      applyTranslations(currentLang);
    });
    // Initial translation
    applyTranslations(currentLang);
  }

  // --- Chatbot Toggle ---
  const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');

  if (chatbotToggleBtn && chatbotContainer) {
    chatbotToggleBtn.addEventListener('click', () => {
      chatbotContainer.classList.toggle('open');
      if (chatbotContainer.classList.contains('open')) {
        chatbotContainer.style.display = 'flex';
        setTimeout(() => chatbotContainer.classList.add('show'), 10);
      } else {
        chatbotContainer.classList.remove('show');
        setTimeout(() => chatbotContainer.style.display = 'none', 300);
      }
    });
  }
  if (chatbotCloseBtn && chatbotContainer) {
    chatbotCloseBtn.addEventListener('click', () => {
      chatbotContainer.classList.remove('show', 'open');
      setTimeout(() => chatbotContainer.style.display = 'none', 300);
    });
  }

  // --- Loader & Progress Bar ---
  const loader = document.getElementById('loader');
  const progress = document.getElementById('progress');

  function updateProgress(percent) {
    if (loader) {
      loader.style.width = `${percent}%`;
      loader.setAttribute('aria-valuenow', percent);
    }
  }

  // Simulate loading progress
  let progressInterval = setInterval(() => {
    const currentWidth = parseInt(getComputedStyle(loader).width);
    const parentWidth = parseInt(getComputedStyle(loader.parentElement).width);
    const percent = Math.min(100, Math.round((currentWidth / parentWidth) * 100));
    updateProgress(percent);

    if (percent === 100) {
      clearInterval(progressInterval);
      setTimeout(completeLoading, 500);
    }
  }, 30);

  // --- Translation Logic ---
    const htmlEl = document.documentElement;
  // The following object literal was misplaced and caused syntax errors. It has been removed.
  // If you need to add more translations, add them to the existing 'translations' object above.

  function setLanguage(lang) {
    htmlEl.lang = lang;
    htmlEl.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[lang][key]) {
        // For elements that contain HTML (like those with icons), use innerHTML
        if (el.innerHTML.includes('<i class') || el.tagName === 'SPAN') { // Check if span to preserve innerHTML
             el.innerHTML = translations[lang][key];
        } else {
             el.textContent = translations[lang][key];
        }
      }
    });
    
    document.querySelectorAll('[data-translate-title]').forEach(el => {
        const key = el.getAttribute('data-translate-title');
        if (translations[lang][key]) {
            el.title = translations[lang][key];
        }
    });
    
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    document.getElementById('pageTitle').textContent = translations[lang].pageTitle;
    langToggleBtn.textContent = translations[lang].langToggle;
  }

  langToggleBtn.addEventListener('click', () => {
    const currentLang = htmlEl.lang;
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
  });

  // Set initial language (Arabic)
  setLanguage('ar');

  // --- Chatbot Logic ---
  // chatbotToggleBtn, chatbotContainer, chatbotCloseBtn already declared above
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSendBtn = document.getElementById('chatbot-send-btn');
  const chatbotBackendUrl = 'https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/'; // Updated backend URL

  chatbotToggleBtn.addEventListener('click', () => {
      chatbotContainer.classList.toggle('visible');
      if (chatbotContainer.classList.contains('visible')) {
          chatbotInput.focus();
          // Add initial greeting from AI if chat is empty
          if(chatbotMessages.children.length === 0) {
            const currentLang = htmlEl.lang || 'ar';
            const greeting = currentLang === 'ar' ? "مرحباً! كيف يمكنني مساعدتك اليوم بخصوص الكريبتو؟" : "Hello! How can I assist you today regarding crypto?";
            addMessageToChat(greeting, 'ai');
          }
      }
  });

  chatbotCloseBtn.addEventListener('click', () => {
      chatbotContainer.classList.remove('visible');
  });

  function addMessageToChat(message, sender, isError = false) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('chat-message');
      if (isError) {
        messageElement.classList.add('error-message');
      } else {
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
      }
      messageElement.textContent = message; // Using textContent to prevent XSS from backend
      chatbotMessages.appendChild(messageElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll to bottom
  }

  async function sendMessageToBackend(message) {
      addMessageToChat(message, 'user');
      chatbotInput.value = '';
      chatbotInput.disabled = true;
      chatbotSendBtn.disabled = true;
      
      // Add a thinking indicator for AI
      const thinkingMessage = htmlEl.lang === 'ar' ? "يفكر..." : "Thinking...";
      addMessageToChat(thinkingMessage, 'ai', false); // Not an error, just an indicator
      const thinkingElement = chatbotMessages.lastChild; // Get the thinking message element

      try {
          const response = await fetch(chatbotBackendUrl, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ prompt: message }), // Assuming backend expects "prompt"
          });

          chatbotMessages.removeChild(thinkingElement); // Remove thinking indicator

          if (!response.ok) {
              const errorData = await response.text(); // Or response.json() if backend sends structured error
              throw new Error(`Network response was not ok: ${response.status} - ${errorData}`);
          }

          const data = await response.json();
          // Assuming backend returns { response: "AI message" }
          if (data && data.response) {
              addMessageToChat(data.response, 'ai');
          } else {
              throw new Error('Invalid response format from AI backend.');
          }

      } catch (error) {
          console.error('Error sending message to backend:', error);
          if(chatbotMessages.contains(thinkingElement)) { // Check if thinkingElement is still there
            chatbotMessages.removeChild(thinkingElement); // Remove thinking indicator if error occurred before response
          }
          const errorText = htmlEl.lang === 'ar' ? `خطأ في الاتصال بالمساعد: ${error.message}` : `Error connecting to assistant: ${error.message}`;
          addMessageToChat(errorText, 'ai', true);
      } finally {
          chatbotInput.disabled = false;
          chatbotSendBtn.disabled = false;
          chatbotInput.focus();
      }
  }

  chatbotSendBtn.addEventListener('click', () => {
      const message = chatbotInput.value.trim();
      if (message) {
          sendMessageToBackend(message);
      }
  });

  chatbotInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          const message = chatbotInput.value.trim();
          if (message) {
              sendMessageToBackend(message);
          }
      }
  });

});
