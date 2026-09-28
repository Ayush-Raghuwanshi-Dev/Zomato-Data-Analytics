/**
 * Sidebar Component
 */

const SidebarComponent = {
  render(activePage = 'dashboard') {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', desc: 'Executive Overview' },
      { id: 'restaurants', label: 'Restaurants', icon: 'utensils', desc: 'Restaurant Explorer' },
      { id: 'ratings', label: 'Ratings & Engagement', icon: 'star', desc: 'Distribution & Votes' },
      { id: 'locations', label: 'Locations & Cuisines', icon: 'map-pin', desc: 'Geographic & Food Analysis' },
      { id: 'insights', label: 'Insights & Strategy', icon: 'lightbulb', desc: 'Actionable Business Rules' },
      { id: 'data-quality', label: 'Data Quality & EDA', icon: 'shield-check', desc: '10-Phase EDA Workflow' },
      { id: 'report', label: 'Analysis Report', icon: 'file-text', desc: 'Project Report & Business Cases' }
    ];

    return `
      <aside id="app-sidebar" class="sidebar-red-gradient text-white w-72 flex-shrink-0 flex flex-col justify-between h-screen sticky top-0 transition-all duration-300 z-30 shadow-2xl">
        <!-- Top Brand Section -->
        <div>
          <div class="p-6 pb-4 flex items-center justify-between border-b border-red-500/30">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                <span class="text-2xl font-black text-[#E23744] tracking-tighter">Z</span>
              </div>
              <div>
                <h1 class="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  zomato <span class="text-xs font-semibold px-2 py-0.5 bg-white/20 rounded-full uppercase tracking-wider">Analytics</span>
                </h1>
                <p class="text-[11px] text-red-100/80 font-medium">Restaurant Intelligence Dashboard</p>
              </div>
            </div>
            <button id="sidebar-toggle-btn" class="md:hidden text-white/80 hover:text-white p-1">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Dataset Snapshot Badge -->
          <div class="mx-5 my-4 p-3 bg-black/15 rounded-xl border border-white/10 backdrop-blur-sm flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span class="font-medium text-red-100">Dataset Active</span>
            </div>
            <span class="font-bold text-white tracking-wide bg-white/15 px-2 py-0.5 rounded text-[11px]">9,551 Rows</span>
          </div>

          <!-- Navigation Links -->
          <nav class="px-3 space-y-1.5 mt-2">
            ${navItems.map(item => `
              <button 
                data-page="${item.id}" 
                class="nav-link w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${activePage === item.id ? 'active' : 'text-white/90 hover:text-white'}">
                <div class="flex items-center gap-3">
                  <i data-lucide="${item.icon}" class="w-5 h-5 flex-shrink-0"></i>
                  <div class="text-left">
                    <div class="leading-tight">${item.label}</div>
                    <div class="text-[10px] ${activePage === item.id ? 'text-[#E23744]/70 font-normal' : 'text-white/60 font-normal'}">${item.desc}</div>
                  </div>
                </div>
                ${activePage === item.id ? '<i data-lucide="chevron-right" class="w-4 h-4 text-[#E23744]"></i>' : ''}
              </button>
            `).join('')}
          </nav>
        </div>

        <!-- Bottom User/Project Details -->
        <div class="p-4 border-t border-red-500/30 bg-black/10">
          <div class="p-3 bg-white/10 rounded-xl flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-xs text-white">
                EDA
              </div>
              <div>
                <div class="text-xs font-bold text-white">Zomato EDA Analysis</div>
                <div class="text-[10px] text-white/70">Python · Pandas · 10 Phases</div>
              </div>
            </div>
            <button id="about-modal-btn" class="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors" title="View Project Info">
              <i data-lucide="info" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      </aside>
    `;
  }
};

window.SidebarComponent = SidebarComponent;
