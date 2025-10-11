// src/components/ProjectCaseStudy.jsx
import { useState, useEffect, useCallback } from "react";

export default function ProjectCaseStudy({
  title = "The Women's Building — Case Study",
  background = "Write a few sentences about the context, problem space, and users.",
  project = "What you built / designed. Scope and constraints.",
  role = "Your responsibilities (e.g., Product Design, Prototyping, Research).",
  strengths = ["Strength #1", "Strength #2", "Strength #3"],
  weaknesses = ["What didn’t go well", "Tradeoffs", "What you’d do differently"],
  outcome = "Impact, metrics, or what changed. Include a quick TL;DR.",
  media = [], // ← array of { src, alt, caption }
  id = "womens-building-section",
}) {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => setOpenIndex((i) => (i === null ? null : (i + media.length - 1) % media.length)), [media.length]);
  const next = useCallback(() => setOpenIndex((i) => (i === null ? null : (i + 1) % media.length)), [media.length]);

  // keyboard controls for lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (openIndex === null) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, prev, next]);

  return (
    <section id={id} className="case-study">
      <header className="case-study__header">
        <h2 className="case-study__title">{title}</h2>
        <p className="case-study__kicker">Deep dive</p>
      </header>

      {/* Media gallery (optional) */}
      {media.length > 0 && (
        <div className="case-study__gallery" role="list">
          {media.map((m, i) => (
            <button
              key={i}
              type="button"
              className="gallery-thumb"
              aria-label={`Open image ${i + 1} of ${media.length}${m.caption ? `: ${m.caption}` : ""}`}
              onClick={() => setOpenIndex(i)}
            >
              <img src={m.src} alt={m.alt ?? ""} className="gallery-thumb__img" />
              {m.caption && <span className="gallery-thumb__caption">{m.caption}</span>}
            </button>
          ))}
        </div>
      )}

      <div className="case-study__grid">
        <div className="case-study__intro">
          <h3>Background</h3>
          <p>{background}</p>
        </div>

        <div className="case-study__block">
          <h3>Project</h3>
          <p>{project}</p>
        </div>

        <div className="case-study__block">
          <h3>Role</h3>
          <p>{role}</p>
        </div>

        <div className="case-study__list">
          <h3>Strengths</h3>
          <ul>
            {strengths.map((s, i) => (<li key={i}>{s}</li>))}
          </ul>
        </div>

        <div className="case-study__list">
          <h3>Weaknesses</h3>
          <ul>
            {weaknesses.map((w, i) => (<li key={i}>{w}</li>))}
          </ul>
        </div>

        <div className="case-study__block case-study__outcome">
          <h3>Outcome</h3>
          <p>{outcome}</p>
        </div>
      </div>

      {/* Lightbox */}
      {openIndex !== null && media[openIndex] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <figure className="lightbox__figure">
            <img className="lightbox__img" src={media[openIndex].src} alt={media[openIndex].alt ?? ""} />
            {media[openIndex].caption && (
              <figcaption className="lightbox__caption">{media[openIndex].caption}</figcaption>
            )}
          </figure>

          <button className="lightbox__close" aria-label="Close viewer" onClick={close}>✕</button>
          {media.length > 1 && (
            <>
              <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous image" onClick={prev}>‹</button>
              <button className="lightbox__nav lightbox__nav--next" aria-label="Next image" onClick={next}>›</button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
