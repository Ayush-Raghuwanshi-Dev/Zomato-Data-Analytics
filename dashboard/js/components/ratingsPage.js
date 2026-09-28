/**
 * Ratings & Engagement Page Component - Page 3
 */

const RatingsPageComponent = {
  render(summaryData) {
    const { correlations, metadata, outliers } = summaryData;

    return `
      <div class="space-y-6 page-animate">
        <!-- Top Analytical Banner -->
        <div class="analytics-card p-6 bg-gradient-to-r from-amber-500/10 via-orange-50/50 to-white border-amber-200/60">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span class="px-2.5 py-1 bg-amber-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider">
                Phase 4, 5 & 8 Findings
              </span>
              <h3 class="text-xl font-black text-slate-900 mt-2">
                Ratings & Customer Engagement Dynamics
              </h3>
              <p class="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Examining the statistical distribution of aggregate ratings, the impact of platform services, 
                and the mathematical correlation (<strong>r = 0.409</strong>) between customer review volume and venue rating.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white rounded-xl shadow-xs border border-amber-100 text-center">
                <div class="text-[10px] uppercase font-bold text-slate-400">Distribution Skewness</div>
                <div class="text-xl font-black text-slate-900">${metadata.rating_skewness}</div>
                <div class="text-[9px] text-slate-500">Negatively Skewed</div>
              </div>
              <div class="p-3 bg-white rounded-xl shadow-xs border border-amber-100 text-center">
                <div class="text-[10px] uppercase font-bold text-slate-400">Votes vs Rating r</div>
                <div class="text-xl font-black text-[#E23744]">+${metadata.votes_rating_corr}</div>
                <div class="text-[9px] text-slate-500">Moderate Positive</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 1: Rating Distribution & Deep Dive into Not Rated -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Rating Donut / Tier Card -->
          <div class="analytics-card p-6 lg:col-span-5 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-3">
              <div>
                <h4 class="text-base font-bold text-slate-900">Rating Text Categories</h4>
                <p class="text-xs text-slate-500">6 official Zomato classification tiers</p>
              </div>
              <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">9,551 Outlets</span>
            </div>
            <div class="chart-container h-64">
              <canvas id="ratings-dist-canvas"></canvas>
            </div>
            <div class="mt-4 space-y-1.5 text-xs">
              <div class="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-900 font-semibold">
                <span>Excellent (4.5 - 5.0)</span>
                <span>301 (3.15%)</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-green-50 text-green-900 font-semibold">
                <span>Very Good (4.0 - 4.4)</span>
                <span>1,079 (11.30%)</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-lime-50 text-lime-900 font-semibold">
                <span>Good (3.5 - 3.9)</span>
                <span>2,100 (21.99%)</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-amber-50 text-amber-900 font-semibold">
                <span>Average (2.5 - 3.4)</span>
                <span>3,737 (39.13%)</span>
              </div>
              <div class="flex items-center justify-between p-2 rounded-lg bg-slate-100 text-slate-700 font-bold">
                <span>Not Rated (0.0)</span>
                <span>2,148 (22.49%)</span>
              </div>
            </div>
          </div>

          <!-- Deep Dive: The Not Rated Dilemma -->
          <div class="analytics-card p-6 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2 text-[#E23744]">
                <i data-lucide="alert-circle" class="w-5 h-5"></i>
                <h4 class="text-base font-bold text-slate-900">Critical EDA Methodological Finding: The "Not Rated" Bias</h4>
              </div>
              <p class="text-xs text-slate-600 leading-relaxed">
                In raw Zomato datasets, restaurants without user reviews are encoded with <code>Aggregate rating = 0.0</code> and <code>Rating text = "Not rated"</code>.
              </p>
              
              <div class="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 bg-red-50/70 border border-red-200 rounded-xl">
                  <div class="font-bold text-red-900 mb-1 flex items-center gap-1.5">
                    <i data-lucide="x-circle" class="w-4 h-4 text-[#E23744]"></i>
                    Naive Calculation (All 9,551 Rows)
                  </div>
                  <div class="text-2xl font-black text-red-700 my-1">2.67 ★</div>
                  <p class="text-[11px] text-slate-600">
                    Artificially deflated by 2,148 zero-values. Falsely portrays the entire restaurant ecosystem as substandard.
                  </p>
                </div>

                <div class="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <div class="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                    <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
                    Clean EDA Metric (7,403 Rated)
                  </div>
                  <div class="text-2xl font-black text-emerald-700 my-1">3.44 ★</div>
                  <p class="text-[11px] text-slate-600">
                    Accurate representation of restaurants that have received genuine customer ratings and visits.
                  </p>
                </div>
              </div>

              <div class="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-2">
                <div class="font-bold text-slate-800">Business Implication:</div>
                <p class="text-slate-600 text-[11px] leading-relaxed">
                  22.49% of all merchant partners suffer from an absence of social proof. Because consumers heavily filter out unrated venues, these 2,148 restaurants remain hidden in search results, creating merchant churn.
                </p>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Identified in Phase 3 & 4 of notebook</span>
              <span class="font-bold text-[#E23744]">Action: Review Incentive Program</span>
            </div>
          </div>
        </div>

        <!-- Row 2: Votes vs Rating Scatter Plot & Correlation Matrix -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Scatter Plot Card -->
          <div class="analytics-card p-6 lg:col-span-8 flex flex-col justify-between">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h4 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <i data-lucide="scatter-chart" class="w-4 h-4 text-[#E23744]"></i>
                  Customer Votes vs Aggregate Rating (Bivariate Analysis)
                </h4>
                <p class="text-xs text-slate-500">
                  Sampled across rated restaurants · Demonstrates how engagement scales with rating
                </p>
              </div>
              <div class="px-2.5 py-1 bg-red-50 text-[#E23744] font-bold text-xs rounded-lg border border-red-100 self-start">
                Pearson r = +0.409
              </div>
            </div>
            <div class="chart-container h-80">
              <canvas id="ratings-scatter-canvas"></canvas>
            </div>
            <div class="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center justify-between">
              <span><strong>Interpretation:</strong> Higher rated outlets attract significantly more votes and repeat reviews.</span>
              <span class="text-slate-400 text-[11px]">Cell 29 in EDA Notebook</span>
            </div>
          </div>

          <!-- Correlation Heatmap Summary Card -->
          <div class="analytics-card p-6 lg:col-span-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-base font-bold text-slate-900">Correlation Matrix</h4>
                <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Heatmap</span>
              </div>
              <p class="text-xs text-slate-500 mb-4">Pairwise Pearson correlation among numerical features</p>

              <div class="space-y-3 text-xs">
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div class="flex items-center justify-between font-bold text-slate-800">
                    <span>Price Range ↔ Rating</span>
                    <span class="text-[#E23744] font-black">+0.438</span>
                  </div>
                  <p class="text-[10px] text-slate-500 mt-1">
                    Moderate positive relationship. Higher tier restaurants receive higher ratings on average.
                  </p>
                </div>

                <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div class="flex items-center justify-between font-bold text-slate-800">
                    <span>Votes ↔ Rating</span>
                    <span class="text-[#E23744] font-black">+0.409</span>
                  </div>
                  <p class="text-[10px] text-slate-500 mt-1">
                    Strongest behavioral driver. Votes act as a primary social signal of credibility.
                  </p>
                </div>

                <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div class="flex items-center justify-between font-bold text-slate-800">
                    <span>Average Cost ↔ Rating</span>
                    <span class="text-slate-600 font-bold">+0.052</span>
                  </div>
                  <p class="text-[10px] text-slate-500 mt-1">
                    Very weak correlation. Being expensive does not guarantee customer satisfaction!
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-4 p-2.5 bg-amber-50 rounded-lg text-[11px] text-amber-800 border border-amber-200">
              <strong>Key Takeaway:</strong> Quality of service and food determines ratings, not nominal price.
            </div>
          </div>
        </div>

        <!-- Row 3: Bivariate Rating Trend: Price Range × Online Delivery (Cell 50) -->
        <div class="analytics-card p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <i data-lucide="trending-up" class="w-4 h-4 text-emerald-600"></i>
                Rating Trend: Price Range × Online Delivery Interaction
              </h4>
              <p class="text-xs text-slate-500">
                Direct reproduction of Phase 8 cluster comparison (Cell 50 in EDA Notebook)
              </p>
            </div>
            <span class="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg self-start">
              Cluster Comparison
            </span>
          </div>
          <div class="chart-container h-72">
            <canvas id="bivariate-trend-canvas"></canvas>
          </div>
          <p class="text-xs text-slate-500 mt-3 text-center">
            Both delivery and non-delivery restaurants experience rising ratings as price ranges advance from 1 to 4, with fine dining peaking at 3.89★.
          </p>
        </div>
      </div>
    `;
  }
};

window.RatingsPageComponent = RatingsPageComponent;
