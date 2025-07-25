import React from "react";

// PUBLIC_INTERFACE
export default function SidebarProviders({ providers, selected, onSelectProvider }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Providers</div>
      <ul className="provider-list">
        {providers.length === 0 && (
          <li className="provider-item empty">No providers</li>
        )}
        {providers.map(provider => (
          <li
            key={provider}
            className={`provider-item${
              selected === provider ? " provider-active" : ""
            }`}
            onClick={() => onSelectProvider(provider)}
          >
            <span>{provider}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
