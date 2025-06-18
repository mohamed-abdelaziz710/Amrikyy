/**
 * Load AI tools and provide search filtering
 */
let aiTools = [];

function initAITools() {
  const searchInput = document.getElementById('toolSearch');
  const cardsContainer = document.getElementById('toolCards');
  if (!searchInput || !cardsContainer) return;

  fetch('aiTools.json')
    .then(res => res.json())
    .then(data => {
      aiTools = data;
      renderToolCards(aiTools);
    })
    .catch(err => console.error('Error loading aiTools.json', err));

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = aiTools.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(query)))
    );
    renderToolCards(filtered);
  });
}

function renderToolCards(tools) {
  const cardsContainer = document.getElementById('toolCards');
  if (!cardsContainer) return;

  cardsContainer.innerHTML = '';
  tools.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.innerHTML = `
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <a href="${tool.link}" target="_blank">Visit</a>
    `;
    cardsContainer.appendChild(card);
  });
}
