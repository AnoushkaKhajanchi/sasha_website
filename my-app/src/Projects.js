
import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
import "./Projects.css";

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "The Women's Building",
    role: "Design Consultant - team of 9",
    summary:
      "Transformed a historic staff-led tour into an engaging self-guided experience celebrating women’s empowerment and community history. I designed the Maestrapeace mural section and this tour is used by the nonprofit.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
    tags: ["SWOT Analysis", "Figma", "Framer"],
    more: [
      { heading: "Details", body: "Mapped wayfinding pain points, prototyped 3 tour flows in Figma/Framer, and user-tested with 12 visitors to refine pacing and narration." },
      { heading: "Impact", body: "Adoption by the nonprofit for self-guided tours; decreased staff time by ~35% per tour and improved visitor satisfaction scores." },
    ],
  },
  {
    id: 2,
    title: "Ergonomics Jig",
    summary:
      "Rapid prototype for driver-fit testing. Includes adjustable hard points, quick clamps, and repeatable measurement references.",
    image:
      "https://images.unsplash.com/photo-1581093588401-16ec8a6a57c0?q=80&w=1200&auto=format&fit=crop",
    tags: ["MechE", "Prototyping", "Testing"],
    more: [
      { heading: "Details", body: "Parametric hard-point rails, seat-belt anchor adjusters, and height sliders. Manufactured with laser-cut aluminum and 3D-printed brackets." },
      { heading: "Impact", body: "Cut fit-validation time by ~50% and standardized measurements across drivers; informed the next chassis rev." },
    ],
  },
  {
    id: 3,
    title: "P-Pod Cushion",
    summary:
      "Wheelchair-friendly cushion concept with integrated pump/tube system for comfort and hygiene. Iterated via silicone + resin prints.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    tags: ["HCD", "Silicone", "Manufacturing"],
    more: [
      { heading: "Details", body: "Conducted 8 interviews; prototyped multi-durometer silicone channels, tested pressure distribution and cleanability." },
      { heading: "Impact", body: "Improved pressure relief consistency; documented DFM notes for eventual over-molding and tubing snaps." },
    ],
  },
];

function Collapse({ id, open, children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    // inside useLayoutEffect, after `const h = inner.scrollHeight;`
    console.log('panel', id, 'open?', open, 'inner.scrollHeight=', inner.scrollHeight);

    if (!outer || !inner) return;

    // Ensure only this element animates
    outer.style.overflow = "hidden";
    outer.style.willChange = "max-height, opacity";
    outer.style.transition = "max-height 260ms ease, opacity 220ms ease";

    // Toggle the .open class so your CSS can set opacity:1
    if (open) {
      outer.classList.add("open");
    } else {
      outer.classList.remove("open");
    }

    // Measure & animate height
    const expand = () => {
      // Start at 0 so the browser can animate 0 -> content height
      outer.style.maxHeight = "0px";
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      outer.offsetHeight;

      const h = inner.scrollHeight;
      outer.style.maxHeight = `${h}px`;

      const onEnd = (e) => {
        if (e.propertyName !== "max-height") return;
        // When fully open, allow natural growth
        outer.style.maxHeight = "none";
        outer.removeEventListener("transitionend", onEnd);
      };
      outer.addEventListener("transitionend", onEnd);
    };

    const collapse = () => {
      // If it was 'none', set to current pixel height first for smooth close
      if (outer.style.maxHeight === "none") {
        outer.style.maxHeight = `${inner.scrollHeight}px`;
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        outer.offsetHeight;
      }
      outer.style.maxHeight = "0px";
    };

    if (open) expand();
    else collapse();

    // Keep height accurate if inner content changes (e.g., images)
    const ro = new ResizeObserver(() => {
      if (!open) return;
      if (outer.style.maxHeight !== "none") {
        outer.style.maxHeight = `${inner.scrollHeight}px`;
      }
    });
    ro.observe(inner);

    return () => ro.disconnect();
  }, [open, children]);
  console.log('panel', id, 'open now?', open);

  return (
    <div id={id} ref={outerRef} className="expandPanel" aria-hidden={!open}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

export default function ProjectsPage({ projects = SAMPLE_PROJECTS }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [expanded, setExpanded] = useState(() => new Set());

  const toggle = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allTags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const textHit =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.summary || "").toLowerCase().includes(q) ||
        (p.role || "").toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q));
      const tagHit = !activeTag || (p.tags || []).includes(activeTag);
      return textHit && tagHit;
    });
  }, [projects, query, activeTag]);

  return (
    <div className="projects App">
      <div className="page">
        <header className="header">
          <h1 className="title">Projects</h1>

          <div className="controls" role="search">
            <input
              className="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, tags, summary…"
              aria-label="Search projects"
            />
            <div className="tagRow" role="toolbar" aria-label="Tag filters">
              <button
                className={"tagBtn " + (!activeTag ? "active" : "")}
                onClick={() => setActiveTag(null)}
                aria-pressed={!activeTag}
                type="button"
              >
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  className={"tagBtn " + (activeTag === t ? "active" : "")}
                  onClick={() => setActiveTag(t === activeTag ? null : t)}
                  aria-pressed={activeTag === t}
                  type="button"
                >
                  {t}
                </button>
              ))}
              {(query || activeTag) && (
                <button
                  className="clearBtn"
                  onClick={() => {
                    setQuery("");
                    setActiveTag(null);
                  }}
                  aria-label="Clear search and tag filters"
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="stack" aria-live="polite">
          {filtered.map((p) => {
            const isOpen = expanded.has(p.id);
            const panelId = `panel-${p.id}`;

            return (
              <article
                key={p.id}
                className={"card" + (isOpen ? " cardOpen" : "")}
                role="region"
                aria-label={p.title}
              >
                <div className="imageWrap">
                  <img
                    src={p.image}
                    alt={`${p.title} project image`}
                    className="image"
                    loading="lazy"
                  />
                  <div className="fade" aria-hidden="true" />
                </div>

                <div className="content">
                  <div className="titleRow">
                    <h2 className="cardTitle">{p.title}</h2>
                    {p.role ? <span className="rolePill">{p.role}</span> : null}
                  </div>
                  <p className="summary">{p.summary}</p>

                  {p.tags && p.tags.length > 0 ? (
                    <div className="tags">
                      {p.tags.map((t, i) => (
                        <button
                          key={i}
                          className="tag"
                          onClick={() => setActiveTag(t)}
                          aria-label={`Filter by ${t}`}
                          type="button"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  ) : null}

                  <div className="cardFooter">
                    <button
                      type="button"
                      className="expandBtn"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {console.log("Toggling", p.id);toggle(p.id)}}
                      title={isOpen ? "Collapse details" : "Expand details"}
                    >
                      <span className="plus" aria-hidden="true">+</span>
                      <span className="expandLabel">
                        {isOpen ? "Hide details" : "More details"}
                      </span>
                    </button>
                  </div>

                  <Collapse id={panelId} open={isOpen}>
                    {p.more.slice(0, 2).map((sec, idx) => (
                      <section key={idx} className="moreSection">
                        <h3 className="moreHeading">{sec.heading}</h3>
                        <p className="moreBody">{sec.body}</p>
                      </section>
                    ))}
                  </Collapse>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <p className="emptyState">No projects match your filters.</p>
          )}
        </main>
      </div>
    </div>
  );
}

