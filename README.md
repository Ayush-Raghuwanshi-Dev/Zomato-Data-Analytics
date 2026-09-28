# 🍽️ Zomato Data Analytics & Business Intelligence Dashboard

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Pandas](https://img.shields.io/badge/Pandas-2.0+-150458?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)
[![Seaborn](https://img.shields.io/badge/Seaborn-Statistical_Data_Viz-4C72B0?style=for-the-badge)](https://seaborn.pydata.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-Interactive_Charts-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-Geospatial_Map-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

An end-to-end data analytics, statistical modeling, and business intelligence portfolio project examining **9,551 restaurants** across **15 countries**. This repository includes the complete **10-Phase EDA Jupyter Notebook**, an interactive **BI Web Dashboard**, and a publication-ready **PDF Analysis Report**.

---

## 📌 Executive Summary & Key Dataset Facts

- **Total Analyzed Outlets:** `9,551` restaurants across `141` cities and `15` countries.
- **Data Hygiene:** 9 missing values in `Cuisines` (imputed as `"Unknown"`), `0` duplicate rows (100% records preserved).
- **"Not Rated" Bias Handling:** `2,148` restaurants (`22.49%`) have an aggregate rating of `0.0`. Isolated to prevent dragging down genuine performance metrics:
  - **Naive All-Outlet Mean:** `2.67 ★`
  - **Clean Rated Mean:** **`3.44 ★`**
- **Online Delivery Penetration:** Only `25.66%` (`2,451` outlets) offer delivery. Delivery outlets achieve higher average ratings (**3.25★** vs **2.47★** for non-delivery) and **2.3x more reviews**.
- **Table Booking Adoption:** Low penetration at `12.12%` (`1,158` outlets). Commands an average rating of **3.44★** and **6.8x more votes** (`627` vs `92`).
- **Price Range Satisfaction:** Price Range 1 (Budget) averages **3.24★**, progressing to **3.89★** in Price Range 4 (Fine Dining). However, correlation with raw meal cost is weak ($r = +0.052$), proving that price alone does not guarantee praise.
- **Geographic Concentration:** Over **80.3%** of listings are in the Delhi NCR corridor:
  - **New Delhi:** 5,473 outlets (57.3%)
  - **Gurgaon:** 1,118 outlets (11.7%)
  - **Noida:** 1,080 outlets (11.3%)
- **Social Proof Metric:** Positive Pearson correlation of **$r = +0.409$** between community votes and rating stability.
- **Winning Cuisines:** Specialized international cuisines (**Italian: 3.95★**, **American: 3.92★**, **Mexican: 3.85★**) lead diner ratings over saturated North Indian (**936 outlets, 3.38★**).

---

## 🔄 10-Phase EDA Workflow

| Phase | Milestone | Core Analytical Finding |
| :---: | :--- | :--- |
| **1** | **Objective Definition** | Formulated key business questions on restaurant ratings, pricing, and service adoption. |
| **2** | **Dataset Inspection** | Audited schema: 9,551 rows × 21 columns, mixed categorical and numerical attributes. |
| **3** | **Data Quality Assessment** | Checked missing values (9 in Cuisines), verified 0 duplicates, evaluated data completeness. |
| **4** | **Univariate Analysis** | Uncovered that 22.5% of outlets are "Not Rated", 46.5% belong to Price Range 1, skewness is -0.954. |
| **5** | **Bivariate Analysis** | Evaluated Price vs. Rating and Delivery/Booking vs. Rating relationships; verified rating lift. |
| **6** | **Multivariate Analysis** | Analyzed Delhi NCR dominance across metrics and cross-evaluated price × delivery interactions. |
| **7** | **Outlier Analysis** | Detected 1,126 vote outliers via IQR; classified high-vote venues (e.g. *Toit* with 10k votes) as real brand assets. |
| **8** | **Pattern Discovery** | Identified r = 0.409 vote-rating correlation and documented international cuisine rating premiums. |
| **9** | **Business Insights** | Formulated 8 data-backed business insights and 4 actionable strategic recommendations. |
| **10** | **Engineered Dataset** | Created normalized binary features (`Is Rated`, delivery/booking flags) ready for production dashboards. |

---

## 🎯 The 6 Business Cases

1. **Local Cuisine Discovery:** Filtering neighborhood dining spots by cuisine and verified rating tiers.
2. **Price vs. Satisfaction:** Debunking the assumption that expensive dining guarantees customer satisfaction ($r = +0.052$).
3. **Market Expansion Targets:** Revealing extreme Delhi NCR concentration (>80%) and highlighting southern/western expansion targets (Bangalore, Mumbai, Hyderabad, Pune).
4. **Social Proof & Voting:** Evaluating review volume as a primary anchor for consumer trust ($r = +0.409$).
5. **Cuisine Saturation Economics:** Contrasting saturated North Indian supply (936 outlets) with high-margin niche cuisines.
6. **Geospatial Mapping:** Mapping dining clusters using authentic latitude and longitude coordinates on Carto Voyager basemaps.

---

## 📂 Repository Layout

```
Zomato-Data-Analytics/
│
├── 📕 Zomato_Data_Analysis_Report.pdf    # Executive publication-ready PDF report
├── 📄 Zomato_Data_Analysis_Report.md     # Markdown documentation
├── 📓 Zomato_EDA_Analysis.ipynb          # Master EDA Jupyter Notebook
├── 📊 zomato.csv                         # Master Zomato dataset (9,551 records)
├── 📖 README.md                          # Repository documentation
├── 🙈 .gitignore                         # Python/Jupyter ignore rules
│
└── 📁 dashboard/                         # Interactive Analytics Dashboard
    ├── 🌐 index.html                     # Dashboard application entry point
    ├── 📕 Zomato_Data_Analysis_Report.pdf# Downloadable report asset
    ├── 🎨 css/                           # Styling and Zomato design tokens
    ├── ⚙️ js/                            # Modular JavaScript architecture
    │   ├── app.js                        # Router and event orchestrator
    │   ├── dataEngine.js                 # Dynamic filtering and metric recalculation engine
    │   ├── charts.js                     # Chart.js visualization controllers
    │   └── components/                   # Modular UI components
    │       ├── sidebar.js                # Collapsible Zomato brand sidebar
    │       ├── header.js                 # Global search, filter drawer & PDF button
    │       ├── kpiCards.js               # Dynamic KPI summary cards
    │       ├── overviewPage.js           # Page 1: Executive Overview
    │       ├── restaurantsPage.js        # Page 2: Restaurant Directory & Explorer
    │       ├── ratingsPage.js            # Page 3: Ratings & Engagement Analytics
    │       ├── locationsPage.js          # Page 4: Geospatial Map & Cuisine Landscapes
    │       ├── insightsPage.js           # Page 5: 8 Insights & 4 Strategic Recommendations
    │       ├── dataQualityPage.js        # Page 6: Data Quality Audit & 10-Phase Workflow
    │       └── reportPage.js             # Page 7: Official Analysis Report View
    ├── 📦 dashboard_data.json            # Aggregated analytics payload
    └── 📦 restaurants_data.json          # Full 9,551 records for search & filtering
```

---

## 🚀 Running the Dashboard Locally

No Node.js or build steps required. Run directly with Python's built-in server:

```bash
# 1. Clone repository
git clone https://github.com/Ayush-Raghuwanshi-Dev/Zomato-Data-Analytics.git
cd Zomato-Data-Analytics/dashboard

# 2. Launch local server
python -m http.server 3000

# 3. Open in browser
http://localhost:3000
```

---

## 📄 Documentation & Reports
- **Executive PDF Report:** [`Zomato_Data_Analysis_Report.pdf`](./Zomato_Data_Analysis_Report.pdf)
- **Detailed Markdown Report:** [`Zomato_Data_Analysis_Report.md`](./Zomato_Data_Analysis_Report.md)
- **Original EDA Notebook:** [`Zomato_EDA_Analysis.ipynb`](./Zomato_EDA_Analysis.ipynb)

---

## 👤 Author
**Ayush Raghuwanshi**  
- GitHub: [@Ayush-Raghuwanshi-Dev](https://github.com/Ayush-Raghuwanshi-Dev)  
- Email: [ayushraghuwanshi.dev@gmail.com](mailto:ayushraghuwanshi.dev@gmail.com)
