/**
 * DataEngine - Handles data loading, filtering, and dynamic recalculations
 * for the Zomato Restaurant Analysis Dashboard
 */

class DataEngine {
  constructor() {
    this.rawSummary = null;
    this.restaurants = [];
    this.filteredRestaurants = [];
    this.filters = {
      city: 'ALL',
      country: 'ALL',
      priceRange: 'ALL',
      ratingCategory: 'ALL',
      delivery: 'ALL',
      booking: 'ALL',
      search: ''
    };
    this.listeners = [];
  }

  async loadData() {
    try {
      // 1. Load summary data
      const summaryResp = await fetch('dashboard_data.json');
      this.rawSummary = await summaryResp.json();

      // 2. Load full restaurant records
      const recordsResp = await fetch('restaurants_data.json');
      this.restaurants = await recordsResp.json();
      this.filteredRestaurants = [...this.restaurants];

      return {
        summary: this.rawSummary,
        restaurantsCount: this.restaurants.length
      };
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      throw err;
    }
  }

  setFilter(key, value) {
    this.filters[key] = value;
    this.applyFilters();
  }

  resetFilters() {
    this.filters = {
      city: 'ALL',
      country: 'ALL',
      priceRange: 'ALL',
      ratingCategory: 'ALL',
      delivery: 'ALL',
      booking: 'ALL',
      search: ''
    };
    this.applyFilters();
  }

  getActiveFilterCount() {
    let count = 0;
    if (this.filters.city !== 'ALL') count++;
    if (this.filters.country !== 'ALL') count++;
    if (this.filters.priceRange !== 'ALL') count++;
    if (this.filters.ratingCategory !== 'ALL') count++;
    if (this.filters.delivery !== 'ALL') count++;
    if (this.filters.booking !== 'ALL') count++;
    if (this.filters.search.trim() !== '') count++;
    return count;
  }

  applyFilters() {
    const { city, country, priceRange, ratingCategory, delivery, booking, search } = this.filters;
    const searchLower = search.trim().toLowerCase();

    this.filteredRestaurants = this.restaurants.filter(r => {
      if (city !== 'ALL' && r.city !== city) return false;
      if (country !== 'ALL' && r.country !== country) return false;
      if (priceRange !== 'ALL' && r.price_range !== parseInt(priceRange, 10)) return false;
      if (ratingCategory !== 'ALL' && r.rating_text !== ratingCategory) return false;
      if (delivery !== 'ALL' && r.delivery !== delivery) return false;
      if (booking !== 'ALL' && r.booking !== booking) return false;
      if (searchLower) {
        const matchName = r.name.toLowerCase().includes(searchLower);
        const matchCuisine = r.cuisines.toLowerCase().includes(searchLower);
        const matchCity = r.city.toLowerCase().includes(searchLower);
        if (!matchName && !matchCuisine && !matchCity) return false;
      }
      return true;
    });

    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    const metrics = this.calculateMetrics();
    this.listeners.forEach(fn => fn(metrics, this.filteredRestaurants));
  }

  calculateMetrics() {
    const list = this.filteredRestaurants;
    const total = list.length;
    if (total === 0) {
      return {
        total: 0,
        ratedCount: 0,
        notRatedCount: 0,
        notRatedPct: 0,
        avgRatingRated: 0,
        avgRatingAll: 0,
        totalVotes: 0,
        avgVotes: 0,
        deliveryCount: 0,
        deliveryPct: 0,
        bookingCount: 0,
        bookingPct: 0,
        topCity: 'N/A',
        topCityCount: 0,
        ratingDist: [],
        topCities: [],
        priceRanges: []
      };
    }

    const ratedList = list.filter(r => r.rating > 0);
    const ratedCount = ratedList.length;
    const notRatedCount = total - ratedCount;
    const notRatedPct = +(notRatedCount / total * 100).toFixed(1);

    const sumRatingRated = ratedList.reduce((acc, r) => acc + r.rating, 0);
    const avgRatingRated = ratedCount > 0 ? +(sumRatingRated / ratedCount).toFixed(2) : 0;

    const sumRatingAll = list.reduce((acc, r) => acc + r.rating, 0);
    const avgRatingAll = +(sumRatingAll / total).toFixed(2);

    const totalVotes = list.reduce((acc, r) => acc + r.votes, 0);
    const avgVotes = +(totalVotes / total).toFixed(1);

    const deliveryCount = list.filter(r => r.delivery === 'Yes').length;
    const deliveryPct = +(deliveryCount / total * 100).toFixed(1);

    const bookingCount = list.filter(r => r.booking === 'Yes').length;
    const bookingPct = +(bookingCount / total * 100).toFixed(1);

    // City counts
    const cityMap = {};
    list.forEach(r => {
      cityMap[r.city] = (cityMap[r.city] || 0) + 1;
    });
    const sortedCities = Object.entries(cityMap).sort((a, b) => b[1] - a[1]);
    const topCity = sortedCities.length > 0 ? sortedCities[0][0] : 'N/A';
    const topCityCount = sortedCities.length > 0 ? sortedCities[0][1] : 0;

    // Top 10 cities detailed
    const top10Cities = sortedCities.slice(0, 10).map(([cityName, count]) => {
      const cList = list.filter(r => r.city === cityName);
      const cRated = cList.filter(r => r.rating > 0);
      const avgR = cRated.length > 0 ? +(cRated.reduce((a, b) => a + b.rating, 0) / cRated.length).toFixed(2) : 0;
      const delP = +(cList.filter(r => r.delivery === 'Yes').length / count * 100).toFixed(1);
      return {
        city: cityName,
        count,
        percentage: +(count / total * 100).toFixed(1),
        avg_rating_rated: avgR,
        delivery_pct: delP
      };
    });

    // Rating distribution
    const ratingOrder = ["Excellent", "Very Good", "Good", "Average", "Poor", "Not rated"];
    const ratingMap = {};
    list.forEach(r => {
      ratingMap[r.rating_text] = (ratingMap[r.rating_text] || 0) + 1;
    });
    const colorPalette = {
      "Excellent": "#16a34a",
      "Very Good": "#22c55e",
      "Good": "#84cc16",
      "Average": "#eab308",
      "Poor": "#ea580c",
      "Not rated": "#94a3b8"
    };
    const ratingDist = ratingOrder.map(cat => {
      const cnt = ratingMap[cat] || 0;
      return {
        category: cat,
        count: cnt,
        percentage: +(cnt / total * 100).toFixed(1),
        color: colorPalette[cat]
      };
    });

    // Price range analysis
    const priceRanges = [1, 2, 3, 4].map(pr => {
      const sub = list.filter(r => r.price_range === pr);
      const subRated = sub.filter(r => r.rating > 0);
      const avgR = subRated.length > 0 ? +(subRated.reduce((a, b) => a + b.rating, 0) / subRated.length).toFixed(2) : 0;
      const avgCost = sub.length > 0 ? Math.round(sub.reduce((a, b) => a + b.cost, 0) / sub.length) : 0;
      return {
        price_range: pr,
        short_label: `Range ${pr}`,
        count: sub.length,
        percentage: +(sub.length / total * 100).toFixed(1),
        avg_rating_rated: avgR,
        avg_cost: avgCost
      };
    });

    return {
      total,
      ratedCount,
      notRatedCount,
      notRatedPct,
      avgRatingRated,
      avgRatingAll,
      totalVotes,
      avgVotes,
      deliveryCount,
      deliveryPct,
      bookingCount,
      bookingPct,
      topCity,
      topCityCount,
      ratingDist,
      topCities: top10Cities,
      priceRanges
    };
  }

  getDistinctFilterOptions() {
    const cities = {};
    const countries = {};
    this.restaurants.forEach(r => {
      cities[r.city] = (cities[r.city] || 0) + 1;
      countries[r.country] = (countries[r.country] || 0) + 1;
    });

    const sortedCities = Object.entries(cities).sort((a, b) => b[1] - a[1]);
    const sortedCountries = Object.entries(countries).sort((a, b) => b[1] - a[1]);

    return {
      cities: sortedCities,
      countries: sortedCountries,
      priceRanges: [1, 2, 3, 4],
      ratingCategories: ["Excellent", "Very Good", "Good", "Average", "Poor", "Not rated"]
    };
  }
}

window.dataEngine = new DataEngine();
