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
  // For local development, you might use a proxy or a local server.
  // For production, the server at this URL must explicitly allow requests from your website's domain.
  const chatbotBackendUrl = 'https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/';

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
    // Using requestAnimationFrame ensures the style change is applied after the element is painted,
    // allowing the CSS transition on 'width' to take effect smoothly.
    requestAnimationFrame(() => {
        progressBar.style.width = '100%';
    });
  } else {
    console.error("Element with ID 'progressBar' not found. Progress bar animation will not occur.");
  }

  // --- Set a timeout to complete loading sequence ---
  // This acts as a fallback or a minimum display time for the loader.
  // The 2.5s of progressBar transition + 0.5s buffer = 3s total.
  const loadingTimeout = setTimeout(completeLoading, 3000);

  // --- Dynamically Calculate Age ---
  function calculateAge(birthDateString) { // Expects "YYYY-MM-DD" format
    try {
        const birthDate = new Date(birthDateString);
        // Check if the birthDate is a valid date
        if (isNaN(birthDate.getTime())) {
            console.error("Invalid birthDateString provided for age calculation:", birthDateString);
            return null; // Return null or a default/error string
        }
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        // Adjust age if current month/day is before birth month/day
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    } catch (e) {
        console.error("Error calculating age:", e);
        return null; // Return null in case of any error
    }
  }

  // --- Language Toggle and Translation Logic ---
  const translations = {
    // English translations
    en: {
      loaderMessage: 'Initializing TECH & CRYPTO experience...',
      langToggle: 'AR', // Text for the language toggle button when English is active
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
      birthDateValue: 'July 10, 1999', // Static display, age is calculated
      ageLabel: 'Age:',
      ageValue: '{age} years old', // Placeholder for dynamic age
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
    },
    // Arabic translations
    ar: {
      loaderMessage: 'يتم تهيئة تجربة TECH & CRYPTO...',
      langToggle: 'EN', // Text for the language toggle button when Arabic is active
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

}); // End of DOMContentLoaded
