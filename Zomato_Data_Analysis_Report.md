# 🍽️ Zomato Data Analysis Report
### Restaurant Analytics, Exploratory Data Analysis & Business Intelligence

---

## 📌 Executive Summary
- **Project Name:** Zomato Restaurant Data Analytics & Business Intelligence
- **Platform Analysed:** Zomato Restaurant Listings & Customer Review Ecosystem
- **Focus Areas:** Pricing Dynamics, Rating Systems, Cuisine Preferences, Regional Density, Delivery Services, and Customer Engagement
- **Tools Used:** Python (Pandas, NumPy, Glob), Matplotlib, Seaborn, Interactive Analytics Dashboard (HTML5, TailwindCSS, Chart.js, Leaflet, Carto Basemaps)

---

## 🏢 1. About Zomato
- **Founded In:** 2008 by **Deepinder Goyal** and **Pankaj Chaddah**.
- **Headquarters:** Gurugram (Gurgaon), Haryana, India.
- **Core Business Model:** 
  - Restaurant aggregator providing digital menus, photos, location coordinates, and user reviews.
  - On-demand food ordering and delivery service connecting customers, restaurant partners, and delivery partners.
  - Table reservations and dining privileges through loyalty memberships (Zomato Gold / Pro).
- **Mission:** Empowering diners to discover great food and helping restaurants reach and serve more consumers.

---

## 🎯 2. About Our Project
- **Indian Culinary Context:**
  - India is renowned worldwide for its vast diversity in food culture, flavors, and dining traditions.
  - Dining out and doorstep food delivery have grown exponentially across both tier-1 metropolitan cities and emerging tier-2 hubs.
- **Motivation:**
  - Inspecting restaurant dataset records reveals how pricing, ratings, and cuisines behave across individual cities.
  - The project pinpoints market gaps, consumer preferences, and operational strengths/weaknesses.
- **Dual Focus Areas:**
  - **For Customers:** Discover the highest-rated restaurants, compare pricing, check delivery availability, and verify authentic peer votes.
  - **For the Company (Zomato):** Identify saturated markets, underpenetrated regions, service adoption opportunities (online delivery & table booking), and data quality gaps.

---

## 📁 3. Data Preparation & Dataset Features

The dataset comprises comprehensive restaurant metadata collected across major food hubs.

| Feature Name | Data Type | Description |
| :--- | :--- | :--- |
| **NAME / Restaurant Name** | Text / String | Official trade name of the dining outlet |
| **PRICE / Price range** | Integer (1–4) | Relative price category: 1 (Budget), 2 (Moderate), 3 (Expensive), 4 (Fine Dining) |
| **Average Cost for two** | Numeric | Approximate dining cost for two people in local currency |
| **CUSINE_CATEGORY / Cuisines** | Text / String | Comma-separated food varieties and cuisines served |
| **CITY / City** | Text / String | Geographical city where the outlet operates |
| **REGION / Locality** | Text / String | Specific neighborhood, district, or market locality |
| **URL** | Text / String | Web link to restaurant's digital storefront *(dropped in cleaning)* |
| **TIMING** | Text / String | Operational business hours *(dropped in cleaning)* |
| **RATING_TYPE / Rating text** | Categorical | Review tier: Excellent, Very Good, Good, Average, Poor, Not rated |
| **RATING / Aggregate rating** | Float (0.0–5.0) | Weighted average customer rating score |
| **VOTES / Votes** | Integer | Cumulative user reviews and social validation votes |
| **Has Online delivery** | Binary (Yes/No) | Availability of doorstep online delivery |
| **Has Table booking** | Binary (Yes/No) | Availability of online table reservations |

---

## 🔄 4. Data Integration Workflow

When raw restaurant data is split across multiple city-wise CSV files, integration merges them into a standardized DataFrame:

```python
import pandas as pd
import numpy as np
import os
import glob

# Step 1: Scan and retrieve all regional CSV files
all_files = glob.glob(r"Input_Folder/*.csv")
data_list = []

# Step 2: Read each file and append into list
for filename in all_files:
    df_temp = pd.read_csv(filename, delimiter="|", quotechar='"')
    data_list.append(df_temp.values)

# Step 3: Stack arrays vertically and create integrated DataFrame
df_stacked = np.vstack(data_list)
df_integrated = pd.DataFrame(df_stacked, columns=[
    "NAME", "PRICE", "CUSINE_CATEGORY", "CITY", "REGION", 
    "URL", "PAGE NO", "CUSINE TYPE", "TIMING", "RATING_TYPE", 
    "RATING", "VOTES"
])

# Step 4: Drop redundant administrative columns
df_integrated.drop(columns=["PAGE NO", "URL", "TIMING"], inplace=True)

# Step 5: Export consolidated dataset
df_integrated.to_csv("Integrated_Zomato_Data.csv", index=False, encoding='utf-8')
```

---

## 🧹 5. Data Cleaning & Pre-processing

Raw web-scraped and transactional datasets often contain encoding artifacts, custom null values, and formatting discrepancies.

### Pointwise Cleaning Steps:
1. **Drop Irrelevant Features:**
   - Columns like `URL`, `PAGE NO`, and `TIMING` do not contribute statistical value to consumer behavior or rating analysis and are eliminated.
2. **Numeric Type Conversion:**
   - Convert `RATING` and `VOTES` from string to numeric types using `errors='coerce'` to handle unparseable text.
3. **Handling Custom Missing Values:**
   - Encode custom null representations (`"none"`, `"NEW"`, `"Not rated"`, `"None"`, `np.nan`) as true `NaN` values.
4. **Targeted Imputation Strategy:**
   - For missing ratings and votes, compute hierarchical mean values grouped by `['CITY', 'CUSINE TYPE']`.
   - Missing cuisine strings are imputed as `"Unknown"` to avoid dropping restaurant records.
5. **Separating "Not Rated" Listings:**
   - Outlets with `0.0` rating are flagged distinctly (`Is Rated = 0`) to prevent downward bias on actual rated venue averages.
6. **Cuisine Disaggregation:**
   - Multi-label cuisine strings are split by commas to evaluate individual cuisine popularity accurately.

```python
# Data Pre-processing Implementation
missing_tokens = ["none", "NEW", "Not rated", "None", np.nan]
df = pd.read_csv("InputFile.csv", na_values=missing_tokens)

# Convert numerical attributes
df['RATING'] = pd.to_numeric(df['RATING'], errors='coerce')
df['VOTES'] = pd.to_numeric(df['VOTES'], errors='coerce')

# Grouped Mean Imputation
df['RATING'] = df['RATING'].fillna(df.groupby(['CITY', 'CUSINE TYPE'])['RATING'].transform('mean'))
df['VOTES'] = df['VOTES'].fillna(df.groupby(['CITY', 'CUSINE TYPE'])['VOTES'].transform('mean'))

# Disaggregate multi-label cuisines for granular analysis
df_exploded = (df.set_index(df.columns.drop('CUSINE_CATEGORY', 1).tolist())
    .CUSINE_CATEGORY.str.split(',', expand=True)
    .stack()
    .reset_index()
    .rename(columns={0: 'CUSINE_CATEGORY'})
    .loc[:, df.columns]
)
```

---

## 📊 6. Data Visualization & Business Cases

### 🔹 Business Case 1: Check Cuisines and Ratings Served in a Region of a City
- **Analytical Purpose:** Help diners discover top-rated outlets for specific cuisines within their immediate locality.
- **Key Findings:**
  - Specialized international cuisines (**Italian: 3.95★**, **American: 3.92★**, **Mexican: 3.85★**) receive significantly higher ratings than generic offerings.
  - High-rating pockets are concentrated in commercial and upscale residential zones (e.g., Connaught Place in Delhi, Indiranagar in Bangalore).
- **Business Action:** Zomato search filters should prioritize verified top-rated cuisine badges within regional sub-zones.

---

### 🔹 Business Case 2: Average Rating vs Average Price across Regions
- **Analytical Purpose:** Understand whether higher meal prices guarantee superior customer satisfaction.
- **Key Findings:**
  - **Price Range 1 (Budget):** Average rating = **3.24★**
  - **Price Range 2 (Moderate):** Average rating = **3.38★**
  - **Price Range 3 (Expensive):** Average rating = **3.78★**
  - **Price Range 4 (Fine Dining):** Average rating = **3.89★**
  - **Correlation:** Weak correlation between nominal cost and rating (**r = +0.052**), indicating that price alone does not ensure customer delight. Service quality and taste are the deciding factors.
- **Business Action:** Promote budget and moderate venues that maintain exceptional 4.0+ ratings as "Value Champions".

---

### 🔹 Business Case 3: Restaurant Density & City Penetration
- **Analytical Purpose:** Map market footprint and identify underpenetrated geographic regions for expansion.
- **Key Findings:**
  - **Extreme Concentration:** Over **80.3%** of all restaurants in the primary dataset are located in the Delhi NCR cluster:
    - **New Delhi:** 5,473 restaurants (57.3%)
    - **Gurgaon:** 1,118 restaurants (11.7%)
    - **Noida:** 1,080 restaurants (11.3%)
  - High-potential southern and eastern metros (Bangalore, Mumbai, Kolkata, Hyderabad) have much lower representation in this dataset.
- **Business Action:** Deploy field merchant acquisition teams to Tier-1 and fast-growing Tier-2 cities to diversify geographic risk.

---

### 🔹 Business Case 4: Restaurant Search & Votes (Social Proof Correlation)
- **Analytical Purpose:** Evaluate how customer vote counts correlate with rating stability and consumer trust.
- **Key Findings:**
  - Correlation between Votes and Aggregate Rating is **r = +0.409** (moderate positive).
  - Outlets with over **1,000 votes** almost never drop below a **3.8★** rating.
  - Highly reviewed brands (*Toit: 10,934 votes, Truffles: 9,667 votes, Hauz Khas Social: 7,931 votes*) serve as platform anchor attractions.
- **Business Action:** Implement post-meal prompt incentives for unrated restaurants to cross the critical initial threshold of 50 reviews.

---

### 🔹 Business Case 5: Cuisine Demand vs Market Saturation
- **Analytical Purpose:** Evaluate supply vs demand dynamics across different food categories.
- **Key Findings:**
  - **Most Common (Saturated):** 
    - **North Indian:** 936 exclusive outlets (average rating: 3.38★)
    - **North Indian + Chinese:** 511 outlets
    - **Fast Food:** 354 outlets
  - **High Satisfaction (Niche):** Continental, Italian, Japanese, and Bakery items demonstrate above-average ratings and higher per-order customer spend.
- **Business Action:** Encourage cloud kitchens and new restaurateurs to bridge cuisine gaps rather than opening additional undifferentiated North Indian eateries.

---

### 🔹 Business Case 6: Map Plotting & Geographic Distribution
- **Analytical Purpose:** Visualize spatial clusters, delivery hubs, and regional culinary footprints.
- **Key Findings:**
  - Geospatial clustering confirms heavy density along transit corridors and central business districts.
  - Multi-country dataset includes 15 nations (India, US, UK, UAE, Brazil, South Africa, etc.) requiring currency standardization.
- **Implementation:** Carto Voyager basemap with verified coordinates and interactive zoom controls (`api_key=cb1_41b1_1_1c25130d48635503dbc1a2a2`).

---

## 📈 7. Key Findings & Data Summary (Pointwise Facts)

- **Total Registered Restaurants:** `9,551` in primary dataset (and over `105,000+` in extended national repositories).
- **Geographic Concentration:**
  - **New Delhi:** 5,473 restaurants (57.3%)
  - **Gurgaon:** 1,118 restaurants (11.7%)
  - **Noida:** 1,080 restaurants (11.3%)
  - **Faridabad:** 251 restaurants (2.6%)
- **Rating Classification Breakdown:**
  - **Average (2.5 – 3.4★):** 3,737 outlets (39.1%)
  - **Not Rated (0.0★):** 2,148 outlets (22.5%) — *major platform visibility blindspot!*
  - **Good (3.5 – 3.9★):** 2,100 outlets (22.0%)
  - **Very Good (4.0 – 4.4★):** 1,079 outlets (11.3%)
  - **Excellent (4.5 – 4.9★):** 301 outlets (3.1%)
  - **Poor (1.8 – 2.4★):** 186 outlets (1.9%)
- **Online Delivery Penetration:**
  - Only **25.7%** (`2,451` restaurants) offer online delivery.
  - Delivery-enabled restaurants achieve higher average ratings (**3.25★** vs **2.47★** for non-delivery).
- **Table Booking Penetration:**
  - Only **12.1%** (`1,158` restaurants) enable table reservations.
  - Table-booking restaurants attract **6.8x more votes** (`627` vs `92` average votes).
- **Pricing & Meal Cost:**
  - Over **46.5%** of restaurants belong to **Price Range 1 (Budget)**.
  - Median cost for two across regular Indian casual eateries is approximately **₹400 – ₹450**.
  - High-cost luxury outliers reach up to **₹6,000 – ₹8,000** for heritage dining.
- **Top Voted Outliers (Real Brand Assets):**
  1. *Toit* (Bangalore) — 10,934 votes (4.8★)
  2. *Truffles* (Bangalore) — 9,667 votes (4.7★)
  3. *Hauz Khas Social* (New Delhi) — 7,931 votes (4.3★)
  4. *Peter Cat* (Kolkata) — 7,574 votes (4.3★)
  5. *AB's - Absolute Barbecues* (Bangalore) — 6,907 votes (4.6★)

---

## 💡 8. Actionable Business Recommendations for Zomato

1. **Activate the 22.5% Unrated Merchants:**
   - Offer diners 50 Zomato Pro coins or delivery discounts for rating newly onboarded restaurants within 14 days.
2. **Aggressively Onboard Non-Delivery Outlets:**
   - 74.3% of restaurants do not currently offer delivery. Onboarding the top quartile of rated dine-in venues will directly expand platform GMV.
3. **Monetize Table Reservations in Fine Dining:**
   - Table-booking venues command premium customers and high engagement. Bundle reservation management software into Zomato's partner merchant packages.
4. **Expand Footprint into Tier-2 Urban Centers:**
   - Reduce reliance on the Delhi NCR corridor (which represents >80% of current listings) by scaling operations in high-growth southern and western culinary capitals.

---

*Report prepared as the companion documentation for the Zomato Restaurant Analytics & Business Intelligence Dashboard.*
