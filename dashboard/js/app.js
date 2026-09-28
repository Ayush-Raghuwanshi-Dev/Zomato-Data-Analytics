/**
 * App Controller & Router
 * Core orchestrator for Zomato Restaurant Analytics Dashboard
 */

class AppRouter {
  constructor() {
    this.activePage = 'dashboard';
    this.summaryData = null;
    this.currentMetrics = null;
  }

  async init() {
    try {
      // 1. Load Data
      const { summary } = await window.dataEngine.loadData();
      this.summaryData = summary;
      this.currentMetrics = window.dataEngine.calculateMetrics();

      // 2. Render Shell
      this.renderShell();

      // 3. Populate Filters
      this.populateFilterDropdowns();

      // 4. Attach Event Listeners
      this.attachEvents();

      // 5. Subscribe to DataEngine updates
      window.dataEngine.subscribe((metrics, filtered) => {
        this.currentMetrics = metrics;
        this.handleDataUpdate(metrics, filtered);
      });

      // 6. Navigate to initial page
      this.navigateTo('dashboard');
    } catch (err) {
      console.error("Initialization error:", err);
      document.getElementById('app').innerHTML = `
        <div class="min-h-screen flex items-center justify-center p-6 bg-slate-100">
          <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center border border-red-200">
            <div class="w-12 h-12 bg-red-100 text-[#E23744] rounded-full flex items-center justify-center mx-auto mb-4">
              <i data-lucide="alert-triangle" class="w-6 h-6"></i>
            </div>
            <h2 class="text-lg font-bold text-slate-900 mb-2">Error Loading Data</h2>
            <p class="text-xs text-slate-600 mb-4">${err.message}</p>
            <button onclick="location.reload()" class="px-4 py-2 bg-[#E23744] text-white rounded-xl text-xs font-bold">
              Retry Reload
            </button>
          </div>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  renderShell() {
    const appEl = document.getElementById('app');
    appEl.innerHTML = `
      <div class="flex min-h-screen">
        <!-- Sidebar Container -->
        <div id="sidebar-container">
          ${SidebarComponent.render(this.activePage)}
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0 bg-[#F4F5F8]">
          <!-- Top Header Container -->
          <div id="header-container">
            ${HeaderComponent.render('Dashboard Overview', 0, this.currentMetrics.total)}
          </div>

          <!-- Main Scrollable Workspace -->
          <main class="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto" id="page-content-container">
            <!-- Dynamic Page Content injected here -->
          </main>
        </div>
      </div>

      <!-- About Project Modal -->
      <div id="about-project-modal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative page-animate">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-[#E23744] text-white flex items-center justify-center font-bold text-xs">
                Z
              </div>
              <div>
                <h4 class="text-base font-bold text-slate-900">About Zomato EDA Analysis</h4>
                <p class="text-[11px] text-slate-500">Portfolio Data Analytics & Visualization Project</p>
              </div>
            </div>
            <button onclick="window.appRouter.closeAboutModal()" class="text-slate-400 hover:text-slate-600 p-1">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="py-4 space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              This analytics product is the visual presentation of an extensive <strong>10-Phase Exploratory Data Analysis (EDA)</strong> conducted in Python with Pandas, Seaborn, and Matplotlib on <strong>9,551 restaurants</strong> across 15 countries.
            </p>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div class="font-bold text-slate-800">Dataset Truth:</div>
              <div>• 9,551 total records · 21 original columns</div>
              <div>• 9 missing values in Cuisines (imputed as "Unknown")</div>
              <div>• 0 duplicate rows</div>
              <div>• 2,148 unrated listings (22.5%) isolated from true rating metrics</div>
              <div>• Zero invented sales or e-commerce fields (orders/revenue/profit)</div>
            </div>
            <p class="text-slate-500 text-[11px]">
              Engineered with clean modern UI/UX principles inspired by high-end analytics design: card-based visual hierarchy, dynamic recalculation, responsive layouts, and actionable business intelligence.
            </p>
          </div>

          <div class="pt-3 border-t border-slate-100 flex justify-end">
            <button onclick="window.appRouter.closeAboutModal()" class="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  populateFilterDropdowns() {
    const { cities, countries } = window.dataEngine.getDistinctFilterOptions();

    const citySelect = document.getElementById('filter-city');
    if (citySelect) {
      citySelect.innerHTML = `<option value="ALL">All Cities (${cities.length})</option>` +
        cities.map(([c, count]) => `<option value="${c}">${c} (${count})</option>`).join('');
    }

    const countrySelect = document.getElementById('filter-country');
    if (countrySelect) {
      countrySelect.innerHTML = `<option value="ALL">All Countries (${countries.length})</option>` +
        countries.map(([c, count]) => `<option value="${c}">${c} (${count})</option>`).join('');
    }
  }

  attachEvents() {
    // Navigation Clicks
    document.addEventListener('click', (e) => {
      const navBtn = e.target.closest('[data-page]');
      if (navBtn) {
        const pageId = navBtn.getAttribute('data-page');
        this.navigateTo(pageId);
      }
    });

    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.closest('#mobile-menu-open') || e.target.closest('#sidebar-toggle-btn')) {
        const sidebar = document.getElementById('app-sidebar');
        if (sidebar) {
          sidebar.classList.toggle('hidden');
        }
      }
      if (e.target.closest('#about-modal-btn')) {
        this.openAboutModal();
      }
    });

    // Filter drawer toggle
    document.addEventListener('click', (e) => {
      if (e.target.closest('#filter-drawer-toggle')) {
        const drawer = document.getElementById('filter-drawer');
        if (drawer) {
          drawer.classList.toggle('hidden');
        }
      }
      if (e.target.closest('#reset-filters-btn')) {
        window.dataEngine.resetFilters();
        this.syncFilterControls();
      }
      if (e.target.closest('#search-clear-btn')) {
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.value = '';
          window.dataEngine.setFilter('search', '');
          document.getElementById('search-clear-btn').classList.add('hidden');
        }
      }
    });

    // Filter Dropdown Change Events
    const bindSelect = (id, filterKey) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', (e) => {
          window.dataEngine.setFilter(filterKey, e.target.value);
        });
      }
    };

    bindSelect('filter-city', 'city');
    bindSelect('filter-country', 'country');
    bindSelect('filter-price-range', 'priceRange');
    bindSelect('filter-rating-category', 'ratingCategory');
    bindSelect('filter-delivery', 'delivery');
    bindSelect('filter-booking', 'booking');

    // Global Search Input
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', (e) => {
        const clearBtn = document.getElementById('search-clear-btn');
        if (clearBtn) {
          if (e.target.value.trim().length > 0) {
            clearBtn.classList.remove('hidden');
          } else {
            clearBtn.classList.add('hidden');
          }
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          window.dataEngine.setFilter('search', e.target.value);
        }, 250);
      });
    }
  }

  syncFilterControls() {
    const f = window.dataEngine.filters;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };
    setVal('filter-city', f.city);
    setVal('filter-country', f.country);
    setVal('filter-price-range', f.priceRange);
    setVal('filter-rating-category', f.ratingCategory);
    setVal('filter-delivery', f.delivery);
    setVal('filter-booking', f.booking);
    setVal('global-search-input', f.search);
    const clearBtn = document.getElementById('search-clear-btn');
    if (clearBtn) {
      if (f.search) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }
  }

  navigateTo(pageId) {
    this.activePage = pageId;

    // 1. Update Sidebar Active State
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
      sidebarContainer.innerHTML = SidebarComponent.render(this.activePage);
    }

    // 2. Update Header Title & Filter Count
    const titles = {
      'dashboard': 'Dashboard Overview',
      'restaurants': 'Restaurant Directory & Analytics',
      'ratings': 'Ratings & Customer Engagement',
      'locations': 'Locations & Cuisine Landscapes',
      'insights': 'Key Insights & Business Strategy',
      'data-quality': 'Data Quality Assessment & EDA Workflow',
      'report': 'Official Zomato Analysis Report'
    };
    const titleEl = document.getElementById('header-page-title');
    if (titleEl) {
      titleEl.innerText = titles[pageId] || 'Analytics Dashboard';
    }

    // 3. Render Active Page Content
    const container = document.getElementById('page-content-container');
    if (!container) return;

    switch (pageId) {
      case 'dashboard':
        container.innerHTML = OverviewPageComponent.render(this.summaryData, this.currentMetrics);
        this.initOverviewCharts();
        break;
      case 'restaurants':
        container.innerHTML = RestaurantsPageComponent.render(window.dataEngine.filteredRestaurants, this.currentMetrics);
        break;
      case 'ratings':
        container.innerHTML = RatingsPageComponent.render(this.summaryData);
        this.initRatingsCharts();
        break;
      case 'locations':
        container.innerHTML = LocationsPageComponent.render(this.summaryData);
        this.initLocationsCharts();
        break;
      case 'insights':
        container.innerHTML = InsightsPageComponent.render(this.summaryData);
        break;
      case 'data-quality':
        container.innerHTML = DataQualityPageComponent.render(this.summaryData);
        break;
      case 'report':
        container.innerHTML = ReportPageComponent.render();
        break;
    }

    if (window.lucide) window.lucide.createIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleDataUpdate(metrics, filteredRestaurants) {
    // 1. Update Header Counters
    const countEl = document.getElementById('header-records-count');
    if (countEl) countEl.innerText = metrics.total.toLocaleString();

    // 2. Update Filter Button Badge
    const filterBtn = document.getElementById('filter-drawer-toggle');
    const activeCount = window.dataEngine.getActiveFilterCount();
    if (filterBtn) {
      const badge = filterBtn.querySelector('span:last-child');
      if (activeCount > 0) {
        if (!badge || badge.innerText !== `${activeCount}`) {
          filterBtn.innerHTML = `
            <i data-lucide="filter" class="w-4 h-4 text-[#E23744]"></i>
            <span>Filters</span>
            <span class="w-5 h-5 bg-[#E23744] text-white rounded-full text-[11px] font-bold flex items-center justify-center">
              ${activeCount}
            </span>
          `;
          if (window.lucide) window.lucide.createIcons();
        }
      } else {
        filterBtn.innerHTML = `
          <i data-lucide="filter" class="w-4 h-4 text-[#E23744]"></i>
          <span>Filters</span>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    }

    // 3. Re-render Current Page components
    if (this.activePage === 'dashboard') {
      const kpiContainer = document.getElementById('kpi-container');
      if (kpiContainer) {
        kpiContainer.innerHTML = KpiCardsComponent.render(metrics);
        if (window.lucide) window.lucide.createIcons();
      }
      this.initOverviewCharts();
    } else if (this.activePage === 'restaurants') {
      const container = document.getElementById('page-content-container');
      if (container) {
        container.innerHTML = RestaurantsPageComponent.render(filteredRestaurants, metrics);
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  initOverviewCharts() {
    // Top Cities
    const topCitiesData = this.currentMetrics.topCities.length > 0 ? this.currentMetrics.topCities : this.summaryData.top_cities;
    window.chartManager.renderTopCitiesChart('overview-top-cities-chart', topCitiesData);

    // Rating Distribution
    const ratingDistData = this.currentMetrics.ratingDist.length > 0 ? this.currentMetrics.ratingDist : this.summaryData.rating_distribution;
    window.chartManager.renderRatingDistChart('overview-rating-dist-chart', ratingDistData);

    // Price Range Chart
    const priceData = this.currentMetrics.priceRanges.length > 0 ? this.currentMetrics.priceRanges : this.summaryData.price_range_analysis;
    window.chartManager.renderPriceRangeChart('overview-price-range-chart', priceData);

    // Delivery vs Booking Chart
    window.chartManager.renderDeliveryBookingChart(
      'overview-delivery-booking-chart',
      this.summaryData.delivery_comparison,
      this.summaryData.table_booking_comparison
    );
  }

  initRatingsCharts() {
    window.chartManager.renderRatingDistChart('ratings-dist-canvas', this.summaryData.rating_distribution);
    window.chartManager.renderScatterChart('ratings-scatter-canvas', this.summaryData.engagement.scatter_sample, this.summaryData.engagement.correlation);
    window.chartManager.renderBivariateTrendChart('bivariate-trend-canvas', this.summaryData.price_delivery_trend);
  }

  initLocationsCharts() {
    // Cuisine Chart
    window.chartManager.renderCuisineChart('locations-cuisine-canvas', this.summaryData.cuisines.top_by_rating);
    // Leaflet Map
    setTimeout(() => {
      LocationsPageComponent.initMap(this.summaryData.city_map_locations);
    }, 100);
  }

  openAboutModal() {
    const modal = document.getElementById('about-project-modal');
    if (modal) modal.classList.remove('hidden');
  }

  closeAboutModal() {
    const modal = document.getElementById('about-project-modal');
    if (modal) modal.classList.add('hidden');
  }
}

// Controller for Restaurants Page interactive actions
window.restaurantsView = {
  sort(col) {
    if (RestaurantsPageComponent.sortBy === col) {
      RestaurantsPageComponent.sortOrder = RestaurantsPageComponent.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      RestaurantsPageComponent.sortBy = col;
      RestaurantsPageComponent.sortOrder = 'desc';
    }
    const container = document.getElementById('page-content-container');
    if (container) {
      container.innerHTML = RestaurantsPageComponent.render(window.dataEngine.filteredRestaurants, window.appRouter.currentMetrics);
      if (window.lucide) window.lucide.createIcons();
    }
  },

  goToPage(page) {
    RestaurantsPageComponent.currentPage = Math.max(1, page);
    const container = document.getElementById('page-content-container');
    if (container) {
      container.innerHTML = RestaurantsPageComponent.render(window.dataEngine.filteredRestaurants, window.appRouter.currentMetrics);
      if (window.lucide) window.lucide.createIcons();
    }
  },

  changePageSize(newSize) {
    RestaurantsPageComponent.pageSize = parseInt(newSize, 10);
    RestaurantsPageComponent.currentPage = 1;
    const container = document.getElementById('page-content-container');
    if (container) {
      container.innerHTML = RestaurantsPageComponent.render(window.dataEngine.filteredRestaurants, window.appRouter.currentMetrics);
      if (window.lucide) window.lucide.createIcons();
    }
  },

  showModal(restaurantId) {
    const restaurant = window.dataEngine.restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;

    const modal = document.getElementById('restaurant-detail-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="flex items-start justify-between pb-3 border-b border-slate-100">
        <div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Restaurant Profile #${restaurant.id}</span>
          <h3 class="text-lg font-black text-slate-900 mt-0.5">${restaurant.name}</h3>
          <p class="text-xs text-slate-500">${restaurant.city}, ${restaurant.country}</p>
        </div>
        <button onclick="window.restaurantsView.closeModal()" class="text-slate-400 hover:text-slate-600 p-1">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="py-4 space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-slate-50 rounded-xl">
            <div class="text-[10px] text-slate-400 font-bold uppercase">Aggregate Rating</div>
            <div class="text-xl font-black ${restaurant.rating >= 4.0 ? 'text-emerald-600' : restaurant.rating > 0 ? 'text-amber-600' : 'text-slate-400'} mt-0.5">
              ${restaurant.rating > 0 ? restaurant.rating + ' ★' : 'Not Rated'}
            </div>
            <div class="text-[10px] text-slate-500 font-semibold">${restaurant.rating_text}</div>
          </div>

          <div class="p-3 bg-slate-50 rounded-xl">
            <div class="text-[10px] text-slate-400 font-bold uppercase">Customer Votes</div>
            <div class="text-xl font-black text-slate-900 mt-0.5">${restaurant.votes.toLocaleString()}</div>
            <div class="text-[10px] text-slate-500 font-semibold">User Reviews</div>
          </div>
        </div>

        <div class="p-3 bg-slate-50 rounded-xl space-y-1.5">
          <div class="flex justify-between">
            <span class="text-slate-500">Cuisines:</span>
            <span class="font-bold text-slate-800 text-right">${restaurant.cuisines}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Price Range:</span>
            <span class="font-bold text-slate-800">${'₹'.repeat(restaurant.price_range)} (Range ${restaurant.price_range})</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Cost for Two:</span>
            <span class="font-bold text-slate-800">${restaurant.cost > 0 ? restaurant.cost.toLocaleString() + ' ' + restaurant.currency : 'N/A'}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Online Delivery:</span>
            <span class="font-bold ${restaurant.delivery === 'Yes' ? 'text-emerald-600' : 'text-slate-500'}">${restaurant.delivery}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Table Booking:</span>
            <span class="font-bold ${restaurant.booking === 'Yes' ? 'text-purple-600' : 'text-slate-500'}">${restaurant.booking}</span>
          </div>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 flex justify-end">
        <button onclick="window.restaurantsView.closeModal()" class="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-black transition-colors">
          Close Profile
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  },

  closeModal() {
    const modal = document.getElementById('restaurant-detail-modal');
    if (modal) modal.classList.add('hidden');
  }
};

window.appRouter = new AppRouter();
document.addEventListener('DOMContentLoaded', () => {
  window.appRouter.init();
});
