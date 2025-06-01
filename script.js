// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  // --- Define all variables at the top for clarity and easy access ---
  const body = document.body;
  const loaderContainer = document.getElementById('loader-container');
  const progressBar = document.getElementById('progressBar');
  const langToggleBtn = document.getElementById('langToggleBtn');
  const htmlTag = document.documentElement; // <html> element
  const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSendBtn = document.getElementById('chatbot-send-btn');

  // Chatbot backend URL - ensure this server is running and configured for CORS
  const chatbotBackendUrl = 'https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/chat';
  // AI ID Card backend URL - This is the new endpoint you created
  const aiCardBackendUrl = 'https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/generate-id-card';


  let loadingCompleted = false; // Flag to prevent multiple executions of completeLoading
  let currentLang = htmlTag.lang || 'ar'; // Default to Arabic if not set

  // --- Function to handle the completion of the loading animation ---
  function completeLoading() {
    if (loadingCompleted) return; // Prevent re-running
    loadingCompleted = true;

    if (progressBar) {
        progressBar.style.width = '100%'; // Ensure progress bar is full
    }
    if (loaderContainer) {
        loaderContainer.classList.add('hidden'); // Add class to trigger fade-out CSS animation
    }

    // Delay removing 'loading' class to allow fade-out transition of loader to complete
    setTimeout(() => {
      body.classList.remove('loading'); // Remove class that prevents scrolling
      body.classList.add('loaded');    // Add class that might trigger content animations
    }, 500); // This duration should match the CSS transition duration for #loader-container
  }

  // --- Start progress bar animation immediately on DOM load ---
  if (progressBar) {
    requestAnimationFrame(() => {
        progressBar.style.width = '100%';
    });
  } else {
    console.error("Element with ID 'progressBar' not found. Progress bar animation will not occur.");
  }

  // --- Set a timeout to complete loading sequence ---
  const loadingTimeout = setTimeout(completeLoading, 3000);

  // --- Dynamically Calculate Age ---
  function calculateAge(birthDateString) { // Expects "YYYY-MM-DD" format
    try {
        const birthDate = new Date(birthDateString);
        if (isNaN(birthDate.getTime())) {
            console.error("Invalid birthDateString provided for age calculation:", birthDateString);
            return null;
        }
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    } catch (e) {
        console.error("Error calculating age:", e);
        return null;
    }
  }

  // --- Language Toggle and Translation Logic ---
  const translations = {
    // English translations
    en: {
      loaderMessage: 'Initializing TECH & CRYPTO experience...',
      langToggle: 'AR',
      cvName: 'Mohamed Abdelaziz',
      cvRole: 'Cybersecurity Engineering Student | Junior Web Developer & AI Enthusiast',
      summaryTitle: 'Professional Summary',
      summaryText: 'Highly motivated cybersecurity engineering student with international mindset and diverse experience in financial trading, travel services, and customer-facing roles. Skilled in risk management and Amadeus platform, rapidly developing expertise in AI agents, web development, and cloud technologies. Eager to leverage a blend of technical know-how, adaptability, and strong customer acumen to contribute to innovative projects and growth opportunities.',
      educationTitleNew: '🎓 Education',
      eduKSUName: '<i class="fas fa-university"></i> Kennesaw State University – USA',
      eduKSUDegreeNew: 'B.Sc. Cybersecurity Engineering',
      eduKSUGradDate: 'Expected: May 2026',
      eduKSUFocus: 'Focus: AI, Web Dev, Digital Projects',
      eduCTCName: '<i class="fas fa-school"></i> Chattahoochee Technical College – GA, USA',
      eduCTCDegreeNew: 'Technical Diploma in Computer Science',
      eduCTCGradDate: 'Graduated: 2021',
      eduCTCFocus: 'Studied Programming, Networks, InfoSec',
      eduShahName: '<i class="fas fa-graduation-cap"></i> Al-Shaheen High School – Kuwait',
      eduShahDegree: 'High School Diploma (Scientific Section)',
      eduShahGradDate: 'Graduated: 2017',
      skillsTitle: 'Key Skills',
      skillCatCybersecurity: '<i class="fas fa-shield-alt"></i> Cybersecurity',
      skillAttackAnalysis: '<span>Attack & Breach Analysis</span>',
      skillRiskManagement: '<span>Risk Management</span>',
      skillSmartProtection: '<span>Building Smart Protection Solutions</span>',
      skillIntrusionDetection: '<span>Advanced Intrusion Detection Understanding</span>',
      skillCiscoCert: '<span>Certification: Cisco Cybersecurity</span>',
      skillCatWebDev: '<i class="fas fa-laptop-code"></i> Web Development & UI',
      skillHtmlCssJs: '<span>HTML, CSS, JavaScript</span>',
      skillReactTailwind: '<span>React, Tailwind CSS</span>',
      skillFigma: '<span>Figma (Creative UI/UX Design)</span>',
      skillMicrointeractions: '<span>Microinteractions & Modular Components</span>',
      skillUserFlowAccess: '<span>User Flow Optimization + Accessibility</span>',
      skillCatAI: '<i class="fas fa-brain"></i> AI & Prompt Engineering',
      skillChatGPTGemini: '<span>Developing Solutions with ChatGPT & Gemini</span>',
      skillPromptEng: '<span>Professional Prompt Engineering</span>',
      skillAIAgents: '<span>Building Smart Assistants & Automation</span>',
      skillCatDbCloud: '<i class="fas fa-database"></i> Databases & Cloud',
      skillFirebase: '<span>Firebase</span>',
      skillCloudDataMgmt: '<span>Cloud Data Management Fundamentals</span>',
      skillGoogleServices: '<span>Connecting Apps with Google Services</span>',
      skillCatGeneralTech: '<i class="fas fa-cogs"></i> General Tech Skills',
      skillPythonJava: '<span>Python, Java</span>',
      skillExcelAnalysis: '<span>Data Analysis with Excel</span>',
      experienceTitle: 'Work Experience & Internships',
      expInternships: '<i class="fas fa-industry"></i> Summer Internships with Global Companies',
      expInternCompanies: 'OpenAI, Intel, L’Oréal, BlackRock Talent Community',
      expTravelAgent: '<i class="fas fa-plane"></i> Travel Agent (2 years)',
      expTravelDetails: 'Used Amadeus Selling Platform, managed bookings & clients.',
      expUniProjects: '<i class="fas fa-users-cog"></i> University Projects & Initiatives',
      expUniDetails: 'Active member in tech & programming communities, presenting digital projects.',
      projectsTitle: 'Projects & Achievements',
      projectPortfolioSite: '<i class="fas fa-id-card-alt"></i> Personal Website & AI Portfolio',
      projectPortfolioSiteDesc: 'Designed and implemented an interactive space-crypto themed website, dynamic loading section, smart CV card, neon colors, responsive design, and innovative icons.',
      projectLiveDemo: '<i class="fas fa-external-link-square-alt"></i> Live Demo',
      projectRepo: '<i class="fab fa-github-square"></i> Repository',
      projectLiveDemoTitlePortfolio: 'View Live Site',
      projectRepoTitlePortfolio: 'GitHub Repository',
      projectCharity: '<i class="fas fa-tint"></i> Landing Page Project for Charity: Water',
      projectCharityDescNew: 'Built a comprehensive landing page with modern storytelling, interactive elements, and a professional user experience.',
      projectPersonal: '<i class="fas fa-lightbulb"></i> Various Personal & Experimental Projects',
      projectPersonalDesc: 'Developed landing pages, advanced login systems, and AI chatbots.',
      personalInfoTitle: 'Personal Information',
      birthDateLabel: 'Birthdate:',
      birthDateValue: 'July 10, 1999',
      ageLabel: 'Age:',
      ageValue: '{age} years old',
      birthPlaceLabel: 'Born in:',
      birthPlaceValue: 'Syria',
      residencyLabel: 'Residency:',
      residencyValue: '18 years in Kuwait, 7 years in Atlanta (USA), 1 year in Cairo, Egypt',
      chatbotTitle: "Amrikyy AI",
      chatbotHeader: 'Virtual Assistant',
      chatbotSend: 'Send',
      chatbotToggleTitle: 'Open Chatbot',
      chatbotCloseTitle: 'Close Chatbot',
      chatbotInputPlaceholder: 'Type your message here...',
      pageTitle: "Mohamed H Abdelaziz | Amrikyy - Portfolio",
      emailTitle: "Email",
      linkedinTitle: "LinkedIn",
      githubTitle: "GitHub",
      downloadCV: 'Download CV',
      podcastTitle: "🎧 Podcast", // New translation for podcast section title
      podcastDescription: "Listen to my latest podcast episodes about technology, cryptocurrencies, and more!", // New translation for podcast description
      listenNow: "Listen Now" // New translation for listen now link
    },
    // Arabic translations
    ar: {
      loaderMessage: 'يتم تهيئة تجربة TECH & CRYPTO...',
      langToggle: 'EN',
      cvName: 'محمد عبدالعزيز',
      cvRole: 'طالب هندسة أمن سيبراني | مطور ويب ناشئ ومتحمس للذكاء الاصطناعي',
      summaryTitle: 'الملخص المهني',
      summaryText: 'طالب هندسة أمن سيبراني متحفز للغاية وذو عقلية دولية، يتمتع بخبرة متنوعة في التداول المالي وخدمات السفر والأدوار التي تتطلب التعامل المباشر مع العملاء. يتقن إدارة المخاطر ومنصة أماديوس للبيع، ويطور مهاراته بسرعة في وكلاء الذكاء الاصطناعي وتطوير الويب وتقنيات الحوسبة السحابية. يتوق إلى الاستفادة من مزيج من الخبرة التقنية والقدرة على التكيف والفطنة القوية في خدمة العملاء للمساهمة في المشاريع المبتكرة وفرص النمو.',
      educationTitleNew: '🎓 التعليم',
      eduKSUName: '<i class="fas fa-university"></i> جامعة Kennesaw State – الولايات المتحدة الأمريكية',
      eduKSUDegreeNew: 'بكالوريوس هندسة الأمن السيبراني',
      eduKSUGradDate: 'متوقع التخرج: مايو 2026',
      eduKSUFocus: 'تركيز على: الذكاء الاصطناعي، تطوير الويب، مشاريع رقمية',
      eduCTCName: '<i class="fas fa-school"></i> كلية Chattahoochee Technical – جورجيا، أمريكا',
      eduCTCDegreeNew: 'دبلوم تقني في علوم الحاسب',
      eduCTCGradDate: 'التخرج: 2021',
      eduCTCFocus: 'دراسة أساسيات البرمجة، الشبكات، أمن المعلومات',
      eduShahName: '<i class="fas fa-graduation-cap"></i> ثانوية الشاهين – الكويت',
      eduShahDegree: 'شهادة الثانوية العامة (قسم علمي)',
      eduShahGradDate: 'التخرج: 2017',
      skillsTitle: 'المهارات الرئيسية',
      skillCatCybersecurity: '<i class="fas fa-shield-alt"></i> الأمن السيبراني',
      skillAttackAnalysis: '<span>تحليل الهجمات والاختراقات</span>',
      skillRiskManagement: '<span>إدارة المخاطر</span>',
      skillSmartProtection: '<span>بناء حلول حماية ذكية</span>',
      skillIntrusionDetection: '<span>فهم متقدم لـ Intrusion Detection</span>',
      skillCiscoCert: '<span>شهادة: Cisco Cybersecurity</span>',
      skillCatWebDev: '<i class="fas fa-laptop-code"></i> تطوير ويب وواجهات',
      skillHtmlCssJs: '<span>HTML, CSS, JavaScript</span>',
      skillReactTailwind: '<span>React, Tailwind CSS</span>',
      skillFigma: '<span>Figma (تصميم UI/UX إبداعي)</span>',
      skillMicrointeractions: '<span>Microinteractions & Modular Components</span>',
      skillUserFlowAccess: '<span>تحسين User Flow + Accessibility</span>',
      skillCatAI: '<i class="fas fa-brain"></i> ذكاء اصطناعي وهندسة برومبتات',
      skillChatGPTGemini: '<span>تطوير حلول بـ ChatGPT و Gemini</span>',
      skillPromptEng: '<span>هندسة برومبتات احترافية</span>',
      skillAIAgents: '<span>بناء أنظمة مساعدة ذكية وأتمتة</span>',
      skillCatDbCloud: '<i class="fas fa-database"></i> قواعد بيانات و Cloud',
      skillFirebase: '<span>Firebase</span>',
      skillCloudDataMgmt: '<span>أساسيات إدارة بيانات سحابية</span>',
      skillGoogleServices: '<span>ربط التطبيقات بخدمات Google</span>',
      skillCatGeneralTech: '<i class="fas fa-cogs"></i> مهارات تقنية عامة',
      skillPythonJava: '<span>Python, Java</span>',
      skillExcelAnalysis: '<span>تحليل بيانات بـ Excel</span>',
      experienceTitle: 'الخبرات العملية والتدريب',
      expInternships: '<i class="fas fa-industry"></i> تدريب صيفي مع شركات عالمية',
      expInternCompanies: 'OpenAI، Intel، L’Oréal، BlackRock Talent Community',
      expTravelAgent: '<i class="fas fa-plane"></i> وكيل سفر (سنتان)',
      expTravelDetails: 'استخدام Amadeus Selling Platform، إدارة حجوزات وعملاء.',
      expUniProjects: '<i class="fas fa-users-cog"></i> مشاريع ومبادرات جامعية',
      expUniDetails: 'عضو نشط في مجتمعات التقنية والبرمجة، تقديم مشاريع رقمية.',
      projectsTitle: 'المشاريع والإنجازات',
      projectPortfolioSite: '<i class="fas fa-id-card-alt"></i> موقع شخصي ومحفظة رقمية (AI Portfolio)',
      projectPortfolioSiteDesc: 'تصميم وتنفيذ موقع تفاعلي بثيم فضائي-كريبتو، قسم تحميل ديناميكي، بطاقة سيرة ذاتية ذكية، ألوان نيون، تصميم متجاوب، وأيقونات مبتكرة.',
      projectLiveDemo: '<i class="fas fa-external-link-square-alt"></i> عرض مباشر',
      projectRepo: '<i class="fab fa-github-square"></i> المستودع',
      projectLiveDemoTitlePortfolio: 'عرض الموقع',
      projectRepoTitlePortfolio: 'مستودع جيت هاب',
      projectCharity: '<i class="fas fa-tint"></i> مشروع Landing Page لـ Charity: Water',
      projectCharityDescNew: 'بناء صفحة هبوط متكاملة بأسلوب Storytelling حديث، دمج عناصر تفاعلية وتجربة مستخدم احترافية.',
      projectPersonal: '<i class="fas fa-lightbulb"></i> مشاريع شخصية وتجريبية متنوعة',
      projectPersonalDesc: 'تطوير صفحات هبوط، أنظمة تسجيل دخول متقدمة، وبوتات دردشة AI.',
      personalInfoTitle: 'المعلومات الشخصية',
      birthDateLabel: 'تاريخ الميلاد:',
      birthDateValue: '10 يوليو 1999',
      ageLabel: 'العمر:',
      ageValue: '{age} سنة',
      birthPlaceLabel: 'مكان الميلاد:',
      birthPlaceValue: 'سوريا',
      residencyLabel: 'الإقامة:',
      residencyValue: '18 سنة في الكويت، 7 سنوات في أتلانتا (الولايات المتحدة)، سنة واحدة في القاهرة',
      chatbotTitle: "أمريكي AI",
      chatbotHeader: 'مساعد افتراضي',
      chatbotSend: 'إرسال',
      chatbotToggleTitle: 'فتح المساعد',
      chatbotCloseTitle: 'إغلاق المساعد',
      chatbotInputPlaceholder: 'اكتب رسالتك هنا...',
      pageTitle: "محمد H عبدالعزيز | أمريكي - ملف أعمال",
      emailTitle: "البريد الإلكتروني",
      linkedinTitle: "لينكدإن",
      githubTitle: "جيت هاب",
      downloadCV: 'تحميل السيرة الذاتية',
      podcastTitle: "🎧 بودكاست", // ترجمة جديدة لعنوان قسم البودكاست
      podcastDescription: "استمع إلى أحدث حلقات البودكاست الخاصة بي حول التكنولوجيا، العملات الرقمية، والمزيد!", // ترجمة جديدة لوصف البودكاست
      listenNow: "استمع الآن" // ترجمة جديدة لرابط الاستماع
    }
  };

  // --- Function to apply translations to the page ---
  function applyTranslations(lang) {
    const birthDateForAgeCalc = "1999-07-10"; // Birthdate in YYYY-MM-DD format for age calculation
    const calculatedAge = calculateAge(birthDateForAgeCalc);

    // Translate elements with 'data-translate' attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
        let translationText = translations[lang][key];
        // Handle dynamic age replacement
        if (key === 'ageValue' && calculatedAge !== null) {
          translationText = translationText.replace('{age}', calculatedAge);
        }

        // If element contains HTML (like an icon), use innerHTML to preserve it
        // Also check for SPAN or P tags that might contain nested elements handled by translations
        if (el.innerHTML.includes('<i class') || el.tagName === 'SPAN' || (el.tagName === 'P' && el.children.length > 0 && !el.getAttribute('data-translate-simple-text'))) {
             el.innerHTML = translationText;
        } else {
             el.textContent = translationText; // For simple text content
        }
      }
    });

    // Translate title attributes
    document.querySelectorAll('[data-translate-title]').forEach(el => {
      const key = el.getAttribute('data-translate-title');
      if (translations[lang] && translations[lang][key]) el.title = translations[lang][key];
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
      const key = el.getAttribute('data-translate-placeholder');
      if (translations[lang] && translations[lang][key]) el.placeholder = translations[lang][key];
    });

    // Update page direction and language attribute
    if (htmlTag) {
        htmlTag.lang = lang;
        htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }

    // Update page title
    const pageTitleEl = document.getElementById('pageTitle');
    if (pageTitleEl && translations[lang] && translations[lang].pageTitle) {
        pageTitleEl.textContent = translations[lang].pageTitle;
    }

    // Update language toggle button text
    if (langToggleBtn && translations[lang] && translations[lang].langToggle) {
        langToggleBtn.textContent = translations[lang].langToggle;
    }
  }

  // --- Language Toggle Button Event Listener ---
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar'; // Toggle language
      applyTranslations(currentLang); // Apply new translations
    });
    applyTranslations(currentLang); // Apply initial translations on page load
  } else {
    console.error("Language toggle button (langToggleBtn) not found.");
  }


  // --- Chatbot Toggle Functionality ---
  if (chatbotToggleBtn && chatbotContainer && chatbotInput && chatbotMessages) {
    chatbotToggleBtn.addEventListener('click', () => {
      const isVisible = chatbotContainer.classList.toggle('visible');
      if (isVisible) {
        // Focus input shortly after container becomes visible to ensure it's ready
        setTimeout(() => chatbotInput.focus(), 100);
        // Add initial greeting if chat is empty
        if (chatbotMessages.children.length === 0) {
          const welcomeLang = htmlTag.lang || 'ar'; // Get current page language
          const greeting = welcomeLang === 'ar' ? "مرحباً! كيف يمكنني مساعدتك اليوم؟" : "Hello! How can I assist you today?";
          addMessageToChat(greeting, 'ai');
        }
      }
      // CSS handles display:none/flex based on .visible class
    });
  } else {
    // Log errors if essential chatbot elements are missing
    if (!chatbotToggleBtn) console.error("Chatbot toggle button (chatbotToggleBtn) not found.");
    if (!chatbotContainer) console.error("Chatbot container (chatbotContainer) not found.");
    if (!chatbotInput) console.error("Chatbot input field (chatbotInput) not found.");
    if (!chatbotMessages) console.error("Chatbot messages container (chatbotMessages) not found.");
  }

  // Chatbot Close Button
  if (chatbotCloseBtn && chatbotContainer) {
    chatbotCloseBtn.addEventListener('click', () => {
      chatbotContainer.classList.remove('visible');
    });
  } else {
     if (!chatbotCloseBtn) console.error("Chatbot close button (chatbotCloseBtn) not found.");
  }


  // --- Chatbot User Experience Enhancements ---

  // Close chatbot on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatbotContainer && chatbotContainer.classList.contains('visible')) {
      chatbotContainer.classList.remove('visible');
      if(chatbotInput) chatbotInput.blur(); // Remove focus from input
    }
  });

  // Send message on Enter key (if Shift is not pressed), allow Shift+Enter for newlines
  if (chatbotInput && chatbotSendBtn) {
    chatbotInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent default action (newline in textarea/input)
        const message = chatbotInput.value.trim();
        if (message) sendMessageToBackend(message); // Send message if not empty
      }
    });
  } else {
    if (!chatbotInput) console.error("Chatbot input field not found for 'Enter' key listener.");
  }

  // --- Chatbot Message Handling Functions ---

  // Show typing indicator in chat
  function showTypingIndicator() {
    if (!chatbotMessages) return null;
    const typingIndicatorElement = document.createElement('div');
    typingIndicatorElement.className = 'chat-message ai-message typing-indicator';
    typingIndicatorElement.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    chatbotMessages.appendChild(typingIndicatorElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
    return typingIndicatorElement;
  }

  // Add a message to the chat interface
  function addMessageToChat(message, sender, isError = false) {
    if (!chatbotMessages) return;
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    if (isError) {
      messageElement.classList.add('error-message');
    } else {
      messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    }
    messageElement.textContent = message; // Use textContent to prevent XSS from message content
    chatbotMessages.appendChild(messageElement);
    // Scroll to the new message smoothly
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  // Send message to backend and handle response
  async function sendMessageToBackend(message) {
    // Ensure all necessary chatbot UI elements are available
    if (!chatbotInput || !chatbotSendBtn || !chatbotMessages) {
        console.error("Cannot send message: Essential chatbot UI elements are missing.");
        addMessageToChat("Chat interface is not fully loaded. Please refresh.", "ai", true);
        return;
    }

    addMessageToChat(message, 'user'); // Display user's message
    chatbotInput.value = ''; // Clear input field
    chatbotInput.disabled = true;  // Disable input and send button during request
    chatbotSendBtn.disabled = true;
    const typingElement = showTypingIndicator(); // Show typing indicator

    try {
      const response = await fetch(chatbotBackendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message }) // Send message as JSON
      });

      // Remove typing indicator once response is received (or error occurs)
      if (typingElement && chatbotMessages.contains(typingElement)) {
        chatbotMessages.removeChild(typingElement);
      }

      if (!response.ok) {
        // Attempt to get more detailed error message from server response
        let errorData = `Server responded with status: ${response.status}`;
        try {
            const serverErrorText = await response.text();
            if (serverErrorText) errorData += ` - ${serverErrorText}`;
        } catch (e) { /* Ignore if cannot read error text */ }
        throw new Error(`Network response was not ok: ${errorData}`);
      }

      const data = await response.json(); // Parse JSON response
      if (data && data.response) {
        addMessageToChat(data.response, 'ai'); // Display AI's response
      } else {
        throw new Error('Invalid response format from AI backend.');
      }
    } catch (error) {
      // Ensure typing indicator is removed in case of error too
      if (typingElement && chatbotMessages.contains(typingElement)) {
         chatbotMessages.removeChild(typingElement);
      }
      console.error('Chatbot Error:', error); // Log the full error to the console
      let errorText;
      const errorLang = htmlTag.lang || 'ar'; // Get current language for error message

      // Provide user-friendly error messages based on error type
      if (error.message.toLowerCase().includes('failed to fetch')) {
        errorText = errorLang === 'ar' ?
          'تعذر الاتصال بالخادم. يرجى التأكد أن الخادم يعمل وأن الاتصال بالإنترنت متاح.' :
          'Unable to connect to the assistant server. Please ensure the backend is running and your internet connection is active.';
      } else if (error.message.includes('Network response was not ok')) {
         errorText = errorLang === 'ar' ? `خطأ من الخادم: ${error.message.replace('Network response was not ok: ', '')}` : `Server error: ${error.message.replace('Network response was not ok: ', '')}`;
      } else {
        errorText = errorLang === 'ar' ? `خطأ في الاتصال بالمساعد: ${error.message}` : `Error connecting to assistant: ${error.message}`;
      }
      addMessageToChat(errorText, 'ai', true); // Display error message in chat
    } finally {
      // Re-enable input and send button, and refocus input field
      chatbotInput.disabled = false;
      chatbotSendBtn.disabled = false;
      chatbotInput.focus();
    }
  }

  // Send button click listener
  if (chatbotSendBtn && chatbotInput) {
    chatbotSendBtn.addEventListener('click', () => {
      const message = chatbotInput.value.trim();
      if (message) sendMessageToBackend(message); // Send message if not empty
    });
  } else {
     if (!chatbotSendBtn) console.error("Chatbot send button not found for click listener.");
  }


  // =========== AI Digital ID Card Functionality ===========
  // This class encapsulates the logic for the AI ID card feature.
  class AmrikyyAICard {
    constructor(containerId = 'ai-card-app-container') {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID '${containerId}' for AI Card not found.`);
            return;
        }

        this.state = {
            currentQuestionIndex: 0,
            answers: {},
            generatedCardData: null
        };

        this.questions = [
            {
                key: 'full_name',
                text: 'ما هو اسمك الكامل؟',
                type: 'text',
                placeholder: 'أدخل اسمك الكامل'
            },
            {
                key: 'email',
                text: 'ما هو بريدك الإلكتروني؟',
                type: 'email',
                placeholder: 'أدخل بريدك الإلكتروني'
            },
            {
                key: 'phone_number',
                text: 'ما هو رقم هاتفك (اختياري)؟',
                type: 'tel',
                placeholder: 'أدخل رقم هاتفك'
            },
            {
                key: 'interests',
                text: 'ما هي اهتماماتك الرئيسية؟',
                type: 'select',
                options: ['الذكاء الاصطناعي', 'التصميم الجرافيكي', 'ريادة الأعمال', 'تطوير الألعاب', 'الفنون والموسيقى', 'الرياضة واللياقة']
            },
            {
                key: 'personality_word',
                text: 'صِف نفسك بكلمة واحدة.',
                type: 'text',
                placeholder: 'مثال: مغامر، مبدع، تحليلي'
            },
            {
                key: 'learning_goal',
                text: 'ماذا تود أن تتعلمه في 2025؟',
                type: 'text',
                placeholder: 'مثال: مهارة تقنية جديدة، لغة، آلة موسيقية'
            },
            {
                key: 'mood',
                text: 'صف مزاجك اليوم؟',
                type: 'options_card', // نوع جديد لخيارات البطاقات
                isEmoji: true,
                options: ['😎 متفائل', '🤓 فضولي', '🚀 طموح', '🤔 متأمل', '😂 مرح', '💡 مبدع']
            }
        ];

        // Cache DOM elements
        this.heroSection = this.container.querySelector('#hero-section');
        this.quizSection = this.container.querySelector('#quiz-section');
        this.loadingSection = this.container.querySelector('#loading-section');
        this.resultSection = this.container.querySelector('#result-section');
        this.questionsContainer = this.container.querySelector('#questions-container');
        this.progressBar = this.container.querySelector('#progress-bar');
        this.cardContainer = this.container.querySelector('#card-container');
        this.copyLinkFeedback = this.container.querySelector('#copy-link-feedback');
        this.nextQuestionBtn = this.container.querySelector('#next-question-btn'); // زر التالي

        // Attach event listeners
        this.container.querySelector('#start-btn').addEventListener('click', () => this.startQuiz());
        this.nextQuestionBtn.addEventListener('click', () => this.nextQuestion()); // مستمع لزر التالي
        this.container.querySelector('#download-btn').addEventListener('click', () => this.handleDownload());
        this.container.querySelector('#share-twitter-btn').addEventListener('click', () => this.handleShareTwitter());
        this.container.querySelector('#copy-link-btn').addEventListener('click', () => this.handleCopyLink());
        this.container.querySelector('#restart-btn').addEventListener('click', () => this.handleRestart());

        // Initial render of questions (will be hidden until quiz starts)
        this.renderQuestions();
    }

    renderQuestions() {
        this.questionsContainer.innerHTML = '';
        const q = this.questions[this.state.currentQuestionIndex];
        const slide = document.createElement('div');
        slide.id = `question-${this.state.currentQuestionIndex}`;
        slide.className = `question-slide w-full`;

        let questionContent = '';

        if (q.type === 'text' || q.type === 'email' || q.type === 'tel') {
            questionContent = `
                <div class="mb-6">
                    <label for="${q.key}" class="block text-gray-300 text-sm font-bold mb-2">${q.text}</label>
                    <input type="${q.type}" id="${q.key}" name="${q.key}" placeholder="${q.placeholder}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700">
                </div>
            `;
            this.nextQuestionBtn.classList.remove('hidden'); // Show Next button for text/select inputs
        } else if (q.type === 'select') {
            let optionsHTML = q.options.map(option => `
                <option value="${option}">${option}</option>
            `).join('');
            questionContent = `
                <div class="mb-6">
                    <label for="${q.key}" class="block text-gray-300 text-sm font-bold mb-2">${q.text}</label>
                    <select id="${q.key}" name="${q.key}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 border-gray-700">
                        <option value="" disabled selected>اختر...</option>
                        ${optionsHTML}
                    </select>
                </div>
            `;
            this.nextQuestionBtn.classList.remove('hidden'); // Show Next button for text/select inputs
        } else if (q.type === 'options_card') {
            let optionsHTML = q.options.map(option => `
                <div class="option-card p-4 rounded-lg cursor-pointer bg-gray-800 text-center" data-question-key="${q.key}" data-answer="${option}">
                    <span class="${q.isEmoji ? 'text-4xl' : 'text-lg font-semibold'}">${option}</span>
                </div>
            `).join('');
            questionContent = `
                <div class="grid grid-cols-2 gap-4">
                    ${optionsHTML}
                </div>
            `;
            this.nextQuestionBtn.classList.add('hidden'); // Hide Next button for card options (auto-advances)
        }

        slide.innerHTML = `<h2 class="text-2xl md:text-3xl font-bold mb-6 text-center">${q.text}</h2>${questionContent}`;
        this.questionsContainer.appendChild(slide);
        this.addInputListeners();
    }

    addInputListeners() {
        const q = this.questions[this.state.currentQuestionIndex];
        if (q.type === 'text' || q.type === 'email' || q.type === 'tel' || q.type === 'select') {
            const inputElement = this.questionsContainer.querySelector(`[name="${q.key}"]`);
            if (inputElement) {
                inputElement.addEventListener('change', (event) => {
                    this.state.answers[q.key] = event.target.value;
                });
                inputElement.addEventListener('blur', (event) => {
                    this.state.answers[q.key] = event.target.value;
                });
            }
        } else if (q.type === 'options_card') {
            this.questionsContainer.querySelectorAll('.option-card').forEach(card => {
                card.addEventListener('click', () => {
                    const key = card.dataset.questionKey;
                    const answer = card.dataset.answer;
                    this.state.answers[key] = answer;
                    
                    this.questionsContainer.querySelectorAll(`[data-question-key="${key}"]`).forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');

                    setTimeout(() => this.nextQuestion(), 300); // Auto-advance for card options
                });
            });
        }
    }
    
    nextQuestion() {
        // Save current answer before advancing for text/select inputs
        const currentQ = this.questions[this.state.currentQuestionIndex];
        if ((currentQ.type === 'text' || currentQ.type === 'email' || currentQ.type === 'tel' || currentQ.type === 'select') && this.questionsContainer.querySelector(`[name="${currentQ.key}"]`)) {
            this.state.answers[currentQ.key] = this.questionsContainer.querySelector(`[name="${currentQ.key}"]`).value;
        }

        if (this.state.currentQuestionIndex < this.questions.length - 1) {
            const currentSlide = document.getElementById(`question-${this.state.currentQuestionIndex}`);
            currentSlide.classList.add('hidden-slide');
            
            this.state.currentQuestionIndex++;
            
            const nextSlide = document.getElementById(`question-${this.state.currentQuestionIndex}`);
            nextSlide.classList.remove('hidden-slide');

            const progressPercentage = ((this.state.currentQuestionIndex + 1) / this.questions.length) * 100;
            this.progressBar.style.width = `${progressPercentage}%`;
            this.renderQuestions(); // Re-render the new question
        } else {
            this.startGeneration();
        }
    }

    startQuiz() {
        // Hide main content and show AI card app container
        document.getElementById('main-content').classList.add('hidden');
        this.container.classList.remove('hidden');

        this.heroSection.classList.remove('hidden'); // Show hero section first
        this.quizSection.classList.add('hidden');
        this.loadingSection.classList.add('hidden');
        this.resultSection.classList.add('hidden');

        this.state.currentQuestionIndex = 0; // Reset quiz state
        this.state.answers = {};
        this.state.generatedCardData = null;
        this.progressBar.style.width = '0%';
        this.renderQuestions(); // Render the first question
    }

    async startGeneration() {
        this.quizSection.classList.add('hidden');
        this.loadingSection.classList.remove('hidden');

        try {
            // Send user data to your Replit backend
            const response = await fetch(aiCardBackendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.answers)
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error(`Backend error: ${response.status} - ${errorData}`);
                this.state.generatedCardData = this.generateMockCardData(this.state.answers); // Fallback
            } else {
                const result = await response.json();
                this.state.generatedCardData = result;
                // Ensure color_name is either 'blue' or 'purple' for CSS classes
                if (this.state.generatedCardData && this.state.generatedCardData.color_name && this.state.generatedCardData.color_name !== 'blue' && this.state.generatedCardData.color_name !== 'purple') {
                    this.state.generatedCardData.color_name = 'blue'; // Fallback
                }
            }
        } catch (error) {
            console.error("Error sending data to backend:", error);
            this.state.generatedCardData = this.generateMockCardData(this.state.answers); // Fallback
        }

        this.renderCard();
        this.loadingSection.classList.add('hidden');
        this.resultSection.classList.remove('hidden');
    }

    // Fallback or initial mock data generation (if API fails)
    generateMockCardData(answers) {
        const firstName = answers.full_name ? answers.full_name.split(' ')[0] : 'المستكشف';
        const defaultMoodEmoji = answers.mood ? answers.mood.split(' ')[0] : '😎'; // Get just the emoji
        const defaultColor = defaultMoodEmoji === '🤓' || defaultMoodEmoji === '🤔' || defaultMoodEmoji === '💡' ? {name: 'purple', hex: '#A855F7'} : {name: 'blue', hex: '#3B82F6'};

        return {
            nickname: `الرائد ${firstName}`,
            analysis: 'شخصية فريدة تجمع بين الطموح وحب الاستكشاف الرقمي.',
            ai_message: 'استمر في شغفك، فالمستقبل يحتاج لأمثالك!',
            color_name: defaultColor.name,
            color_hex: defaultColor.hex,
            avatar_description: `أفاتار يعكس مزاج ${defaultMoodEmoji}`
        };
    }
    
    renderCard() {
        const data = this.state.generatedCardData;
        // Extract just the emoji from the mood string if it contains text
        const avatarEmoji = data.avatar_description ? data.avatar_description.split(' ')[0] : '✨';
        const cardHTML = `
            <div id="digital-card" class="bg-gray-800 rounded-2xl p-6 md:p-8 relative overflow-hidden border-2 border-gray-700 card-shadow-${data.color_name}">
                <div class="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-${data.color_name}-500/20 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-${data.color_name}-500/20 rounded-full blur-3xl"></div>
                
                <div class="relative z-10 text-center">
                    <img src="https://placehold.co/100x100/1F2937/FFFFFF?text=${encodeURIComponent(avatarEmoji)}" alt="Avatar" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-600 shadow-lg">
                    <h2 class="text-3xl font-extrabold neon-glow neon-glow-${data.color_name}">${data.nickname}</h2>
                    <p class="text-gray-300 mt-4 text-lg">${data.analysis}</p>
                    
                    <div class="my-6 h-px bg-gray-600"></div>

                    <div class="bg-gray-900/50 p-4 rounded-lg">
                       <h4 class="text-sm font-bold text-gray-400 mb-2">رسالة الـ AI لك</h4>
                       <p class="text-white italic">"${data.ai_message}"</p>
                    </div>
                    
                    <div class="mt-6 flex justify-between items-center bg-gray-900/50 p-3 rounded-lg">
                       <div class="text-right">
                           <p class="text-xs text-gray-400">هويتك الرقمية الفريدة</p>
                           <p class="text-sm font-semibold text-white">Amrikyy.me/AI</p>
                       </div>
                       <canvas id="qr-canvas"></canvas>
                    </div>
                </div>
            </div>
        `;
        this.cardContainer.innerHTML = cardHTML;
        new QRious({
            element: document.getElementById('qr-canvas'),
            value: data.qr_link || `https://amrikyy.me/id/${Math.random().toString(36).substring(2, 9)}`,
            background: 'transparent',
            foreground: data.color_hex,
            size: 80,
            level: 'H'
        });
    }
    
    handleDownload() {
        alert('لتحميل البطاقة، يرجى أخذ لقطة شاشة. نعمل على تطوير ميزة التحميل المباشر!');
    }
    
    handleShareTwitter() {
        const data = this.state.generatedCardData;
        const text = `واو! اكتشفت هويتي الرقمية على @Amrikyy! أنا "${data.nickname}". تحدّى أصدقائك يكتشفوا هويتهم! #هوية_رقمية_AI`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(data.qr_link || 'https://amrikyy.me')}`;
        window.open(url, '_blank');
    }

    handleCopyLink() {
        const data = this.state.generatedCardData;
        const linkToCopy = data.qr_link || `https://amrikyy.me/id/${Math.random().toString(36).substring(2, 9)}`;
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = linkToCopy;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        this.copyLinkFeedback.textContent = 'تم نسخ الرابط بنجاح!';
        setTimeout(() => { this.copyLinkFeedback.textContent = ''; }, 2000);
    }

    handleRestart() {
        this.state.currentQuestionIndex = 0;
        this.state.answers = {};
        this.state.generatedCardData = null;
        this.resultSection.classList.add('hidden');
        this.heroSection.classList.remove('hidden');
        this.quizSection.classList.add('hidden'); // تأكد من إخفاء قسم الاختبار أيضًا
        this.container.classList.add('hidden'); // إخفاء حاوية تطبيق البطاقة بالكامل
        document.getElementById('main-content').classList.remove('hidden'); // إظهار المحتوى الرئيسي
        this.progressBar.style.width = '0%';
        this.renderQuestions(); // إعادة عرض السؤال الأول
    }
  }
  
  // Initialize the AmrikyyAICard instance when the DOM is fully loaded
  let amrikyyAICardInstance;
  document.addEventListener('DOMContentLoaded', () => {
      amrikyyAICardInstance = new AmrikyyAICard();
  });

  // Expose a global function for the chatbot to call
  window.startAmrikyyAICardQuiz = () => {
      if (amrikyyAICardInstance) {
          amrikyyAICardInstance.startQuiz();
      } else {
          console.error("AmrikyyAICard instance not initialized yet. Retrying in 100ms...");
          setTimeout(window.startAmrikyyAICardQuiz, 100);
      }
  };

}); // End of DOMContentLoaded
