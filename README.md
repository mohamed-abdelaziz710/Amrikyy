# Amrikyy | Cyber Intelligence Platform & Portfolio V2

**Live Demo:** [Link to your live portfolio (e.g., amrikyy.github.io/portfolio)](https://example.com) *(Replace with your actual link once deployed)*

## 🚀 Ignition Point: The Vision

Welcome to the digital realm of Amrikyy – a cutting-edge, immersive portfolio experience designed not just to showcase skills, but to captivate and engage. This platform serves as a dynamic testament to Mohamed H Abdelaziz (Amrikyy)'s expertise as a Cybersecurity Specialist and Full-Stack Developer, presented through a "GenZ Cyber Neon" lens that is both futuristic and deeply engaging.

The journey begins with a mesmerizing loading sequence, transitions into an impactful hero landing, unveils a "smart" and interactive CV card, and offers continuous engagement via a custom-designed AI assistant.

## 🎨 Design Philosophy & Aesthetics: "GenZ Cyber Neon"

The core design philosophy revolves around a **"GenZ Cyber Neon"** aesthetic. This translates to:

* **Futuristic & Energetic:** Sharp lines, glowing accents, and dynamic animations create a sense of advanced technology and forward momentum.
* **Immersive Digital Atmosphere:** Dark backgrounds establish depth, making neon elements radiate with intensity, mimicking a sophisticated cybernetic environment.
* **Polished Interactivity:** Smooth transitions, responsive effects (like 3D tilts), and micro-interactions enhance user engagement and provide a premium feel.
* **Clarity & Focus:** Despite the rich visuals, information hierarchy is maintained for clear communication of Amrikyy's profile and skills.

### 🌈 Color Palette: Code of Light

The palette is meticulously chosen to evoke a high-tech, cybernetic world:

* **Primary Accent - Neon Green (`#39FF14`):** The signature color, symbolizing digital energy, growth, and positive action. Used for CTAs, logos, vital highlights, and glows (`--neon-green`, `--neon-green-glow`, `--neon-green-soft-glow`).
* **Secondary Accents - Neon Blue (`#00d4ff`) & Neon Purple (`#b600ff`):** These add depth and dynamism, primarily featured in the loader's progress bar and available for subtle highlights or hover effects, enriching the neon spectrum.
* **Base - Deep Darks (`--dark-bg: #13181c`, `#10161e`, etc.):** Create a vast, digital canvas, allowing neon accents to pierce through with maximum impact and ensuring excellent contrast.
* **Supporting - White (`--white`) & Grays (`--gray: #a0a0a0`, `--text-primary: #EAEAEA`):** Provide clarity for text, structure for UI elements, and balance to the vibrant neons.
* **Material - Glassmorphism (`--glass: rgba(30, 40, 44, 0.87)`):** Used for card backgrounds and UI panels, adding a layer of sophistication and a futuristic, semi-transparent interface feel.

### ✒️ Typography: The Digital Scribe

Font choices are critical in establishing the cyber-tech identity:

* **Headings & Logos - 'Orbitron' (Weights: 600, 900):** A distinctly geometric, wide sans-serif that embodies futuristic and cybernetic aesthetics. Its sharp angles and clear forms make it perfect for impactful titles and branding.
* **Body & Content - 'Cairo' (Weights: 700, 900):** A modern, clean, and highly legible sans-serif that offers excellent support for both Arabic (primary content language) and Latin scripts. Its clarity complements the stylized nature of Orbitron, ensuring readability for detailed information.

### ✨ Iconography: Symbols of Cyber Space

* **Font Awesome 6:** Leveraged for clear, universally understood icons within the CV card (e.g., contact methods, section headers, skill/project badges).
* **Custom SVG "Data Shard":** A unique, angular design for the AI Chatbot toggle, moving away from generic icons to something that feels bespoke, intelligent, and thematically integrated.

## 💡 Key Features & Sections Deconstructed

The website is a single-page application (SPA) experience, flowing through distinct, animated sections:

### 1. Immersive Loading Experience (`#loader`)

* **Visuals:** A 3D floating card featuring the "AMRIKYY" text logo and avatar, set against a darker, themed background.
* **Animation:** The card exhibits a `floatCard` animation with subtle 3D rotations. A unique `rotateEnergyField` pseudo-element provides a dynamic aura.
* **Feedback:** An animated multi-color neon progress bar (`--neon-green`, `--neon-blue`, `--neon-purple`) and bouncing dots accompanying the loading message.
* **Transition:** Smooth fade-out to reveal the main hero section.

### 2. Dynamic Hero Section (`.hero-section`)

* **"AMRIKYY" Visual Logo:** A prominent, custom-styled "AMRIKYY" logotype using 'Orbitron', featuring strong neon green glows and an animated underline.
* **Engaging Introduction:** Arabic headline "أهلاً بك في Amrikyy" with a highlighted "Amrikyy" and a compelling subtitle setting the stage.
* **Call to Action (CTA):** A clear, neon green outlined button "شاهد CV الذكي" (`.cta-btn`) prompting users to explore further.
* **Animated Background:** A full-screen canvas-based particle system (`#particle-canvas-main`) provides a subtle, dynamic backdrop, enhancing the cybernetic atmosphere. Particles are themed neon green and white.

### 3. Interactive CV Card (`#cv-card-page`)

Designed to be "smart, small, and eye-catching":

* **Compact & Focused:** `max-width: 460px` ensures a digestible, card-like presentation.
* **3D Interactivity:** Features a mouse-driven 3D tilt effect, making the card respond to user interaction, enhancing depth and engagement. The `box-shadow` dynamically adjusts with the tilt.
* **Aesthetics:** Utilizes the `--glass` background for a modern, layered feel, bordered with `--neon-green`. A faint animated grid pattern (`::before`) adds a subtle tech texture.
* **Structure:**
  * **Header (`.cv-header`):** Contains Amrikyy's avatar (with hover effect), name, title, and contact/social media links (using Font Awesome icons). Includes a "Download CV" button.
  * **Body (`.cv-body`):**
    * **Sections (`.cv-section`):** Professional Summary, Skills, Certifications, Key Projects. Each section is a distinct visual block with an 'Orbitron' title (often accompanied by a Font Awesome icon) and themed hover states.
    * **Skills List (`.skills-list`):** Presented as "cyber-chip" like badges with neon green text/borders and interactive hover effects. Each skill is prepended with a relevant Font Awesome icon.
    * **Certifications & Projects:** Listed items also feature icons and refined hover states for better engagement.
  * **Content Language:** Primarily in Arabic, as per the latest design.

### 4. AI Chatbot Assistant (`#chatbot-toggle`, `#chatbot-window`)

* **Unique Toggle:** The "Data Shard" SVG icon serves as the chatbot launcher, with custom neon pulse and hover animations. A small "AI" text label appears on hover.
* **Themed Interface:** The chat window (header, messages, input) adheres to the dark, neon green, and glassmorphism theme.
* **Core Functionality:**
  * Toggling window visibility.
  * Displaying user and AI messages with distinct styling and avatars.
  * Input field and send button.
  * Typing indicator.
  * **Note:** Frontend logic is implemented. Full AI capabilities require connecting the provided `REPLIT_BACKEND_URL` placeholder in `script.js` to a live backend service.

## 🛠️ Technical Stack (MVP Focus)

This portfolio is built with a focus on modern, lightweight technologies, ensuring a fast and performant experience without reliance on heavy frameworks for its core structure:

* **HTML5:** Semantic markup for content structure and accessibility.
* **CSS3:**
  * Custom Properties (Variables) for robust theming and maintainability.
  * Flexbox and CSS Grid for responsive layouts.
  * Advanced animations and transitions (`@keyframes`, `transition`).
  * Pseudo-elements (`::before`, `::after`) for intricate UI details and effects.
  * Filters (`drop-shadow`, `blur`) for glows and glassmorphism.
  * `clamp()` for fluid typography and spacing.
  * Mobile-first responsive design principles with `@media` queries.
* **JavaScript (Vanilla):**
  * DOM manipulation for dynamic content and UI updates (loader, chatbot, CV card visibility).
  * Event handling for user interactions (button clicks, mouse movements for 3D tilt).
  * `setTimeout` / `setInterval` for timed animations and sequences.
  * Canvas API for the main page's interactive particle background.
  * Web Animations API (implicitly, via `element.animate()` if used - though current version relies more on CSS + class toggles).
* **Google Fonts:** For 'Orbitron' and 'Cairo'.
* **Font Awesome 6 (CDN):** For scalable vector icons.

## 📁 File Structure

The project is organized into three core files for simplicity and ease of deployment, especially for MVP/static hosting:

* `index.html`: Contains all the HTML structure for the loader, hero, CV card, and chatbot.
* `style.css`: Includes all CSS rules for styling every component of the website.
* `script.js`: Houses all client-side JavaScript for interactivity, animations, and chatbot frontend logic.
* `avatar.jpg` (or `https://i.ibb.co/pWwQnYg/avatar-amrikyy.png`): User's profile picture. *User must provide this or ensure the path is correct.*
* `your-cv-filename.pdf`: Placeholder for the downloadable CV. *User must provide this and update the link in `index.html`.*

## 🚀 Setup & Usage

1. **Download Files:** Ensure `index.html`, `style.css`, and `script.js` are in the same project directory.
2. **Add Assets:**
    * Place your profile picture (e.g., `avatar.jpg`) in the same directory or update the `src` path in `index.html`.
    * Place your CV PDF (e.g., `your-cv-filename.pdf`) in the directory and update the `href` for the "Download CV" button in `index.html`.
3. **Open `index.html`:** Launch the `index.html` file in any modern web browser.
4. **Chatbot Backend (Crucial):** For full AI chatbot functionality, open `script.js` and replace the placeholder `'YOUR_REPLIT_BACKEND_URL_HERE'` with your actual Replit (or other) backend API endpoint.

## ⚙️ Customization Notes

* **Theming:** Easily modify the site's look and feel by adjusting the CSS variables defined at the top of `style.css` in the `:root` selector.
* **Content:** All text content (summaries, skills, project details, etc.) can be edited directly within the `index.html` file.
* **Animations:** Animation durations, timings, and keyframes are defined in `style.css` and can be fine-tuned.
* **JavaScript Logic:** Behavior for the loader, 3D tilt, and chatbot can be modified within `script.js`. Sections are commented for clarity.

## ✍️ Author

**Mohamed H Abdelaziz (Amrikyy)**
*Cybersecurity Specialist & Full-Stack Developer*

---

This README should provide a solid "expert" overview of your impressive portfolio website!
