/**
 * Locations & Cuisines Page Component - Page 4
 */

const LocationsPageComponent = {
  render(summaryData) {
    const { top_cities, cuisines, country_distribution, metadata } = summaryData;

    return `
      <div class="space-y-6 page-animate">
        <!-- Top Analytical Banner -->
        <div class="analytics-card p-6 bg-gradient-to-r from-rose-500/10 via-red-50 to-white border-rose-200/60">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span class="px-2.5 py-1 bg-[#E23744] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider">
                Phase 4, 6 & 8 Findings
              </span>
              <h3 class="text-xl font-black text-slate-900 mt-2">
                Geographic Footprint & Culinary Landscapes
              </h3>
              <p class="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Exploring geographical concentration risks across 141 cities and 15 countries, 
                paired with culinary performance benchmarking (<strong>Italian 3.95★</strong> vs saturated <strong>North Indian 3.38★</strong>).
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white rounded-xl shadow-xs border border-red-100 text-center">
                <div class="text-[10px] uppercase font-bold text-slate-400">NCR Concentration</div>
                <div class="text-xl font-black text-[#E23744]">${metadata.top_3_cities_concentration}%</div>
                <div class="text-[9px] text-slate-500">New Delhi + Gurgaon + Noida</div>
              </div>
              <div class="p-3 bg-white rounded-xl shadow-xs border border-red-100 text-center">
                <div class="text-[10px] uppercase font-bold text-slate-400">Global Reach</div>
                <div class="text-xl font-black text-slate-900">15</div>
                <div class="text-[9px] text-slate-500">Countries Represented</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 1: Authentic Geospatial Map -->
        <div class="analytics-card p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <i data-lucide="map" class="w-4 h-4 text-[#E23744]"></i>
                Interactive Restaurant Distribution Map (Actual Coordinates)
              </h4>
              <p class="text-xs text-slate-500">
                Centroids calculated from real Latitude & Longitude coordinates across 40+ key metropolitan markets
              </p>
            </div>
            <span class="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg self-start">
              Global Coordinates
            </span>
          </div>
          <!-- Leaflet Map Container -->
          <div id="leaflet-map" class="border border-slate-200 shadow-inner"></div>
          <div class="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>🔴 Circle radius and color intensity proportional to restaurant cluster volume</span>
            <span>Click any marker to view city restaurant count & average rated performance</span>
          </div>
        </div>

        <!-- Row 2: Cuisine Performance & Market Saturation -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Top Cuisines by Rating (Horizontal Bar Chart) -->
          <div class="analytics-card p-6 lg:col-span-7 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h4 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <i data-lucide="utensils" class="w-4 h-4 text-emerald-600"></i>
                  Top 10 Cuisines by Average Rating
                </h4>
                <p class="text-xs text-slate-500">
                  Strictly filtered with minimum 20 restaurants to avoid single-outlet sample bias (Cell 49 in Notebook)
                </p>
              </div>
              <span class="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                Min 20 Outlets
              </span>
            </div>
            <div class="chart-container h-80">
              <canvas id="locations-cuisine-canvas"></canvas>
            </div>
            <div class="mt-3 p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs text-emerald-900">
              <strong>Winning Cuisines:</strong> Italian (3.95★), American (3.92★), and Mexican (3.85★) command premium customer satisfaction, suggesting strong consumer appetite for specialized international cuisines.
            </div>
          </div>

          <!-- Volume vs Saturation Analysis -->
          <div class="analytics-card p-6 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-base font-bold text-slate-900">Cuisine Volume vs Rating</h4>
                <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Density</span>
              </div>
              <p class="text-xs text-slate-500 mb-4">
                Comparison of the most frequent cuisines by restaurant counts
              </p>

              <div class="space-y-2.5 text-xs">
                ${cuisines.top_by_volume.slice(0, 6).map(c => `
                  <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <div class="font-bold text-slate-800 truncate max-w-[160px]">${c.cuisine}</div>
                      <div class="text-[10px] text-slate-400">${c.count.toLocaleString()} restaurants</div>
                    </div>
                    <div class="text-right">
                      <span class="px-2 py-0.5 rounded-full font-bold text-[11px] ${c.avg_rating >= 3.6 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                        ${c.avg_rating} ★
                      </span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="mt-4 p-3 bg-red-50/80 border border-red-200 rounded-xl text-xs text-red-900">
              <strong>Market Saturation Alert:</strong> North Indian cuisine is present in 936 restaurants with an average rating of 3.38★. Over-supply increases customer price sensitivity and competition.
            </div>
          </div>
        </div>

        <!-- Row 3: Global Footprint Country Distribution -->
        <div class="analytics-card p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <i data-lucide="globe" class="w-4 h-4 text-blue-600"></i>
                Country Distribution & Local Currencies
              </h4>
              <p class="text-xs text-slate-500">
                Breakdown of all 15 countries in the dataset · Demonstrates global reach beyond India
              </p>
            </div>
            <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              15 Countries
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs data-table">
              <thead>
                <tr>
                  <th class="py-2.5 px-3">Country</th>
                  <th class="py-2.5 px-3 text-right">Restaurant Count</th>
                  <th class="py-2.5 px-3 text-right">Share (%)</th>
                  <th class="py-2.5 px-3 text-center">Avg Rating (Rated)</th>
                  <th class="py-2.5 px-3">Local Currency</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${country_distribution.map(c => `
                  <tr class="hover:bg-slate-50">
                    <td class="py-2.5 px-3 font-bold text-slate-800">${c.country}</td>
                    <td class="py-2.5 px-3 text-right font-black text-slate-900 stat-value">${c.count.toLocaleString()}</td>
                    <td class="py-2.5 px-3 text-right text-slate-600">${c.percentage}%</td>
                    <td class="py-2.5 px-3 text-center font-bold text-amber-600">${c.avg_rating_rated > 0 ? `${c.avg_rating_rated} ★` : 'N/A'}</td>
                    <td class="py-2.5 px-3 text-slate-500 font-mono text-[11px]">${c.currencies.join(', ')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  initMap(mapData) {
    if (typeof L === 'undefined') return;

    // Check if map container exists
    const container = document.getElementById('leaflet-map');
    if (!container) return;

    // Reset container if already initialized
    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

    // Default center to India
    const map = L.map('leaflet-map').setView([22.5, 78.5], 4);

    const cartoVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_41b1_1_1c25130d48635503dbc1a2a2', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    });

    L.control.layers({
      "Carto Voyager (Key)": cartoVoyager,
      "OpenStreetMap": osmLayer
    }, null, { position: 'topright' }).addTo(map);

    mapData.forEach(city => {
      // Determine radius based on count
      const radius = Math.min(26, Math.max(7, Math.sqrt(city.count) * 0.45));
      const color = city.count > 1000 ? '#E23744' : city.count > 100 ? '#EA580C' : '#3B82F6';

      const circle = L.circleMarker([city.lat, city.lng], {
        radius: radius,
        fillColor: color,
        color: '#FFFFFF',
        weight: 2,
        opacity: 0.95,
        fillOpacity: 0.8
      }).addTo(map);

      circle.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
          <h5 style="margin: 0 0 4px 0; font-weight: 800; font-size: 13px; color: #1E293B;">${city.city}</h5>
          <div style="font-size: 11px; color: #64748B;">Restaurants: <strong style="color: #0F172A;">${city.count.toLocaleString()}</strong></div>
          <div style="font-size: 11px; color: #64748B;">Avg Rating: <strong style="color: #E23744;">${city.avg_rating > 0 ? city.avg_rating + ' ★' : 'Not Rated'}</strong></div>
        </div>
      `);
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }
};

window.LocationsPageComponent = LocationsPageComponent;
