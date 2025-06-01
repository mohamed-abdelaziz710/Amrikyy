// Ensure all scripts run after the DOM is fully loaded
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
      listenNow: "Listen Now", // New translation for listen now link
      // AI ID Card Translations
      aiIdCardTitle: "AI Digital ID Card",
      aiIdCardIntro: "Discover your unique AI-generated digital identity!",
      startAiIdCardBtn: "Discover Your Identity Now ✨",
      fullNameLabel: "Full Name:",
      fullNamePlaceholder: "Enter your full name",
      emailLabel: "Email:",
      emailPlaceholder: "Enter your email",
      phoneLabel: "Phone (optional):",
      phonePlaceholder: "Enter your phone number",
      interestsLabel: "Your Interests (select up to 3):",
      techInterest: "Technology",
      cryptoInterest: "Cryptocurrency",
      entrepreneurshipInterest: "Entrepreneurship",
      aiInterest: "Artificial Intelligence",
      cybersecurityInterest: "Cybersecurity",
      digitalArtInterest: "Digital Art",
      musicInterest: "Music",
      travelInterest: "Travel",
      gamingInterest: "Gaming",
      personalityWordLabel: "One word to describe yourself:",
      personalityWordPlaceholder: "Example: Creative, Ambitious, Calm",
      learningGoalLabel: "What do you want to learn in 2025?",
      learningGoalPlaceholder: "Example: Programming, new language, investing",
      moodLabel: "Your mood today?",
      prevBtn: "Previous",
      nextBtn: "Next",
      generateCardBtn: "Generate My Card!",
      loadingMessage: "Generating your unique digital identity...",
      viewCardLink: "View My Card",
      downloadCardBtn: '<i class="fas fa-download"></i> Download Card',
      shareCardBtn: '<i class="fas fa-share-alt"></i> Share',
      resetCardBtn: '<i class="fas fa-redo-alt"></i> Create Another'
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
      listenNow: "استمع الآن", // ترجمة جديدة لرابط الاستماع
      // AI ID Card Translations
      aiIdCardTitle: "بطاقة الهوية الرقمية AI",
      aiIdCardIntro: "اكتشف هويتك الرقمية الفريدة التي تم إنشاؤها بواسطة الذكاء الاصطناعي!",
      startAiIdCardBtn: "اكتشف هويتك الآن ✨",
      fullNameLabel: "الاسم الكامل:",
      fullNamePlaceholder: "أدخل اسمك الكامل",
      emailLabel: "البريد الإلكتروني:",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      phoneLabel: "رقم الهاتف (اختياري):",
      phonePlaceholder: "أدخل رقم هاتفك",
      interestsLabel: "اهتماماتك (اختر ما يصل إلى 3):",
      techInterest: "التكنولوجيا",
      cryptoInterest: "العملات الرقمية",
      entrepreneurshipInterest: "ريادة الأعمال",
      aiInterest: "الذكاء الاصطناعي",
      cybersecurityInterest: "الأمن السيبراني",
      digitalArtInterest: "الفن الرقمي",
      musicInterest: "الموسيقى",
      travelInterest: "السفر",
      gamingInterest: "الألعاب",
      personalityWordLabel: "كلمة تصف شخصيتك:",
      personalityWordPlaceholder: "مثال: مبدع، طموح، هادئ",
      learningGoalLabel: "ماذا تريد أن تتعلمه في 2025؟",
      learningGoalPlaceholder: "مثال: برمجة، لغة جديدة، استثمار",
      moodLabel: "مزاجك اليوم؟",
      prevBtn: "السابق",
      nextBtn: "التالي",
      generateCardBtn: "أنشئ بطاقتي!",
      loadingMessage: "يتم إنشاء هويتك الرقمية الفريدة...",
      viewCardLink: "عرض بطاقتي",
      downloadCardBtn: '<i class="fas fa-download"></i> تحميل البطاقة',
      shareCardBtn: '<i class="fas fa-share-alt"></i> مشاركة',
      resetCardBtn: '<i class="fas fa-redo-alt"></i> إنشاء واحدة أخرى'
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
    if (!chatbotMessages) {
        console.error("Cannot show typing indicator: chatbotMessages element not found.");
        return null;
    }
    const typingIndicatorElement = document.createElement('div');
    typingIndicatorElement.className = 'chat-message ai-message typing-indicator';
    typingIndicatorElement.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    chatbotMessages.appendChild(typingIndicatorElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
    return typingIndicatorElement;
  }

  // Add a message to the chat interface
  function addMessageToChat(message, sender, isError = false) {
    if (!chatbotMessages) {
        console.error("Cannot add message: chatbotMessages element not found.");
        return;
    }
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
          'تعذر الاتصال بالخادم. يرجى التأكد أن الخادم يعمل وأن الاتصال بالإنترنت متاح. (خطأ في الاتصال بالشبكة)' :
          'Unable to connect to the assistant server. Please ensure the backend is running and your internet connection is active. (Network connection error)';
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
  class AmrikyyAICard {
    constructor() {
        this.aiCardSection = document.getElementById('ai-id-card-section');
        this.introSection = document.getElementById('ai-id-card-intro');
        this.quizSection = document.getElementById('ai-id-card-quiz');
        this.loadingSection = document.getElementById('ai-id-card-loading');
        this.resultSection = document.getElementById('ai-id-card-result');
        this.mainContent = document.getElementById('cv-section'); // CV section container

        this.startBtn = document.getElementById('startAiIdCardBtn');
        this.quizQuestionEl = document.getElementById('quizQuestion');
        this.currentQuestionNumEl = document.getElementById('currentQuestionNum');
        this.totalQuestionsNumEl = document.getElementById('totalQuestionsNum');
        this.prevQuizBtn = document.getElementById('prevQuizBtn');
        this.nextQuizBtn = document.getElementById('nextQuizBtn');
        this.generateCardBtn = document.getElementById('generateCardBtn');

        this.cardAvatar = document.getElementById('cardAvatar');
        this.cardNickname = document.getElementById('cardNickname');
        this.cardAnalysis = document.getElementById('cardAnalysis');
        this.cardAiMessage = document.getElementById('cardAiMessage');
        this.cardQrCode = document.getElementById('cardQrCode');
        this.cardLink = document.getElementById('cardLink');

        this.downloadCardBtn = document.getElementById('downloadCardBtn');
        this.shareCardBtn = document.getElementById('shareCardBtn');
        this.resetCardBtn = document.getElementById('resetCardBtn');

        this.quizSteps = [
            { id: 'quizStep1', question: 'ما هو اسمك الكامل؟', inputId: 'fullNameInput', type: 'text', key: 'full_name' },
            { id: 'quizStep2', question: 'ما هو بريدك الإلكتروني؟', inputId: 'emailInput', type: 'email', key: 'email' },
            { id: 'quizStep3', question: 'ما هو رقم هاتفك (اختياري)؟', inputId: 'phoneInput', type: 'tel', key: 'phone_number' },
            { id: 'quizStep4', question: 'ما هي اهتماماتك الرئيسية؟ (اختر ما يصل إلى 3)', type: 'interests', key: 'interests' },
            { id: 'quizStep5', question: 'صِف نفسك بكلمة واحدة.', inputId: 'personalityWordInput', type: 'text', key: 'personality_word' },
            { id: 'quizStep6', question: 'ماذا تود أن تتعلمه في 2025؟', inputId: 'learningGoalInput', type: 'text', key: 'learning_goal' },
            { id: 'quizStep7', question: 'صف مزاجك اليوم؟', type: 'mood', key: 'mood' }
        ];

        this.currentStep = 0;
        this.answers = {};
        this.selectedInterests = [];
        this.maxInterests = 3;

        this.initListeners();
        this.showSection(this.introSection); // Start with intro section
        if (this.totalQuestionsNumEl) {
            this.totalQuestionsNumEl.textContent = this.quizSteps.length;
        } else {
            console.error("totalQuestionsNum element not found.");
        }
    }

    initListeners() {
        if (this.startBtn) this.startBtn.addEventListener('click', () => this.startQuiz());
        else console.error("startAiIdCardBtn not found.");

        if (this.nextQuizBtn) this.nextQuizBtn.addEventListener('click', () => this.handleNext());
        else console.error("nextQuizBtn not found.");

        if (this.prevQuizBtn) this.prevQuizBtn.addEventListener('click', () => this.handlePrev());
        else console.error("prevQuizBtn not found.");

        if (this.generateCardBtn) this.generateCardBtn.addEventListener('click', () => this.generateCard());
        else console.error("generateCardBtn not found.");

        if (this.resetCardBtn) this.resetCardBtn.addEventListener('click', () => this.resetQuiz());
        else console.error("resetCardBtn not found.");

        // Attach listeners for interests and mood options
        document.querySelectorAll('.interest-tag').forEach(tag => {
            tag.addEventListener('click', (e) => this.toggleInterest(e.target));
        });
        document.querySelectorAll('.emoji-option').forEach(emoji => {
            emoji.addEventListener('click', (e) => this.selectMood(e.target));
        });

        if (this.downloadCardBtn) this.downloadCardBtn.addEventListener('click', () => this.handleDownload());
        else console.error("downloadCardBtn not found.");

        if (this.shareCardBtn) this.shareCardBtn.addEventListener('click', () => this.handleShare());
        else console.error("shareCardBtn not found.");
    }

    showSection(sectionToShow) {
        // Hide all main sections first
        if (this.introSection) this.introSection.classList.add('hidden');
        if (this.quizSection) this.quizSection.classList.add('hidden');
        if (this.loadingSection) this.loadingSection.classList.add('hidden');
        if (this.resultSection) this.resultSection.classList.add('hidden');
        
        // Show the requested section
        if (sectionToShow) sectionToShow.classList.remove('hidden');
        else console.error("Attempted to show a null section.");
    }

    startQuiz() {
        if (this.mainContent) this.mainContent.classList.add('hidden'); // Hide CV section
        if (this.aiCardSection) this.aiCardSection.classList.remove('hidden'); // Show AI card app container
        this.showSection(this.quizSection);
        this.currentStep = 0;
        this.answers = {};
        this.selectedInterests = [];
        this.renderQuizStep();
    }

    renderQuizStep() {
        // Hide all quiz steps
        document.querySelectorAll('.quiz-step').forEach(step => step.classList.add('hidden'));

        const stepData = this.quizSteps[this.currentStep];
        const currentStepEl = document.getElementById(stepData.id);
        if (currentStepEl) {
            currentStepEl.classList.remove('hidden');
            if (this.quizQuestionEl) this.quizQuestionEl.textContent = stepData.question;
            if (this.currentQuestionNumEl) this.currentQuestionNumEl.textContent = this.currentStep + 1;

            // Handle input values
            if (stepData.inputId) {
                const inputEl = document.getElementById(stepData.inputId);
                if (inputEl) {
                    inputEl.value = this.answers[stepData.key] || '';
                } else {
                    console.error(`Input element with ID '${stepData.inputId}' not found for step '${stepData.id}'.`);
                }
            }

            // Handle interests
            if (stepData.type === 'interests') {
                document.querySelectorAll('.interest-tag').forEach(tag => {
                    if (this.selectedInterests.includes(tag.dataset.interest)) {
                        tag.classList.add('selected');
                    } else {
                        tag.classList.remove('selected');
                    }
                });
            }

            // Handle mood
            if (stepData.type === 'mood') {
                document.querySelectorAll('.emoji-option').forEach(emoji => {
                    if (this.answers[stepData.key] === emoji.dataset.mood) {
                        emoji.classList.add('selected');
                    } else {
                        emoji.classList.remove('selected');
                    }
                });
            }
        } else {
            console.error(`Quiz step element with ID '${stepData.id}' not found.`);
        }

        this.updateNavigationButtons();
    }

    updateNavigationButtons() {
        if (this.prevQuizBtn) this.prevQuizBtn.classList.toggle('hidden', this.currentStep === 0);
        if (this.nextQuizBtn) this.nextQuizBtn.classList.toggle('hidden', this.currentStep === this.quizSteps.length - 1);
        if (this.generateCardBtn) this.generateCardBtn.classList.toggle('hidden', this.currentStep !== this.quizSteps.length - 1);

        // Update progress bar
        if (progressBar) {
            const progressPercentage = ((this.currentStep + 1) / this.quizSteps.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    handleNext() {
        const stepData = this.quizSteps[this.currentStep];
        // Save current answer before moving
        if (stepData.inputId) {
            const inputEl = document.getElementById(stepData.inputId);
            if (inputEl) {
                this.answers[stepData.key] = inputEl.value.trim();
            }
        } else if (stepData.type === 'interests') {
            this.answers[stepData.key] = this.selectedInterests;
        } else if (stepData.type === 'mood') {
            // Mood is already saved by selectMood function
        }

        // Basic validation (can be enhanced)
        if (stepData.key !== 'phone_number') { // Phone is optional
            if (stepData.type === 'text' || stepData.type === 'email') {
                if (!this.answers[stepData.key]) {
                    alert('الرجاء إدخال قيمة لهذا الحقل.'); // Use custom modal in production
                    return;
                }
            } else if (stepData.type === 'interests' && this.selectedInterests.length === 0) {
                alert('الرجاء اختيار اهتمام واحد على الأقل.'); // Use custom modal
                return;
            } else if (stepData.type === 'mood' && !this.answers[stepData.key]) {
                alert('الرجاء اختيار مزاجك اليوم.'); // Use custom modal
                return;
            }
        }


        if (this.currentStep < this.quizSteps.length - 1) {
            this.currentStep++;
            this.renderQuizStep();
        }
    }

    handlePrev() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderQuizStep();
        }
    }

    toggleInterest(tagElement) {
        const interest = tagElement.dataset.interest;
        const index = this.selectedInterests.indexOf(interest);

        if (index > -1) {
            this.selectedInterests.splice(index, 1);
            tagElement.classList.remove('selected');
        } else {
            if (this.selectedInterests.length < this.maxInterests) {
                this.selectedInterests.push(interest);
                tagElement.classList.add('selected');
            } else {
                alert(`يمكنك اختيار ما يصل إلى ${this.maxInterests} اهتمامات فقط.`); // Use custom modal
            }
        }
        this.answers.interests = this.selectedInterests; // Update answers object
    }

    selectMood(emojiElement) {
        const mood = emojiElement.dataset.mood;
        document.querySelectorAll('.emoji-option').forEach(el => el.classList.remove('selected'));
        emojiElement.classList.add('selected');
        this.answers.mood = mood;
        // Auto-advance for mood selection
        setTimeout(() => this.handleNext(), 300);
    }

    async generateCard() {
        // Final save of current answer if it's the last step
        const stepData = this.quizSteps[this.currentStep];
        if (stepData.inputId) {
            const inputEl = document.getElementById(stepData.inputId);
            if (inputEl) {
                this.answers[stepData.key] = inputEl.value.trim();
            }
        } else if (stepData.type === 'interests') {
            this.answers[stepData.key] = this.selectedInterests;
        } else if (stepData.type === 'mood') {
            // Mood is already saved
        }

        // Basic final validation
        for (const step of this.quizSteps) {
            if (step.key !== 'phone_number') { // Phone is optional
                if (step.type === 'text' || step.type === 'email') {
                    if (!this.answers[step.key]) {
                        alert(`الرجاء إدخال ${translations[currentLang][`${step.key}Label`] || step.question}`);
                        this.currentStep = this.quizSteps.findIndex(q => q.key === step.key);
                        this.renderQuizStep();
                        return;
                    }
                } else if (step.type === 'interests' && this.answers.interests.length === 0) {
                    alert(translations[currentLang].interestsLabel);
                    this.currentStep = this.quizSteps.findIndex(q => q.key === step.key);
                    this.renderQuizStep();
                    return;
                } else if (step.type === 'mood' && !this.answers.mood) {
                    alert(translations[currentLang].moodLabel);
                    this.currentStep = this.quizSteps.findIndex(q => q.key === step.key);
                    this.renderQuizStep();
                    return;
                }
            }
        }

        this.showSection(this.loadingSection);

        try {
            const response = await fetch(aiCardBackendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.answers)
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error(`Backend error: ${response.status} - ${errorData}`);
                // Fallback to mock data on error
                this.generatedCardData = this.generateMockCardData(this.answers);
                alert(`حدث خطأ أثناء إنشاء البطاقة: ${errorData}. سيتم عرض بطاقة تجريبية.`); // Use custom modal
            } else {
                this.generatedCardData = await response.json();
                // Ensure color_name is either 'blue' or 'purple' for CSS classes
                if (this.generatedCardData && this.generatedCardData.color_name && this.generatedCardData.color_name !== 'blue' && this.generatedCardData.color_name !== 'purple') {
                    this.generatedCardData.color_name = 'blue'; // Fallback
                }
            }
        } catch (error) {
            console.error("Error sending data to backend:", error);
            // Fallback to mock data on network error
            this.generatedCardData = this.generateMockCardData(this.answers);
            alert(`تعذر الاتصال بخادم الذكاء الاصطناعي. سيتم عرض بطاقة تجريبية. (خطأ في الاتصال بالشبكة: ${error.message})`); // Use custom modal
        }

        this.renderGeneratedCard();
        this.showSection(this.resultSection);
    }

    generateMockCardData(answers) {
        const firstName = answers.full_name ? answers.full_name.split(' ')[0] : 'المستكشف';
        const defaultMoodEmoji = answers.mood ? answers.mood.split(' ')[0] : '😎'; // Get just the emoji
        const defaultColor = (defaultMoodEmoji === '🤓' || defaultMoodEmoji === '🤔' || defaultMoodEmoji === '💡') ? {name: 'purple', hex: '#b600ff'} : {name: 'blue', hex: '#00d4ff'};

        return {
            nickname: `الرائد ${firstName}`,
            analysis: 'شخصية فريدة تجمع بين الطموح وحب الاستكشاف الرقمي، دائمًا ما تبحث عن الجديد والمثير في عالم التكنولوجيا.',
            ai_message: 'استمر في شغفك، فالمستقبل يحتاج لأمثالك! اجعل كل يوم فرصة للتعلم والنمو.',
            color_name: defaultColor.name,
            color_hex: defaultColor.hex,
            avatar_description: defaultMoodEmoji, // Just the emoji for placeholder
            qr_link: 'https://amrikyy.me/ai-id-card-demo' // Demo link for mock data
        };
    }

    renderGeneratedCard() {
        const data = this.generatedCardData;
        if (!data) {
            console.error("No generated card data to render.");
            return;
        }

        if (this.cardAvatar) this.cardAvatar.src = `https://placehold.co/100x100/${data.color_hex.substring(1)}/000?text=${encodeURIComponent(data.avatar_description || 'AI')}`;
        if (this.cardNickname) this.cardNickname.textContent = data.nickname;
        if (this.cardAnalysis) this.cardAnalysis.textContent = data.analysis;
        if (this.cardAiMessage) this.cardAiMessage.textContent = data.ai_message;

        // Update card display style based on generated color
        const cardDisplay = this.resultSection ? this.resultSection.querySelector('.generated-card-display') : null;
        if (cardDisplay) {
            // Remove previous color classes
            cardDisplay.classList.remove('border-blue-500', 'border-purple-500', 'border-green-500', 'border-pink-500');
            cardDisplay.style.borderColor = data.color_hex; // Apply dynamic border color
            cardDisplay.style.boxShadow = `0 0 15px ${data.color_hex}`; // Apply dynamic shadow
            
            const nicknameEl = cardDisplay.querySelector('h3');
            if (nicknameEl) {
                nicknameEl.style.color = data.color_hex; // Nickname color
                nicknameEl.style.textShadow = `0 0 10px ${data.color_hex}`; // Nickname shadow
            } else {
                console.warn("Nickname element (h3) not found in generated card display.");
            }

            const avatarDisplayEl = cardDisplay.querySelector('.card-avatar-display');
            if (avatarDisplayEl) {
                avatarDisplayEl.style.borderColor = data.color_hex; // Avatar border
                avatarDisplayEl.style.boxShadow = `0 0 15px ${data.color_hex}`; // Avatar shadow
            } else {
                console.warn("Avatar display element not found in generated card display.");
            }

            const cardLinkDisplayEl = cardDisplay.querySelector('.card-link-display');
            if (cardLinkDisplayEl) {
                cardLinkDisplayEl.style.color = data.color_hex; // Link color
            } else {
                console.warn("Card link display element not found in generated card display.");
            }
            
            // Update the conic gradient for the border animation
            let beforePseudoStyle = cardDisplay.querySelector('style#card-border-style');
            if (!beforePseudoStyle) {
                beforePseudoStyle = document.createElement('style');
                beforePseudoStyle.id = 'card-border-style';
                cardDisplay.appendChild(beforePseudoStyle);
            }
            beforePseudoStyle.textContent = `
                .generated-card-display::before {
                    background: conic-gradient(from 0deg at 50% 50%, ${data.color_hex} 0%, transparent 25%, transparent 75%, ${data.color_hex} 100%);
                }
            `;
        } else {
            console.error("Generated card display element not found in result section.");
        }


        // Generate QR Code
        if (this.cardQrCode) {
            new QRious({
                element: this.cardQrCode,
                value: data.qr_link || window.location.href, // Fallback to current page
                size: 80,
                background: 'transparent',
                foreground: data.color_hex,
                level: 'H'
            });
        } else {
            console.error("cardQrCode element not found.");
        }
        
        if (this.cardLink) {
            this.cardLink.href = data.qr_link || window.location.href;
        } else {
            console.error("cardLink element not found.");
        }
    }

    handleDownload() {
        alert('لتحميل البطاقة، يرجى أخذ لقطة شاشة. نعمل على تطوير ميزة التحميل المباشر!');
    }

    handleShare() {
        const data = this.generatedCardData;
        if (!data) {
            alert("لا توجد بيانات بطاقة للمشاركة.");
            return;
        }

        const shareText = `واو! اكتشفت هويتي الرقمية الفريدة على Amrikyy! أنا "${data.nickname}". تحدّى أصدقاءك يكتشفوا هويتهم! #هوية_رقمية_AI #Amrikyy`;
        const shareUrl = data.qr_link || window.location.href;

        if (navigator.share) {
            navigator.share({
                title: 'هويتي الرقمية AI من Amrikyy',
                text: shareText,
                url: shareUrl,
            }).catch((error) => console.error('Error sharing:', error));
        } else {
            // Fallback for browsers that do not support Web Share API
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            window.open(twitterUrl, '_blank');
            alert('Web Share API غير مدعوم في متصفحك. يمكنك مشاركة الرابط على تويتر أو نسخه يدوياً.');
        }
    }

    resetQuiz() {
        this.currentStep = 0;
        this.answers = {};
        this.selectedInterests = [];
        this.generatedCardData = null;
        this.showSection(this.introSection); // Go back to intro screen
        if (this.mainContent) this.mainContent.classList.remove('hidden'); // Show CV section again
        if (this.aiCardSection) this.aiCardSection.classList.add('hidden'); // Hide AI card app container
        
        document.querySelectorAll('.interest-tag').forEach(tag => tag.classList.remove('selected'));
        document.querySelectorAll('.emoji-option').forEach(emoji => emoji.classList.remove('selected'));
        
        if (progressBar) {
            progressBar.style.width = '0%'; // Reset progress bar
        }
    }
  }

  // Initialize the AmrikyyAICard instance
  const amrikyyAICardInstance = new AmrikyyAICard();

  // Expose a global function for the chatbot to call (if needed)
  window.startAmrikyyAICardQuiz = () => {
      amrikyyAICardInstance.startQuiz();
  };

  // ====== Enhanced 3D Space-Bitcoin-Tech Micro Animations Background (Realistic & Immersive) ======
  // Moved this entire section inside DOMContentLoaded to ensure elements are available
  const animationsContainer = document.getElementById('page-background-animations');
  if (!animationsContainer) {
    console.error("Element with ID 'page-background-animations' not found. Canvas background will not be rendered.");
    return; // Exit if container not found
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'space-bg-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-2';
  canvas.style.pointerEvents = 'auto'; // Allow mouse events on canvas
  canvas.style.opacity = '0.8';
  animationsContainer.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("2D context not supported or canvas already in use.");
    return; // Exit if context not available
  }
  let w, h, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize(); // Initial resize call

  // --- Starfield Layer ---
  const starfield = [];
  const numStars = 180;
  for(let i=0;i<numStars;i++){
    starfield.push({
      x: Math.random()*w,
      y: Math.random()*h,
      z: 0.2+Math.random()*0.8,
      tw: Math.random()*2*Math.PI,
      spd: 0.08+Math.random()*0.12
    });
  }
  function drawStarfield() {
    for(const s of starfield) {
      let twinkle = 0.7+0.3*Math.sin(Date.now()/600 + s.tw);
      ctx.save();
      ctx.globalAlpha = 0.5*twinkle;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 0.7 + 1.2*s.z*twinkle, 0, 2*Math.PI);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#39FF14';
      ctx.shadowBlur = 6*s.z;
      ctx.fill();
      ctx.restore();
      // Parallax movement
      s.x += s.spd*s.z*0.2;
      if(s.x > w) s.x = 0;
    }
  }

  // --- Layered Nebula with Noise ---
  function drawNebula() {
    // Main nebula
    const grad = ctx.createRadialGradient(w/2, h*0.6, w*0.1, w/2, h*0.6, w*0.7);
    grad.addColorStop(0, 'rgba(57,255,20,0.22)');
    grad.addColorStop(0.25, 'rgba(0,212,255,0.13)');
    grad.addColorStop(0.5, 'rgba(255,0,255,0.10)');
    grad.addColorStop(1, 'rgba(0,0,0,0.0)');
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);
    ctx.restore();
    // Add a faint galactic swirl
    ctx.save();
    ctx.globalAlpha = 0.13;
    ctx.translate(w/2, h*0.6);
    for(let i=0;i<7;i++){
      ctx.rotate(Math.PI/3.5);
      ctx.beginPath();
      ctx.ellipse(0,0,w*0.32,h*0.09,0,0,2*Math.PI);
      ctx.strokeStyle = 'rgba(57,255,20,0.18)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#39FF14';
      ctx.shadowBlur = 18;
      ctx.stroke();
    }
    ctx.restore();
    // Add subtle noise
    for(let i=0;i<120;i++){
      let nx = Math.random()*w, ny = Math.random()*h;
      ctx.save();
      ctx.globalAlpha = 0.04+Math.random()*0.04;
      ctx.beginPath();
      ctx.arc(nx, ny, 0.7+Math.random()*1.2, 0, 2*Math.PI);
      ctx.fillStyle = Math.random()>0.5?'#39FF14':'#00d4ff';
      ctx.fill();
      ctx.restore();
    }
  }

  const particleIcons = [
    {type:'bitcoin', color:'#f7931a', size:22, z:1.1, label:'Bitcoin'},
    {type:'chip', color:'#00d4ff', size:18, z:0.9, label:'Tech Chip'},
    {type:'star', color:'#fff', size:2, z:0.7, label: null}, // No label for simple stars
    {type:'planet', color:'#39FF14', size:16, z:1.2, label:'Neon Planet'},
    {type:'ring', color:'#fff', size:24, z:1.05, label: null},
    {type:'satellite', color:'#00fff7', size:10, z:1.15, label:'Satellite'},
    {type:'sparkle', color:'#fff', size:1.5, z:0.8, label: null},
  ];
  const particles = []; // Renamed from objects to particles for clarity
  const numParticles = 38; // Number of particles
  for(let i=0; i < numParticles; i++) {
    const icon = particleIcons[Math.floor(Math.random()*particleIcons.length)];
    particles.push({
      ...icon,
      x: Math.random()*w,
      y: Math.random()*h,
      z: icon.z + (Math.random()-0.5)*0.2,
      angle: Math.random()*Math.PI*2,
      speed: 0.08+Math.random()*0.18,
      orbit: Math.random()>0.7 ? (0.5+Math.random()*1.2) : 0,
      orbitCenter: [Math.random()*w, Math.random()*h],
      orbitSpeed: 0.0007+Math.random()*0.0015,
      trail: Math.random()>0.8,
      color2: Math.random()>0.5 ? '#39FF14' : '#00d4ff',
      pulseT: 0, // Initialize pulse timer
    });
  }

  const shootingStars = [];
  const maxShootingStars = 3;
  function spawnShootingStar() {
    if (shootingStars.length >= maxShootingStars) return;
    const startY = Math.random()*h*0.7;
    shootingStars.push({
      x: -60, y: startY, len: 120+Math.random()*60, speed: 7+Math.random()*4, alpha: 1, t: 0
    });
  }
  setInterval(spawnShootingStar, 1800);

  let mouse = {x: w/2, y: h/2, active: false};
  let parallax = {x: 0, y: 0};
  let hoveredParticle = null; // Renamed from hoverObj
  let tooltipAlpha = 0;
  let burstSparkles = [];

  function onPointerMove(e) {
    let px, py;
    if(e.touches && e.touches.length) {
      px = e.touches[0].clientX; py = e.touches[0].clientY;
    } else {
      px = e.clientX; py = e.clientY;
    }
    mouse.x = px; mouse.y = py; mouse.active = true;
    parallax.x = (px-w/2)/w*60;
    parallax.y = (py-h/2)/h*60;

    // Check for hovered particle on move
    hoveredParticle = getParticleAt(mouse.x, mouse.y);
    if(hoveredParticle) hoveredParticle.pulseT = 0; // Reset pulse animation on new hover
  }
  canvas.addEventListener('mousemove', onPointerMove);
  canvas.addEventListener('touchmove', onPointerMove, {passive: true}); // Passive for performance

  function onPointerLeave() {
    mouse.active = false;
    parallax.x = 0; parallax.y = 0;
    hoveredParticle = null; // Clear hovered particle
  }
  canvas.addEventListener('mouseleave', onPointerLeave);
  canvas.addEventListener('touchend', onPointerLeave); // Also clear on touchend

  function burstAt(x, y) {
    const numBurstSparkles = 18;
    for(let i=0; i < numBurstSparkles; i++) {
      const angle = (i / numBurstSparkles) * 2 * Math.PI;
      burstSparkles.push({
        x, y,
        vx: Math.cos(angle)*2.5 + (Math.random()-0.5)*1.2, // Spread out sparkles
        vy: Math.sin(angle)*2.5 + (Math.random()-0.5)*1.2,
        alpha: 1,
        size: 2+Math.random()*2,
        t: 0
      });
    }
  }
  canvas.addEventListener('click', e => { burstAt(e.clientX, e.clientY); });
  canvas.addEventListener('touchstart', e => {
    if(e.touches && e.touches.length) burstAt(e.touches[0].clientX, e.touches[0].clientY);
     e.preventDefault(); // Prevent default touch actions like scrolling when tapping canvas
  }, {passive: false});


  function getParticleAt(mx, my) {
    for(const p of particles) {
      if(!p.label) continue; // Only interact with particles that have labels
      let t = Date.now()/1200*p.z+p.x; // Time factor for subtle movement
      let particleX = p.x + Math.sin(t)*18*p.z + parallax.x*p.z;
      let particleY = p.y + Math.cos(t*0.9)*12*p.z + parallax.y*p.z;
      if(p.orbit) {
        let orbitA = Date.now()*p.orbitSpeed + p.angle;
        particleX = p.orbitCenter[0] + Math.cos(orbitA)*60*p.orbit + parallax.x*p.z;
        particleY = p.orbitCenter[1] + Math.sin(orbitA)*30*p.orbit + parallax.y*p.z;
      }
      const hoverRadius = p.size * 1.5; // Increased hover area
      if(Math.hypot(mx-particleX, my-particleY) < hoverRadius) return p;
    }
    return null;
  }

  // --- Enhanced Drawing Functions ---
  function drawBitcoin(x,y,s,a,g,p){ctx.save();ctx.translate(x,y);ctx.rotate(a);let sc=p?1.18+0.08*Math.sin(Date.now()/120):1;ctx.scale(sc,sc);ctx.beginPath();ctx.arc(0,0,s,0,2*Math.PI);ctx.fillStyle='#222';ctx.shadowColor='#f7931a';ctx.shadowBlur=g?28:10;ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle='#f7931a';ctx.stroke();ctx.font=`${s*1.1}px Orbitron,Arial`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#f7931a';ctx.shadowColor='#fff';ctx.shadowBlur=g?18:6;ctx.fillText('₿',0,1);ctx.restore()}
  function drawPlanet(x,y,s,a,g,p){ctx.save();ctx.translate(x,y);ctx.rotate(a);let sc=p?1.13+0.06*Math.sin(Date.now()/120):1;ctx.scale(sc,sc);ctx.beginPath();ctx.arc(0,0,s,0,2*Math.PI);ctx.fillStyle='#39FF14';ctx.shadowColor='#00d4ff';ctx.shadowBlur=g?28:12;ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle='#fff';ctx.stroke();ctx.beginPath();ctx.ellipse(0,0,s*1.2,s*0.5,Math.PI/4,0,2*Math.PI);ctx.strokeStyle='#00d4ff88';ctx.lineWidth=1.5;ctx.stroke();ctx.restore()}
  function drawChip(x,y,s,a,g,p){ctx.save();ctx.translate(x,y);ctx.rotate(a);let sc=p?1.15+0.07*Math.sin(Date.now()/120):1;ctx.scale(sc,sc);ctx.fillStyle='#00d4ff';ctx.shadowColor='#00d4ff';ctx.shadowBlur=g?12:0;ctx.fillRect(-s/2,-s/2,s,s);ctx.strokeStyle='#fff';ctx.lineWidth=1.2;ctx.strokeRect(-s/2,-s/2,s,s);ctx.restore()}
  function drawSatellite(x,y,s,a,c,g,p){ctx.save();ctx.translate(x,y);ctx.rotate(a);let sc=p?1.12+0.05*Math.sin(Date.now()/120):1;ctx.scale(sc,sc);ctx.fillStyle=c;ctx.shadowColor=c;ctx.shadowBlur=g?8:0;ctx.fillRect(-s/2,-s/4,s,s/2);ctx.fillStyle='#fff';ctx.fillRect(-s/8,-s/8,s/4,s/4);ctx.restore()}
  function drawStar(x,y,s,g){ctx.save();ctx.globalAlpha=0.7+Math.random()*0.3;ctx.beginPath();ctx.arc(x,y,s,0,2*Math.PI);ctx.fillStyle='#fff';ctx.shadowColor='#39FF14';ctx.shadowBlur=g?6+Math.random()*4:4;ctx.fill();ctx.restore()}
  function drawRing(x,y,s,a,c,g){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.beginPath();ctx.ellipse(0,0,s,s*0.35,Math.PI/3,0,2*Math.PI);ctx.strokeStyle=c;ctx.lineWidth=2;ctx.shadowColor=c;ctx.shadowBlur=g?12:0;ctx.globalAlpha=0.7;ctx.stroke();ctx.restore()}
  function drawSparkle(x,y,s,g){ctx.save();ctx.globalAlpha=0.6+Math.random()*0.4;ctx.beginPath();ctx.arc(x,y,s,0,2*Math.PI);ctx.fillStyle='#fff';ctx.shadowColor='#fff';ctx.shadowBlur=g?8+Math.random()*4:4;ctx.fill();ctx.restore()}
  function drawTrail(x,y,l,a,c){ctx.save();ctx.globalAlpha=0.18;ctx.strokeStyle=c;ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-Math.cos(a)*l,y-Math.sin(a)*l);ctx.stroke();ctx.restore()}
  function drawShootingStar(s){ctx.save();ctx.globalAlpha=s.alpha;ctx.strokeStyle='#fff';ctx.shadowColor='#39FF14';ctx.shadowBlur=16;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.len,s.y+s.len*0.2);ctx.stroke();ctx.restore()}

  function drawBurstSparkles() {
    for(let i=burstSparkles.length-1;i>=0;i--) {
      const s=burstSparkles[i];
      ctx.save(); ctx.globalAlpha=s.alpha; ctx.beginPath(); ctx.arc(s.x,s.y,s.size,0,2*Math.PI); ctx.fillStyle='#fff'; ctx.shadowColor='#39FF14'; ctx.shadowBlur=12; ctx.fill(); ctx.restore();
      s.x += s.vx; s.y += s.vy; s.alpha -= 0.03; s.size *= 0.97;
      if(s.alpha <= 0.01 || s.size <= 0.5) burstSparkles.splice(i,1);
    }
  }

  function animate() {
    ctx.clearRect(0,0,w,h); // Clear canvas

    drawNebula();
    drawStarfield();

    // Draw particles
    for(const p of particles) {
      let t = Date.now()/1200*p.z+p.x; // Time factor for subtle movement
      let particleX = p.x + Math.sin(t)*18*p.z + parallax.x*p.z;
      let particleY = p.y + Math.cos(t*0.9)*12*p.z + parallax.y*p.z;

      if(p.orbit) {
        let orbitA = Date.now()*p.orbitSpeed + p.angle;
        particleX = p.orbitCenter[0] + Math.cos(orbitA)*60*p.orbit + parallax.x*p.z;
        particleY = p.orbitCenter[1] + Math.sin(orbitA)*30*p.orbit + parallax.y*p.z;
      }

      // Pulse effect for hovered particle
      let isHovered = hoveredParticle === p;
      if (isHovered) {
        p.pulseT += 0.05; // Increment pulse timer
      } else {
        p.pulseT = Math.max(0, p.pulseT - 0.1); // Decay pulse when not hovered
      }
      let pulseFactor = 1 + 0.1 * Math.sin(p.pulseT * 5); // Simple sine wave pulse

      if(p.trail && p.type !== 'star' && p.type !== 'sparkle') { // Only draw trails for non-star/sparkle particles
        drawTrail(particleX, particleY, p.size*2, p.angle, p.color2);
      }

      switch(p.type) {
        case 'bitcoin': drawBitcoin(particleX, particleY, p.size, p.angle, isHovered, pulseFactor); break;
        case 'chip': drawChip(particleX, particleY, p.size, p.angle, isHovered, pulseFactor); break;
        case 'planet': drawPlanet(particleX, particleY, p.size, p.angle, isHovered, pulseFactor); break;
        case 'satellite': drawSatellite(particleX, particleY, p.size, p.angle, p.color, isHovered, pulseFactor); break;
        case 'star': drawStar(particleX, particleY, p.size, isHovered); break;
        case 'ring': drawRing(particleX, particleY, p.size, p.angle, p.color, isHovered); break;
        case 'sparkle': drawSparkle(particleX, particleY, p.size, isHovered); break;
      }

      p.x += p.speed * p.z * 0.5; // Move particles
      p.angle += 0.005; // Rotate particles
      if(p.x > w + 50) p.x = -50; // Loop particles
    }

    // Draw shooting stars
    for(let i=shootingStars.length-1; i>=0; i--) {
      const s = shootingStars[i];
      drawShootingStar(s);
      s.x += s.speed;
      s.y += s.speed * 0.2; // Slight downward angle
      s.alpha -= 0.01;
      if(s.alpha <= 0 || s.x > w + s.len) shootingStars.splice(i, 1);
    }

    drawBurstSparkles(); // Draw click burst sparkles

    requestAnimationFrame(animate); // Loop animation
  }

  // Start the animation loop
  animate();

}); // End of DOMContentLoaded
