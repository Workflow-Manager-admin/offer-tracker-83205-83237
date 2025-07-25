import React from "react";

// PUBLIC_INTERFACE
export default function OfferDetail({ offer, onClose }) {
  if (!offer) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <dialog open className="offer-detail-dialog" onClick={e => e.stopPropagation()}>
        <button
          className="modal-close"
          title="Close"
          onClick={onClose}
          aria-label="Close"
        >✕</button>
        <div className="offer-detail-title">{offer.title}</div>
        <div className="offer-detail-provider">{offer.provider}</div>
        <div className="offer-detail-category">Category: {offer.category}</div>
        <div className="offer-detail-description">{offer.description}</div>
        <a className="offer-detail-url" href={offer.url} target="_blank" rel="noopener noreferrer">
          Go to Offer &rarr;
        </a>
      </dialog>
    </div>
  );
}
