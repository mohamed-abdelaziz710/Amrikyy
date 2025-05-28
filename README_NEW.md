# Amrikyy - Cyber Portfolio

A cutting-edge cybersecurity portfolio website featuring a modern cyber/neon aesthetic with AI chatbot integration.

## Features

### 🎨 Visual Design

- **Cyber/Neon Theme**: Stunning visual design with neon green, blue, and purple color scheme
- **Animated Particle Background**: Dynamic particle system with interactive mouse effects
- **Loading Animation**: Professional loading sequence with progress bar and cyber-themed messages
- **Responsive Design**: Fully responsive layout optimized for all devices

### 🏗️ Architecture

- **Semantic HTML**: Properly structured HTML5 with ARIA accessibility features
- **Modern CSS**: Advanced CSS with custom properties, gradients, and animations
- **Vanilla JavaScript**: Pure JavaScript implementation without dependencies

### 🤖 AI Chatbot Integration

- **Custom Neon Icons**: Hand-crafted SVG icons with neon gradients and glow effects
- **Real-time Chat Interface**: Modern chat UI with typing indicators and smooth animations
- **Replit Backend Integration**: Ready to connect to your personal AI backend hosted on Replit
- **Fallback Responses**: Offline-capable with intelligent fallback responses
- **Accessibility**: Full keyboard navigation and screen reader support

### 📋 Content Sections

- **Professional Summary**: Cybersecurity specialist overview
- **Technical Skills**: Categorized skill sets with visual tags
- **Certifications**: Professional certifications and achievements
- **Languages**: Multi-language proficiency display
- **Tech Showcase**: Platform and technology expertise

## Setup Instructions

### Basic Setup

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. The portfolio will load with the animated background and CV card

### AI Chatbot Backend Integration

#### Step 1: Update Backend URL

In `script.js`, replace the placeholder URL with your actual Replit backend:

```javascript
const REPLIT_BACKEND_URL = 'https://your-replit-backend-url.replit.dev';
```

#### Step 2: Backend API Requirements

Your Replit backend should provide a POST endpoint at `/chat` that accepts:

```json
{
  "message": "user message",
  "context": {
    "name": "Amrikyy",
    "role": "Cybersecurity Specialist & Full-Stack Developer",
    "skills": ["Cybersecurity", "Penetration Testing", "..."],
    "languages": ["English", "Arabic"],
    "platforms": ["Apple", "Microsoft", "..."]
  }
}
```

And returns:

```json
{
  "response": "AI generated response"
}
```

#### Step 3: Enable CORS (if needed)

Ensure your Replit backend has CORS enabled for your domain.

## File Structure

```
├── index.html          # Main HTML structure
├── style.css           # Comprehensive styling with chatbot styles
├── script.js           # JavaScript functionality + chatbot logic
├── README.md           # Project documentation
└── IMG_0073 2.PNG      # Profile image asset
```

## Customization

### Colors

All colors are defined as CSS custom properties in `:root`:

- `--neon-green`: Primary neon green
- `--neon-blue`: Secondary neon blue  
- `--neon-purple`: Accent neon purple
- `--dark-bg`: Background color
- `--panel-glass`: Glass panel effect

### Content

Update the personal information in `index.html`:

- Profile name and title
- Professional summary
- Skills and certifications
- Contact links
- Social media links

### Chatbot Personality

Modify the fallback responses in `script.js` to match your personality and expertise.

## Browser Compatibility

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized particle animation with `requestAnimationFrame`
- Debounced resize events
- Efficient CSS animations with hardware acceleration
- Lazy-loaded chatbot functionality

## Accessibility Features

- Semantic HTML structure
- ARIA labels and landmarks
- Keyboard navigation support
- Screen reader compatible
- High contrast neon theme
- Focus management

## Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Advanced styling with custom properties and animations
- **JavaScript ES6+**: Modern JavaScript features
- **SVG**: Custom neon icons with gradients
- **Web APIs**: Canvas, Fetch, DOM manipulation

## License

This project is for personal portfolio use. Feel free to use as inspiration for your own portfolio.

---

*Built with cybersecurity in mind • Powered by cyber innovation*
