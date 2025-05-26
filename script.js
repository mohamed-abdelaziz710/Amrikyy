// Smart Card Website JavaScript - Chatbot Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Chatbot Functionality
  initChatbot();
});

// Initialize Chatbot
function initChatbot() {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotPanel = document.getElementById('chatbotPanel');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');

  if (!chatbotToggle || !chatbotPanel || !chatbotClose || !chatbotInput || !chatbotMessages) {
    console.warn("Chatbot elements not found. Chatbot functionality may be limited.");
    return;
  }
  
  // Toggle chatbot panel
  chatbotToggle.addEventListener('click', () => {
    const isDisplayed = chatbotPanel.style.display === 'flex';
    chatbotPanel.style.display = isDisplayed ? 'none' : 'flex';
    if (!isDisplayed) {
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
      respondToUser(userMessage); // Removed setTimeout for faster response initiation
    }
  });
  
  // Handle suggestion buttons
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      addMessage('user', query); // Add user message when suggestion is clicked
      // Process suggestion query and respond
      respondToUser(query);
    });
  });
  
  // Add message to chat
  function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const promptSpan = document.createElement('span');
    promptSpan.className = 'terminal-prompt';
    promptSpan.textContent = type === 'user' ? 'guest:~$ ' : 'system:~$ ';

    messageContent.appendChild(promptSpan);
    messageContent.append(content); // Append content directly, handles text nodes correctly
    
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // Respond to user input
  async function respondToUser(message) {
    // Show loading/typing indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message system loading'; // Added 'loading' class for potential styling
    loadingDiv.innerHTML = '<div class="message-content"><span class="terminal-prompt">system:~$</span> <em>Typing...</em></div>';
    chatbotMessages.appendChild(loadingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    try {
      const response = await fetch('https://0e45fe78-86ad-4c8f-b665-f561edd3e592-00-ezbtmwl50c4e.riker.replit.dev:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      
      chatbotMessages.removeChild(loadingDiv); // Remove loading indicator once response is received

      if (!response.ok) {
        // Handle HTTP errors like 404, 500 etc.
        addMessage('system', `Error: Server responded with status ${response.status}`);
        return;
      }

      const data = await response.json();
      if (data && data.reply) {
        addMessage('system', data.reply);
      } else {
        addMessage('system', 'Sorry, I did not understand the response from the server.');
      }
    } catch (error) {
      if (chatbotMessages.contains(loadingDiv)) { // Ensure loadingDiv is still a child before removing
          chatbotMessages.removeChild(loadingDiv);
      }
      console.error("Chatbot API Error:", error);
      addMessage('system', 'Sorry, there was a problem connecting to the chatbot server. Please check the console for details.');
    }
  }
}
