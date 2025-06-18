/**
 * Theme management and toggle controls
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    updateToggleIcon(toggleBtn);
    toggleBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  document.body.classList.add('theme-transition');
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');

  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    updateToggleIcon(toggleBtn);
  }

  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 500);
}

function updateToggleIcon(btn) {
  if (document.body.classList.contains('light-theme')) {
    btn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    btn.innerHTML = '<i class="fas fa-sun"></i>';
  }
}
