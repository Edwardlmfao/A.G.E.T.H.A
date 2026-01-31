// pls dont explode im ocnfused
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  function switchTab(tabName) {
    tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === tabName);
    });
    
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    location.hash = tabName;
  }
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });
  
  const initialTab = location.hash.replace('#', '') || tabButtons[0]?.dataset.tab || 'about';
  switchTab(initialTab);
  
  window.addEventListener('hashchange', () => {
    const tabName = location.hash.replace('#', '');
    if (tabName && document.getElementById(tabName)) {
      switchTab(tabName);
    }
  });
  
  
  const versionHeaders = document.querySelectorAll('.version-header');
  
  versionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      versionHeaders.forEach(h => {
        if (h !== header) {
          h.classList.remove('active');
        }
      });
      
      header.classList.toggle('active');
    });
  });
  
  if (versionHeaders.length > 0) {
    versionHeaders[0].classList.add('active');
  }
  
  
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
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlElement = document.documentElement;  
  const currentTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', currentTheme);
  themeToggleBtns.forEach(btn => {
    if (btn.dataset.theme === currentTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      

      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggleBtns.forEach(b => {
        if (b.dataset.theme === theme) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      
      document.body.style.transition = 'none';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 1);
    });
  });
  

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      themeToggleBtns.forEach(btn => {
        if (btn.dataset.theme === newTheme) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  });
  
  

  console.log('%c🌸 AGETHA', 'color: #a855f7; font-size: 24px; font-weight: bold;');
  console.log('%cAdaptive AI Companion', 'color: #9333ea; font-size: 14px;');
  
});
