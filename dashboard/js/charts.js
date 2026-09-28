/**
 * Charts Controller - Handles Chart.js visualization generation and live updates
 */

class ChartManager {
  constructor() {
    this.charts = {};
  }

  destroyChart(id) {
    if (this.charts[id]) {
      this.charts[id].destroy();
      delete this.charts[id];
    }
  }

  // 1. Top 10 Cities by Restaurant Count (Horizontal Bar Chart)
  renderTopCitiesChart(canvasId, citiesData) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = citiesData.map(d => d.city);
    const data = citiesData.map(d => d.count);
    const avgRatings = citiesData.map(d => d.avg_rating_rated);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Restaurants',
          data: data,
          backgroundColor: labels.map((c, i) => i === 0 ? '#E23744' : i < 3 ? 'rgba(226, 55, 68, 0.75)' : 'rgba(226, 55, 68, 0.4)'),
          borderColor: '#E23744',
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
          barPercentage: 0.7
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            titleFont: { size: 13, weight: 'bold', family: 'Plus Jakarta Sans' },
            bodyFont: { size: 12, family: 'Inter' },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              afterLabel: function(context) {
                const idx = context.dataIndex;
                const r = avgRatings[idx] ? `Avg Rated: ${avgRatings[idx]} ★` : '';
                return r;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#F1F5F9' },
            ticks: {
              font: { family: 'Inter', size: 11 },
              color: '#64748B'
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
              color: '#1E293B'
            }
          }
        }
      }
    });
  }

  // 2. Rating Category Distribution (Donut Chart)
  renderRatingDistChart(canvasId, ratingData) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = ratingData.map(d => d.category);
    const counts = ratingData.map(d => d.count);
    const colors = ratingData.map(d => d.color);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#FFFFFF',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: { family: 'Plus Jakarta Sans', size: 11, weight: '500' },
              color: '#475569',
              padding: 12,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#1E293B',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const val = context.raw;
                const pct = ((val / total) * 100).toFixed(1);
                return ` ${context.label}: ${val.toLocaleString()} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }

  // 3. Average Rating by Price Range (Grouped / Combo Bar Chart)
  renderPriceRangeChart(canvasId, priceData) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = priceData.map(d => d.short_label || `Range ${d.price_range}`);
    const ratings = priceData.map(d => d.avg_rating_rated);
    const counts = priceData.map(d => d.count);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Avg Rating (Rated only)',
            data: ratings,
            backgroundColor: ['#93C5FD', '#60A5FA', '#3B82F6', '#1D4ED8'],
            borderRadius: 6,
            yAxisID: 'y'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              afterLabel: function(context) {
                const idx = context.dataIndex;
                return `Total Outlets: ${counts[idx].toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            min: 2.5,
            max: 4.5,
            grid: { color: '#F1F5F9' },
            ticks: {
              stepSize: 0.5,
              font: { family: 'Inter', size: 11 },
              color: '#64748B',
              callback: val => val + ' ★'
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
              color: '#1E293B'
            }
          }
        }
      }
    });
  }

  // 4. Online Delivery vs Table Booking Comparison
  renderDeliveryBookingChart(canvasId, delData, bkData) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    this.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Online Delivery', 'Table Booking'],
        datasets: [
          {
            label: 'Available (Yes)',
            data: [delData.yes.avg_rating_all, bkData.yes.avg_rating_all],
            backgroundColor: '#E23744',
            borderRadius: 6
          },
          {
            label: 'Not Available (No)',
            data: [delData.no.avg_rating_all, bkData.no.avg_rating_all],
            backgroundColor: '#CBD5E1',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: { family: 'Plus Jakarta Sans', size: 11, weight: '500' },
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: '#1E293B',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                return ` ${context.dataset.label}: ${context.raw} Avg Rating`;
              }
            }
          }
        },
        scales: {
          y: {
            min: 1.5,
            max: 4.0,
            grid: { color: '#F1F5F9' },
            ticks: {
              font: { family: 'Inter', size: 11 },
              callback: val => val + ' ★'
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
              color: '#1E293B'
            }
          }
        }
      }
    });
  }

  // 5. Cuisine Performance Chart (Horizontal Bar Chart)
  renderCuisineChart(canvasId, cuisineData) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = cuisineData.map(d => d.cuisine);
    const ratings = cuisineData.map(d => d.avg_rating);
    const counts = cuisineData.map(d => d.count);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Rating',
          data: ratings,
          backgroundColor: ratings.map(r => r >= 3.9 ? '#15803D' : r >= 3.8 ? '#16A34A' : r >= 3.7 ? '#22C55E' : '#84CC16'),
          borderRadius: 6,
          barPercentage: 0.65
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const idx = context.dataIndex;
                return ` Avg Rating: ${context.raw} ★ (${counts[idx]} outlets sampled)`;
              }
            }
          }
        },
        scales: {
          x: {
            min: 3.0,
            max: 4.2,
            grid: { color: '#F1F5F9' },
            ticks: {
              stepSize: 0.2,
              font: { family: 'Inter', size: 11 },
              callback: val => val + ' ★'
            }
          },
          y: {
            grid: { display: false },
            ticks: {
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
              color: '#1E293B'
            }
          }
        }
      }
    });
  }

  // 6. Votes vs Aggregate Rating Scatter Plot
  renderScatterChart(canvasId, scatterData, correlationVal) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const points = scatterData.map(d => ({
      x: d.rating,
      y: d.votes,
      name: d.name,
      city: d.city,
      priceRange: d.price_range
    }));

    this.charts[canvasId] = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Restaurant (Votes vs Rating)',
          data: points,
          backgroundColor: 'rgba(226, 55, 68, 0.6)',
          borderColor: '#E23744',
          borderWidth: 1,
          pointRadius: 4.5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const raw = context.raw;
                return [
                  `🍽️ ${raw.name} (${raw.city})`,
                  `⭐ Rating: ${raw.x} ★`,
                  `🗳️ Votes: ${raw.y.toLocaleString()}`,
                  `💰 Price Range: ${raw.priceRange}`
                ];
              }
            }
          }
        },
        scales: {
          x: {
            min: 1.5,
            max: 5.0,
            title: {
              display: true,
              text: `Aggregate Rating (Correlation r = ${correlationVal})`,
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
              color: '#475569'
            },
            grid: { color: '#F1F5F9' },
            ticks: { font: { family: 'Inter', size: 11 } }
          },
          y: {
            title: {
              display: true,
              text: 'Customer Votes',
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
              color: '#475569'
            },
            grid: { color: '#F1F5F9' },
            ticks: { font: { family: 'Inter', size: 11 } }
          }
        }
      }
    });
  }

  // 7. Bivariate Rating Trend: Price Range × Online Delivery (Cell 50)
  renderBivariateTrendChart(canvasId, trendData) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = trendData.map(d => d.price_range);
    const yesData = trendData.map(d => d.delivery_yes);
    const noData = trendData.map(d => d.delivery_no);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'With Online Delivery (Yes)',
            data: yesData,
            borderColor: '#E23744',
            backgroundColor: 'rgba(226, 55, 68, 0.1)',
            borderWidth: 3,
            pointBackgroundColor: '#E23744',
            pointRadius: 5,
            tension: 0.2
          },
          {
            label: 'Without Online Delivery (No)',
            data: noData,
            borderColor: '#64748B',
            backgroundColor: 'rgba(100, 116, 139, 0.1)',
            borderWidth: 3,
            pointBackgroundColor: '#64748B',
            pointRadius: 5,
            borderDash: [5, 5],
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: '#1E293B',
            padding: 10,
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            min: 3.0,
            max: 4.2,
            title: {
              display: true,
              text: 'Average Rating (Rated Venues)',
              font: { family: 'Plus Jakarta Sans', size: 11 }
            },
            grid: { color: '#F1F5F9' },
            ticks: {
              stepSize: 0.2,
              font: { family: 'Inter', size: 11 },
              callback: val => val + ' ★'
            }
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' }
            }
          }
        }
      }
    });
  }
}

window.chartManager = new ChartManager();
