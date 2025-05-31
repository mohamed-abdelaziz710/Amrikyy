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

  // --- Translation Logic ---
  const langToggleBtn = document.getElementById('langToggleBtn');
  const htmlEl = document.documentElement;

  const translations = {
    ar: {
      pageTitle: "محمد H عبدالعزيز | CV الذكي - نسخة تقنية محسنة",
      loaderMessage: "يتم تهيئة تجربة TECH & CRYPTO...",
      langToggle: "EN",
      cvName: "محمد H عبدالعزيز",
      cvRole: "طالب هندسة أمن سيبراني | مطور ويب ناشئ ومتحمس للذكاء الاصطناعي",
      emailTitle: "البريد الإلكتروني",
      linkedinTitle: "لينكدإن",
      githubTitle: "جيت هاب الشخصي",
      summaryTitle: "الملخص المهني",
      summaryText: "طالب هندسة أمن سيبراني متحفز للغاية وذو عقلية دولية، يتمتع بخبرة متنوعة في التداول المالي وخدمات السفر والأدوار التي تتطلب التعامل المباشر مع العملاء. يتقن إدارة المخاطر ومنصة أماديوس للبيع، ويطور مهاراته بسرعة في وكلاء الذكاء الاصطناعي وتطوير الويب وتقنيات الحوسبة السحابية. يتوق إلى الاستفادة من مزيج من الخبرة التقنية والقدرة على التكيف والفطنة القوية في خدمة العملاء للمساهمة في المشاريع المبتكرة وفرص النمو.",
      educationTitle: "التعليم",
      eduKSUDegree: "<i class='fas fa-user-astronaut'></i> بكالوريوس العلوم في هندسة الأمن السيبراني",
      eduKSUDetail: "جامعة ولاية كينيساو | كينيساو، جورجيا، الولايات المتحدة الأمريكية (المتوقع: مايو 2026)",
      eduCTCDegree: "<i class='fas fa-certificate'></i> دبلوم مشارك في علوم الحاسب الآلي",
      eduCTCDetail: "كلية تشاتاهوتشي التقنية | ماريتا، جورجيا، الولايات المتحدة الأمريكية (تخرج: مايو 2021)",
      skillsTitle: "المهارات الرئيسية",
      skillCybersecurity: "<i class='fas fa-shield-halved'></i> الأمن السيبراني",
      skillReact: "<span><i class='fab fa-react'></i> React & Next.js</span>",
      skillWebDev: "<i class='fas fa-file-code'></i> HTML, CSS, JS",
      skillPython: "<span><i class='fab fa-python'></i> Python</span>",
      skillNode: "<span><i class='fab fa-node-js'></i> Node.js</span>",
      skillAI: "<i class='fas fa-robot'></i> الذكاء الاصطناعي",
      skillCloud: "<i class='fas fa-server'></i> الحوسبة السحابية",
      skillUIUX: "<i class='fas fa-object-group'></i> تصميم واجهات",
      skillTrading: "<i class='fab fa-bitcoin'></i> تداول العملات",
      skillAmadeus: "<i class='fas fa-plane-departure'></i> منصة أماديوس",
      skillFirebase: "<span><i class='fas fa-fire'></i> Firebase</span>",
      skillGitHub: "<span><i class='fab fa-git-alt'></i> GitHub</span>",
      projectsTitle: "أبرز المشاريع",
      projectCharityTitle: "<i class='fas fa-rocket'></i> تصميم صفحة هبوط (Charity: Water)",
      projectCharityDesc: "استخدام HTML, CSS ومساعدة الذكاء الاصطناعي لتعزيز الوعي وتشجيع التبرعات.",
      projectLiveDemo: "<i class='fas fa-external-link-square-alt'></i> عرض مباشر",
      projectRepo: "<i class='fab fa-github-square'></i> المستودع",
      projectLiveDemoTitle: "عرض المشروع",
      projectRepoTitle: "مستودع جيت هاب",
      projectPortfolioTitle: "<i class='fas fa-user-tie'></i> موقع السيرة الذاتية الشخصي",
      projectPortfolioDesc: "عرض شامل للمهارات والمشاريع والخلفية المهنية.",
      projectLiveDemoTitlePortfolio: "عرض الموقع",
      projectRepoTitlePortfolio: "مستودع جيت هاب",
      downloadCV: "<i class='fas fa-download'></i> تحميل السيرة الذاتية",
      // Chatbot translations AR
      chatbotToggleTitle: "دردشة الكريبتو", 
      chatbotHeader: "مساعد الكريبتو", 
      chatbotCloseTitle: "إغلاق الدردشة",
      chatbotInputPlaceholder: "اسأل عن الكريبتو...", 
      chatbotSend: "إرسال"
    },
    en: {
      pageTitle: "Mohamed H Abdelaziz | Smart CV - Refined Tech Edition",
      loaderMessage: "Initializing TECH & CRYPTO Experience...",
      langToggle: "AR",
      cvName: "Mohamed H Abdelaziz",
      cvRole: "Cybersecurity Engineering Student | Aspiring Web Developer & AI Enthusiast",
      emailTitle: "Email",
      linkedinTitle: "LinkedIn",
      githubTitle: "Personal GitHub",
      summaryTitle: "Professional Summary",
      summaryText: "A highly motivated and internationally-minded Cybersecurity Engineering student with diverse experience in financial trading, travel services, and customer-facing roles. Proficient in risk management, Amadeus selling platform, and rapidly developing skills in AI agents, web development, and cloud technologies. Eager to leverage a blend of technical expertise, adaptability, and strong customer service acumen to contribute to innovative projects and growth opportunities.",
      educationTitle: "Education",
      eduKSUDegree: "<i class='fas fa-user-astronaut'></i> Bachelor of Science in Cybersecurity Engineering",
      eduKSUDetail: "Kennesaw State University | Kennesaw, GA, USA (Expected: May 2026)",
      eduCTCDegree: "<i class='fas fa-certificate'></i> Associate of Science in Computer Science",
      eduCTCDetail: "Chattahoochee Technical College | Marietta, GA, USA (Graduated: May 2021)",
      skillsTitle: "Key Skills",
      skillCybersecurity: "<i class='fas fa-shield-halved'></i> Cybersecurity",
      skillReact: "<span><i class='fab fa-react'></i> React & Next.js</span>",
      skillWebDev: "<i class='fas fa-file-code'></i> HTML, CSS, JS",
      skillPython: "<span><i class='fab fa-python'></i> Python</span>",
      skillNode: "<span><i class='fab fa-node-js'></i> Node.js</span>",
      skillAI: "<i class='fas fa-robot'></i> Artificial Intelligence",
      skillCloud: "<i class='fas fa-server'></i> Cloud Computing",
      skillUIUX: "<i class='fas fa-object-group'></i> UI/UX Design",
      skillTrading: "<i class='fab fa-bitcoin'></i> Currency Trading",
      skillAmadeus: "<i class='fas fa-plane-departure'></i> Amadeus Platform",
      skillFirebase: "<span><i class='fas fa-fire'></i> Firebase</span>",
      skillGitHub: "<span><i class='fab fa-git-alt'></i> GitHub</span>",
      projectsTitle: "Featured Projects",
      projectCharityTitle: "<i class='fas fa-rocket'></i> Landing Page Design (Charity: Water)",
      projectCharityDesc: "Utilized HTML, CSS, and AI assistance to enhance awareness and encourage donations.",
      projectLiveDemo: "<i class='fas fa-external-link-square-alt'></i> Live Demo",
      projectRepo: "<i class='fab fa-github-square'></i> Repository",
      projectLiveDemoTitle: "View Project",
      projectRepoTitle: "GitHub Repository",
      projectPortfolioTitle: "<i class='fas fa-user-tie'></i> Personal Portfolio Website",
      projectPortfolioDesc: "Comprehensive showcase of skills, projects, and professional background.",
      projectLiveDemoTitlePortfolio: "View Website",
      projectRepoTitlePortfolio: "GitHub Repository",
      downloadCV: "<i class='fas fa-download'></i> Download CV",
      // Chatbot translations EN
      chatbotToggleTitle: "Crypto Chat", 
      chatbotHeader: "Crypto Assistant", 
      chatbotCloseTitle: "Close Chat",
      chatbotInputPlaceholder: "Ask about crypto...", 
      chatbotSend: "Send"
    }
  };

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
  const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSendBtn = document.getElementById('chatbot-send-btn');
  const chatbotBackendUrl = 'https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/'; // Your backend URL

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
