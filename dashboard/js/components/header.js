/**
 * Header Component
 */

const HeaderComponent = {
  render(activePageTitle = 'Dashboard Overview', activeFilterCount = 0, currentFilteredCount = 9551) {
    return `
      <header class="bg-white border-b border-slate-200/80 sticky top-0 z-20 px-6 py-4 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <!-- Left: Page Title & Context -->
          <div>
            <div class="flex items-center gap-2">
              <button id="mobile-menu-open" class="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100">
                <i data-lucide="menu" class="w-5 h-5"></i>
              </button>
              <h2 id="header-page-title" class="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                ${activePageTitle}
              </h2>
            </div>
            <p class="text-xs md:text-sm text-slate-500 font-normal mt-0.5">
              Exploring restaurant performance, ratings, pricing, locations and customer engagement
            </p>
          </div>

          <!-- Right: Search, Filter Toggle, Reset -->
          <div class="flex items-center gap-3">
            <!-- Global Search Bar -->
            <div class="relative flex-1 sm:w-64 md:w-72">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"></i>
              <input 
                type="text" 
                id="global-search-input" 
                placeholder="Search restaurants, cuisines, cities..." 
                class="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E23744]/20 focus:border-[#E23744] transition-all"
              />
              <button id="search-clear-btn" class="hidden absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <i data-lucide="x" class="w-3.5 h-3.5"></i>
              </button>
            </div>

            <!-- Download PDF Report Link -->
            <a 
              href="Zomato_Data_Analysis_Report.pdf" 
              download="Zomato_Data_Analysis_Report.pdf"
              target="_blank"
              class="hidden sm:flex px-3 py-2 bg-red-50 hover:bg-red-100 text-[#E23744] border border-red-200/80 rounded-xl text-xs md:text-sm font-semibold items-center gap-1.5 transition-all shadow-xs"
              title="Download Formal PDF Report">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              <span>PDF Report</span>
            </a>

            <!-- Filter Toggle Button -->
            <button 
              id="filter-drawer-toggle" 
              class="relative px-3.5 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 rounded-xl text-xs md:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm">
              <i data-lucide="filter" class="w-4 h-4 text-[#E23744]"></i>
              <span>Filters</span>
              ${activeFilterCount > 0 ? `
                <span class="w-5 h-5 bg-[#E23744] text-white rounded-full text-[11px] font-bold flex items-center justify-center">
                  ${activeFilterCount}
                </span>
              ` : ''}
            </button>

            <!-- Reset Filters (visible if filters active) -->
            ${activeFilterCount > 0 ? `
              <button 
                id="reset-filters-btn" 
                class="px-3 py-2 bg-red-50 text-[#E23744] hover:bg-red-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors">
                <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                <span class="hidden sm:inline">Reset</span>
              </button>
            ` : ''}

            <!-- Live Count Pill -->
            <div class="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-slate-100/80 border border-slate-200/60 rounded-xl text-xs font-semibold text-slate-600">
              <i data-lucide="database" class="w-3.5 h-3.5 text-slate-500"></i>
              <span id="header-records-count">${currentFilteredCount.toLocaleString()}</span> outlets
            </div>
          </div>
        </div>

        <!-- Filter Drawer Container (Expanded when toggle clicked) -->
        <div id="filter-drawer" class="hidden mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 page-animate">
          <!-- City Filter -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">City</label>
            <select id="filter-city" class="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-[#E23744]">
              <option value="ALL">All Cities (141)</option>
            </select>
          </div>

          <!-- Country Filter -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Country</label>
            <select id="filter-country" class="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-[#E23744]">
              <option value="ALL">All Countries (15)</option>
            </select>
          </div>

          <!-- Price Range Filter -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Price Range</label>
            <select id="filter-price-range" class="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-[#E23744]">
              <option value="ALL">All Price Ranges</option>
              <option value="1">Range 1 (Cheap)</option>
              <option value="2">Range 2 (Moderate)</option>
              <option value="3">Range 3 (Expensive)</option>
              <option value="4">Range 4 (Fine Dining)</option>
            </select>
          </div>

          <!-- Rating Category Filter -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Rating Category</label>
            <select id="filter-rating-category" class="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-[#E23744]">
              <option value="ALL">All Rating Tiers</option>
              <option value="Excellent">Excellent (4.5 - 5.0)</option>
              <option value="Very Good">Very Good (4.0 - 4.4)</option>
              <option value="Good">Good (3.5 - 3.9)</option>
              <option value="Average">Average (2.5 - 3.4)</option>
              <option value="Poor">Poor (1.8 - 2.4)</option>
              <option value="Not rated">Not Rated (0.0)</option>
            </select>
          </div>

          <!-- Online Delivery Filter -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Online Delivery</label>
            <select id="filter-delivery" class="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-[#E23744]">
              <option value="ALL">All (Yes & No)</option>
              <option value="Yes">Delivery Available (Yes)</option>
              <option value="No">No Delivery (No)</option>
            </select>
          </div>

          <!-- Table Booking Filter -->
          <div>
            <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Table Booking</label>
            <select id="filter-booking" class="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-700 focus:outline-none focus:border-[#E23744]">
              <option value="ALL">All (Yes & No)</option>
              <option value="Yes">Booking Available (Yes)</option>
              <option value="No">No Booking (No)</option>
            </select>
          </div>
        </div>
      </header>
    `;
  }
};

window.HeaderComponent = HeaderComponent;
