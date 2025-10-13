
import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
import "./Projects.css";

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "The Women's Building",
    role: "Design Consultant - team of 9",
    summary:
      "Transformed a historic staff-led tour into an engaging self-guided experience celebrating women’s empowerment and community history. I designed the Maestrapeace mural section and this tour is used by the nonprofit.",
    image:"/photos/TheWomensBuilding.png",

               // intrinsic height (preserves aspect ratio)
    maxW: 300,            // cap the image column for this card (px)
    aspect: "13 / 12",     // force an aspect-ratio if you want letterboxing
    fit: "contain",
    tags: ["SWOT Analysis", "Figma", "Framer"],
    more: [
      { heading: "The Problem", body: "The Women’s Building aimed to transition its in-person tour into an online self-guided experience. Our team created an engaging and educational journey that preserves the organization’s history and values while introducing opportunities for sustainable monetization. I designed the MaestraPeace mural section, highlighting the iconic artwork on the building and showcasing the stories and artists behind it." },
      { heading: "My Impact", body: "I redesigned the MaestraPeace section to improve navigation, clarity, and storytelling while honoring the mural’s artistic and cultural significance. I distilled copy into concise, one-sentence summaries for each piece, introduced simple, intuitive navigation, and used colorful stars, arch-shaped layouts, and close-up mural angles to guide the eye and create a cohesive visual flow. To preserve the site’s history and theme, I featured the original artists’ bouquet signature, tying the narrative back to its roots and elevating the viewer’s sense of place and continuity." },
    ],
  },
  {
    id: 2,
    title: "GoodNotes Designathon ",
    role: "Design Consultant - team of 5",
    summary:"GoodNotes Designathon 2023: Created a digital note-taking app concept focused on accessibility and inclusivity. The problem statement: What could the future of collaoration in the classroom look like - with GoodNotes as its core?  Our solution ended up winning second place.",
    image:
      "/photos/GoodNotes.png",

    maxW: 300,            // cap the image column for this card (px)
    aspect: "13 / 12",
    tags: ["UXR", "Figma", "Surveying"],
    more: [
      { heading: "The Process", body: "Given the short timeline, we conducted rapid research through multiple channels: I analyzing student testimonies on Reddit, gathering firsthand accounts of learning frustrations, and I built a survey for K-12 students about their learning journeys and teacher interactions." },
      { heading: "My Impact", body: "After identifying key pain points, we encapsulated our solution in a prototype that turns assessment into a growth experience. It enables reflective learning—students revisit prior quiz answers to examine their past mindset and pinpoint progress—while reinforcing a growth mindset by explicitly linking earlier attempts to current understanding. The design promotes “self-collaboration,” inviting students to build on their own work to deepen comprehension. For teachers, it surfaces conceptual insights over raw scores, shifting evaluation toward understanding, reducing pressure and competition, and ultimately creating a more supportive, learning-first classroom." },
    ],
  },
  {
    id: 3,
    title: "EF Coach and Tutors",
    role:"Product Design Consultant",
    summary:
      "EF Coach Tutors empowers students to build confidence and ownership in their learning through executive function coaching, goal-setting, and AI-driven study strategies that make learning more engaging and effective.",
    image: "/photos/Tutors.png",
    maxW: 300,            // cap the image column for this card (px)
    aspect: "13 / 12",
    tags: ["UXR", "CAD", "Interviews"],
    more: [
      { heading: "Problem Details", body: "We were tasked to create a personalized, adaptive learning tool that enhances focus and independence for neurodivergent students while aligning with EF Coach Tutors’ commitment to individualized, strengths-based education." },
      { heading: "Impact", body: "We designed an executive-functioning toolkit that combines sensory and visual feedback to help students manage time, sustain focus, and transition smoothly—without overstimulation. A low-stimulation, light-based timer tackles time blindness and builds calm time awareness; gentle shoulder rollers provide tactile input that reduces anxiety and supports sustained attention; and clear visual/physical cues mark task boundaries so students can shift focus with ease. Together, these features lower stress, increase on-task time, and make classroom transitions more predictable and student-centered." },
    ],
  },

  {
    id: 4,
    title: "e.l.f. Beauty",
    role:"Marketing Strategist",
    summary:
      "Partnering with e.l.f. Beauty, we’re analyzing campaigns like “So Many Dicks” and “Change the Board Game” to make boardroom diversity resonate with Gen Z and millennials, using research and activations at UC Berkeley to spark conversation and awareness around representation",
    image:
     "/photos/elf.png",
              // cap the image column for this card (px)
    maxW: 300,            // cap the image column for this card (px)
    aspect: "13 / 12",          // cap the image column for this card (px)
   

    tags: ["Coming Soon!"],
    more:[],
  },

  {
    id: 5,
    title: "Fellow",
    role:"Project Manager",
    summary:" Leading a 9-member team to design an automated, modular testing system for Fellow’s coffee grinders, improving precision and efficiency while targeting a 15–20% reduction in material waste.",
    image:
    "/photos/fellow.png",
    maxW: 300,            // cap the image column for this card (px)
    aspect: "13 / 12", 
    tags: ["Coming Soon!"],
    more: [],
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
            const hasMore = Array.isArray(p.more) && p.more.length > 0

            return (
              <article
                key={p.id}
                className={"card" + (isOpen ? " cardOpen" : "")}
                role="region"
                aria-label={p.title}
              >
                <div
                    className="imageWrap"
                    style={{
                      // Let this card’s image column grow to the image, but cap it if provided
                      width: p.maxW ?? undefined,        // sets actual width if provided
                      maxWidth: '100%',
                      aspectRatio: p.aspect ?? undefined 
                    }}
                  >
                    <img
                      src={p.image}
                      alt={`${p.title} project image`}
                      className="image"
                      loading="lazy"

                      // Reserve layout space = fewer content shifts
                      width={p.imgW ?? undefined}
                      height={p.imgH ?? undefined}

                      // Per-image fit rule (default to 'contain' so it never crops)
                      style={{ objectFit: p.fit ?? "contain" }}
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

                  {hasMore && (
                    <>
                      <div className="cardFooter">
                        <button
                          type="button"
                          className="expandBtn"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => { console.log("Toggling", p.id); toggle(p.id); }}
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
                    </>
                  )}
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

