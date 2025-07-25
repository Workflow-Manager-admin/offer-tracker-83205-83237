import React from "react";

// PUBLIC_INTERFACE
export default function CategorySelector({ categories, selected, onSelect }) {
  return (
    <select
      className="category-selector"
      value={selected || ""}
      onChange={e => onSelect(e.target.value || null)}
      style={{
        marginLeft: 16,
        fontSize: "1em",
        borderRadius: 6,
        minWidth: 120,
      }}
      aria-label="Choose offer category"
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat.name} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
