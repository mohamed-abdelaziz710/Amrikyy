// DEBUG LOG: script.js loaded successfully on 2025-05-29
// NOTE: This file contains loader, scroll, and chatbot logic for the portfolio.

// === Amrikyy Cyber Portfolio Main Script ===
// Loader animation, transitions, scroll, and chatbot logic
// --------------------------------------------------------
// - Loader: handles progress bar, hints, and hiding
// - Smooth scroll to CV card
// - Chatbot: open/close, keyboard, focus, messaging
// - Accessibility and minor enhancements

// Replit Backend URL for Chatbot
const REPLIT_CHATBOT_URL = 'https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/chatbot';

// --- Loading Screen Logic ---
const loadingTexts = [
    "Initializing Systems...",
    "Establishing Secure Connection...",
    "Compiling Data Streams...",
    "Deploying Digital Presence...",
    "Engaging Subspace Communications..."
];
let currentLoadingTextIndex = 0;
let progressBarWidth = 0;
let loadingInterval;
let typingInterval;

function updateLoadingScreen() {
    const dynamicLoadingText = document.getElementById('dynamic-loading-text');
    const progressBarFill = document.getElementById('progress-bar-fill');

    if (typingInterval) {
        clearInterval(typingInterval);
    }

    const fullText = loadingTexts[currentLoadingTextIndex];
    let charIndex = 0;
    dynamicLoadingText.textContent = '';
    dynamicLoadingText.classList.add('typing-effect');

    typingInterval = setInterval(() => {
        if (charIndex < fullText.length) {
            dynamicLoadingText.textContent += fullText.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typingInterval);
            dynamicLoadingText.classList.remove('typing-effect');
        }
    }, 50);

    dynamicLoadingText.style.opacity = 1;

    progressBarWidth += (100 / (loadingTexts.length * 10));
    if (progressBarWidth > 100) progressBarWidth = 100;
    progressBarFill.style.width = progressBarWidth + '%';

    if (progressBarWidth >= 100) {
        clearInterval(loadingInterval);
        setTimeout(showPortfolioPage, 500);
    } else {
        setTimeout(() => {
            currentLoadingTextIndex = (currentLoadingTextIndex + 1) % loadingTexts.length;
        }, 2000);
    }
}

function createStars(containerId, numStars) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}

function showPortfolioPage() {
    const loadingScreen = document.getElementById('loading-screen');
    const cvSection = document.getElementById('cv-section');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        cvSection.style.display = 'block';
        document.body.style.overflow = 'auto';
    }, 500);
}

// --- Chatbot Logic ---
function addMessageToChat(sender, message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message', sender);
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessageToChatbot() {
    const inputField = document.getElementById('chatbot-input');
    const sendButton = document.getElementById('chatbot-send-btn');
    const userMessage = inputField.value.trim();

    if (!userMessage) return;

    addMessageToChat('user', userMessage);
    inputField.value = '';
    sendButton.disabled = true;

    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('chatbot-message', 'bot', 'chatbot-loading-indicator');
    loadingIndicator.textContent = '...';
    document.getElementById('chatbot-messages').appendChild(loadingIndicator);
    document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;

    try {
        const response = await fetch(REPLIT_CHATBOT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await response.json();
        if (data && data.response) {
            addMessageToChat('bot', data.response);
        } else {
            console.error('Replit API response structure unexpected:', data);
            addMessageToChat('bot', 'Error: Could not get a response from the AI.');
        }
    } catch (error) {
        console.error('Error sending message to Replit backend:', error);
        addMessageToChat('bot', 'Error: Failed to connect to the AI service.');
    } finally {
        document.getElementById('chatbot-messages').removeChild(loadingIndicator);
        sendButton.disabled = false;
        inputField.focus();
    }
}

// --- Three.js Global Variables ---
let scene, camera, renderer, controls;
let centralCore, coreWireframe, skillNodes = [], skillLines = [], dataParticles, chatbot3DIcon;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const skillsData = [
    { name: 'Web3', icon: '🌐', position: new THREE.Vector3(3, 2, 0) },
    { name: 'Blockchain', icon: '🔗', position: new THREE.Vector3(-3, 2, 0) },
    { name: 'Solidity', icon: '📜', position: new THREE.Vector3(0, 2, 3) },
    { name: 'React', icon: '⚛️', position: new THREE.Vector3(0, 2, -3) },
    { name: 'UI/UX', icon: '🎨', position: new THREE.Vector3(2, -1, 2) },
    { name: 'Frontend', icon: '💻', position: new THREE.Vector3(-2, -1, -2) }
];

// --- Three.js Initialization ---
function initThreeJS() {
    const canvas = document.getElementById('webgl-canvas');
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // Central core
    const coreGeometry = new THREE.SphereGeometry(1, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    centralCore = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(centralCore);

    // Core wireframe
    const wireframeGeometry = new THREE.SphereGeometry(1.05, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    coreWireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(coreWireframe);

    // Skill nodes and lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    skillsData.forEach(skill => {
        const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.copy(skill.position);
        scene.add(node);
        skillNodes.push(node);

        // Lines to central core
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([centralCore.position, node.position]);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        skillLines.push(line);
    });

    // Data particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions.set([
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ], i * 3);
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dataParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(dataParticles);

    // Chatbot 3D icon
    const chatbotIconGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const chatbotIconMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    chatbot3DIcon = new THREE.Mesh(chatbotIconGeometry, chatbotIconMaterial);
    chatbot3DIcon.position.set(2, 2, 0);
    scene.add(chatbot3DIcon);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    camera.add(pointLight);

    scene.add(camera);

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onDocumentMouseClick);
    window.addEventListener('resize', onWindowResize);

    animate();
}

// --- Three.js Animation ---
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// --- Three.js Event Handlers ---
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentMouseClick(event) {
    event.preventDefault();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(skillNodes);
    if (intersects.length > 0) {
        const skill = intersects[0].object;
        const skillData = skillsData.find(s => s.position.equals(skill.position));
        if (skillData) {
            showSkillDetails(skillData);
        }
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// --- Skill Detail Modal ---
function showSkillDetails(skillData) {
    const modal = document.getElementById('skill-detail-modal');
    const modalTitle = document.getElementById('skill-detail-title');
    const modalDescription = document.getElementById('skill-detail-description');
    const modalCloseBtn = document.getElementById('skill-detail-close');

    modalTitle.textContent = skillData.name;
    modalDescription.textContent = `Details about ${skillData.name}...`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    modalCloseBtn.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };
}

// --- Accessibility Enhancements ---
// Skip to content link focus
const skipLink = document.getElementById('skip-to-content');
skipLink.addEventListener('click', function(event) {
    event.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
    }
});

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader and show main content immediately for development
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    loader.style.display = 'none';
    mainContent.style.display = 'flex';
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');

    // Update loading screen for a smoother experience
    updateLoadingScreen();
    loadingInterval = setInterval(updateLoadingScreen, 5000);

    // Create stars in the background
    createStars('stars-container', 100);

    // Initialize Three.js after a short delay to allow loading screen to show
    setTimeout(initThreeJS, 500);
});