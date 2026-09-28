/**
 * Restaurants Page Component - Page 2
 * Deep dive restaurant explorer with live data table, sorting, searching & pagination
 */

const RestaurantsPageComponent = {
  currentPage: 1,
  pageSize: 15,
  sortBy: 'votes',
  sortOrder: 'desc',

  render(filteredRestaurants, metrics) {
    const startIdx = (this.currentPage - 1) * this.pageSize;
    const endIdx = startIdx + this.pageSize;
    const totalCount = filteredRestaurants.length;
    const totalPages = Math.ceil(totalCount / this.pageSize) || 1;

    // Sorting
    const sorted = [...filteredRestaurants].sort((a, b) => {
      let valA = a[this.sortBy];
      let valB = b[this.sortBy];
      if (typeof valA === 'string') {
        return this.sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return this.sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    const pageItems = sorted.slice(startIdx, endIdx);

    const getBadgeClass = (ratingText) => {
      switch (ratingText) {
        case 'Excellent': return 'badge-rating-excellent';
        case 'Very Good': return 'badge-rating-very-good';
        case 'Good': return 'badge-rating-good';
        case 'Average': return 'badge-rating-average';
        case 'Poor': return 'badge-rating-poor';
        default: return 'badge-rating-unrated';
      }
    };

    return `
      <div class="space-y-6 page-animate">
        <!-- Top Stats Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="analytics-card p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filtered Listings</span>
            <div class="text-2xl font-black text-slate-900 mt-1">${totalCount.toLocaleString()} <span class="text-xs font-normal text-slate-400">/ 9,551</span></div>
            <p class="text-[11px] text-slate-500 mt-1">Based on active filters</p>
          </div>

          <div class="analytics-card p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Rating (Rated)</span>
            <div class="text-2xl font-black text-amber-600 mt-1">${metrics.avgRatingRated} ★</div>
            <p class="text-[11px] text-slate-500 mt-1">${metrics.notRatedCount.toLocaleString()} unrated excluded</p>
          </div>

          <div class="analytics-card p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Delivery Coverage</span>
            <div class="text-2xl font-black text-emerald-600 mt-1">${metrics.deliveryPct}%</div>
            <p class="text-[11px] text-slate-500 mt-1">${metrics.deliveryCount.toLocaleString()} restaurants</p>
          </div>

          <div class="analytics-card p-4">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Table Booking</span>
            <div class="text-2xl font-black text-purple-600 mt-1">${metrics.bookingPct}%</div>
            <p class="text-[11px] text-slate-500 mt-1">${metrics.bookingCount.toLocaleString()} restaurants</p>
          </div>
        </div>

        <!-- Table Card -->
        <div class="analytics-card p-6">
          <!-- Table Controls Bar -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <i data-lucide="table" class="w-4 h-4 text-[#E23744]"></i>
                Restaurant Directory & Performance Explorer
              </h3>
              <p class="text-xs text-slate-500">
                Click headers to sort · Click restaurant to view complete dataset profile
              </p>
            </div>

            <!-- Page Size & Info -->
            <div class="flex items-center gap-3 text-xs">
              <span class="text-slate-500">
                Showing <strong>${startIdx + 1}</strong> - <strong>${Math.min(endIdx, totalCount)}</strong> of <strong>${totalCount.toLocaleString()}</strong>
              </span>
              <select id="table-pagesize-select" onchange="window.restaurantsView.changePageSize(this.value)" class="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg p-1.5 font-semibold focus:outline-none focus:border-[#E23744]">
                <option value="15" ${this.pageSize === 15 ? 'selected' : ''}>15 / page</option>
                <option value="25" ${this.pageSize === 25 ? 'selected' : ''}>25 / page</option>
                <option value="50" ${this.pageSize === 50 ? 'selected' : ''}>50 / page</option>
              </select>
            </div>
          </div>

          <!-- The Table -->
          <div class="overflow-x-auto min-h-[480px]">
            <table class="w-full text-left text-xs data-table">
              <thead>
                <tr>
                  <th class="py-3 px-3 cursor-pointer hover:text-[#E23744]" onclick="window.restaurantsView.sort('name')">
                    Restaurant ${this.sortBy === 'name' ? (this.sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th class="py-3 px-3 cursor-pointer hover:text-[#E23744]" onclick="window.restaurantsView.sort('city')">
                    City / Country ${this.sortBy === 'city' ? (this.sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th class="py-3 px-3">Cuisines</th>
                  <th class="py-3 px-3 text-center cursor-pointer hover:text-[#E23744]" onclick="window.restaurantsView.sort('rating')">
                    Rating ${this.sortBy === 'rating' ? (this.sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th class="py-3 px-3 text-right cursor-pointer hover:text-[#E23744]" onclick="window.restaurantsView.sort('votes')">
                    Votes ${this.sortBy === 'votes' ? (this.sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th class="py-3 px-3 text-center cursor-pointer hover:text-[#E23744]" onclick="window.restaurantsView.sort('price_range')">
                    Price Range ${this.sortBy === 'price_range' ? (this.sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th class="py-3 px-3 text-right cursor-pointer hover:text-[#E23744]" onclick="window.restaurantsView.sort('cost')">
                    Cost for Two ${this.sortBy === 'cost' ? (this.sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th class="py-3 px-3 text-center">Services</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${pageItems.length === 0 ? `
                  <tr>
                    <td colspan="8" class="text-center py-12 text-slate-400">
                      <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                      <p class="font-semibold text-slate-600">No restaurants match your active filters.</p>
                      <button onclick="window.dataEngine.resetFilters()" class="mt-2 text-xs font-bold text-[#E23744] hover:underline">
                        Reset all filters
                      </button>
                    </td>
                  </tr>
                ` : pageItems.map(r => `
                  <tr class="cursor-pointer hover:bg-red-50/30 transition-colors" onclick="window.restaurantsView.showModal(${r.id})">
                    <td class="py-3 px-3 font-bold text-slate-900 flex flex-col">
                      <span>${r.name}</span>
                      <span class="text-[10px] text-slate-400 font-normal">ID: #${r.id}</span>
                    </td>
                    <td class="py-3 px-3 text-slate-700">
                      <div class="font-semibold">${r.city}</div>
                      <div class="text-[10px] text-slate-400">${r.country}</div>
                    </td>
                    <td class="py-3 px-3 text-slate-600 max-w-[200px] truncate" title="${r.cuisines}">
                      ${r.cuisines}
                    </td>
                    <td class="py-3 px-3 text-center">
                      <span class="px-2.5 py-1 rounded-full text-[11px] font-bold ${getBadgeClass(r.rating_text)}">
                        ${r.rating > 0 ? `${r.rating} ★` : 'Not Rated'}
                      </span>
                    </td>
                    <td class="py-3 px-3 text-right font-black text-slate-900 stat-value">
                      ${r.votes.toLocaleString()}
                    </td>
                    <td class="py-3 px-3 text-center">
                      <span class="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-bold text-[11px]">
                        ${'₹'.repeat(r.price_range)} (${r.price_range})
                      </span>
                    </td>
                    <td class="py-3 px-3 text-right font-semibold text-slate-800 stat-value">
                      ${r.cost > 0 ? `${r.cost.toLocaleString()} ${r.currency}` : 'N/A'}
                    </td>
                    <td class="py-3 px-3 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        <span class="p-1 rounded ${r.delivery === 'Yes' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-300'}" title="Online Delivery: ${r.delivery}">
                          <i data-lucide="bike" class="w-3.5 h-3.5"></i>
                        </span>
                        <span class="p-1 rounded ${r.booking === 'Yes' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-300'}" title="Table Booking: ${r.booking}">
                          <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Pagination Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 mt-2 text-xs">
            <div class="text-slate-500">
              Page <strong>${this.currentPage}</strong> of <strong>${totalPages}</strong>
            </div>
            <div class="flex items-center gap-1">
              <button 
                onclick="window.restaurantsView.goToPage(1)" 
                ${this.currentPage === 1 ? 'disabled' : ''} 
                class="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none font-semibold">
                « First
              </button>
              <button 
                onclick="window.restaurantsView.goToPage(${this.currentPage - 1})" 
                ${this.currentPage === 1 ? 'disabled' : ''} 
                class="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none font-semibold">
                ‹ Prev
              </button>
              <span class="px-3 py-1.5 bg-[#E23744] text-white rounded-lg font-bold">
                ${this.currentPage}
              </span>
              <button 
                onclick="window.restaurantsView.goToPage(${this.currentPage + 1})" 
                ${this.currentPage >= totalPages ? 'disabled' : ''} 
                class="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none font-semibold">
                Next ›
              </button>
              <button 
                onclick="window.restaurantsView.goToPage(${totalPages})" 
                ${this.currentPage >= totalPages ? 'disabled' : ''} 
                class="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none font-semibold">
                Last »
              </button>
            </div>
          </div>
        </div>

        <!-- Restaurant Details Modal Container -->
        <div id="restaurant-detail-modal" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative page-animate" id="modal-content">
            <!-- Modal Content filled dynamically -->
          </div>
        </div>
      </div>
    `;
  }
};

window.RestaurantsPageComponent = RestaurantsPageComponent;
