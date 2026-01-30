// ============================================
// AGETHA - JAVASCRIPT CONTROLLER
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ============================================
  // TAB SYSTEM
  // ============================================
  
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  function switchTab(tabName) {
    // Update panels
    tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === tabName);
    });
    
    // Update buttons
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update URL hash
    location.hash = tabName;
  }
  
  // Attach click handlers
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });
  
  // Handle initial tab from hash or default to first tab
  const initialTab = location.hash.replace('#', '') || tabButtons[0]?.dataset.tab || 'about';
  switchTab(initialTab);
  
  // Handle hash changes
  window.addEventListener('hashchange', () => {
    const tabName = location.hash.replace('#', '');
    if (tabName && document.getElementById(tabName)) {
      switchTab(tabName);
    }
  });
  
  
  // ============================================
  // CHANGELOG ACCORDION
  // ============================================
  
  const versionHeaders = document.querySelectorAll('.version-header');
  
  versionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      // Close all other accordions
      versionHeaders.forEach(h => {
        if (h !== header) {
          h.classList.remove('active');
        }
      });
      
      // Toggle current accordion
      header.classList.toggle('active');
    });
  });
  
  // Auto-open the first (latest) version
  if (versionHeaders.length > 0) {
    versionHeaders[0].classList.add('active');
  }
  
  
  // ============================================
  // SMOOTH SCROLL FOR HASH LINKS
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  
  // ============================================
  // CONSOLE MESSAGE
  // ============================================
  
  console.log('%c🌸 AGETHA', 'color: #a855f7; font-size: 24px; font-weight: bold;');
  console.log('%cAdaptive AI Companion', 'color: #9333ea; font-size: 14px;');
  
});

