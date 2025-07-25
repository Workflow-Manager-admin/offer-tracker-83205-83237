import React from "react";

// PUBLIC_INTERFACE
export default function OfferGrid({ offers, layout, onOfferClick, accentColor }) {
  if (!offers.length) {
    return <div style={{ padding: 32, color: "#888" }}>No offers found.</div>;
  }
  return (
    <div className={layout === "grid" ? "offer-grid" : "offer-list"}>
      {offers.map(offer => (
        <OfferCard key={offer.id} offer={offer} onClick={() => onOfferClick(offer)} accentColor={accentColor} />
      ))}
    </div>
  );
}

function OfferCard({ offer, onClick, accentColor }) {
  return (
    <div className="offercard" onClick={onClick} tabIndex={0} role="button" aria-pressed="false">
      <div className="offercard-header" style={{ borderBottom: `3px solid ${accentColor}` }}>
        <div className="offercard-title">{offer.title}</div>
        <span className="provider-badge">{offer.provider}</span>
      </div>
      <div className="offercard-body">{offer.description.length > 100
        ? offer.description.slice(0, 90) + "…"
        : offer.description}</div>
      <a
        href={offer.url}
        target="_blank"
        rel="noopener noreferrer"
        className="offercard-link"
        onClick={e => e.stopPropagation()}
      >View Deal &rarr;</a>
      <div className="offercard-category-badge">{offer.category}</div>
    </div>
  );
}
