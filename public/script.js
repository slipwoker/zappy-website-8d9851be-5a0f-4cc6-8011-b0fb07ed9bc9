// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you within 24 hours to discuss your pet photography session.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Portfolio Image Modal (Simple Implementation)
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.portfolio-overlay');
        const title = overlay.querySelector('h4').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'portfolio-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${img.src}" alt="${title}">
                <div class="modal-info">
                    <h3>${title}</h3>
                    <p>${overlay.querySelector('p').textContent}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    });
});

// Add modal styles dynamically
const modalStyles = `
.portfolio-modal {
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    background: white;
    border-radius: 15px;
    overflow: hidden;
}

.modal-content img {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: cover;
}

.modal-info {
    padding: 20px;
}

.modal-info h3 {
    color: #8B4513;
    margin-bottom: 10px;
    font-family: 'Playfair Display', serif;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    color: white;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Scroll Animations
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

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-text, .contact-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.textContent.replace('+', '').replace('%', ''));
            const count = parseInt(counter.getAttribute('data-count') || '0');
            const increment = target / speed;
            
            if (count < target) {
                counter.setAttribute('data-count', Math.ceil(count + increment));
                const suffix = counter.textContent.includes('+') ? '+' : 
                             counter.textContent.includes('%') ? '%' : '';
                counter.textContent = Math.ceil(count + increment) + suffix;
                setTimeout(updateCount, 1);
            } else {
                const suffix = counter.textContent.includes('+') ? '+' : 
                             counter.textContent.includes('%') ? '%' : '';
                counter.textContent = target + suffix;
            }
        };
        
        updateCount();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Form Validation
const validateForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#27ae60';
            }
        });
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
    }
};

validateForm();

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add loading state
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'all 0.5s ease';
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('.hero-image img, .about-image img');
    let imagesLoaded = 0;
    const totalImages = criticalImages.length;
    
    if (totalImages === 0) {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
        return;
    }
    
    criticalImages.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    document.body.style.opacity = '1';
                    document.body.style.transform = 'translateY(0)';
                }
            });
        }
    });
    
    if (imagesLoaded === totalImages) {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }
});

/* Cookie Consent */

// Helper function to check cookie consent
function hasConsentFor(category) {
  if (typeof window.CookieConsent === 'undefined') {
    return false; // Default to no consent if cookie consent not loaded
  }
  
  return window.CookieConsent.validConsent(category);
}

// Helper function to execute code only with consent
function withConsent(category, callback) {
  if (hasConsentFor(category)) {
    callback();
  } else {
    console.log(`⚠️  Skipping ${category} code - no user consent`);
  }
}

// Cookie Consent Initialization
console.log('🍪 Cookie consent script loaded - starting initialization...');

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and vanilla-cookieconsent to be ready
  function initCookieConsent() {
    initAttempts++;
    
    console.log('🍪 Cookie consent init attempt', initAttempts, '- CookieConsent available:', typeof window.CookieConsent !== 'undefined');
    console.log('🍪 Document ready state:', document.readyState);
    console.log('🍪 Window object available:', typeof window !== 'undefined');
    
    if (typeof window.CookieConsent === 'undefined') {
      if (initAttempts < maxAttempts) {
        console.log('🍪 CookieConsent not ready, retrying in 100ms...');
        setTimeout(initCookieConsent, 100);
      } else {
        console.error('🍪 Cookie consent failed to load after', maxAttempts, 'attempts');
        console.error('🍪 Available window properties:', Object.keys(window).filter(k => k.toLowerCase().includes('cookie')));
      }
      return;
    }

    const cc = window.CookieConsent;
    
    console.log('🍪 Initializing cookie consent with config:', typeof cc);
    console.log('🍪 CookieConsent.run available:', typeof cc.run === 'function');
    
    // Initialize cookie consent
    try {
      cc.run({
  "autoShow": true,
  "mode": "opt-in",
  "revision": 0,
  "categories": {
    "necessary": {
      "enabled": true,
      "readOnly": true
    },
    "analytics": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_ga"
          },
          {
            "name": "_ga_*"
          },
          {
            "name": "_gid"
          },
          {
            "name": "_gat"
          }
        ]
      }
    },
    "marketing": {
      "enabled": false,
      "readOnly": false,
      "autoClear": {
        "cookies": [
          {
            "name": "_fbp"
          },
          {
            "name": "_fbc"
          },
          {
            "name": "fr"
          }
        ]
      }
    }
  },
  "language": {
    "default": "en",
    "translations": {
      "en": {
        "consentModal": {
          "title": "We use cookies 🍪",
          "description": "Puptiz uses cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can manage your preferences anytime.",
          "acceptAllBtn": "Accept All",
          "acceptNecessaryBtn": "Accept Necessary",
          "showPreferencesBtn": "Manage Preferences",
          "footer": "<a href=\"#privacy-policy\">Privacy Policy</a> | <a href=\"#terms-conditions\">Terms & Conditions</a>"
        },
        "preferencesModal": {
          "title": "Cookie Preferences",
          "acceptAllBtn": "Accept All",
          "acceptNecessaryBtn": "Accept Necessary",
          "savePreferencesBtn": "Save Preferences",
          "closeIconLabel": "Close",
          "sections": [
            {
              "title": "Essential Cookies",
              "description": "These cookies are necessary for the website to function and cannot be disabled.",
              "linkedCategory": "necessary"
            },
            {
              "title": "Analytics Cookies",
              "description": "These cookies help us understand how visitors interact with our website.",
              "linkedCategory": "analytics"
            },
            {
              "title": "Marketing Cookies",
              "description": "These cookies are used to deliver personalized advertisements.",
              "linkedCategory": "marketing"
            }
          ]
        }
      }
    }
  },
  "guiOptions": {
    "consentModal": {
      "layout": "box",
      "position": "bottom right",
      "equalWeightButtons": true,
      "flipButtons": false
    },
    "preferencesModal": {
      "layout": "box",
      "equalWeightButtons": true,
      "flipButtons": false
    }
  }
});
      console.log('✅ Cookie consent initialized successfully');
    } catch (error) {
      console.error('❌ Cookie consent initialization failed:', error);
      console.error('❌ Error details:', error.message, error.stack);
    }

    // Optional: Handle consent changes
    cc.onChange(function(cookie, changed_preferences) {
      console.log('🍪 Cookie consent changed:', changed_preferences);
      
      // Enable/disable analytics based on consent
      if (changed_preferences.includes('analytics')) {
        if (cc.validConsent('analytics')) {
          // Enable analytics (e.g., Google Analytics)
          console.log('📊 Analytics enabled');
          // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
        } else {
          console.log('📊 Analytics disabled');
          // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
        }
      }
      
      // Enable/disable marketing based on consent
      if (changed_preferences.includes('marketing')) {
        if (cc.validConsent('marketing')) {
          console.log('📢 Marketing enabled');
          // Example: gtag('consent', 'update', { ad_storage: 'granted' });
        } else {
          console.log('📢 Marketing disabled');
          // Example: gtag('consent', 'update', { ad_storage: 'denied' });
        }
      }
    });

    // Optional: Add show preferences button to footer
    const footer = document.querySelector('footer');
    if (footer && !footer.querySelector('.cookie-preferences-btn')) {
      const prefsButton = document.createElement('button');
      prefsButton.className = 'cookie-preferences-btn';
      prefsButton.textContent = '🍪 Cookie Preferences';
      prefsButton.style.cssText = `
        background: transparent;
        border: 1px solid rgba(255,255,255,0.3);
        color: inherit;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 16px;
        transition: all 0.3s ease;
      `;
      
      prefsButton.addEventListener('click', function() {
        cc.showPreferences();
      });
      
      prefsButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(255,255,255,0.1)';
      });
      
      prefsButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
      });
      
      // Add to footer (try to find a good spot)
      const footerLinks = footer.querySelector('.footer-links, .legal-links, p');
      if (footerLinks) {
        footerLinks.appendChild(prefsButton);
      } else {
        footer.appendChild(prefsButton);
      }
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initCookieConsent, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initCookieConsent();
  } else {
    // Fallback - try after a short delay
    setTimeout(initCookieConsent, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initCookieConsent, { once: true });
    }
  }
})();

/* Accessibility Features */

// Accessibility Toolbar Initialization
console.log('♿ Accessibility toolbar script loaded - starting initialization...');

(function() {
  'use strict';
  
  let initAttempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  // Wait for DOM and accessibility library to be ready
  function initAccessibility() {
    initAttempts++;
    
    console.log('♿ Accessibility init attempt', initAttempts, '- Accessibility available:', typeof window.Accessibility !== 'undefined');
    console.log('♿ Document ready state:', document.readyState);
    
    if (typeof window.Accessibility === 'undefined') {
      if (initAttempts < maxAttempts) {
        console.log('♿ Accessibility library not ready, retrying in 100ms...');
        setTimeout(initAccessibility, 100);
      } else {
        console.error('♿ Accessibility library failed to load after', maxAttempts, 'attempts');
        console.error('♿ Available window properties:', Object.keys(window).filter(k => k.toLowerCase().includes('access')));
      }
      return;
    }

    console.log('♿ Initializing accessibility toolbar...');
    
    try {
      // Initialize accessibility toolbar with configuration
      new window.Accessibility({
  "icon": {
    "position": {
      "bottom": {
        "size": 50,
        "units": "px"
      },
      "right": {
        "size": 20,
        "units": "px"
      },
      "type": "fixed"
    },
    "backgroundColor": "#146FF8",
    "color": "#fff",
    "img": "accessible",
    "circular": true,
    "fontFaceSrc": [
      "https://fonts.googleapis.com/icon?family=Material+Icons"
    ],
    "fontFamily": "Material Icons"
  },
  "hotkeys": {
    "enabled": true,
    "helpTitles": true,
    "keys": {
      "toggleMenu": [
        "ctrl+alt+a"
      ],
      "invertColors": [
        "ctrl+alt+i"
      ],
      "toggleAnimations": [
        "ctrl+alt+n"
      ],
      "toggleContrast": [
        "ctrl+alt+c"
      ],
      "increaseFontSize": [
        "ctrl+alt+plus"
      ],
      "decreaseFontSize": [
        "ctrl+alt+minus"
      ]
    }
  },
  "menu": {
    "dimensions": {
      "width": {
        "size": 300,
        "units": "px"
      },
      "height": {
        "size": "auto",
        "units": "px"
      }
    },
    "fontFamily": "inherit"
  },
  "labels": {
    "resetTitle": "Reset accessibility settings",
    "closeTitle": "Close accessibility menu",
    "menuTitle": "Accessibility Options",
    "increaseText": "Increase text size",
    "decreaseText": "Decrease text size",
    "increaseTextSpacing": "Increase text spacing",
    "decreaseTextSpacing": "Decrease text spacing",
    "increaseLineHeight": "Increase line height",
    "decreaseLineHeight": "Decrease line height",
    "invertColors": "Invert colors",
    "grayHues": "Gray hues",
    "underlineLinks": "Underline links",
    "bigCursor": "Big cursor",
    "readingGuide": "Reading guide",
    "textToSpeech": "Text to speech",
    "speechToText": "Speech to text",
    "suppressAnimations": "Suppress animations"
  },
  "textToSpeechLang": "en-US",
  "speechToTextLang": "en-US",
  "enabled": true,
  "position": "bottom-right",
  "theme": "default"
});
      console.log('✅ Accessibility toolbar initialized successfully');
      
      // Add ARIA landmark improvements
      enhanceAriaLandmarks();
      
      // Add keyboard navigation improvements
      enhanceKeyboardNavigation();
      
      // Add focus management
      enhanceFocusManagement();
      
    } catch (error) {
      console.error('❌ Accessibility initialization failed:', error);
      console.error('❌ Error details:', error.message, error.stack);
    }
  }

  // Enhance ARIA landmarks for better screen reader support
  function enhanceAriaLandmarks() {
    try {
      // Add main landmark if missing
      const main = document.querySelector('main');
      if (!main) {
        const content = document.querySelector('.main-content, .content, #content');
        if (content && !content.getAttribute('role')) {
          content.setAttribute('role', 'main');
          content.setAttribute('aria-label', 'Main content');
        }
      }

      // Enhance navigation
      const nav = document.querySelector('nav');
      if (nav && !nav.getAttribute('aria-label')) {
        nav.setAttribute('aria-label', 'Main navigation');
      }

      // Enhance footer
      const footer = document.querySelector('footer');
      if (footer && !footer.getAttribute('role')) {
        footer.setAttribute('role', 'contentinfo');
      }

      // Add skip link if missing
      if (!document.querySelector('.skip-link, [href="#main"]')) {
        addSkipLink();
      }

      console.log('✅ ARIA landmarks enhanced');
    } catch (error) {
      console.error('❌ Error enhancing ARIA landmarks:', error);
    }
  }

  // Add skip link for keyboard navigation
  function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
      border-radius: 4px;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
      this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector('#main, main, [role="main"]');
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Enhance keyboard navigation
  function enhanceKeyboardNavigation() {
    try {
      // Ensure all interactive elements are keyboard accessible
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
      
      interactiveElements.forEach(element => {
        // Add focus indicators
        if (!element.style.outline) {
          element.addEventListener('focus', function() {
            this.style.outline = '2px solid #146FF8';
            this.style.outlineOffset = '2px';
          });
          
          element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
          });
        }
      });

      // Add keyboard support for custom interactive elements
      const customInteractive = document.querySelectorAll('[onclick]:not(button):not(a):not(input)');
      customInteractive.forEach(element => {
        if (!element.getAttribute('tabindex')) {
          element.setAttribute('tabindex', '0');
        }
        if (!element.getAttribute('role')) {
          element.setAttribute('role', 'button');
        }
        
        element.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
          }
        });
      });

      console.log('✅ Keyboard navigation enhanced');
    } catch (error) {
      console.error('❌ Error enhancing keyboard navigation:', error);
    }
  }

  // Enhance focus management
  function enhanceFocusManagement() {
    try {
      // Ensure main content area can receive focus
      const main = document.querySelector('main, [role="main"], .main-content');
      if (main && !main.getAttribute('tabindex')) {
        main.setAttribute('tabindex', '-1');
      }

      // Improve form accessibility
      const forms = document.querySelectorAll('form');
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          // Associate labels with inputs
          if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
            const label = form.querySelector(`label[for="${input.id}"], label`);
            if (label && !label.getAttribute('for')) {
              const id = input.id || 'input_' + Math.random().toString(36).substr(2, 9);
              input.id = id;
              label.setAttribute('for', id);
            }
          }

          // Add required field indicators
          if (input.required && !input.getAttribute('aria-required')) {
            input.setAttribute('aria-required', 'true');
          }
        });
      });

      console.log('✅ Focus management enhanced');
    } catch (error) {
      console.error('❌ Error enhancing focus management:', error);
    }
  }

  // Initialize when DOM is ready - multiple approaches for reliability
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibility);
    // Backup timeout in case DOMContentLoaded doesn't fire
    setTimeout(initAccessibility, 1000);
  } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initAccessibility();
  } else {
    // Fallback - try after a short delay
    setTimeout(initAccessibility, 500);
  }
  
  // Additional fallback - try after page load
  if (typeof window !== 'undefined') {
    if (window.addEventListener) {
      window.addEventListener('load', initAccessibility, { once: true });
    }
  }
})();