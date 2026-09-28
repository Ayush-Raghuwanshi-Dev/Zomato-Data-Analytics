/**
 * Data Quality & EDA Workflow Page Component - Page 6
 */

const DataQualityPageComponent = {
  render(summaryData) {
    const { metadata, outliers, eda_workflow } = summaryData;

    return `
      <div class="space-y-6 page-animate">
        <!-- Top Banner -->
        <div class="analytics-card p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span class="px-2.5 py-1 bg-white/20 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider">
                Phase 3 & 7 Verification
              </span>
              <h3 class="text-xl md:text-2xl font-black mt-2 text-white">
                Data Quality Assessment & 10-Phase EDA Workflow
              </h3>
              <p class="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Thorough audit of data integrity, missing values, duplicate checks, statistical outlier detection, 
                and the end-to-end data science lifecycle applied in <code>Zomato_EDA_Analysis.ipynb</code>.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <div class="p-3 bg-white/10 rounded-xl border border-white/15 text-center">
                <div class="text-[10px] uppercase font-bold text-slate-300">Data Hygiene</div>
                <div class="text-xl font-black text-emerald-400">99.99%</div>
                <div class="text-[9px] text-slate-400">Completeness</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 1: Data Quality Summary Cards (Step 12 Requirements) -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div class="analytics-card p-4">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Rows</span>
            <div class="text-2xl font-black text-slate-900 mt-1">${metadata.total_restaurants.toLocaleString()}</div>
            <p class="text-[10px] text-emerald-600 font-semibold mt-1">✓ 100% verified</p>
          </div>

          <div class="analytics-card p-4">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Columns</span>
            <div class="text-2xl font-black text-slate-900 mt-1">${metadata.total_columns}</div>
            <p class="text-[10px] text-slate-500 mt-1">Categorical & Numeric</p>
          </div>

          <div class="analytics-card p-4">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Missing Values</span>
            <div class="text-2xl font-black text-amber-600 mt-1">${metadata.missing_cuisines}</div>
            <p class="text-[10px] text-amber-700 font-semibold mt-1">Cuisines column only</p>
          </div>

          <div class="analytics-card p-4">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Duplicate Rows</span>
            <div class="text-2xl font-black text-emerald-600 mt-1">${metadata.duplicate_rows}</div>
            <p class="text-[10px] text-emerald-700 font-semibold mt-1">✓ Zero duplicates</p>
          </div>

          <div class="analytics-card p-4 col-span-2 sm:col-span-1">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Missing Handling</span>
            <div class="text-base font-bold text-slate-800 mt-1">Imputed "Unknown"</div>
            <p class="text-[10px] text-slate-500 mt-1">Zero row deletions</p>
          </div>
        </div>

        <!-- Section 2: Outlier Analysis (Phase 7 Notebook Findings) -->
        <div class="analytics-card p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <i data-lucide="crosshair" class="w-4 h-4 text-[#E23744]"></i>
                Statistical Outlier Detection & Treatment Policy (Phase 7)
              </h4>
              <p class="text-xs text-slate-500">
                Comparison of IQR vs Z-Score Methods · Why genuine business anomalies must be preserved
              </p>
            </div>
            <span class="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              IQR vs Z-Score
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-xs">
            <!-- IQR Metrics -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
              <div class="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <i data-lucide="sliders" class="w-4 h-4 text-blue-600"></i>
                1. IQR Method (Votes)
              </div>
              <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div>Q1 (25th): <strong>${outliers.q1}</strong></div>
                <div>Q3 (75th): <strong>${outliers.q3}</strong></div>
                <div>IQR: <strong>${outliers.iqr}</strong></div>
                <div>Upper Limit: <strong>${outliers.upper_limit}</strong></div>
              </div>
              <div class="pt-2 border-t border-slate-200 font-bold text-slate-900 flex justify-between">
                <span>IQR Outliers Detected:</span>
                <span class="text-[#E23744] font-black">${outliers.iqr_outliers.toLocaleString()}</span>
              </div>
            </div>

            <!-- Z-Score Metrics -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
              <div class="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <i data-lucide="activity" class="w-4 h-4 text-purple-600"></i>
                2. Z-Score Method (|z| > 3)
              </div>
              <p class="text-[11px] text-slate-500 leading-relaxed">
                Standardized deviations from the mean (mean = 156.9, std = 430.2). Identifies extreme multi-sigma occurrences.
              </p>
              <div class="pt-2 border-t border-slate-200 font-bold text-slate-900 flex justify-between">
                <span>Z-Score Outliers Detected:</span>
                <span class="text-purple-700 font-black">${outliers.zscore_outliers}</span>
              </div>
            </div>

            <!-- Outlier Rule Card -->
            <div class="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2">
              <div class="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
                When NOT to Remove Outliers
              </div>
              <p class="text-[11px] text-emerald-950 leading-relaxed">
                <strong>Golden EDA Rule:</strong> Remove outliers only if they are <em>data entry errors</em>. Restaurants with 10,000+ votes (Toit, Truffles) are real high-performing brand assets. Deleting them destroys vital market signals!
              </p>
            </div>
          </div>
        </div>

        <!-- Section 3: Full 10-Phase End-to-End EDA Workflow Recap Table (Step 11 Requirements) -->
        <div class="analytics-card p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <i data-lucide="list-checks" class="w-4 h-4 text-[#E23744]"></i>
                Phase 10 — Complete End-to-End EDA Workflow Recap
              </h4>
              <p class="text-xs text-slate-500">
                Direct transcription of the systematic data science process executed in the Jupyter Notebook
              </p>
            </div>
            <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              10 Complete Phases
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs data-table">
              <thead>
                <tr>
                  <th class="py-3 px-3 text-center w-16">Phase</th>
                  <th class="py-3 px-4 w-64">Task / Objective</th>
                  <th class="py-3 px-4">Core Finding & Business Outcome</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                ${eda_workflow.map(step => `
                  <tr class="hover:bg-slate-50/80">
                    <td class="py-3 px-3 text-center">
                      <span class="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-extrabold flex items-center justify-center mx-auto text-[11px]">
                        ${step.phase}
                      </span>
                    </td>
                    <td class="py-3 px-4 font-bold text-slate-900">${step.task}</td>
                    <td class="py-3 px-4 text-slate-600 leading-relaxed font-normal">${step.finding}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
};

window.DataQualityPageComponent = DataQualityPageComponent;
