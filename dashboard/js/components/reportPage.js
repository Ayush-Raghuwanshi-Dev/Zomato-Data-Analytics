/**
 * Analysis Report Page Component
 * Renders the formal Zomato Data Analysis Report with Business Cases, Code & Findings
 */

const ReportPageComponent = {
  render() {
    return `
      <div class="space-y-6 page-animate max-w-5xl mx-auto">
        <!-- Report Header Banner -->
        <div class="analytics-card p-6 md:p-8 bg-gradient-to-r from-red-600 via-rose-600 to-[#E23744] text-white shadow-xl relative overflow-hidden">
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 bg-white/20 text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                  Official Project Report
                </span>
                <span class="text-xs text-red-100">· Comprehensive EDA Documentation</span>
              </div>
              <h2 class="text-2xl md:text-3xl font-black tracking-tight text-white">
                Zomato Data Analysis Report
              </h2>
              <p class="text-xs md:text-sm text-red-100 mt-2 max-w-3xl leading-relaxed">
                Exploratory Data Analysis, Data Integration, Pre-processing, and Business Case Solutions for the Indian Restaurant Industry.
              </p>
            </div>
            <a 
              href="Zomato_Data_Analysis_Report.pdf" 
              download="Zomato_Data_Analysis_Report.pdf"
              target="_blank"
              class="px-4 py-2 bg-white text-[#E23744] hover:bg-red-50 font-bold rounded-xl text-xs md:text-sm shadow-lg flex items-center gap-2 transition-all flex-shrink-0 self-start md:self-center">
              <i data-lucide="file-down" class="w-4 h-4"></i>
              <span>Download PDF</span>
            </a>
          </div>
          <div class="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <span class="text-9xl font-black text-white">Z</span>
          </div>
        </div>

        <!-- Section 1: About Zomato & About Project -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="analytics-card p-6">
            <div class="flex items-center gap-2.5 text-[#E23744] mb-3">
              <i data-lucide="store" class="w-5 h-5"></i>
              <h3 class="text-base font-bold text-slate-900">About Zomato</h3>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              Zomato is an Indian multinational restaurant aggregator and food delivery start-up founded by <strong>Deepinder Goyal</strong> and <strong>Pankaj Chaddah</strong> in <strong>2008</strong>.
            </p>
            <ul class="mt-3 space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li>Provides restaurant menus, customer photos, and verified user reviews.</li>
              <li>Offers food delivery logistics from thousands of partner restaurants.</li>
              <li>Enables dining reservations and customer privileges in select cities.</li>
            </ul>
          </div>

          <div class="analytics-card p-6">
            <div class="flex items-center gap-2.5 text-blue-600 mb-3">
              <i data-lucide="compass" class="w-5 h-5"></i>
              <h3 class="text-base font-bold text-slate-900">About Our Project</h3>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">
              India is world-famous for its multi-cuisine culinary landscape. With more Indians dining out and ordering doorstep delivery, restaurant businesses are expanding rapidly.
            </p>
            <ul class="mt-3 space-y-1.5 text-xs text-slate-600 list-disc list-inside">
              <li><strong>For Customers:</strong> Quickly discover top-rated dining spots, price ranges, and authentic vote-backed venues.</li>
              <li><strong>For Zomato:</strong> Identify under-served regional markets, improve merchant onboarding, and resolve data quality gaps.</li>
            </ul>
          </div>
        </div>

        <!-- Section 2: Data Preparation & Features -->
        <div class="analytics-card p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5 text-slate-900">
              <i data-lucide="database" class="w-5 h-5 text-[#E23744]"></i>
              <h3 class="text-base font-bold">Data Preparation & Schema</h3>
            </div>
            <span class="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-semibold">12 Core Features</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl">
              <div class="font-bold text-slate-800">NAME</div>
              <div class="text-[11px] text-slate-500 mt-0.5">Restaurant trade name</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
              <div class="font-bold text-slate-800">PRICE / Range</div>
              <div class="text-[11px] text-slate-500 mt-0.5">Price range 1 to 4</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
              <div class="font-bold text-slate-800">CUSINE_CATEGORY</div>
              <div class="text-[11px] text-slate-500 mt-0.5">Comma-separated food types</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
              <div class="font-bold text-slate-800">CITY</div>
              <div class="text-[11px] text-slate-500 mt-0.5">City location of restaurant</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
              <div class="font-bold text-slate-800">REGION / Locality</div>
              <div class="text-[11px] text-slate-500 mt-0.5">Neighborhood / district</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
              <div class="font-bold text-slate-800">RATING_TYPE</div>
              <div class="text-[11px] text-slate-500 mt-0.5">Excellent / Good / Average</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
              <div class="font-bold text-slate-800">RATING</div>
              <div class="text-[11px] text-slate-500 mt-0.5">Overall rating score (out of 5)</div>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
              <div class="font-bold text-slate-800">VOTES</div>
              <div class="text-[11px] text-slate-500 mt-0.5">Total customer review votes</div>
            </div>
          </div>
        </div>

        <!-- Section 3: Data Integration & Data Cleaning Code -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Data Integration -->
          <div class="analytics-card p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 text-slate-900 mb-2">
                <i data-lucide="merge" class="w-4 h-4 text-purple-600"></i>
                <h4 class="text-sm font-bold">Data Integration Pipeline</h4>
              </div>
              <p class="text-xs text-slate-500 mb-3 leading-relaxed">
                Uses Python Pandas, NumPy and Glob to merge regional city files into a consolidated DataFrame:
              </p>
              <pre class="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto"><code>import glob, pandas as pd, numpy as np

all_files = glob.glob(r"Input/*.csv")
data_list = []
for file in all_files:
    df_temp = pd.read_csv(file, delimiter="|")
    data_list.append(df_temp.values)

df_all = pd.DataFrame(np.vstack(data_list), 
    columns=[...])
df_all.drop(columns=["PAGE NO","URL","TIMING"], 
    inplace=True)</code></pre>
            </div>
          </div>

          <!-- Data Cleaning -->
          <div class="analytics-card p-6 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 text-slate-900 mb-2">
                <i data-lucide="sparkles" class="w-4 h-4 text-emerald-600"></i>
                <h4 class="text-sm font-bold">Data Cleaning (Pre-processing)</h4>
              </div>
              <p class="text-xs text-slate-500 mb-3 leading-relaxed">
                Imputes missing values using Groupby mean and cleans custom null tokens:
              </p>
              <pre class="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto"><code>missing_tokens = ["none","NEW","Not rated",np.nan]
df = pd.read_csv("Input.csv", na_values=missing_tokens)

# Convert types & Groupby Mean Imputation
df['RATING'] = pd.to_numeric(df['RATING'], errors='coerce')
df['RATING'] = df['RATING'].fillna(
    df.groupby(['CITY','CUSINE TYPE'])['RATING']
    .transform('mean'))
df.dropna(inplace=True)</code></pre>
            </div>
          </div>
        </div>

        <!-- Section 4: The 6 Business Cases (Pointwise & Simple Language) -->
        <div class="analytics-card p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <i data-lucide="check-square" class="w-5 h-5 text-[#E23744]"></i>
              <h3 class="text-base font-bold text-slate-900">Data Visualization & 6 Business Cases</h3>
            </div>
            <span class="text-xs bg-red-50 text-[#E23744] font-bold px-2.5 py-1 rounded-lg">Actionable Insights</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <!-- Case 1 -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-900 text-xs">Business Case 1</span>
                <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">Cuisines & Ratings</span>
              </div>
              <div class="font-semibold text-slate-800">Check Cuisines and Ratings served in a Region of selected City</div>
              <p class="text-slate-600 text-[11px] leading-relaxed">
                • Allows customers to filter restaurants by locality and cuisine with verified ratings.<br>
                • Diners easily find the top-rated Italian, Continental, or Bakery outlets in their neighborhood.
              </p>
            </div>

            <!-- Case 2 -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-900 text-xs">Business Case 2</span>
                <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold">Price vs Rating</span>
              </div>
              <div class="font-semibold text-slate-800">Average Rating vs Average Price across Regions and Cuisines</div>
              <p class="text-slate-600 text-[11px] leading-relaxed">
                • Compares meal cost against customer satisfaction across budget tiers.<br>
                • Disproves that expensive food always equals high rating (weak correlation r = +0.052).
              </p>
            </div>

            <!-- Case 3 -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-900 text-xs">Business Case 3</span>
                <span class="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-[10px] font-bold">Market Density</span>
              </div>
              <div class="font-semibold text-slate-800">Number of Restaurants in City Regions (Market Expansion)</div>
              <p class="text-slate-600 text-[11px] leading-relaxed">
                • Reveals that over 80% of current listings are concentrated in Delhi NCR.<br>
                • Helps Zomato pinpoint underrepresented regions to recruit partner restaurants.
              </p>
            </div>

            <!-- Case 4 -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-900 text-xs">Business Case 4</span>
                <span class="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">Social Proof</span>
              </div>
              <div class="font-semibold text-slate-800">Restaurant Search & Votes (Scatter Plot Analysis)</div>
              <p class="text-slate-600 text-[11px] leading-relaxed">
                • Highlights strong correlation (r = +0.409) between vote counts and rating stability.<br>
                • Diners rely on vote volume as a reliable trust signal before ordering.
              </p>
            </div>

            <!-- Case 5 -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-900 text-xs">Business Case 5</span>
                <span class="px-2 py-0.5 bg-rose-100 text-rose-700 rounded text-[10px] font-bold">Cuisine Demand</span>
              </div>
              <div class="font-semibold text-slate-800">City-level Cuisine Demand (Saturated vs Niche)</div>
              <p class="text-slate-600 text-[11px] leading-relaxed">
                • North Indian and Fast Food dominate supply, leading to high price competition.<br>
                • Italian (3.95★) and American (3.92★) lead in consumer satisfaction and profitability.
              </p>
            </div>

            <!-- Case 6 -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-900 text-xs">Business Case 6</span>
                <span class="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold">Geospatial Map</span>
              </div>
              <div class="font-semibold text-slate-800">Geospatial Mapping & Regional Cuisine Ratings</div>
              <p class="text-slate-600 text-[11px] leading-relaxed">
                • Integrates interactive Carto basemap tiles (<code class="text-[10px]">api_key=cb1_41b1_...</code>).<br>
                • Maps spatial dining density across Indian urban centers and 15 international countries.
              </p>
            </div>
          </div>
        </div>

        <!-- Section 5: Conclusion & Key Facts -->
        <div class="analytics-card p-6 bg-slate-900 text-white">
          <div class="flex items-center gap-2 mb-3 text-red-400">
            <i data-lucide="award" class="w-5 h-5"></i>
            <h3 class="text-base font-bold text-white">Key Facts & Conclusion Summary</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-300">
            <div class="p-3 bg-white/5 rounded-xl border border-white/10">
              <div class="font-bold text-white mb-1">City Distribution</div>
              <div>• New Delhi: 5,473 (57.3%)</div>
              <div>• Gurgaon: 1,118 (11.7%)</div>
              <div>• Noida: 1,080 (11.3%)</div>
            </div>

            <div class="p-3 bg-white/5 rounded-xl border border-white/10">
              <div class="font-bold text-white mb-1">Rating Categories</div>
              <div>• Average: 3,737 outlets</div>
              <div>• Not Rated: 2,148 outlets (22.5%)</div>
              <div>• Good & Very Good: 3,179 outlets</div>
            </div>

            <div class="p-3 bg-white/5 rounded-xl border border-white/10">
              <div class="font-bold text-white mb-1">Meal Pricing & Cost</div>
              <div>• 46.5% Budget (Price Range 1)</div>
              <div>• Average cost for two: ₹400 – ₹450</div>
              <div>• Range 4 average rating: 3.89★</div>
            </div>

            <div class="p-3 bg-white/5 rounded-xl border border-white/10">
              <div class="font-bold text-white mb-1">Top-Voted Outliers</div>
              <div>• Toit (Bangalore): 10,934 votes</div>
              <div>• Truffles (Bangalore): 9,667 votes</div>
              <div>• Hauz Khas Social (Delhi): 7,931 votes</div>
            </div>

            <div class="p-3 bg-white/5 rounded-xl border border-white/10">
              <div class="font-bold text-white mb-1">Service Premiums</div>
              <div>• Online delivery: +0.78★ rating lift</div>
              <div>• Table booking: 6.8x higher vote count</div>
              <div>• Only 12.1% offer booking</div>
            </div>

            <div class="p-3 bg-white/5 rounded-xl border border-white/10">
              <div class="font-bold text-white mb-1">High-Cost Outliers</div>
              <div>• Luxury venues up to ₹6,000 – ₹8,000</div>
              <div>• Validated as genuine business signals</div>
              <div>• Zero artificial rows dropped</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

window.ReportPageComponent = ReportPageComponent;
