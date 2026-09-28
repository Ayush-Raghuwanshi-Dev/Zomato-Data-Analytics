/**
 * Insights & Recommendations Page Component - Page 5
 */

const InsightsPageComponent = {
  render(summaryData) {
    const { insights, recommendations } = summaryData;

    const getIcon = (iconName) => {
      switch (iconName) {
        case 'AlertCircle': return 'alert-circle';
        case 'Bike': return 'bike';
        case 'CalendarCheck': return 'calendar-check';
        case 'DollarSign': return 'dollar-sign';
        case 'TrendingUp': return 'trending-up';
        case 'Utensils': return 'utensils';
        case 'MapPin': return 'map-pin';
        case 'ShieldCheck': return 'shield-check';
        default: return 'lightbulb';
      }
    };

    return `
      <div class="space-y-8 page-animate">
        <!-- Top Executive Summary Banner -->
        <div class="analytics-card p-6 bg-gradient-to-r from-red-600 via-rose-600 to-[#E23744] text-white shadow-xl">
          <div class="max-w-4xl">
            <span class="px-2.5 py-1 bg-white/20 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wider">
              Phase 9 & 10 Deliverables
            </span>
            <h3 class="text-2xl font-black tracking-tight mt-2 text-white">
              Data Insights & Strategic Business Recommendations
            </h3>
            <p class="text-xs md:text-sm text-red-100 mt-1 leading-relaxed">
              Every insight and recommendation below is backed strictly by mathematical proof, correlation analysis, 
              and exploratory patterns discovered in the Zomato EDA Notebook.
            </p>
          </div>
        </div>

        <!-- Section 1: 8 Key Business Insights -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <i data-lucide="zap" class="w-5 h-5 text-amber-500"></i>
                8 Core Analytical Insights
              </h3>
              <p class="text-xs text-slate-500">Discovered during univariate, bivariate, and multivariate analysis phases</p>
            </div>
            <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              8 Data-Backed Findings
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            ${insights.map(item => `
              <div class="analytics-card p-5 flex flex-col justify-between hover:border-red-200 group">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <div class="w-9 h-9 rounded-xl bg-red-50 text-[#E23744] flex items-center justify-center group-hover:bg-[#E23744] group-hover:text-white transition-colors">
                      <i data-lucide="${getIcon(item.icon)}" class="w-4 h-4"></i>
                    </div>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${item.impact === 'High Priority' ? 'bg-red-100 text-red-700' : item.impact === 'Growth Driver' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}">
                      ${item.impact}
                    </span>
                  </div>
                  
                  <span class="text-[10px] uppercase font-bold tracking-wider text-slate-400">${item.category}</span>
                  <h4 class="text-sm font-bold text-slate-900 mt-0.5 leading-snug">${item.headline}</h4>
                  
                  <div class="my-2.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-black text-[#E23744] stat-value">
                    ${item.stat}
                  </div>
                  
                  <p class="text-xs text-slate-600 leading-relaxed">
                    ${item.explanation}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Section 2: Business Recommendations (Observation -> Data Evidence -> Business Meaning -> Possible Action) -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <i data-lucide="target" class="w-5 h-5 text-[#E23744]"></i>
                4 Actionable Business Recommendations
              </h3>
              <p class="text-xs text-slate-500">Structured decision framework directly from notebook Phase 9 & 10</p>
            </div>
            <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              Decision Matrix
            </span>
          </div>

          <div class="space-y-4">
            ${recommendations.map((rec, i) => `
              <div class="analytics-card p-6 border-l-4 border-l-[#E23744]">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-lg bg-[#E23744] text-white flex items-center justify-center font-black text-xs">
                      ${i + 1}
                    </span>
                    <h4 class="text-base font-bold text-slate-900">${rec.title}</h4>
                  </div>
                  <span class="px-2.5 py-1 bg-red-50 text-[#E23744] font-bold text-[11px] rounded-lg self-start">
                    Strategic Initiative
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  <!-- 1. Observation -->
                  <div class="p-3 bg-slate-50 rounded-xl">
                    <div class="font-bold text-slate-500 uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1.5">
                      <i data-lucide="eye" class="w-3.5 h-3.5 text-blue-500"></i>
                      1. Observation
                    </div>
                    <p class="text-slate-800 leading-relaxed font-medium">
                      ${rec.observation}
                    </p>
                  </div>

                  <!-- 2. Data Evidence -->
                  <div class="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl">
                    <div class="font-bold text-amber-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1.5">
                      <i data-lucide="bar-chart-2" class="w-3.5 h-3.5 text-amber-600"></i>
                      2. Data Evidence
                    </div>
                    <p class="text-amber-950 leading-relaxed font-semibold">
                      ${rec.evidence}
                    </p>
                  </div>

                  <!-- 3. Business Meaning -->
                  <div class="p-3 bg-purple-50/70 border border-purple-200/60 rounded-xl">
                    <div class="font-bold text-purple-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1.5">
                      <i data-lucide="briefcase" class="w-3.5 h-3.5 text-purple-600"></i>
                      3. Business Meaning
                    </div>
                    <p class="text-purple-950 leading-relaxed">
                      ${rec.business_meaning}
                    </p>
                  </div>

                  <!-- 4. Possible Action -->
                  <div class="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-xl">
                    <div class="font-bold text-emerald-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1.5">
                      <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600"></i>
                      4. Possible Action
                    </div>
                    <p class="text-emerald-950 leading-relaxed font-medium">
                      ${rec.action}
                    </p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
};

window.InsightsPageComponent = InsightsPageComponent;
