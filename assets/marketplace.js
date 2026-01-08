/**
 * PROPCASH LIVING MARKETPLACE
 * Simulates real-time deal activity to create social proof and urgency
 */

(function() {
  'use strict';

  // ==========================================
  // MARKETPLACE DATA - Realistic deal simulation
  // ==========================================

  const PROPERTY_TYPES = [
    '3BR Ranch', '4BR Colonial', '2BR Bungalow', '3BR Split-Level',
    '4BR Traditional', '2BR Cottage', '3BR Cape Cod', '5BR Estate',
    '3BR Craftsman', '4BR Victorian', '2BR Condo', '3BR Townhouse',
    '4BR Modern', '3BR Tudor', '2BR Duplex'
  ];

  const INVESTOR_NAMES = [
    'HomeVest Capital', 'Rapid Home Buyers', 'CashFlow Properties',
    'Premier Investments', 'SunBelt Holdings', 'Keystone Acquisitions',
    'Liberty Home Partners', 'Falcon Property Group', 'Atlas Real Estate',
    'Meridian Buyers', 'Summit Cash Homes', 'Velocity Acquisitions',
    'Anchor Investments', 'Sterling Home Buyers', 'Phoenix Property Co'
  ];

  const MARKETS = [
    { city: 'Dallas', state: 'TX', link: '/texas/dallas-fort-worth/' },
    { city: 'Houston', state: 'TX', link: '/texas/houston/' },
    { city: 'San Antonio', state: 'TX', link: '/texas/san-antonio/' },
    { city: 'Austin', state: 'TX', link: '/texas/' },
    { city: 'Tampa', state: 'FL', link: '/florida/tampa-bay/' },
    { city: 'Orlando', state: 'FL', link: '/florida/orlando/' },
    { city: 'Jacksonville', state: 'FL', link: '/florida/jacksonville/' },
    { city: 'Miami', state: 'FL', link: '/florida/' },
    { city: 'Atlanta', state: 'GA', link: '/georgia/atlanta/' },
    { city: 'Savannah', state: 'GA', link: '/georgia/savannah/' },
    { city: 'Phoenix', state: 'AZ', link: '/arizona/' },
    { city: 'Tucson', state: 'AZ', link: '/arizona/' },
    { city: 'Nashville', state: 'TN', link: '/tennessee/' },
    { city: 'Memphis', state: 'TN', link: '/tennessee/' },
    { city: 'Charlotte', state: 'NC', link: '/north-carolina/' },
    { city: 'Raleigh', state: 'NC', link: '/north-carolina/' }
  ];

  const STATUSES = [
    { text: 'New listing', icon: 'new', class: 'status-new' },
    { text: 'Receiving offers', icon: 'offers', class: 'status-offers' },
    { text: 'Multiple offers', icon: 'hot', class: 'status-hot' },
    { text: 'Under review', icon: 'review', class: 'status-review' },
    { text: 'Deal closed', icon: 'closed', class: 'status-closed' }
  ];

  const TIME_AGO = [
    'just now', '1 min ago', '2 min ago', '3 min ago', '5 min ago',
    '8 min ago', '12 min ago', '15 min ago', '23 min ago', '34 min ago',
    '47 min ago', '1 hr ago', '2 hrs ago', '3 hrs ago'
  ];

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generatePrice() {
    const base = randomBetween(180, 650);
    return base * 1000;
  }

  function formatPrice(price) {
    return '$' + price.toLocaleString();
  }

  function generateDeal() {
    const market = randomFrom(MARKETS);
    const status = randomFrom(STATUSES);
    const offerCount = randomBetween(1, 6);

    return {
      propertyType: randomFrom(PROPERTY_TYPES),
      city: market.city,
      state: market.state,
      link: market.link,
      status: status,
      offerCount: offerCount,
      price: generatePrice(),
      investor: randomFrom(INVESTOR_NAMES),
      timeAgo: randomFrom(TIME_AGO),
      closingDays: randomBetween(7, 21)
    };
  }

  // ==========================================
  // ACTIVITY TICKER
  // ==========================================

  let tickerDeals = [];
  let tickerIndex = 0;

  function initActivityTicker() {
    const ticker = document.getElementById('marketplace-ticker');
    if (!ticker) return;

    // Generate initial deals
    for (let i = 0; i < 15; i++) {
      tickerDeals.push(generateDeal());
    }

    // Render initial ticker
    renderTicker();

    // Update ticker periodically
    setInterval(() => {
      // Add new deal and remove old one
      tickerDeals.push(generateDeal());
      if (tickerDeals.length > 20) tickerDeals.shift();
      renderTicker();
    }, 8000);
  }

  function renderTicker() {
    const ticker = document.getElementById('marketplace-ticker');
    if (!ticker) return;

    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContent) return;

    // Create ticker items HTML
    const items = tickerDeals.map(deal => {
      const statusIcon = getStatusIcon(deal.status.icon);
      return `
        <div class="ticker-item">
          <span class="ticker-icon">${statusIcon}</span>
          <span class="ticker-text">
            <strong>${deal.propertyType}</strong> in ${deal.city}, ${deal.state}
            <span class="ticker-status ${deal.status.class}">${deal.status.text}</span>
          </span>
          <span class="ticker-meta">${deal.timeAgo}</span>
        </div>
      `;
    }).join('');

    // Duplicate for seamless loop
    tickerContent.innerHTML = items + items;
  }

  function getStatusIcon(type) {
    const icons = {
      'new': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      'offers': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      'hot': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      'review': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      'closed': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
    };
    return icons[type] || icons['new'];
  }

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================

  let toastQueue = [];
  let toastActive = false;

  function initToastNotifications() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Start showing toasts after a delay
    setTimeout(() => {
      showRandomToast();
    }, 15000); // First toast after 15 seconds
  }

  function showRandomToast() {
    if (toastActive) return;

    const deal = generateDeal();
    const toastTypes = ['new_offer', 'multiple_offers', 'deal_closed', 'investor_viewing'];
    const type = randomFrom(toastTypes);

    let title, message, icon;

    switch(type) {
      case 'new_offer':
        title = 'New Offer Submitted';
        message = `${deal.propertyType} in ${deal.city}, ${deal.state} just received an offer from ${deal.investor}`;
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';
        break;
      case 'multiple_offers':
        title = 'Offers Competing';
        message = `Property in ${deal.city} now has ${deal.offerCount} competing offers`;
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>';
        break;
      case 'deal_closed':
        title = 'Deal Closed';
        message = `${deal.propertyType} in ${deal.city} closed in ${deal.closingDays} days`;
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        break;
      case 'investor_viewing':
        title = 'Investor Activity';
        message = `${randomBetween(2, 5)} investors are reviewing properties in ${deal.state}`;
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b4423" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
        break;
    }

    showToast(title, message, icon);

    // Schedule next toast (30-90 seconds)
    const nextDelay = randomBetween(30000, 90000);
    setTimeout(showRandomToast, nextDelay);
  }

  function showToast(title, message, icon) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    toastActive = true;

    const toast = document.createElement('div');
    toast.className = 'marketplace-toast';
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-remove after 6 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
        toastActive = false;
      }, 300);
    }, 6000);
  }

  // ==========================================
  // MARKETPLACE STATS COUNTER
  // ==========================================

  function initStatsCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const suffix = element.dataset.suffix || '';
    const prefix = element.dataset.prefix || '';
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      // Format number
      let display = Math.round(current);
      if (target >= 1000000) {
        display = (current / 1000000).toFixed(1) + 'M';
      } else if (target >= 1000) {
        display = (current / 1000).toFixed(target >= 10000 ? 0 : 1) + (target >= 10000 ? 'K' : 'K');
      }

      element.textContent = prefix + display + suffix;
    }, stepDuration);
  }

  // ==========================================
  // LIVE STATS INCREMENTER
  // ==========================================

  function initLiveStatsIncrement() {
    // Periodically increment stats slightly to show "live" activity
    setInterval(() => {
      const offersCounter = document.querySelector('[data-stat="offers"]');
      const propertiesCounter = document.querySelector('[data-stat="properties"]');

      if (offersCounter) {
        const current = parseFloat(offersCounter.textContent.replace(/[^0-9.]/g, ''));
        const increment = (Math.random() * 0.3 + 0.1).toFixed(1);
        offersCounter.textContent = '$' + (current + parseFloat(increment)).toFixed(1) + 'M+';
      }
    }, 45000); // Every 45 seconds
  }

  // ==========================================
  // RECENT DEALS CAROUSEL
  // ==========================================

  function initRecentDeals() {
    const container = document.getElementById('recent-deals-list');
    if (!container) return;

    // Generate initial deals
    const deals = [];
    for (let i = 0; i < 6; i++) {
      deals.push(generateDeal());
    }

    renderRecentDeals(deals, container);

    // Update deals periodically
    setInterval(() => {
      deals.shift();
      deals.push(generateDeal());
      renderRecentDeals(deals, container);
    }, 12000);
  }

  function renderRecentDeals(deals, container) {
    container.innerHTML = deals.map(deal => `
      <div class="recent-deal-card">
        <div class="recent-deal-header">
          <span class="recent-deal-type">${deal.propertyType}</span>
          <span class="recent-deal-time">${deal.timeAgo}</span>
        </div>
        <div class="recent-deal-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${deal.city}, ${deal.state}
        </div>
        <div class="recent-deal-stats">
          <span class="recent-deal-offers">${deal.offerCount} offers</span>
          <span class="recent-deal-status ${deal.status.class}">${deal.status.text}</span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // INITIALIZE ALL
  // ==========================================

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    initActivityTicker();
    initToastNotifications();
    initStatsCounters();
    initLiveStatsIncrement();
    initRecentDeals();
  }

  init();

})();
