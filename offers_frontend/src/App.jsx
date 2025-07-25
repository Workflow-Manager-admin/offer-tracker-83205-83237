import React, { useState, useEffect } from "react";
import OfferGrid from "./components/OfferGrid";
import CategorySelector from "./components/CategorySelector";
import SidebarProviders from "./components/SidebarProviders";
import OfferDetail from "./components/OfferDetail";
import ThemeToggle from "./components/ThemeToggle";
import { fetchOffers, fetchCategories } from "./api";
import "./style.css";

const COLORS = {
  primary: "#1976d2",
  secondary: "#ff9800",
  accent: "#009688",
};

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// PUBLIC_INTERFACE
export default function App() {
  // App State
  const [offers, setOffers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [providers, setProviders] = useState([]);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 900);
  const [search, setSearch] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [layout, setLayout] = useState("grid"); // grid or list

  // Debounced search to limit API calls
  const debouncedSearch = useDebounce(search, 250);

  // Theme handling
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  // Fetch offers each time category or search changes
  useEffect(() => {
    let params = {};
    if (selectedCategory) params.category = selectedCategory;
    fetchOffers(params).then(data => setOffers(data)).catch(() => setOffers([]));
  }, [selectedCategory]);

  // Derive providers from offers
  useEffect(() => {
    setProviders(Array.from(new Set(offers.map(o => o.provider))));
  }, [offers]);

  // Search filter on the frontend
  const filteredOffers = offers.filter(o =>
    o.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    o.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    o.provider.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Responsive sidebar
  useEffect(() => {
    const resize = () => setShowSidebar(window.innerWidth > 900);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // PUBLIC_INTERFACE
  function handleThemeToggle() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }

  return (
    <div className="offerpage-root">
      <nav className="topnav" style={{ background: COLORS.primary }}>
        <span className="brand">Offer Tracker 🏷️</span>
        <CategorySelector
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <input
          type="text"
          placeholder="Search offers…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="offer-search-input"
        />
        <div style={{ flex: "1 1" }} />
        <button
          className="layout-toggle"
          title="Grid/List toggle"
          aria-label="Toggle grid/list view"
          onClick={() => setLayout(l => (l === "grid" ? "list" : "grid"))}
        >{layout === "grid" ? "☰" : "☷"}</button>
        <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
      </nav>
      <div className="main-content">
        {showSidebar && (
          <SidebarProviders
            providers={providers}
            selected={selectedCategory}
            onSelectProvider={prov => setSelectedCategory(prov)}
          />
        )}
        <main className={showSidebar ? "with-sidebar" : ""}>
          <OfferGrid
            offers={filteredOffers}
            layout={layout}
            onOfferClick={setSelectedOffer}
            accentColor={COLORS.accent}
          />
        </main>
      </div>
      {selectedOffer && (
        <OfferDetail offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
      )}
    </div>
  );
}
