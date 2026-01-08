/**
 * PROPCASH LIVING MARKETPLACE - INTERACTIVE VERSION
 * Features: Filters, Interactive Map, Detail Modals, Live Activity
 */

(function() {
  'use strict';

  // ==========================================
  // MARKETPLACE DATA
  // ==========================================

  const PROPERTY_TYPES = [
    '3BR Fixer-Upper', '2BR Handyman Special', '3BR Needs TLC',
    '4BR Estate Sale', '2BR Distressed', '3BR As-Is Sale',
    '2BR Investor Special', '3BR Fire Damage', '4BR Foreclosure',
    '2BR Probate Sale', '3BR Inherited Home', '3BR Vacant Property',
    '2BR Foundation Issues', '3BR Code Violations', '4BR REO Property'
  ];

  const INVESTOR_NAMES = [
    'HomeVest Capital', 'Rapid Home Buyers', 'CashFlow Properties',
    'Premier Investments', 'SunBelt Holdings', 'Keystone Acquisitions',
    'Liberty Home Partners', 'Falcon Property Group', 'Atlas Real Estate',
    'Meridian Buyers', 'Summit Cash Homes', 'Velocity Acquisitions',
    'Anchor Investments', 'Sterling Home Buyers', 'Phoenix Property Co',
    'Crestview Holdings', 'Irongate Properties', 'Bluestone Investments'
  ];

  const MARKETS = [
    { city: 'Dallas', state: 'TX', stateCode: 'TX', link: '/texas/dallas-fort-worth/' },
    { city: 'Houston', state: 'TX', stateCode: 'TX', link: '/texas/houston/' },
    { city: 'San Antonio', state: 'TX', stateCode: 'TX', link: '/texas/san-antonio/' },
    { city: 'Austin', state: 'TX', stateCode: 'TX', link: '/texas/' },
    { city: 'Fort Worth', state: 'TX', stateCode: 'TX', link: '/texas/dallas-fort-worth/' },
    { city: 'Tampa', state: 'FL', stateCode: 'FL', link: '/florida/tampa-bay/' },
    { city: 'Orlando', state: 'FL', stateCode: 'FL', link: '/florida/orlando/' },
    { city: 'Jacksonville', state: 'FL', stateCode: 'FL', link: '/florida/jacksonville/' },
    { city: 'Miami', state: 'FL', stateCode: 'FL', link: '/florida/' },
    { city: 'St. Petersburg', state: 'FL', stateCode: 'FL', link: '/florida/tampa-bay/' },
    { city: 'Atlanta', state: 'GA', stateCode: 'GA', link: '/georgia/atlanta/' },
    { city: 'Savannah', state: 'GA', stateCode: 'GA', link: '/georgia/savannah/' },
    { city: 'Augusta', state: 'GA', stateCode: 'GA', link: '/georgia/augusta/' },
    { city: 'Phoenix', state: 'AZ', stateCode: 'AZ', link: '/arizona/' },
    { city: 'Tucson', state: 'AZ', stateCode: 'AZ', link: '/arizona/' },
    { city: 'Mesa', state: 'AZ', stateCode: 'AZ', link: '/arizona/' },
    { city: 'Nashville', state: 'TN', stateCode: 'TN', link: '/tennessee/' },
    { city: 'Memphis', state: 'TN', stateCode: 'TN', link: '/tennessee/' },
    { city: 'Knoxville', state: 'TN', stateCode: 'TN', link: '/tennessee/' },
    { city: 'Charlotte', state: 'NC', stateCode: 'NC', link: '/north-carolina/' },
    { city: 'Raleigh', state: 'NC', stateCode: 'NC', link: '/north-carolina/' },
    { city: 'Durham', state: 'NC', stateCode: 'NC', link: '/north-carolina/' }
  ];

  const STATES = {
    'TX': { name: 'Texas', deals: 127, avgOffers: 3.8 },
    'FL': { name: 'Florida', deals: 98, avgOffers: 3.5 },
    'GA': { name: 'Georgia', deals: 64, avgOffers: 3.2 },
    'AZ': { name: 'Arizona', deals: 52, avgOffers: 3.6 },
    'TN': { name: 'Tennessee', deals: 41, avgOffers: 3.1 },
    'NC': { name: 'North Carolina', deals: 38, avgOffers: 3.3 }
  };

  const STATUSES = [
    { id: 'new', text: 'New Listing', class: 'status-new' },
    { id: 'active', text: 'Receiving Offers', class: 'status-offers' },
    { id: 'hot', text: 'Multiple Offers', class: 'status-hot' },
    { id: 'pending', text: 'Under Review', class: 'status-review' },
    { id: 'closed', text: 'Closed', class: 'status-closed' }
  ];

  // Distressed/fixer-upper property images - older homes needing work
  const PROPERTY_IMAGES = [
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop', // older suburban home
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop', // simple ranch house
    'https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&h=400&fit=crop', // basic house
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop', // modest home
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&h=400&fit=crop', // older property
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop', // basic suburban
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=400&fit=crop', // older style home
    'https://images.unsplash.com/photo-1430285561322-7808604715df?w=600&h=400&fit=crop'  // dated exterior
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

  function generateId() {
    return 'deal-' + Math.random().toString(36).substr(2, 9);
  }

  function formatPrice(price) {
    return '$' + price.toLocaleString();
  }

  function formatTimeAgo(minutes) {
    if (minutes < 60) return `${minutes} min ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hr${Math.floor(minutes / 60) > 1 ? 's' : ''} ago`;
    return `${Math.floor(minutes / 1440)} day${Math.floor(minutes / 1440) > 1 ? 's' : ''} ago`;
  }

  // ==========================================
  // DEAL GENERATOR
  // ==========================================

  function generateOffers(count, basePrice) {
    const offers = [];
    let currentPrice = basePrice * (0.85 + Math.random() * 0.05); // Start 10-15% below

    for (let i = 0; i < count; i++) {
      const increment = basePrice * (0.02 + Math.random() * 0.03); // 2-5% increments
      currentPrice += increment;
      offers.push({
        amount: Math.round(currentPrice / 1000) * 1000,
        investor: randomFrom(INVESTOR_NAMES),
        timeHours: Math.round((i + 1) * (24 / count) * 10) / 10
      });
    }
    return offers;
  }

  function generateDeal(forceStatus = null) {
    const market = randomFrom(MARKETS);
    const status = forceStatus ? STATUSES.find(s => s.id === forceStatus) : randomFrom(STATUSES);
    // Distressed property price range: $55k - $185k
    const basePrice = randomBetween(55, 185) * 1000;
    const offerCount = status.id === 'new' ? randomBetween(0, 1) : randomBetween(2, 7);
    const offers = generateOffers(offerCount, basePrice);
    const minutesAgo = randomBetween(5, 4320); // Up to 3 days
    const investorsViewing = randomBetween(2, 8);

    return {
      id: generateId(),
      propertyType: randomFrom(PROPERTY_TYPES),
      city: market.city,
      state: market.state,
      stateCode: market.stateCode,
      link: market.link,
      status: status,
      basePrice: basePrice,
      offerCount: offerCount,
      offers: offers,
      finalPrice: offers.length > 0 ? offers[offers.length - 1].amount : null,
      image: randomFrom(PROPERTY_IMAGES),
      minutesAgo: minutesAgo,
      timeAgo: formatTimeAgo(minutesAgo),
      investorsViewing: investorsViewing,
      daysToClose: status.id === 'closed' ? randomBetween(7, 21) : null,
      sqft: randomBetween(900, 2200),  // Smaller, older homes
      beds: randomBetween(2, 4),
      baths: randomBetween(1, 2)
    };
  }

  // ==========================================
  // GLOBAL STATE
  // ==========================================

  let allDeals = [];
  let filteredDeals = [];
  let currentFilters = {
    state: 'all',
    propertyType: 'all',
    status: 'all'
  };

  // ==========================================
  // FILTER SYSTEM
  // ==========================================

  function initFilters() {
    const filterBar = document.getElementById('filter-bar');
    if (!filterBar) return;

    // State filter
    const stateSelect = document.getElementById('filter-state');
    if (stateSelect) {
      stateSelect.addEventListener('change', (e) => {
        currentFilters.state = e.target.value;
        applyFilters();
        updateMapHighlight(e.target.value);
      });
    }

    // Property type filter
    const typeSelect = document.getElementById('filter-type');
    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        currentFilters.propertyType = e.target.value;
        applyFilters();
      });
    }

    // Status filter
    const statusSelect = document.getElementById('filter-status');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        currentFilters.status = e.target.value;
        applyFilters();
      });
    }

    // Clear filters button
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearFilters);
    }
  }

  function applyFilters() {
    filteredDeals = allDeals.filter(deal => {
      if (currentFilters.state !== 'all' && deal.stateCode !== currentFilters.state) return false;
      if (currentFilters.propertyType !== 'all' && !deal.propertyType.toLowerCase().includes(currentFilters.propertyType)) return false;
      if (currentFilters.status !== 'all' && deal.status.id !== currentFilters.status) return false;
      return true;
    });

    renderDeals();
    updateFilterCount();
  }

  function clearFilters() {
    currentFilters = { state: 'all', propertyType: 'all', status: 'all' };

    document.getElementById('filter-state').value = 'all';
    document.getElementById('filter-type').value = 'all';
    document.getElementById('filter-status').value = 'all';

    updateMapHighlight('all');
    applyFilters();
  }

  function updateFilterCount() {
    const countEl = document.getElementById('results-count');
    if (countEl) {
      countEl.textContent = `${filteredDeals.length} ${filteredDeals.length === 1 ? 'property' : 'properties'}`;
    }
  }

  // ==========================================
  // INTERACTIVE MAP
  // ==========================================

  function initMap() {
    const mapStates = document.querySelectorAll('.map-state');
    if (mapStates.length === 0) return;

    mapStates.forEach(state => {
      const stateCode = state.dataset.state;
      const stateData = STATES[stateCode];

      // Hover tooltip
      state.addEventListener('mouseenter', (e) => {
        showMapTooltip(e, stateCode, stateData);
      });

      state.addEventListener('mouseleave', () => {
        hideMapTooltip();
      });

      // Click to filter
      state.addEventListener('click', () => {
        const stateSelect = document.getElementById('filter-state');
        if (stateSelect) {
          stateSelect.value = stateCode;
          currentFilters.state = stateCode;
          applyFilters();
          updateMapHighlight(stateCode);
        }

        // Scroll to deals
        const dealsSection = document.getElementById('deals-grid');
        if (dealsSection) {
          dealsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function showMapTooltip(e, stateCode, stateData) {
    let tooltip = document.getElementById('map-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'map-tooltip';
      tooltip.className = 'map-tooltip';
      document.body.appendChild(tooltip);
    }

    const dealsInState = allDeals.filter(d => d.stateCode === stateCode).length;

    tooltip.innerHTML = `
      <div class="map-tooltip-title">${stateData.name}</div>
      <div class="map-tooltip-stats">
        <div class="map-tooltip-stat">
          <span class="map-tooltip-value">${dealsInState}</span>
          <span class="map-tooltip-label">Active Deals</span>
        </div>
        <div class="map-tooltip-stat">
          <span class="map-tooltip-value">${stateData.avgOffers}</span>
          <span class="map-tooltip-label">Avg Offers</span>
        </div>
      </div>
      <div class="map-tooltip-cta">Click to view deals →</div>
    `;

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 10}px`;
    tooltip.classList.add('show');
  }

  function hideMapTooltip() {
    const tooltip = document.getElementById('map-tooltip');
    if (tooltip) {
      tooltip.classList.remove('show');
    }
  }

  function updateMapHighlight(stateCode) {
    const mapStates = document.querySelectorAll('.map-state');
    mapStates.forEach(state => {
      if (stateCode === 'all') {
        state.classList.remove('dimmed');
        state.classList.remove('active');
      } else if (state.dataset.state === stateCode) {
        state.classList.add('active');
        state.classList.remove('dimmed');
      } else {
        state.classList.add('dimmed');
        state.classList.remove('active');
      }
    });
  }

  // ==========================================
  // DEAL CARDS RENDERING
  // ==========================================

  function initDeals() {
    // Generate initial deals
    for (let i = 0; i < 18; i++) {
      allDeals.push(generateDeal());
    }

    // Sort by most recent
    allDeals.sort((a, b) => a.minutesAgo - b.minutesAgo);

    filteredDeals = [...allDeals];
    renderDeals();
    updateFilterCount();

    // Periodically add new deals
    setInterval(() => {
      const newDeal = generateDeal('new');
      allDeals.unshift(newDeal);
      if (allDeals.length > 24) allDeals.pop();
      applyFilters();
    }, 30000);
  }

  function renderDeals() {
    const grid = document.getElementById('deals-grid');
    if (!grid) return;

    if (filteredDeals.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <h3>No properties found</h3>
          <p>Try adjusting your filters to see more results</p>
          <button class="btn btn-secondary" onclick="document.getElementById('clear-filters').click()">Clear Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filteredDeals.map(deal => `
      <div class="deal-card" data-deal-id="${deal.id}" onclick="window.PropcashMarketplace.openModal('${deal.id}')">
        <div class="deal-card-image">
          <img src="${deal.image}" alt="${deal.propertyType} in ${deal.city}" loading="lazy">
          <div class="deal-card-status ${deal.status.class}">${deal.status.text}</div>
          ${deal.status.id === 'hot' ? '<div class="deal-card-hot-badge">🔥 Hot</div>' : ''}
          <div class="deal-card-overlay">
            <span>View Details</span>
          </div>
        </div>
        <div class="deal-card-content">
          <div class="deal-card-header">
            <h3 class="deal-card-title">${deal.propertyType}</h3>
            <span class="deal-card-time">${deal.timeAgo}</span>
          </div>
          <div class="deal-card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${deal.city}, ${deal.state}
          </div>
          <div class="deal-card-specs">
            <span>${deal.beds} bed</span>
            <span>${deal.baths} bath</span>
            <span>${deal.sqft.toLocaleString()} sqft</span>
          </div>
          <div class="deal-card-footer">
            <div class="deal-card-offers">
              <span class="offer-count">${deal.offerCount}</span> ${deal.offerCount === 1 ? 'offer' : 'offers'}
              ${deal.offerCount > 3 ? '<span class="competing-badge">Competing</span>' : ''}
            </div>
            <div class="deal-card-viewing">
              <div class="viewing-avatars">
                ${Array(Math.min(deal.investorsViewing, 3)).fill().map((_, i) =>
                  `<div class="viewing-avatar" style="z-index: ${3-i}">${randomFrom(['H','R','C','P','S','K','L','F','A','M'])}</div>`
                ).join('')}
              </div>
              <span class="viewing-count">${deal.investorsViewing} viewing</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // DETAIL MODAL
  // ==========================================

  function openModal(dealId) {
    const deal = allDeals.find(d => d.id === dealId);
    if (!deal) return;

    let modal = document.getElementById('deal-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'deal-modal';
      modal.className = 'deal-modal';
      document.body.appendChild(modal);
    }

    const priceIncrease = deal.offers.length >= 2
      ? Math.round((deal.offers[deal.offers.length - 1].amount - deal.offers[0].amount) / deal.offers[0].amount * 100)
      : 0;

    modal.innerHTML = `
      <div class="deal-modal-backdrop" onclick="window.PropcashMarketplace.closeModal()"></div>
      <div class="deal-modal-content">
        <button class="deal-modal-close" onclick="window.PropcashMarketplace.closeModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="deal-modal-grid">
          <div class="deal-modal-left">
            <div class="deal-modal-image">
              <img src="${deal.image}" alt="${deal.propertyType}">
              <div class="deal-modal-status ${deal.status.class}">${deal.status.text}</div>
            </div>

            <div class="deal-modal-details">
              <h2>${deal.propertyType}</h2>
              <div class="deal-modal-location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                ${deal.city}, ${deal.state}
              </div>

              <div class="deal-modal-specs">
                <div class="spec-item">
                  <span class="spec-value">${deal.beds}</span>
                  <span class="spec-label">Beds</span>
                </div>
                <div class="spec-item">
                  <span class="spec-value">${deal.baths}</span>
                  <span class="spec-label">Baths</span>
                </div>
                <div class="spec-item">
                  <span class="spec-value">${deal.sqft.toLocaleString()}</span>
                  <span class="spec-label">Sq Ft</span>
                </div>
              </div>

              <div class="deal-modal-viewing-indicator">
                <div class="viewing-pulse"></div>
                <span>${deal.investorsViewing} investors currently viewing this property</span>
              </div>
            </div>
          </div>

          <div class="deal-modal-right">
            <div class="deal-modal-offers-header">
              <h3>Offer Activity</h3>
              <span class="offer-summary">${deal.offerCount} ${deal.offerCount === 1 ? 'offer' : 'competing offers'}</span>
            </div>

            ${deal.offers.length > 0 ? `
              <div class="offer-timeline">
                <div class="timeline-header">
                  <span>Offer Timeline</span>
                  <span class="timeline-duration">First 24 hours</span>
                </div>
                <div class="timeline-track">
                  ${deal.offers.map((offer, i) => `
                    <div class="timeline-point ${i === deal.offers.length - 1 ? 'highest' : ''}"
                         style="left: ${(offer.timeHours / 24) * 100}%"
                         title="${formatPrice(offer.amount)} at ${offer.timeHours}hrs">
                      <div class="timeline-marker"></div>
                      <div class="timeline-label">${formatPrice(offer.amount)}</div>
                    </div>
                  `).join('')}
                  <div class="timeline-line"></div>
                </div>
                <div class="timeline-axis">
                  <span>0 hrs</span>
                  <span>6 hrs</span>
                  <span>12 hrs</span>
                  <span>18 hrs</span>
                  <span>24 hrs</span>
                </div>
              </div>

              <div class="offer-list">
                ${deal.offers.slice().reverse().map((offer, i) => `
                  <div class="offer-item ${i === 0 ? 'highest-offer' : ''}">
                    <div class="offer-item-left">
                      <div class="offer-investor-avatar">${offer.investor.charAt(0)}</div>
                      <div class="offer-item-details">
                        <span class="offer-investor">${offer.investor}</span>
                        <span class="offer-time">${offer.timeHours} hours after listing</span>
                      </div>
                    </div>
                    <div class="offer-item-right">
                      <span class="offer-amount">${formatPrice(offer.amount)}</span>
                      ${i === 0 ? '<span class="highest-badge">Highest</span>' : ''}
                    </div>
                  </div>
                `).join('')}
              </div>

              ${priceIncrease > 0 ? `
                <div class="competition-insight">
                  <div class="insight-icon">📈</div>
                  <div class="insight-content">
                    <strong>Competition drove price up ${priceIncrease}%</strong>
                    <p>The winning bid was ${formatPrice(deal.offers[deal.offers.length - 1].amount - deal.offers[0].amount)} higher than the first offer.</p>
                  </div>
                </div>
              ` : ''}
            ` : `
              <div class="no-offers-yet">
                <div class="no-offers-icon">⏳</div>
                <h4>Offers coming soon</h4>
                <p>This property was just listed. Investors are reviewing it now.</p>
              </div>
            `}

            ${deal.status.id === 'closed' ? `
              <div class="closed-deal-summary">
                <div class="closed-icon">✓</div>
                <div class="closed-details">
                  <span class="closed-label">Closed in ${deal.daysToClose} days</span>
                  <span class="closed-price">Final Price: ${formatPrice(deal.finalPrice)}</span>
                </div>
              </div>
            ` : ''}

            <div class="deal-modal-cta">
              <a href="/get-offer" class="btn btn-primary btn-block">
                Get Competing Offers for Your Property
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 8px;">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <p class="cta-subtext">Free • No obligation • Offers in 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });
  }

  function closeModal() {
    const modal = document.getElementById('deal-modal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  }

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ==========================================
  // ACTIVITY TICKER
  // ==========================================

  function initActivityTicker() {
    const ticker = document.getElementById('marketplace-ticker');
    if (!ticker) return;

    renderTicker();

    setInterval(() => {
      renderTicker();
    }, 10000);
  }

  function renderTicker() {
    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContent) return;

    const tickerDeals = [];
    for (let i = 0; i < 12; i++) {
      tickerDeals.push(generateDeal());
    }

    const items = tickerDeals.map(deal => {
      const statusIcon = getStatusIcon(deal.status.id);
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

    tickerContent.innerHTML = items + items;
  }

  function getStatusIcon(type) {
    const icons = {
      'new': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      'active': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      'hot': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      'pending': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      'closed': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
    };
    return icons[type] || icons['new'];
  }

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================

  let toastActive = false;

  function initToastNotifications() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    setTimeout(() => {
      showRandomToast();
    }, 20000);
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
        message = `${deal.propertyType} in ${deal.city}, ${deal.state} just received an offer`;
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>';
        break;
      case 'multiple_offers':
        title = 'Offers Competing';
        message = `Property in ${deal.city} now has ${deal.offerCount} competing offers`;
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>';
        break;
      case 'deal_closed':
        title = 'Deal Closed';
        message = `${deal.propertyType} in ${deal.city} closed in ${randomBetween(7, 14)} days`;
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        break;
      case 'investor_viewing':
        title = 'Investor Activity';
        message = `${randomBetween(3, 8)} investors reviewing properties in ${deal.state}`;
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b4423" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
        break;
    }

    showToast(title, message, icon);

    const nextDelay = randomBetween(35000, 75000);
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

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
        toastActive = false;
      }, 300);
    }, 6000);
  }

  // ==========================================
  // STATS COUNTERS
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
    const target = parseFloat(element.dataset.counter);
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

      let display;
      if (target >= 1000000) {
        display = (current / 1000000).toFixed(1) + 'M+';
      } else if (target >= 1000) {
        display = Math.round(current).toLocaleString();
      } else if (target < 10) {
        display = current.toFixed(1);
      } else {
        display = Math.round(current);
      }

      element.textContent = prefix + display + suffix;
    }, stepDuration);
  }

  // ==========================================
  // INITIALIZE
  // ==========================================

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    initDeals();
    initFilters();
    initMap();
    initActivityTicker();
    initToastNotifications();
    initStatsCounters();
  }

  // Expose public API
  window.PropcashMarketplace = {
    openModal: openModal,
    closeModal: closeModal
  };

  init();

})();
