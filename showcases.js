// === Showcases Page JavaScript ===

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.showcase-filters .filter-btn');
  const showcaseCards = document.querySelectorAll('.showcase-card');
  const previewButtons = document.querySelectorAll('.preview-btn');
  const unlockButtons = document.querySelectorAll('.unlock-btn');
  const modal = document.getElementById('previewModal');
  const modalClose = modal.querySelector('.modal-close');
  const unlockFullBtn = modal.querySelector('.unlock-full-btn');

  // === Filter Functionality ===
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Show/hide cards with animation
      showcaseCards.forEach((card, index) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          // Stagger animation
          card.style.animationDelay = `${index * 0.05}s`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // === Modal Functionality ===
  function openModal(cardData) {
    // Update modal content based on card data
    const title = cardData.querySelector('.showcase-title').textContent;
    const stats = cardData.querySelector('.showcase-stats');
    const price = cardData.querySelector('.unlock-btn').dataset.price;
    
    // Update modal
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.price-amount').textContent = `$${price}`;
    
    // Extract stats
    const statValues = stats.querySelectorAll('.stat-value');
    const statNames = stats.querySelectorAll('.stat-name');
    const statsText = Array.from(statValues).map((val, i) => 
      `${val.textContent} ${statNames[i].textContent}`
    ).join(' • ');
    modal.querySelector('.modal-stats').textContent = statsText;
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Preview button clicks
  previewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.showcase-card');
      openModal(card);
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // === Unlock Functionality (placeholder for Stripe integration) ===
  unlockButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const price = btn.dataset.price;
      const card = btn.closest('.showcase-card');
      const title = card.querySelector('.showcase-title').textContent;
      
      // TODO: Integrate with Stripe
      console.log(`Unlock requested: "${title}" for $${price}`);
      
      // For now, show a placeholder message
      alert(`Coming soon!\n\nYou'll be able to unlock "${title}" for $${price}.\n\nThis will integrate with Stripe for secure payments.`);
    });
  });

  // Unlock full history button in modal
  unlockFullBtn.addEventListener('click', () => {
    const price = modal.querySelector('.price-amount').textContent;
    const title = modal.querySelector('.modal-title').textContent;
    
    // TODO: Integrate with Stripe
    console.log(`Full unlock requested: "${title}" for ${price}`);
    
    alert(`Coming soon!\n\nYou'll be able to unlock "${title}" for ${price}.\n\nThis will integrate with Stripe for secure payments.`);
  });

  // === Card Hover Effects ===
  showcaseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add subtle glow effect on hover
      const preview = card.querySelector('.showcase-preview');
      preview.style.boxShadow = 'inset 0 -60px 60px -60px var(--accent-glow)';
    });

    card.addEventListener('mouseleave', () => {
      const preview = card.querySelector('.showcase-preview');
      preview.style.boxShadow = '';
    });
  });

  // === Animate stats on scroll ===
  const heroStats = document.querySelector('.hero-stats');
  
  if (heroStats) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(heroStats);
  }

  function animateNumbers() {
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
    
    statNumbers.forEach(stat => {
      const target = stat.textContent;
      const isK = target.includes('k');
      const isPrice = target.includes('$');
      
      let num = parseFloat(target.replace(/[^0-9.]/g, ''));
      const duration = 1500;
      const steps = 60;
      const increment = num / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= num) {
          current = num;
          clearInterval(timer);
        }
        
        let display = Math.round(current * 10) / 10;
        if (isK) display = display + 'k';
        if (isPrice) display = '$' + display + 'k';
        if (!isK && !isPrice) display = Math.round(current);
        
        stat.textContent = display;
      }, duration / steps);
    });
  }

  // === Submit showcase CTA ===
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      // TODO: Link to submission form
      alert('Submission form coming soon!\n\nYou\'ll be able to upload your Cursor/Claude conversations and set your own price.');
    });
  }
});

