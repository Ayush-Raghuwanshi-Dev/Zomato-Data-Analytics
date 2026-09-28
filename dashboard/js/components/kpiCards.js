/**
 * KPI Cards Component
 */

const KpiCardsComponent = {
  render(metrics) {
    const {
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
      topCityCount
    } = metrics;

    const cards = [
      {
        id: 'kpi-total-restaurants',
        title: 'Total Restaurants',
        value: total.toLocaleString(),
        subtitle: `${ratedCount.toLocaleString()} rated · ${notRatedCount.toLocaleString()} unrated (${notRatedPct}%)`,
        icon: 'store',
        iconBg: 'bg-red-50 text-[#E23744]',
        badge: 'Dataset Count',
        badgeBg: 'bg-slate-100 text-slate-700'
      },
      {
        id: 'kpi-avg-rating',
        title: 'Average Rating',
        value: `${avgRatingRated} ★`,
        subtitle: `Excludes unrated · All listings: ${avgRatingAll} ★`,
        icon: 'star',
        iconBg: 'bg-amber-50 text-amber-600',
        badge: 'Rated Outlets',
        badgeBg: 'bg-amber-100/80 text-amber-800'
      },
      {
        id: 'kpi-total-votes',
        title: 'Total Engagement Votes',
        value: totalVotes.toLocaleString(),
        subtitle: `Average ~${avgVotes} votes per restaurant`,
        icon: 'users',
        iconBg: 'bg-blue-50 text-blue-600',
        badge: 'Social Proof',
        badgeBg: 'bg-blue-100/80 text-blue-800'
      },
      {
        id: 'kpi-online-delivery',
        title: 'Online Delivery',
        value: `${deliveryPct}%`,
        subtitle: `${deliveryCount.toLocaleString()} restaurants offering delivery`,
        icon: 'bike',
        iconBg: 'bg-emerald-50 text-emerald-600',
        badge: '3.25 vs 2.47★',
        badgeBg: 'bg-emerald-100/80 text-emerald-800'
      },
      {
        id: 'kpi-table-booking',
        title: 'Table Booking',
        value: `${bookingPct}%`,
        subtitle: `${bookingCount.toLocaleString()} restaurants enable reservations`,
        icon: 'calendar-check',
        iconBg: 'bg-purple-50 text-purple-600',
        badge: '3.44 vs 2.56★',
        badgeBg: 'bg-purple-100/80 text-purple-800'
      },
      {
        id: 'kpi-top-city',
        title: 'Top Concentration City',
        value: topCity,
        subtitle: `${topCityCount.toLocaleString()} restaurants (${((topCityCount/total)*100).toFixed(1)}% share)`,
        icon: 'map-pin',
        iconBg: 'bg-rose-50 text-rose-600',
        badge: 'Market Leader',
        badgeBg: 'bg-rose-100/80 text-rose-800'
      }
    ];

    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        ${cards.map(c => `
          <div class="analytics-card p-4 flex flex-col justify-between group hover:border-red-200">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">${c.title}</span>
                <div class="w-8 h-8 rounded-lg ${c.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i data-lucide="${c.icon}" class="w-4 h-4"></i>
                </div>
              </div>
              <div class="text-2xl font-black text-slate-900 tracking-tight stat-value mb-1">
                ${c.value}
              </div>
            </div>
            <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span class="text-slate-500 truncate" title="${c.subtitle}">${c.subtitle}</span>
              <span class="px-1.5 py-0.5 rounded font-semibold text-[10px] ${c.badgeBg} flex-shrink-0 ml-1">
                ${c.badge}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};

window.KpiCardsComponent = KpiCardsComponent;
