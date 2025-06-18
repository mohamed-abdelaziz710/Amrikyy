/**
 * Rating widget functionality
 */
function initRatingWidgets() {
  const widgets = document.querySelectorAll('.rating-widget');
  if (!widgets.length) return;

  let ratingsStore = {};
  try {
    ratingsStore = JSON.parse(localStorage.getItem('toolRatings')) || {};
  } catch (e) {
    ratingsStore = {};
  }

  widgets.forEach(widget => {
    const toolId = widget.getAttribute('data-tool-id');
    const stars = widget.querySelectorAll('.star');
    const commentInput = widget.querySelector('.rating-comment');
    const submitBtn = widget.querySelector('.rating-submit');
    const averageDisplay = widget.querySelector('.rating-average span');
    let selected = 0;

    updateAverage();

    stars.forEach(star => {
      const value = parseInt(star.dataset.value, 10);
      star.addEventListener('mouseenter', () => highlight(value));
      star.addEventListener('mouseleave', () => highlight(selected));
      star.addEventListener('click', () => {
        selected = value;
        highlight(selected);
      });
    });

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (!selected) return alert('Please select a rating first');
        const comment = commentInput ? commentInput.value.trim() : '';
        if (!ratingsStore[toolId]) ratingsStore[toolId] = { ratings: [] };
        ratingsStore[toolId].ratings.push({ stars: selected, comment });
        localStorage.setItem('toolRatings', JSON.stringify(ratingsStore));
        if (commentInput) commentInput.value = '';
        selected = 0;
        highlight(selected);
        updateAverage();
      });
    }

    function highlight(rating) {
      stars.forEach(s => {
        const val = parseInt(s.dataset.value, 10);
        if (val <= rating) {
          s.classList.add('fa-solid', 'active');
          s.classList.remove('fa-regular');
        } else {
          s.classList.remove('fa-solid', 'active');
          s.classList.add('fa-regular');
        }
      });
    }

    function updateAverage() {
      if (ratingsStore[toolId] && ratingsStore[toolId].ratings.length) {
        const arr = ratingsStore[toolId].ratings;
        const avg = arr.reduce((a, r) => a + r.stars, 0) / arr.length;
        averageDisplay.textContent = avg.toFixed(1);
      } else {
        averageDisplay.textContent = '0';
      }
    }
  });
}
