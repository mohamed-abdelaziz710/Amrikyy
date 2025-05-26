// Smart Card Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Vanilla Tilt for 3D card effect
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
  });

  // Security Loader
  setTimeout(() => {
    document.getElementById('securityLoader').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('securityLoader').style.display = 'none';
    }, 800);
  }, 3800);

  // Status Bar Clock
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('statusTime').textContent = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Navigation
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      
      // Update active nav item
      navItems.forEach(navItem => navItem.classList.remove('active'));
      this.classList.add('active');
      
      // Show target section
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
          section.classList.add('active');
          section.classList.add('fade-in');
          setTimeout(() => section.classList.remove('fade-in'), 500);
        }
      });
    });
  });

  // Particles Effect
  createParticles();
  
  // Data Streams Effect
  createDataStreams();
  
  // Space Stars Effect
  createSpaceStars();
  
  // Chatbot Functionality
  initChatbot();
  
  // Add glitch effect to section titles
  document.querySelectorAll('.section-title').forEach(title => {
    title.classList.add('glitch-text');
  });
  
  // Animate skill chips on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillChips(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
  });
  
  // Animate timeline items on scroll
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.timeline-item, .education-item, .project-card, .contact-item').forEach(item => {
    timelineObserver.observe(item);
  });
});

// Create Particles
function createParticles() {
  const particleLayer = document.getElementById('particleLayer');
  
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.width = p.style.height = (Math.random() * 6 + 4) + 'px';
    p.style.left = (Math.random() * 100) + 'vw';
    p.style.top = (Math.random() * 100) + 'vh';
    p.style.opacity = 0.1 + Math.random() * 0.23;
    
    // Create unique animation name
    const animName = `floaty${i}`;
    p.style.animation = `${animName} ${(12 + Math.random() * 10).toFixed(1)}s infinite alternate ease-in-out`;
    
    // Add keyframe style
    const style = document.createElement('style');
    const dx = (Math.random() * 80 - 40).toFixed(1);
    const dy = (Math.random() * 60 - 30).toFixed(1);
    style.innerHTML = `@keyframes ${animName} { to { transform: translate(${dx}px, ${dy}px); } }`;
    document.head.appendChild(style);
    
    particleLayer.appendChild(p);
  }
}

// Create Data Streams
function createDataStreams() {
  const dataStreams = document.getElementById('dataStreams');
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  for (let i = 0; i < 10; i++) {
    const d = document.createElement('div');
    d.className = 'data-stream';
    
    // Generate random characters
    let streamText = '';
    const length = Math.floor(Math.random() * 12 + 8);
    for (let j = 0; j < length; j++) {
      streamText += chars[Math.floor(Math.random() * chars.length)];
    }
    d.textContent = streamText;
    
    // Position and style
    d.style.left = (Math.random() * 100) + 'vw';
    d.style.fontSize = (Math.random() * 0.7 + 1.1) + 'em';
    d.style.animationDuration = (Math.random() * 6 + 5) + 's';
    d.style.animationDelay = (Math.random() * 2) + 's';
    
    dataStreams.appendChild(d);
  }
}

// Create Space Stars
function createSpaceStars() {
  const spaceStars = document.getElementById('spaceStars');
  
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random size (smaller stars are more common)
    const size = Math.random() * 2 + 1;
    star.style.width = star.style.height = `${size}px`;
    
    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Brighter stars twinkle
    if (size > 2) {
      star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
    }
    
    spaceStars.appendChild(star);
  }
  
  // Add twinkle animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes twinkle {
      0% { opacity: 0.3; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// Initialize Chatbot
function initChatbot() {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotPanel = document.getElementById('chatbotPanel');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  
  // Toggle chatbot panel
  chatbotToggle.addEventListener('click', () => {
    chatbotPanel.style.display = chatbotPanel.style.display === 'flex' ? 'none' : 'flex';
    if (chatbotPanel.style.display === 'flex') {
      chatbotInput.focus();
    }
  });
  
  // Close chatbot panel
  chatbotClose.addEventListener('click', () => {
    chatbotPanel.style.display = 'none';
  });
  
  // Handle input submission
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatbotInput.value.trim() !== '') {
      const userMessage = chatbotInput.value.trim();
      addMessage('user', userMessage);
      chatbotInput.value = '';
      
      // Process user message and respond
      setTimeout(() => {
        respondToUser(userMessage);
      }, 500);
    }
  });
  
  // Handle suggestion buttons
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      chatbotInput.value = query;
      
      // Simulate Enter key press
      const event = new KeyboardEvent('keypress', { key: 'Enter' });
      chatbotInput.dispatchEvent(event);
    });
  });
  
  // Add message to chat
  function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (type === 'user') {
      messageContent.innerHTML = `<span class="terminal-prompt">guest:~$</span> ${content}`;
    } else {
      messageContent.innerHTML = `<span class="terminal-prompt">system:~$</span> ${content}`;
    }
    
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // Respond to user input
  function respondToUser(message) {
    const lowerMsg = message.toLowerCase();
    let response = '';
    
    if (lowerMsg.includes('what do you do') || lowerMsg.includes('who are you')) {
      response = "I'm Mohamed Abdelaziz, a Cybersecurity Engineer with expertise in AI Prompt Architecture and UX-Focused Web Development. I specialize in secure systems, Bitcoin technologies, and human-centered design.";
    } 
    else if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
      response = "I've worked on several projects including The Global Career Project, a charity:water responsive landing page, and a Crypto Analytics Dashboard. You can check them out in the Projects section.";
    }
    else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
      response = "You can reach me at amrikyy@gmail.com or call +1 770 616 0211. I'm also available on LinkedIn and GitHub as mohamed-abdelaziz710.";
    }
    else if (lowerMsg.includes('skill') || lowerMsg.includes('know')) {
      response = "My skills include cybersecurity (network security, threat analysis), programming (Python, Java), frontend development (React, Tailwind CSS), AI prompting, and crypto trading.";
    }
    else if (lowerMsg.includes('education') || lowerMsg.includes('study')) {
      response = "I'm pursuing a BS in Cybersecurity Engineering at Kennesaw State University (expected 2026). I also have an Associate Degree in Computer Science from Chattahoochee Technical College.";
    }
    else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      response = "Hello! Welcome to my digital space. How can I assist you today?";
    }
    else {
      response = "I'm not sure I understand. Try asking about my projects, skills, education, or how to contact me.";
    }
    
    addMessage('system', response);
  }
}

// Animate skill chips with staggered delay
function animateSkillChips(category) {
  const chips = category.querySelectorAll('.skill-chip');
  
  chips.forEach((chip, index) => {
    setTimeout(() => {
      chip.classList.add('fade-in');
    }, index * 100);
  });
}

// Add digital wave effect to canvas
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.createElement('canvas');
  const digitalWaves = document.getElementById('digitalWaves');
  digitalWaves.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let width, height;
  
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Update wave positions after resize
    waves[0].y = height * 0.3;
    waves[1].y = height * 0.4;
    waves[2].y = height * 0.6;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // Wave parameters
  const waves = [
    { y: height * 0.3, length: 100, amplitude: 15, speed: 0.03, color: 'rgba(0, 255, 153, 0.05)' },
    { y: height * 0.4, length: 80, amplitude: 20, speed: 0.02, color: 'rgba(0, 255, 153, 0.03)' },
    { y: height * 0.6, length: 120, amplitude: 10, speed: 0.01, color: 'rgba(0, 255, 153, 0.04)' }
  ];
  
  let time = 0;
  
  function animate() {
    // Check if canvas is still in DOM before animating
    if (!document.body.contains(canvas)) {
      return;
    }
    
    ctx.clearRect(0, 0, width, height);
    
    waves.forEach(wave => {
      ctx.beginPath();
      ctx.moveTo(0, wave.y);
      
      for (let x = 0; x < width; x++) {
        const y = wave.y + Math.sin(x / wave.length + time * wave.speed) * wave.amplitude;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      ctx.fillStyle = wave.color;
      ctx.fill();
    });
    
    time++;
    requestAnimationFrame(animate);
  }
  
  // Reduce animation complexity on mobile
  if (window.innerWidth < 768) {
    waves.forEach(wave => {
      wave.amplitude *= 0.7; // Reduce wave height
    });
  }
  
  animate();
});
