// ----- LOADER SCRIPT -----
window.addEventListener('load', () => { // Changed to window.load for better accuracy
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
    if(progressBarElement) {
        progressInterval = setInterval(() => {
            currentProgress += Math.random() * 15; // Simulate variable loading chunks
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressInterval);
            }
            progressBarElement.style.width = currentProgress + '%';
        }, 400); // Update progress bar frequently
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

    const mouse = { x: null, y: null, radius: 80 };

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
            this.size = size; this.color = color; this.baseSpeed = 0.3; this.opacity = Math.random() * 0.5 + 0.3;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`).replace('rgb(', 'rgba('); // Add opacity
            if (!this.color.includes('rgba')) { // Handle hex colors by converting to rgba for opacity
                 let r = parseInt(this.color.slice(1,3), 16), g = parseInt(this.color.slice(3,5), 16), b = parseInt(this.color.slice(5,7), 16);
                 ctx.fillStyle = `rgba(${r},${g},${b},${this.opacity})`;
            }
            ctx.fill();
        }
        update() {
            if (this.x + this.size > canvas.width || this.x - this.size < 0) { this.directionX = -this.directionX; }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) { this.directionY = -this.directionY; }

            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x; let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    this.x -= dx / (distance * 0.5); // Smoother push
                    this.y -= dy / (distance * 0.5);
                }
            }
            this.x += this.directionX * this.baseSpeed; this.y += this.directionY * this.baseSpeed;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        updateColorsFromCSS(); // Ensure colors are fresh
        let numberOfParticles = (canvas.height * canvas.width) / 18000;
        if (numberOfParticles > 120) numberOfParticles = 120;
        if (numberOfParticles < 40) numberOfParticles = 40; // Minimum particles

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
        let connectDistanceSq = Math.pow(Math.min(canvas.width, canvas.height) / 7, 2); // Responsive connection distance
        if (connectDistanceSq > 130*130) connectDistanceSq = 130*130;


        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distanceSq = dx * dx + dy * dy;

                if (distanceSq < connectDistanceSq) {
                    const opacityValue = Math.max(0, 1 - (distanceSq / connectDistanceSq) * 0.9);
                    let strokeColor = particleLineColor;
                    if (particleLineColor.startsWith('rgba')) {
                        strokeColor = particleLineColor.replace(/[\d\.]+\)$/g, `${opacityValue.toFixed(2)})`);
                    } else { // Assuming hex or rgb, convert to rgba
                        let r,g,b;
                        if(particleLineColor.startsWith('#')){
                            r = parseInt(particleLineColor.slice(1,3), 16); g = parseInt(particleLineColor.slice(3,5), 16); b = parseInt(particleLineColor.slice(5,7), 16);
                        } else { // rgb
                            [r,g,b] = particleLineColor.match(/\d+/g);
                        }
                        strokeColor = `rgba(${r},${g},${b},${opacityValue.toFixed(2)})`;
                    }
                    ctx.strokeStyle = strokeColor;
                    ctx.lineWidth = 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
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