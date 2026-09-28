/**
 * Overview Page Component - Page 1
 */

const OverviewPageComponent = {
  render(summaryData, metrics) {
    const topVoted = summaryData.engagement.top_voted.slice(0, 5);

    return `
      <div class="space-y-6 page-animate">
        <!-- KPI Cards Grid -->
        <div id="kpi-container">
          ${KpiCardsComponent.render(metrics)}
        </div>

        <!-- Analytical Banner: Storytelling Arc -->
        <div class="p-4 bg-gradient-to-r from-red-500/10 via-rose-50 to-orange-50/60 rounded-2xl border border-red-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#E23744] text-white flex items-center justify-center font-bold shadow-md shadow-red-500/20">
              <i data-lucide="compass" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-900">Exploratory Data Analysis Storyline</h3>
              <p class="text-xs text-slate-600">
                <span class="font-bold text-slate-800">DATA (9,551 Rows)</span> → 
                <span class="font-bold text-slate-800">EDA (10 Phases)</span> → 
                <span class="font-bold text-[#E23744]">PATTERNS (Ratings & Pricing)</span> → 
                <span class="font-bold text-slate-800">INSIGHTS (8 Findings)</span> → 
                <span class="font-bold text-emerald-700">BUSINESS ACTIONS</span>
              </p>
            </div>
          </div>
          <button onclick="window.appRouter.navigateTo('insights')" class="px-3.5 py-1.5 bg-white text-[#E23744] hover:bg-red-500 hover:text-white rounded-xl text-xs font-bold border border-red-200 shadow-xs transition-all flex items-center gap-1.5 flex-shrink-0">
            <span>Explore Strategic Insights</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <!-- Main Chart Section: Row 1 -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Main Large Card: Top Cities by Restaurant Count (Step 8 Main Visual) -->
          <div class="analytics-card p-6 lg:col-span-8 flex flex-col justify-between">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <i data-lucide="bar-chart-3" class="w-4 h-4 text-[#E23744]"></i>
                  Top Cities by Restaurant Count
                </h3>
                <p class="text-xs text-slate-500">
                  Horizontal distribution across leading restaurant hubs · Highlights NCR concentration (>80%)
                </p>
              </div>
              <span class="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg self-start">
                Top 10 Cities
              </span>
            </div>
            <div class="chart-container h-80">
              <canvas id="overview-top-cities-chart"></canvas>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#E23744]"></span>
                <span><strong>New Delhi:</strong> 5,473 Outlets (57.3%)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span><strong>Gurgaon:</strong> 1,118 Outlets (11.7%)</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-red-300"></span>
                <span><strong>Noida:</strong> 1,080 Outlets (11.3%)</span>
              </div>
            </div>
          </div>

          <!-- Rating Distribution Card -->
          <div class="analytics-card p-6 lg:col-span-4 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <i data-lucide="pie-chart" class="w-4 h-4 text-amber-500"></i>
                  Rating Distribution
                </h3>
                <p class="text-xs text-slate-500">Distinct 'Not Rated' handling</p>
              </div>
              <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                6 Tiers
              </span>
            </div>
            <div class="chart-container h-64 relative flex items-center justify-center">
              <canvas id="overview-rating-dist-chart"></canvas>
            </div>
            <div class="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600">
              <div class="flex items-center justify-between font-bold text-slate-800 mb-1">
                <span>Not Rated Restaurants:</span>
                <span class="text-[#E23744] font-black">2,148 (22.5%)</span>
              </div>
              <p class="text-[11px] text-slate-500 leading-relaxed">
                Rating = 0 represents unrated venues, not customer dissatisfaction. Excluded from genuine performance metrics.
              </p>
            </div>
          </div>
        </div>

        <!-- Row 2: Price Range & Delivery vs Booking Comparisons -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Price Range Analysis Card -->
          <div class="analytics-card p-6 lg:col-span-6 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <i data-lucide="coins" class="w-4 h-4 text-blue-600"></i>
                  Average Rating by Price Range
                </h3>
                <p class="text-xs text-slate-500">Price Tier 1 (Budget) to Tier 4 (Fine Dining)</p>
              </div>
              <span class="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Positive Trend
              </span>
            </div>
            <div class="chart-container h-64">
              <canvas id="overview-price-range-chart"></canvas>
            </div>
            <div class="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
              <div class="p-2 bg-slate-50 rounded-lg">
                <div class="text-[10px] text-slate-500 font-semibold">Range 1</div>
                <div class="font-bold text-slate-800">3.24 ★</div>
                <div class="text-[9px] text-slate-400">4,444 Outlets</div>
              </div>
              <div class="p-2 bg-slate-50 rounded-lg">
                <div class="text-[10px] text-slate-500 font-semibold">Range 2</div>
                <div class="font-bold text-slate-800">3.38 ★</div>
                <div class="text-[9px] text-slate-400">3,113 Outlets</div>
              </div>
              <div class="p-2 bg-slate-50 rounded-lg">
                <div class="text-[10px] text-slate-500 font-semibold">Range 3</div>
                <div class="font-bold text-slate-800">3.78 ★</div>
                <div class="text-[9px] text-slate-400">1,408 Outlets</div>
              </div>
              <div class="p-2 bg-slate-50 rounded-lg">
                <div class="text-[10px] text-slate-500 font-semibold">Range 4</div>
                <div class="font-bold text-[#E23744]">3.89 ★</div>
                <div class="text-[9px] text-slate-400">586 Outlets</div>
              </div>
            </div>
          </div>

          <!-- Online Delivery & Table Booking Comparison -->
          <div class="analytics-card p-6 lg:col-span-6 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <i data-lucide="sparkles" class="w-4 h-4 text-purple-600"></i>
                  Delivery & Booking Service Comparison
                </h3>
                <p class="text-xs text-slate-500">Observed average ratings across platform features</p>
              </div>
              <span class="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                Feature Premium
              </span>
            </div>
            <div class="chart-container h-64">
              <canvas id="overview-delivery-booking-chart"></canvas>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div class="p-2.5 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                <div class="font-bold text-emerald-800 flex items-center gap-1.5">
                  <i data-lucide="bike" class="w-3.5 h-3.5 text-emerald-600"></i>
                  Online Delivery
                </div>
                <div class="text-slate-600 text-[11px] mt-0.5">
                  Delivery outlets average <strong>3.25★</strong> vs <strong>2.47★</strong> without delivery (overall).
                </div>
              </div>
              <div class="p-2.5 bg-purple-50/60 border border-purple-100 rounded-xl">
                <div class="font-bold text-purple-800 flex items-center gap-1.5">
                  <i data-lucide="calendar" class="w-3.5 h-3.5 text-purple-600"></i>
                  Table Booking
                </div>
                <div class="text-slate-600 text-[11px] mt-0.5">
                  Booking outlets average <strong>3.44★</strong> vs <strong>2.56★</strong> and receive 6.8x votes.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 3: Top Restaurants Ranked List & Quick Key Insights -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Top Restaurants by Customer Engagement (Hall of Fame) -->
          <div class="analytics-card p-6 lg:col-span-7 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <i data-lucide="award" class="w-4 h-4 text-amber-500"></i>
                  Top Restaurants by Engagement (Real Zomato Outliers)
                </h3>
                <p class="text-xs text-slate-500">Verified high-vote brands from Phase 7 Outlier Analysis</p>
              </div>
              <button onclick="window.appRouter.navigateTo('restaurants')" class="text-xs font-semibold text-[#E23744] hover:underline flex items-center gap-1">
                <span>View All</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="text-slate-400 font-semibold border-b border-slate-100 pb-2">
                    <th class="py-2">Rank & Restaurant</th>
                    <th class="py-2">City</th>
                    <th class="py-2 text-center">Rating</th>
                    <th class="py-2 text-right">Votes</th>
                    <th class="py-2 text-center">Price</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${topVoted.map((r, i) => `
                    <tr class="hover:bg-slate-50/80 transition-colors">
                      <td class="py-3 font-semibold text-slate-800 flex items-center gap-2.5">
                        <span class="w-5 h-5 rounded-full ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-300 text-slate-700' : i === 2 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'} flex items-center justify-center text-[10px] font-black">
                          ${i + 1}
                        </span>
                        <div>
                          <div class="text-slate-900 font-bold">${r.name}</div>
                          <div class="text-[10px] text-slate-400 font-normal truncate max-w-[180px]">${r.cuisines}</div>
                        </div>
                      </td>
                      <td class="py-3 text-slate-600">${r.city}</td>
                      <td class="py-3 text-center">
                        <span class="px-2 py-0.5 rounded-full font-bold text-[11px] ${r.rating >= 4.5 ? 'bg-emerald-100 text-emerald-800' : 'bg-green-100 text-green-800'}">
                          ${r.rating} ★
                        </span>
                      </td>
                      <td class="py-3 text-right font-black text-slate-900 stat-value">
                        ${r.votes.toLocaleString()}
                      </td>
                      <td class="py-3 text-center font-bold text-slate-500">
                        ${'₹'.repeat(r.price_range)}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- EDA Key Findings Highlights -->
          <div class="analytics-card p-6 lg:col-span-5 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <i data-lucide="zap" class="w-4 h-4 text-amber-500"></i>
                  Key Analytical Takeaways
                </h3>
                <p class="text-xs text-slate-500">Derived from 10-Phase Notebook findings</p>
              </div>
              <button onclick="window.appRouter.navigateTo('insights')" class="text-xs font-semibold text-[#E23744] hover:underline">
                Full Report
              </button>
            </div>

            <div class="space-y-3">
              <div class="p-3 bg-red-50/60 border border-red-100 rounded-xl flex items-start gap-3">
                <div class="p-2 bg-red-100 text-[#E23744] rounded-lg mt-0.5 flex-shrink-0">
                  <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">22.5% Ratings Blindspot</h4>
                  <p class="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    2,148 listings lack ratings, reducing consumer trust and skewing platform averages.
                  </p>
                </div>
              </div>

              <div class="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-start gap-3">
                <div class="p-2 bg-blue-100 text-blue-600 rounded-lg mt-0.5 flex-shrink-0">
                  <i data-lucide="trending-up" class="w-4 h-4"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Social Proof: r = 0.41</h4>
                  <p class="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Strong positive correlation between votes and rating. Established venues enjoy compounding trust.
                  </p>
                </div>
              </div>

              <div class="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-start gap-3">
                <div class="p-2 bg-emerald-100 text-emerald-600 rounded-lg mt-0.5 flex-shrink-0">
                  <i data-lucide="utensils" class="w-4 h-4"></i>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-900">Winning Cuisines</h4>
                  <p class="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Italian (3.95★) and American (3.92★) outperform saturated North Indian (936 outlets).
                  </p>
                </div>
              </div>
            </div>

            <button onclick="window.appRouter.navigateTo('insights')" class="mt-4 w-full py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5">
              <span>Read All 8 Business Insights</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
};

window.OverviewPageComponent = OverviewPageComponent;
