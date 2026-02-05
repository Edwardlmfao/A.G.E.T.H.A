// ============================================
// A.G.E.T.H.A Enhanced JavaScript
// Version: 2.3.7b Enhanced Edition
// ============================================

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  initializeTabs();
  initializeVersionAccordions();
  initializeSmoothScroll();
  initializeThemeToggle();
  initializeAnimations();
  initializeBillboardCarousel();
  initializeFeatureSlider();
  initializeCounters();
  initializeTypewriter();
  initializeParticles();
  initializeLiveStats();
  
 
});

// ============================================
// TAB NAVIGATION SYSTEM
// ============================================
function initializeTabs() {
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
    
    // Reinitialize counters when switching to features tab
    if (tabName === 'features') {
      setTimeout(() => initializeCounters(), 100);
    }
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
}




console.log("sIX SEVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEENnn")
console.log("HAHWHAWHAWN FUNNY RIGHT SIXSEVNEVNENENNNNNNNNNNNNNNNNNNN")


function initializeVersionAccordions() {
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
}

function initializeSmoothScroll() {
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
}

function initializeThemeToggle() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlElement = document.documentElement;
  
  const currentTheme = localStorage.getItem('theme') || 'light';
  setTheme(currentTheme);
  
  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    themeToggleBtns.forEach(btn => {
      if (btn.dataset.theme === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  
  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      setTheme(theme);
      
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
      setTheme(newTheme);
    }
  });
}

function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

function initializeBillboardCarousel() {
  const track = document.getElementById('billboardTrack');
  const slides = track?.querySelectorAll('.billboard-slide');
  const indicatorsContainer = document.getElementById('billboardIndicators');
  const prevBtn = document.querySelector('.billboard-nav.prev');
  const nextBtn = document.querySelector('.billboard-nav.next');
  
  if (!track || !slides.length) return;
  
  let currentIndex = 0;
  let autoplayInterval;
  let slideFromRight = true; 
  slides.forEach((slide, index) => {
    if (index !== 0) {
      slide.classList.add('slide-from-right');
    }
  });
  
  slides.forEach((_, index) => {
    const indicator = document.createElement('button');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });
  
  const indicators = indicatorsContainer.querySelectorAll('.indicator');
  
  function goToSlide(index, fromDirection = null, skipReset = false) {
    const oldIndex = currentIndex;
    
    slides[currentIndex].classList.remove('active');
    indicators[currentIndex].classList.remove('active');
    
    let comingFromRight;
    if (fromDirection !== null) {
      comingFromRight = fromDirection;
    } else {
      comingFromRight = index > oldIndex ? slideFromRight : !slideFromRight;
    }
    
    setTimeout(() => {
      if (comingFromRight) {
        slides[oldIndex].classList.remove('slide-from-right');
        slides[oldIndex].classList.add('slide-from-left');
      } else {
        slides[oldIndex].classList.remove('slide-from-left');
        slides[oldIndex].classList.add('slide-from-right');
      }
    }, 10);
    
    currentIndex = index;
    
    if (comingFromRight) {
      slides[currentIndex].classList.remove('slide-from-left');
      slides[currentIndex].classList.add('slide-from-right');
    } else {
      slides[currentIndex].classList.remove('slide-from-right');
      slides[currentIndex].classList.add('slide-from-left');
    }
    
    setTimeout(() => {
      slides[currentIndex].classList.add('active');
      indicators[currentIndex].classList.add('active');
    }, 20);
    
    if (!skipReset) {
      resetAutoplay();
    }
  }
  
  function autoSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    
 
    if (nextIndex === 0) {
      slideFromRight = !slideFromRight;
    }
    
    goToSlide(nextIndex, slideFromRight, true);
  }
  
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, true);
  }
  
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, false);
  }
  
  function startAutoplay() {
    autoplayInterval = setInterval(autoSlide, 5000);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);
  
  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }
  
  startAutoplay();
}

function initializeFeatureSlider() {
  const slider = document.getElementById('featureSlider');
  const slides = slider?.querySelectorAll('.feature-slide');
  const dotsContainer = document.getElementById('featureDots');
  const prevBtn = document.getElementById('featurePrev');
  const nextBtn = document.getElementById('featureNext');
  
  if (!slider || !slides.length) return;
  
  let currentSlide = 0;
  let slidesToShow = getSlidesToShow();
  
  function getSlidesToShow() {
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 768) return 2;
    return 1;
  }
  
  function init() {
    dotsContainer.innerHTML = '';
    
    const totalPages = Math.ceil(slides.length / slidesToShow);
    
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
    
    currentSlide = 0;
    updateSlider();
  }
  
  function updateSlider() {
    const dots = dotsContainer.querySelectorAll('.dot');
    const slideWidth = 100 / slidesToShow;
    const offset = -(currentSlide * slideWidth * slidesToShow);
    
    slider.style.transform = `translateX(${offset}%)`;
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToPage(index) {
    const totalPages = Math.ceil(slides.length / slidesToShow);
    currentSlide = Math.max(0, Math.min(index, totalPages - 1));
    updateSlider();
  }
  
  function nextPage() {
    const totalPages = Math.ceil(slides.length / slidesToShow);
    if (currentSlide < totalPages - 1) {
      goToPage(currentSlide + 1);
    }
  }
  
  function prevPage() {
    if (currentSlide > 0) {
      goToPage(currentSlide - 1);
    }
  }
  
  prevBtn?.addEventListener('click', prevPage);
  nextBtn?.addEventListener('click', nextPage);
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newSlidesToShow = getSlidesToShow();
      if (newSlidesToShow !== slidesToShow) {
        slidesToShow = newSlidesToShow;
        init();
      }
    }, 250);
  });
  
  init();
}


function initializeCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

function initializeTypewriter() {
  const element = document.getElementById('subtitle');
  if (!element) return;
  
  const texts = [
    'Adaptive General Encryption & Task-Handling Hybrid AI',
    'Im here you know?',
    'Shoutout to my friends for keeping me alive.',
    'Built for the Future.'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

function initializeParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
  }
}


function initializeLiveStats() {
  const statNumber = document.querySelector('.stat-number[data-count]');
  if (!statNumber) return;
  
  const targetCount = parseInt(statNumber.dataset.count);
  let currentCount = 0;
  
  function updateLiveStats() {
    const increment = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    currentCount = Math.max(targetCount - 50, Math.min(targetCount + 50, currentCount + increment));
    statNumber.textContent = currentCount;
  }
  
  const duration = 1000;
  const increment = targetCount / (duration / 16);
  
  const countUp = () => {
    currentCount += increment;
    if (currentCount < targetCount) {
      statNumber.textContent = Math.floor(currentCount);
      requestAnimationFrame(countUp);
    } else {
      statNumber.textContent = targetCount;
      currentCount = targetCount;
      setInterval(updateLiveStats, 2000);
    }
  };
  
  countUp();
}

const Utils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  getCurrentTheme: () => {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },
  
  toggleTheme: () => {
    const currentTheme = Utils.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    const event = new CustomEvent('themechange', { detail: { theme: newTheme } });
    document.dispatchEvent(event);
  },
  
  randomRange: (min, max) => {
    return Math.random() * (max - min) + min;
  },
  
  lerp: (start, end, amt) => {
    return (1 - amt) * start + amt * end;
  }
};

if (typeof window !== 'undefined') {
  window.AgethaUtils = Utils;
}
// love you
(function() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
    
    console.log('%c heyya you got a secret congrats ', 'background: rgb(253, 45, 253); color: #000; font-size: 20px; padding: 10px;');
  }
})();


if (window.performance) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    }, 0);
  });
}
