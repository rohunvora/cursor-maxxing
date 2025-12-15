// === Copy Functionality ===
document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('toast');
  const promptContents = document.querySelectorAll('.prompt-content');
  const copyButtons = document.querySelectorAll('.copy-btn');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const promptCards = document.querySelectorAll('.prompt-card');

  // Copy function
  async function copyPrompt(promptElement, buttonElement) {
    const pre = promptElement.querySelector('pre');
    const text = pre.textContent;

    try {
      await navigator.clipboard.writeText(text);
      
      // Button feedback
      buttonElement.classList.add('copied');
      
      // Show toast
      showToast();
      
      // Reset button after delay
      setTimeout(() => {
        buttonElement.classList.remove('copied');
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  // Toast notification
  function showToast() {
    toast.classList.add('show');
    
    // Hide after delay
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // Click on prompt content area to copy
  promptContents.forEach(content => {
    content.addEventListener('click', (e) => {
      // Don't double-trigger if clicking the button
      if (e.target.closest('.copy-btn')) return;
      
      const btn = content.querySelector('.copy-btn');
      copyPrompt(content, btn);
    });

    // Keyboard accessibility
    content.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const btn = content.querySelector('.copy-btn');
        copyPrompt(content, btn);
      }
    });
  });

  // Click on copy button
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const content = btn.closest('.prompt-content');
      copyPrompt(content, btn);
    });
  });

  // === Filter Functionality ===
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Show/hide cards
      promptCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          // Re-trigger animation
          card.style.animation = 'none';
          card.offsetHeight; // Trigger reflow
          card.style.animation = null;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // === Keyboard shortcut: Cmd/Ctrl + number to copy nth visible prompt ===
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '9') {
      e.preventDefault();
      const index = parseInt(e.key) - 1;
      const visibleCards = Array.from(promptCards).filter(c => !c.classList.contains('hidden'));
      
      if (visibleCards[index]) {
        const content = visibleCards[index].querySelector('.prompt-content');
        const btn = content.querySelector('.copy-btn');
        copyPrompt(content, btn);
        
        // Visual feedback on the card
        visibleCards[index].style.transform = 'scale(0.98)';
        setTimeout(() => {
          visibleCards[index].style.transform = '';
        }, 150);
      }
    }
  });
});

