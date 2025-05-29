// --- Particle System Configuration ---
const particleConfig = {
    mouseSeekRadius: 80,
    densityFactor: 18000, // Lower for more particles
    maxParticles: 120,
    minParticles: 40,
    connectDistanceFactor: 7, // Divisor for canvas dimension
    maxConnectDistance: 130,
    baseSpeed: 0.3,
};

// ----- LOADER SCRIPT -----
window.addEventListener('load', () => {
    const loadingMessages = [
        "Initiating Cyber Core...",
        "Calibrating Neon Flux...",
        "Decrypting Skill Matrix...",
        "Compiling Portfolio Instance...",
        "Engaging Visual Systems..."
    ];
    let currentMessageIndex = 0;
    const loaderMessageElement = document.getElementById('loader-message');
    const progressBarElement = document.getElementById('loader-progress-bar');
    let progressInterval;

    function updateLoaderMessage() {
        if (loaderMessageElement) {
            loaderMessageElement.style.opacity = 0;
            setTimeout(() => {
                currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
                loaderMessageElement.textContent = loadingMessages[currentMessageIndex];
                loaderMessageElement.style.opacity = 1;
            }, 300); // fade out/in duration
        }
    }

    if (loaderMessageElement) { // Start message cycling if element exists
       setInterval(updateLoaderMessage, 2000); // Change message every 2 seconds
    }
    
    let currentProgress = 0;
    let burst = true;
    if(progressBarElement) {
        progressInterval = setInterval(() => {
            if (burst && currentProgress < 40) {
                currentProgress += Math.random() * 20 + 10; // Fast initial burst
            } else {
                burst = false;
                currentProgress += Math.random() * 10 + 2; // Smoother after burst
            }
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressInterval);
            }
            progressBarElement.style.width = currentProgress + '%';
        }, 400);
    }


    // Total time for loader sequence before starting fade out
    const totalLoaderTime = 2800; // Adjust as needed, e.g. 2800ms

    setTimeout(() => {
        clearInterval(progressInterval); // Ensure progress stops
        if(progressBarElement) progressBarElement.style.width = '100%'; // Fill bar at the end

        const loadingSkeleton = document.getElementById('loading-skeleton');
        if (loadingSkeleton) {
            loadingSkeleton.style.opacity = '0';
            loadingSkeleton.style.visibility = 'hidden'; // For better accessibility and to prevent interaction

            setTimeout(() => {
                // loadingSkeleton.style.display = 'none'; // Not strictly needed if visibility is hidden
                const cvCardPage = document.getElementById('cv-card-page');
                if (cvCardPage) {
                    cvCardPage.style.display = 'block';
                    const wowCard = cvCardPage.querySelector('.wow-card');
                    if (wowCard) {
                        wowCard.style.opacity = '1'; // Trigger CSS animation
                        wowCard.style.transform = 'translateY(0)'; // Trigger CSS animation
                        wowCard.style.animation = 'fadeInUp 0.8s 0.2s ease-out forwards'; // 0.2s delay
                    }
                }
            }, 800); // Must match opacity/visibility transition duration in CSS
        }
    }, totalLoaderTime);
});


// ----- PARTICLE ANIMATION SCRIPT -----
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        console.error('Particle canvas not found!');
        return;
    }
    const ctx = canvas.getContext('2d');
    let particlesArray;

    const cssVariables = getComputedStyle(document.documentElement);
    let particleColor1 = cssVariables.getPropertyValue('--particle-color-1').trim() || '#00FF00';
    let particleColor2 = cssVariables.getPropertyValue('--particle-color-2').trim() || '#00BFFF';
    let particleLineColor = cssVariables.getPropertyValue('--particle-line-color').trim() || 'rgba(0, 255, 128, 0.3)';

    const mouse = { x: null, y: null, radius: particleConfig.mouseSeekRadius };

    function updateColorsFromCSS() {
        particleColor1 = cssVariables.getPropertyValue('--particle-color-1').trim() || '#00FF00';
        particleColor2 = cssVariables.getPropertyValue('--particle-color-2').trim() || '#00BFFF';
        particleLineColor = cssVariables.getPropertyValue('--particle-line-color').trim() || 'rgba(0, 255, 128, 0.3)';
    }

    window.addEventListener('mousemove', (event) => { mouse.x = event.clientX; mouse.y = event.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    function setCanvasDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasDimensions();

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY;
            this.size = size; this.color = color; this.baseSpeed = particleConfig.baseSpeed; this.opacity = Math.random() * 0.5 + 0.3;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            const originalGlobalAlpha = ctx.globalAlpha;
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.globalAlpha = originalGlobalAlpha;
        }
        update() {
            if (this.x + this.size > canvas.width || this.x - this.size < 0) { this.directionX = -this.directionX; }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) { this.directionY = -this.directionY; }

            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x; let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    this.x -= dx / (distance * 0.5);
                    this.y -= dy / (distance * 0.5);
                }
            }
            this.x += this.directionX * this.baseSpeed; this.y += this.directionY * this.baseSpeed;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        updateColorsFromCSS();
        let numberOfParticles = (canvas.height * canvas.width) / particleConfig.densityFactor;
        if (numberOfParticles > particleConfig.maxParticles) numberOfParticles = particleConfig.maxParticles;
        if (numberOfParticles < particleConfig.minParticles) numberOfParticles = particleConfig.minParticles;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 0.8;
            let x = Math.random() * (canvas.width - size * 2) + size;
            let y = Math.random() * (canvas.height - size * 2) + size;
            let directionX = (Math.random() * 0.6) - 0.3;
            let directionY = (Math.random() * 0.6) - 0.3;
            let color = Math.random() > 0.5 ? particleColor1 : particleColor2;
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connectParticles() {
        let connectDistanceSq = Math.pow(Math.min(canvas.width, canvas.height) / particleConfig.connectDistanceFactor, 2);
        if (connectDistanceSq > Math.pow(particleConfig.maxConnectDistance, 2)) connectDistanceSq = Math.pow(particleConfig.maxConnectDistance, 2);
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distanceSq = dx * dx + dy * dy;
                if (distanceSq < connectDistanceSq) {
                    const opacityValue = Math.max(0, 1 - (distanceSq / connectDistanceSq) * 0.9);
                    const originalGlobalAlpha = ctx.globalAlpha;
                    ctx.globalAlpha = opacityValue;
                    ctx.strokeStyle = particleLineColor;
                    ctx.lineWidth = 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                    ctx.globalAlpha = originalGlobalAlpha;
                }
            }
        }
    }
    
    let animationFrameId;
    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
        connectParticles();
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        cancelAnimationFrame(animationFrameId); // Stop animation during resize spam
        resizeTimeout = setTimeout(() => {
            setCanvasDimensions();
            init();
            animate(); // Restart animation
        }, 250); // Debounce resize
    });

    init();
    animate();
});

// ----- AI CHATBOT SCRIPT -----
document.addEventListener('DOMContentLoaded', () => {
    // Chatbot Configuration
    const REPLIT_BACKEND_URL = 'https://your-replit-backend-url.replit.dev'; // Replace with your actual Replit URL
    
    // Chatbot Elements
    const chatbotContainer = document.getElementById('ai-chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const typingIndicator = document.getElementById('typing-indicator');

    let isOpen = false;

    // Toggle chatbot window
    function toggleChatbot() {
        isOpen = !isOpen;
        
        if (isOpen) {
            chatbotWindow.style.display = 'flex';
            setTimeout(() => {
                chatbotWindow.classList.add('active');
            }, 10);
            chatbotInput.focus();
        } else {
            chatbotWindow.classList.remove('active');
            setTimeout(() => {
                chatbotWindow.style.display = 'none';
            }, 300);
        }
    }

    // Format timestamp
    function formatTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Create user avatar SVG
    function createUserAvatar() {
        return `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="userAvatarGradient${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00BFFF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#BF00FF;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <circle cx="12" cy="12" r="10" fill="url(#userAvatarGradient${Date.now()})" opacity="0.2"/>
                <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4S8 5.79 8 8S9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="url(#userAvatarGradient${Date.now()})"/>
            </svg>
        `;
    }

    // Create AI avatar SVG
    function createAIAvatar() {
        return `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="aiAvatarGradient${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00FF00;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#00BFFF;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <circle cx="12" cy="12" r="10" fill="url(#aiAvatarGradient${Date.now()})" opacity="0.2"/>
                <path d="M12 6.5C13.38 6.5 14.5 7.62 14.5 9S13.38 11.5 12 11.5S9.5 10.38 9.5 9S10.62 6.5 12 6.5ZM12 13C14.21 13 16 14.79 16 17V18H8V17C8 14.79 9.79 13 12 13Z" fill="url(#aiAvatarGradient${Date.now()})"/>
            </svg>
        `;
    }

    // Add message to chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = isUser ? createUserAvatar() : createAIAvatar();
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'message-text';
        textSpan.textContent = text;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = formatTime();
        
        contentDiv.appendChild(textSpan);
        contentDiv.appendChild(timeSpan);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        typingIndicator.classList.add('active');
    }

    // Hide typing indicator
    function hideTyping() {
        typingIndicator.classList.remove('active');
    }

    // Send message to AI backend
    async function sendToAI(message) {
        try {
            showTyping();
            
            const response = await fetch(`${REPLIT_BACKEND_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    context: {
                        name: 'Amrikyy',
                        role: 'Cybersecurity Specialist & Full-Stack Developer',
                        skills: ['Cybersecurity', 'Penetration Testing', 'Full-Stack Development', 'Threat Analysis'],
                        languages: ['English', 'Arabic'],
                        platforms: ['Apple', 'Microsoft', 'Google', 'GitHub', 'Linux', 'Docker', 'AWS', 'Python']
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            hideTyping();
            
            if (data.response) {
                addMessage(data.response, false);
            } else {
                addMessage("I apologize, but I'm having trouble processing your request right now. Please try again later.", false);
            }
        } catch (error) {
            console.error('Error communicating with AI:', error);
            hideTyping();
            
            // Fallback responses for when backend is unavailable
            const fallbackResponses = {
                'hello': "Hello! I'm Amrikyy's AI assistant. I can tell you about my cybersecurity expertise, development skills, and projects.",
                'skills': "I specialize in cybersecurity, penetration testing, threat analysis, and full-stack development. I work with technologies like Python, Docker, AWS, and various security tools.",
                'experience': "I have extensive experience in cybersecurity with focus on threat analysis, penetration testing, and secure application development.",
                'contact': "You can reach out through the contact links in my profile or connect with me on LinkedIn and GitHub.",
                'languages': "I'm fluent in English and Arabic, which helps me work with diverse international teams.",
                'projects': "I work on various cybersecurity projects including threat analysis tools, security audits, and secure web applications.",
                'default': "I'm Amrikyy's AI assistant. Feel free to ask me about my cybersecurity expertise, technical skills, experience, or any other questions about my background!"
            };
            
            const lowerMessage = message.toLowerCase();
            let response = fallbackResponses.default;
            
            for (const [key, value] of Object.entries(fallbackResponses)) {
                if (lowerMessage.includes(key)) {
                    response = value;
                    break;
                }
            }
            
            addMessage(response, false);
        }
    }

    // Handle sending messages
    function handleSendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';
            
            // Send to AI with a small delay for better UX
            setTimeout(() => {
                sendToAI(message);
            }, 500);
        }
    }

    // Event Listeners
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', toggleChatbot);
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', toggleChatbot);
    }

    if (chatbotSend) {
        chatbotSend.addEventListener('click', handleSendMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });

        // Auto-resize input if needed
        chatbotInput.addEventListener('input', () => {
            // Optional: Add auto-resize functionality here if needed
        });
    }

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !chatbotContainer.contains(e.target)) {
            toggleChatbot();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to close chatbot
        if (e.key === 'Escape' && isOpen) {
            toggleChatbot();
        }
    });

    console.log('AI Chatbot initialized successfully');
});

// ----- TRANSLATIONS TOGGLE SCRIPT -----
document.addEventListener('DOMContentLoaded', function() {
    const btnAr = document.getElementById('lang-ar');
    const btnEn = document.getElementById('lang-en');
    const skillsAr = document.getElementById('skills-ar');
    const skillsEn = document.getElementById('skills-en');
    if (btnAr && btnEn && skillsAr && skillsEn) {
        btnAr.addEventListener('click', function() {
            btnAr.classList.add('active');
            btnEn.classList.remove('active');
            skillsAr.style.display = '';
            skillsEn.style.display = 'none';
        });
        btnEn.addEventListener('click', function() {
            btnEn.classList.add('active');
            btnAr.classList.remove('active');
            skillsAr.style.display = 'none';
            skillsEn.style.display = '';
        });
    }
});