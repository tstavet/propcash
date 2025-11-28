/**
 * PROPCASH V2 - JAVASCRIPT
 * Simple, maintainable scripts for form validation and UX enhancements
 */

(function() {
  'use strict';

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!toggleBtn || !mobileNav) return;
    
    toggleBtn.addEventListener('click', function() {
      const isOpen = mobileNav.classList.toggle('open');
      toggleBtn.textContent = isOpen ? '✕' : '☰';
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
    
    // Close menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('open');
        toggleBtn.textContent = '☰';
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // SMOOTH SCROLLING
  // ==========================================
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" or if target doesn't exist
        if (targetId === '#' || targetId === '') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        e.preventDefault();
        
        // Calculate offset for sticky header
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight + 20 : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // ==========================================
  // FORM VALIDATION
  // ==========================================
  function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Real-time validation on blur
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateField(this);
        });
        
        // Remove error on input
        input.addEventListener('input', function() {
          if (this.classList.contains('error')) {
            removeFieldError(this);
          }
        });
      });
      
      // Form submission validation
      form.addEventListener('submit', function(e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!validateField(field)) {
            isValid = false;
          }
        });
        
        if (!isValid) {
          e.preventDefault();
          
          // Scroll to first error
          const firstError = form.querySelector('.error');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
          }
        }
      });
    });
  }

  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Phone validation (basic)
    else if (type === 'tel' && value) {
      const phonePattern = /^[\d\s\-\(\)\.+]+$/;
      if (!phonePattern.test(value) || value.replace(/\D/g, '').length < 10) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    
    if (!isValid) {
      showFieldError(field, errorMessage);
    } else {
      removeFieldError(field);
    }
    
    return isValid;
  }

  function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    // Remove existing error message if any
    removeFieldError(field, false);
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  function removeFieldError(field, addSuccess = true) {
    field.classList.remove('error');
    
    if (addSuccess && field.value.trim()) {
      field.classList.add('success');
    } else {
      field.classList.remove('success');
    }
    
    // Remove error message
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  // ==========================================
  // PHONE NUMBER FORMATTING
  // ==========================================
  function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
      input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
          value = value.slice(0, 10);
        }
        
        // Format as (XXX) XXX-XXXX
        if (value.length > 6) {
          value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length > 3) {
          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else if (value.length > 0) {
          value = `(${value}`;
        }
        
        e.target.value = value;
      });
    });
  }

  // ==========================================
  // FORM SUBMISSION TRACKING
  // ==========================================
  function initFormTracking() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function() {
        // Track in Google Analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission', {
            'event_category': 'lead_generation',
            'event_label': window.location.pathname
          });
        }
        
        // You can add other tracking here (Facebook Pixel, etc.)
      });
    });
  }

  // ==========================================
  // CLICK TO CALL TRACKING
  // ==========================================
  function initClickToCallTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Track in Google Analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click_to_call', {
            'event_category': 'lead_generation',
            'event_label': this.getAttribute('href')
          });
        }
      });
    });
  }

  // ==========================================
  // CLICK TO TEXT TRACKING
  // ==========================================
  function initClickToTextTracking() {
    const smsLinks = document.querySelectorAll('a[href^="sms:"]');
    
    smsLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Track in Google Analytics if available
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click_to_text', {
            'event_category': 'lead_generation',
            'event_label': this.getAttribute('href')
          });
        }
      });
    });
  }

  // ==========================================
  // UPDATE CURRENT YEAR IN FOOTER
  // ==========================================
  function updateYear() {
    const yearElements = document.querySelectorAll('#year, [data-year]');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  }

  // ==========================================
  // FADE IN ANIMATION ON SCROLL
  // ==========================================
  function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.card, .testimonial-card, .stat-card');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      animateElements.forEach(element => {
        observer.observe(element);
      });
    }
  }

  // ==========================================
  // SET PAGE NAME IN HIDDEN FORM FIELD
  // ==========================================
  function setPageName() {
    const pageNameInput = document.getElementById('pageName');
    if (pageNameInput) {
      pageNameInput.value = document.title + ' - ' + location.pathname + location.search;
    }
  }

  // ==========================================
  // INITIALIZE ALL FUNCTIONS
  // ==========================================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    initMobileMenu();
    initSmoothScrolling();
    initFormValidation();
    initPhoneFormatting();
    initFormTracking();
    initClickToCallTracking();
    initClickToTextTracking();
    updateYear();
    initScrollAnimations();
    setPageName();
  }

  // Start initialization
  init();

})();
